import {
  DefaultButton,
  Dropdown,
  IconButton,
  IDropdownOption,
  MessageBar,
  MessageBarType,
  Panel,
  PanelType,
  Stack,
  Text,
  TextField,
} from '@fluentui/react'
import { ISearchQuery } from '@pnp/sp/search/types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { getContextDisplayName, getContextKeyFromPath } from '../../config/featureContext'
import { sendChatMessage, MAX_PROMPT_CHARS } from '../../services/ai-assistant/aiAssistantService'
import { trackAiPromptSubmit } from '../../services/analytics'
import { IRootState } from '../../store'
import {
  addAiMessage,
  setAiError,
  setAiPanelOpen,
  setAiPanelWidth,
  setAiPendingInput,
  setAiQueryApplyMode,
  setAiSending,
  updateAiMessage,
} from '../../store/ai-assistant/actions'
import { IAiMessage, AiQueryApplyMode, AiSuggestionData } from '../../store/ai-assistant/types'
import { checkBridgeStatus, setSelectedModel } from '../../store/ai-assistant-auth/actions'
import { setPath as setSpShooterPath, setMethod as setSpShooterMethod, setBody as setSpShooterBody, setHeaders as setSpShooterHeaders } from '../../store/spshoot/actions'
import { COPILOT_CLI_MODELS } from '../../services/ai-assistant/copilotApiClient'
import { setSearchQuery } from '../../store/search/actions'
import { setCode as setPnpjsCode } from '../../store/pnpjsconsole/actions'
import { setCode as setGraphSdkCode } from '../../store/graphsdkconsole/actions'
import './aiAssistantPanel.css'

const BODY_OPEN_CLASS = 'ai-panel-open'

const BRIDGE_STATUS_COLOR: Record<string, string> = {
  idle: '#888',
  checking: '#888',
  ready: '#107c10',
  bridge_missing: '#d13438',
  cli_missing: '#d13438',
  not_authenticated: '#c8960c',
}

const BRIDGE_STATUS_LABEL: Record<string, string> = {
  idle: 'Not checked',
  checking: 'Checking…',
  ready: 'Ready',
  bridge_missing: 'Bridge not installed',
  cli_missing: 'Copilot CLI not found',
  not_authenticated: 'Not signed in',
}

const QUERY_APPLY_OPTIONS: IDropdownOption[] = [
  { key: 'manual', text: 'Manual', title: 'Review the result, then click Apply under the response' },
  { key: 'apply', text: 'Apply', title: 'AI result is applied to the editor automatically' },
  { key: 'execute', text: 'Execute', title: 'Apply and run / search automatically' },
]

// PnPjs Console: Execute is intentionally disabled because generated code can
// perform destructive operations (delete/update items, lists, etc.). The user
// must explicitly run code from the editor.
const PNPJS_APPLY_OPTIONS: IDropdownOption[] = QUERY_APPLY_OPTIONS.filter(
  (o) => o.key !== 'execute'
)

const getApplyModeTooltip = (mode: AiQueryApplyMode, isPnpjs: boolean): string => {
  if (isPnpjs) {
    if (mode === 'apply') {
      return 'Apply: insert generated code into the editor automatically.'
    }
    return 'Manual: review the code and click Apply Code under the response. Execute is disabled here to prevent unintended changes.'
  }

  if (mode === 'apply') {
    return 'Apply: apply generated payload to query editor automatically.'
  }

  if (mode === 'execute') {
    return 'Execute: apply payload and run search automatically.'
  }

  return 'Manual: review payload and click Apply Payload under the response.'
}

const generateId = (): string => {
  const cryptoRef = (globalThis as { crypto?: Crypto & { randomUUID?: () => string } }).crypto
  if (cryptoRef?.randomUUID) {
    return cryptoRef.randomUUID()
  }
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10)
}

const normalizeDirection = (value: unknown): number | undefined => {
  if (value === 0 || value === '0') {
    return 0
  }
  if (value === 1 || value === '1') {
    return 1
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    if (normalized === 'asc' || normalized === 'ascending') {
      return 0
    }
    if (normalized === 'desc' || normalized === 'descending') {
      return 1
    }
  }

  return undefined
}

/**
 * If the markdown text has an unclosed code fence (odd number of ``` markers),
 * append a closing fence so SyntaxHighlighter renders the partial block
 * correctly during streaming instead of falling back to inline code.
 */
function closeOpenFence(text: string): string {
  const fences = text.match(/^```/gm)
  if (fences && fences.length % 2 !== 0) {
    return text + '\n```'
  }
  return text
}

const AiAssistantPanel = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { isOpen, messages, isSending, error, panelWidth, queryApplyMode, pendingInput } = useSelector(
    (state: IRootState) => state.aiAssistant
  )
  const { isDark } = useSelector((state: IRootState) => state.home)
  const { selectedModel, bridgeStatus } = useSelector(
    (state: IRootState) => state.aiAuth
  )
  // Panel is ready when the Copilot CLI bridge is connected
  const isReady = bridgeStatus === 'ready'
  const { searchQuery } = useSelector((state: IRootState) => state.search)
  const { code: pnpjsCode } = useSelector((state: IRootState) => state.pnpjsconsole)
  const { code: graphSdkCode } = useSelector((state: IRootState) => state.graphsdkconsole)
  const { path: spShooterPath, method: spShooterMethod, body: spShooterBody, headers: spShooterHeaders, results: spShooterResults, context: spShooterContext } = useSelector((state: IRootState) => state.spshoot)

  const [input, setInput] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartWidth, setDragStartWidth] = useState(0)
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)

  // Per-context session IDs so switching between PnPjs / Search / SP Shooter
  // always uses a fresh copilot session with the correct system prompt.
  // Sessions are created lazily on first use and persist for the extension lifetime.
  const sessionsByContextRef = useRef<Map<string, string>>(new Map())
  // Tracks which contexts have already had their system prompt sent (first message).
  const sentFirstForContextRef = useRef<Set<string>>(new Set())

  const draftRef = useRef<string>('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const messageListRef = useRef<HTMLDivElement | null>(null)
  const userScrolledUpRef = useRef(false)

  useEffect(() => {
    if (pendingInput) {
      setInput((prev) => (prev ? `${prev}\n${pendingInput}` : pendingInput))
      dispatch(setAiPendingInput(null))
    }
  }, [pendingInput, dispatch])

  useEffect(() => {
    dispatch(checkBridgeStatus() as any)
  }, [dispatch])

  const pageContext = getContextKeyFromPath(location.pathname)
  const pageContextLabel = getContextDisplayName(pageContext)
  const isSearchContext = pageContext === 'search'
  const isPnpjsContext = pageContext === 'pnpjsconsole'
  const isSpShooterContext = pageContext === 'spshooter'
  const isGraphSdkContext = pageContext === 'graphsdkconsole'
  const supportsApplyMode = isSearchContext || isPnpjsContext || isGraphSdkContext

  // Execute mode is not allowed on the PnPjs or Graph SDK consoles (snippets can be
  // destructive). Auto-downgrade to 'apply' if the user lands here with it set.
  useEffect(() => {
    if ((isPnpjsContext || isGraphSdkContext) && queryApplyMode === 'execute') {
      dispatch(setAiQueryApplyMode('apply'))
    }
  }, [isPnpjsContext, isGraphSdkContext, queryApplyMode, dispatch])

  const promptHistory = useMemo(() => {
    const result: string[] = []
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i]
      if (m.role === 'user') {
        const text = m.content
        if (result[result.length - 1] !== text) {
          result.push(text)
        }
      }
    }
    return result
  }, [messages])

  useEffect(() => {
    const body = document.body
    body.style.setProperty('--ai-panel-width', `${panelWidth}px`)
    if (isOpen) {
      body.classList.add(BODY_OPEN_CLASS)
    } else {
      body.classList.remove(BODY_OPEN_CLASS)
    }
    return () => {
      body.classList.remove(BODY_OPEN_CLASS)
    }
  }, [isOpen, panelWidth])

  useEffect(() => {
    const el = messageListRef.current
    const end = messagesEndRef.current
    if (!el || !end) return

    const isCurrentlyStreaming = messages.some((m) => m.isStreaming)
    if (isCurrentlyStreaming) {
      // Instant scroll during streaming to avoid smooth-animation fighting
      if (!userScrolledUpRef.current) {
        el.scrollTop = el.scrollHeight
      }
    } else {
      // Smooth scroll when new message lands or streaming ends
      end.scrollIntoView({ behavior: 'smooth' })
      userScrolledUpRef.current = false
    }
  }, [messages, isSending])

  const buildAppliedQuerySuggestion = useCallback((query: unknown): ISearchQuery | null => {
    let normalizedQuery: unknown = query

    // AI may return payload as a JSON string or as { request: { ... } }.
    // Normalize both shapes before mapping into the Search editor state.
    if (typeof normalizedQuery === 'string') {
      try {
        normalizedQuery = JSON.parse(normalizedQuery)
      } catch {
        // Keep plain text prompts as Querytext fallback.
      }
    }

    if (
      normalizedQuery &&
      typeof normalizedQuery === 'object' &&
      'request' in (normalizedQuery as Record<string, unknown>)
    ) {
      normalizedQuery = (normalizedQuery as Record<string, unknown>).request
    }

    let updatedQuery: ISearchQuery

    if (typeof normalizedQuery === 'string') {
      updatedQuery = {
        ...searchQuery,
        Querytext: normalizedQuery,
      }
    } else if (normalizedQuery && typeof normalizedQuery === 'object') {
      const queryObj = normalizedQuery as Record<string, unknown>

      // Support both Querytext and QueryText naming from AI responses.
      if (!('Querytext' in queryObj) && typeof queryObj.QueryText === 'string') {
        queryObj.Querytext = queryObj.QueryText
      }

      if (typeof queryObj.RowLimit === 'string') {
        const parsed = parseInt(queryObj.RowLimit, 10)
        if (!Number.isNaN(parsed)) {
          queryObj.RowLimit = parsed
        }
      }

      if (typeof queryObj.StartRow === 'string') {
        const parsed = parseInt(queryObj.StartRow, 10)
        if (!Number.isNaN(parsed)) {
          queryObj.StartRow = parsed
        }
      }

      const rawSelectProperties = (queryObj as Record<string, unknown>).SelectProperties
      const normalizedSelectProperties =
        rawSelectProperties && typeof rawSelectProperties === 'object' && 'results' in (rawSelectProperties as Record<string, unknown>)
          ? (rawSelectProperties as { results?: unknown }).results
          : rawSelectProperties

      if (Array.isArray(normalizedSelectProperties)) {
        queryObj.SelectProperties = normalizedSelectProperties
          .filter((p): p is string => typeof p === 'string')
          .map((p) => p.trim())
          .filter((p) => p.length > 0)
      }

      const rawSortList = (queryObj as Record<string, unknown>).SortList
      const normalizedSortList =
        rawSortList && typeof rawSortList === 'object' && 'results' in (rawSortList as Record<string, unknown>)
          ? (rawSortList as { results?: unknown }).results
          : rawSortList

      if (Array.isArray(normalizedSortList)) {
        const mappedSortList = normalizedSortList
          .map((item) => {
            if (!item || typeof item !== 'object') {
              return undefined
            }

            const sortItem = item as Record<string, unknown>
            const property =
              (typeof sortItem.Property === 'string' && sortItem.Property) ||
              (typeof sortItem.property === 'string' && sortItem.property) ||
              (typeof sortItem.Field === 'string' && sortItem.Field) ||
              (typeof sortItem.field === 'string' && sortItem.field)

            const direction = normalizeDirection(sortItem.Direction ?? sortItem.direction)

            if (!property || direction === undefined) {
              return undefined
            }

            return {
              Property: property,
              Direction: direction,
            }
          })
          .filter((item): item is { Property: string; Direction: number } => Boolean(item))

        queryObj.SortList = mappedSortList.length ? mappedSortList : []
      }

      // Keep only keys that exist on current searchQuery shape, so non-query
      // fields like "explanation" never leak into Search payload state.
      const sanitizedQuery = Object.keys(searchQuery).reduce((acc, key) => {
        if (key in queryObj) {
          ;(acc as Record<string, unknown>)[key] = queryObj[key]
        }
        return acc
      }, {} as Partial<ISearchQuery>)

      updatedQuery = {
        ...searchQuery,
        ...sanitizedQuery,
      }
    } else {
      return null
    }

    return updatedQuery
  }, [searchQuery])

  const applyQuerySuggestion = useCallback((query: unknown) => {
    const updatedQuery = buildAppliedQuerySuggestion(query)
    if (!updatedQuery) {
      return
    }

    dispatch(setSearchQuery(updatedQuery))
  }, [buildAppliedQuerySuggestion, dispatch])

  const requestExecuteSearch = useCallback((query: ISearchQuery) => {
    window.dispatchEvent(
      new CustomEvent('sp-editor-execute-search', {
        detail: { query },
      })
    )
  }, [])

  const applyPnpjsSnippet = useCallback((code: string) => {
    if (typeof code !== 'string' || code.length === 0) {
      return
    }
    dispatch(setPnpjsCode(code))
    window.dispatchEvent(
      new CustomEvent('sp-editor-apply-pnpjs', {
        detail: { code, run: false },
      })
    )
  }, [dispatch])

  const applyGraphSdkSnippet = useCallback((code: string) => {
    if (typeof code !== 'string' || code.length === 0) {
      return
    }
    dispatch(setGraphSdkCode(code))
    window.dispatchEvent(
      new CustomEvent('sp-editor-apply-graphsdk', {
        detail: { code },
      })
    )
  }, [dispatch])

  const requestExecutePnpjs = useCallback((code: string) => {
    if (typeof code !== 'string' || code.length === 0) {
      return
    }
    dispatch(setPnpjsCode(code))
    window.dispatchEvent(
      new CustomEvent('sp-editor-apply-pnpjs', {
        detail: { code, run: true },
      })
    )
  }, [dispatch])

  const sendMessage = useCallback((text: string, displayOverride?: string) => {
    const trimmed = text.trim()
    if (!trimmed || isSending) {
      return
    }

    const userMessage: IAiMessage = {
      id: generateId(),
      role: 'user',
      content: displayOverride ?? trimmed,
      timestamp: Date.now(),
    }

    dispatch(addAiMessage(userMessage))
    dispatch(setAiError(null))
    dispatch(setAiSending(true))

    // Build the conversation sent to the model using the full prompt text,
    // not the (possibly shortened) display text — so the AI still sees the
    // logs even when the chat bubble shows "Analyzing output...".
    const promptMessage: IAiMessage = { ...userMessage, content: trimmed }
    const conversation = [...messages, promptMessage]
    let contextData: Record<string, any> = {}
    if (isSearchContext) {
      contextData = { searchQuery }
    } else if (isPnpjsContext) {
      contextData = { code: pnpjsCode || '' }
    } else if (isGraphSdkContext) {
      contextData = { code: graphSdkCode || '' }
    } else if (isSpShooterContext) {
      const siteUrl = spShooterContext?.webAbsoluteUrl || spShooterContext?.siteAbsoluteUrl || ''
      contextData = {
        path: spShooterPath || '',
        method: spShooterMethod || 'GET',
        headers: spShooterHeaders || '',
        body: spShooterBody || '',
        results: spShooterResults,
        siteUrl,
      }
    }

    // Add a streaming placeholder so text appears immediately
    const assistantId = generateId()
    const streamingPlaceholder: IAiMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
    }
    dispatch(addAiMessage(streamingPlaceholder))

    // Get or create the session UUID for this context, then mark it as initialised
    // before the async call so rapid follow-up messages are not treated as first.
    if (!sessionsByContextRef.current.has(pageContext)) {
      sessionsByContextRef.current.set(pageContext, generateId())
    }
    const contextSessionId = sessionsByContextRef.current.get(pageContext)!
    const isFirstMessage = !sentFirstForContextRef.current.has(pageContext)
    sentFirstForContextRef.current.add(pageContext)

    sendChatMessage({
      messages: conversation,
      pageContext,
      contextData,
      model: selectedModel,
      sessionId: contextSessionId,
      isFirstMessage,
      onChunk: ({ content, reasoning }) =>
        dispatch(updateAiMessage(assistantId, { content, reasoning, isStreaming: true })),
    })
      .then((res) => {
        const assistantContent = res.reply

        if (isSearchContext && res.query) {
          const effectiveQuery = buildAppliedQuerySuggestion(res.query) ?? res.query
          dispatch(updateAiMessage(assistantId, {
            content: assistantContent,
            isStreaming: false,
            tokenUsage: res.tokenUsage,
            suggestionData: {
              kind: 'search',
              query: effectiveQuery,
              explanation: res.explanation || '',
            },
          }))

          if (queryApplyMode === 'apply' || queryApplyMode === 'execute') {
            applyQuerySuggestion(effectiveQuery)
          }

          if (queryApplyMode === 'execute') {
            requestExecuteSearch(effectiveQuery as ISearchQuery)
          }
        } else if (isPnpjsContext && typeof res.code === 'string' && res.code.length > 0) {
          dispatch(updateAiMessage(assistantId, {
            content: assistantContent,
            isStreaming: false,
            tokenUsage: res.tokenUsage,
            suggestionData: {
              kind: 'pnpjs',
              code: res.code,
              explanation: res.explanation || '',
            },
          }))

          if (queryApplyMode === 'apply') {
            applyPnpjsSnippet(res.code)
          }
          // Note: Execute mode is intentionally not honored in the PnPjs
          // console because generated snippets can be destructive.
        } else if (isGraphSdkContext && typeof res.code === 'string' && res.code.length > 0) {
          dispatch(updateAiMessage(assistantId, {
            content: assistantContent,
            isStreaming: false,
            tokenUsage: res.tokenUsage,
            suggestionData: {
              kind: 'graphsdk',
              code: res.code,
              explanation: res.explanation || '',
            },
          }))

          if (queryApplyMode === 'apply') {
            applyGraphSdkSnippet(res.code)
          }
          // Execute mode is intentionally not honored — same reason as PnPjs.
        } else if (isSpShooterContext && res.restRequest) {
          // Replace {{SITE_URL}} placeholder with the real site URL if available
          const siteUrl = spShooterContext?.webAbsoluteUrl || spShooterContext?.siteAbsoluteUrl || ''
          const substituteSiteUrl = (s: string) =>
            siteUrl ? s.replaceAll('{{SITE_URL}}', siteUrl) : s

          const resolvedRequest = {
            ...res.restRequest,
            path: res.restRequest.path ? substituteSiteUrl(res.restRequest.path) : res.restRequest.path,
            body: typeof res.restRequest.body === 'string' ? substituteSiteUrl(res.restRequest.body) : res.restRequest.body,
          }
          const resolvedReply = siteUrl ? res.reply.replaceAll('{{SITE_URL}}', siteUrl) : res.reply

          dispatch(updateAiMessage(assistantId, {
            content: resolvedReply,
            isStreaming: false,
            tokenUsage: res.tokenUsage,
            suggestionData: {
              kind: 'spshooter',
              restRequest: resolvedRequest,
              explanation: res.explanation || '',
            },
          }))

          if (queryApplyMode === 'apply') {
            if (resolvedRequest.path) dispatch(setSpShooterPath(resolvedRequest.path))
            if (resolvedRequest.method) dispatch(setSpShooterMethod(resolvedRequest.method))
            if (typeof resolvedRequest.body === 'string') dispatch(setSpShooterBody(resolvedRequest.body))
            if (resolvedRequest.headers) dispatch(setSpShooterHeaders(JSON.stringify(resolvedRequest.headers, null, 2)))
          }
        } else {
          dispatch(updateAiMessage(assistantId, { content: assistantContent, isStreaming: false, tokenUsage: res.tokenUsage }))
        }

        // Always update tokens so the header pill reflects the latest balance,
        // not just when the balance is low.

      })
      .catch((err: any) => {
        const msg = err?.message ?? 'Failed to get response from AI assistant.'
        // Remove the streaming placeholder on error
        dispatch(updateAiMessage(assistantId, { content: '', isStreaming: false }))
        dispatch(setAiError(msg))
      })
      .then(() => {
        dispatch(setAiSending(false))
      })
  }, [
    isSending,
    messages,
    isSearchContext,
    isPnpjsContext,
    isSpShooterContext,
    isGraphSdkContext,
    searchQuery,
    pnpjsCode,
    graphSdkCode,
    spShooterPath,
    spShooterMethod,
    spShooterBody,
    spShooterHeaders,
    spShooterResults,
    spShooterContext,
    pageContext,
    queryApplyMode,
    selectedModel,
    applyQuerySuggestion,
    requestExecuteSearch,
    applyPnpjsSnippet,
    applyGraphSdkSnippet,
    requestExecutePnpjs,
    buildAppliedQuerySuggestion,
    dispatch,
  ])

  const handleSend = () => {
    if (!input.trim() || isSending) {
      return
    }
    trackAiPromptSubmit(pageContext ?? 'unknown')
    sendMessage(input)
    setInput('')
    setHistoryIndex(null)
    draftRef.current = ''
  }

  // Listen for programmatic AI-send requests (e.g. "Analyze with AI" button
  // in the PnPjs console output). Sends a message silently without polluting
  // the chat input box.
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string; display?: string }>).detail
      const message = detail?.message
      if (typeof message !== 'string' || !message.trim()) {
        return
      }
      dispatch(setAiPanelOpen(true))
      sendMessage(message, detail?.display)
    }
    window.addEventListener('sp-editor-ai-send', handler as EventListener)
    return () => {
      window.removeEventListener('sp-editor-ai-send', handler as EventListener)
    }
  }, [sendMessage, dispatch])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
      return
    }

    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      return
    }

    if (promptHistory.length === 0) {
      return
    }

    const target = event.target as HTMLTextAreaElement
    const caretAtStart = target.selectionStart === 0 && target.selectionEnd === 0
    const caretAtEnd =
      target.selectionStart === target.value.length && target.selectionEnd === target.value.length

    if (event.key === 'ArrowUp') {
      if (!caretAtStart) {
        return
      }

      event.preventDefault()
      if (historyIndex === null) {
        draftRef.current = input
        setHistoryIndex(0)
        setInput(promptHistory[0])
      } else if (historyIndex < promptHistory.length - 1) {
        const next = historyIndex + 1
        setHistoryIndex(next)
        setInput(promptHistory[next])
      }
      return
    }

    if (historyIndex === null || !caretAtEnd) {
      return
    }

    event.preventDefault()
    if (historyIndex > 0) {
      const next = historyIndex - 1
      setHistoryIndex(next)
      setInput(promptHistory[next])
    } else {
      setHistoryIndex(null)
      setInput(draftRef.current)
    }
  }

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragStartWidth(panelWidth)
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'col-resize'
  }

  useEffect(() => {
    if (!isDragging) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - dragStartX
      const newWidth = Math.max(300, Math.min(dragStartWidth - delta, window.innerWidth * 0.8))
      dispatch(setAiPanelWidth(newWidth))
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStartX, dragStartWidth, dispatch])

  const markdownComponents = useMemo(
    () => ({
      code({ inline, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            style={isDark ? oneDark : oneLight}
            language={match[1]}
            PreTag="div"
            wrapLines
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      },
      p({ children }: any) {
        return <p style={{ margin: '8px 0' }}>{children}</p>
      },
      ul({ children }: any) {
        return <ul style={{ margin: '8px 0 8px 20px' }}>{children}</ul>
      },
      ol({ children }: any) {
        return <ol style={{ margin: '8px 0 8px 20px' }}>{children}</ol>
      },
      li({ children }: any) {
        return <li style={{ margin: '4px 0' }}>{children}</li>
      },
      strong({ children }: any) {
        return <strong style={{ fontWeight: 600 }}>{children}</strong>
      },
      em({ children }: any) {
        return <em style={{ fontStyle: 'italic' }}>{children}</em>
      },
    }),
    [isDark]
  )

  const renderMessage = useCallback((m: IAiMessage) => {
    if (m.role === 'user') {
      return (
        <div key={m.id} className="ai-user-row">
          <div className="ai-user-bubble">{m.content}</div>
        </div>
      )
    }

    const hasReasoning = !!m.reasoning

    return (
      <div key={m.id} className="ai-assistant-row">
        <div className="ai-assistant-body">
          {/* Collapsible reasoning / thinking block */}
          {hasReasoning && (
            <details className="ai-thinking-block" open={m.isStreaming || undefined}>
              <summary className="ai-thinking-summary">
                {m.isStreaming && !m.content ? 'Thinking\u2026' : 'Reasoning'}
              </summary>
              <div className="ai-thinking-content">{m.reasoning}</div>
            </details>
          )}

          {/* Status label before first token arrives */}
          {m.isStreaming && !m.content && !m.reasoning && (
            <div className="ai-connecting-status">
              <span className="ai-thinking-text">Thinking</span>
            </div>
          )}

          {/* Message content — close any open code fence while streaming so
              SyntaxHighlighter renders partial blocks correctly */}
          {(() => {
            const TOKEN_MARKER = '\n\n%%SP_TOKENS%%'
            const markerIdx = m.isStreaming ? -1 : m.content.lastIndexOf(TOKEN_MARKER)
            const mainContent = markerIdx >= 0 ? m.content.slice(0, markerIdx) : m.content
            const tokenLine = markerIdx >= 0 ? m.content.slice(markerIdx + TOKEN_MARKER.length) : null
            return (
              <>
                {mainContent ? (
                  <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
                    {m.isStreaming ? closeOpenFence(mainContent) : mainContent}
                  </ReactMarkdown>
                ) : null}
                {!m.isStreaming && tokenLine && (
                  <div className="ai-token-usage-footer">{tokenLine}</div>
                )}
              </>
            )
          })()}

          {!m.isStreaming && queryApplyMode === 'manual' && m.suggestionData && (
            <div className="ai-inline-apply-row">
              {m.suggestionData.kind === 'search' && isSearchContext && (
                <DefaultButton
                  text="Apply Payload"
                  iconProps={{ iconName: 'CheckMark' }}
                  title="Apply this payload to the Search query editor"
                  onClick={() => {
                    const sd = m.suggestionData as Extract<AiSuggestionData, { kind: 'search' }>
                    applyQuerySuggestion(sd.query)
                  }}
                  styles={{
                    root: {
                      minHeight: 26,
                      height: 26,
                      borderRadius: 999,
                      border: `1px solid ${isDark ? 'rgba(14, 165, 233, 0.45)' : 'rgba(0, 120, 212, 0.45)'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.08)' : 'rgba(0, 120, 212, 0.08)',
                      paddingLeft: 10,
                      paddingRight: 10,
                    },
                    rootHovered: {
                      border: `1px solid ${isDark ? '#38bdf8' : '#0078d4'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.18)' : 'rgba(0, 120, 212, 0.16)',
                    },
                    rootPressed: {
                      border: `1px solid ${isDark ? '#0ea5e9' : '#0063b1'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.26)' : 'rgba(0, 120, 212, 0.24)',
                    },
                    icon: {
                      fontSize: 10,
                      color: isDark ? '#38bdf8' : '#0078d4',
                    },
                    label: {
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.2px',
                      color: isDark ? '#e5e7eb' : '#1f2937',
                    },
                  }}
                />
              )}
              {m.suggestionData.kind === 'pnpjs' && isPnpjsContext && (
                <DefaultButton
                  text="Apply Code"
                  iconProps={{ iconName: 'CheckMark' }}
                  title="Replace PnPjs editor content with this snippet"
                  onClick={() => {
                    const sd = m.suggestionData as Extract<AiSuggestionData, { kind: 'pnpjs' }>
                    applyPnpjsSnippet(sd.code)
                  }}
                  styles={{
                    root: {
                      minHeight: 26,
                      height: 26,
                      borderRadius: 999,
                      border: `1px solid ${isDark ? 'rgba(14, 165, 233, 0.45)' : 'rgba(0, 120, 212, 0.45)'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.08)' : 'rgba(0, 120, 212, 0.08)',
                      paddingLeft: 10,
                      paddingRight: 10,
                    },
                    rootHovered: {
                      border: `1px solid ${isDark ? '#38bdf8' : '#0078d4'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.18)' : 'rgba(0, 120, 212, 0.16)',
                    },
                    rootPressed: {
                      border: `1px solid ${isDark ? '#0ea5e9' : '#0063b1'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.26)' : 'rgba(0, 120, 212, 0.24)',
                    },
                    icon: {
                      fontSize: 10,
                      color: isDark ? '#38bdf8' : '#0078d4',
                    },
                    label: {
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.2px',
                      color: isDark ? '#e5e7eb' : '#1f2937',
                    },
                  }}
                />
              )}
              {m.suggestionData.kind === 'graphsdk' && isGraphSdkContext && (
                <DefaultButton
                  text="Apply Code"
                  iconProps={{ iconName: 'CheckMark' }}
                  title="Replace Graph SDK editor content with this snippet"
                  onClick={() => {
                    const sd = m.suggestionData as Extract<AiSuggestionData, { kind: 'graphsdk' }>
                    applyGraphSdkSnippet(sd.code)
                  }}
                  styles={{
                    root: {
                      minHeight: 26,
                      height: 26,
                      borderRadius: 999,
                      border: `1px solid ${isDark ? 'rgba(14, 165, 233, 0.45)' : 'rgba(0, 120, 212, 0.45)'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.08)' : 'rgba(0, 120, 212, 0.08)',
                      paddingLeft: 10,
                      paddingRight: 10,
                    },
                    rootHovered: {
                      border: `1px solid ${isDark ? '#38bdf8' : '#0078d4'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.18)' : 'rgba(0, 120, 212, 0.16)',
                    },
                    rootPressed: {
                      border: `1px solid ${isDark ? '#0ea5e9' : '#0063b1'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.26)' : 'rgba(0, 120, 212, 0.24)',
                    },
                    icon: {
                      fontSize: 10,
                      color: isDark ? '#38bdf8' : '#0078d4',
                    },
                    label: {
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.2px',
                      color: isDark ? '#e5e7eb' : '#1f2937',
                    },
                  }}
                />
              )}
              {m.suggestionData.kind === 'spshooter' && isSpShooterContext && (
                <DefaultButton
                  text="Apply to SP Shooter"
                  iconProps={{ iconName: 'CheckMark' }}
                  title="Apply this request to the SP Shooter fields"
                  onClick={() => {
                    const sd = m.suggestionData as Extract<AiSuggestionData, { kind: 'spshooter' }>
                    const r = sd.restRequest
                    const siteUrl = spShooterContext?.webAbsoluteUrl || spShooterContext?.siteAbsoluteUrl || ''
                    const sub = (s: string) => siteUrl ? s.replaceAll('{{SITE_URL}}', siteUrl) : s
                    if (r.path) dispatch(setSpShooterPath(sub(r.path)))
                    if (r.method) dispatch(setSpShooterMethod(r.method))
                    if (typeof r.body === 'string') dispatch(setSpShooterBody(sub(r.body)))
                    if (r.headers) dispatch(setSpShooterHeaders(JSON.stringify(r.headers, null, 2)))
                  }}
                  styles={{
                    root: {
                      minHeight: 26,
                      height: 26,
                      borderRadius: 999,
                      border: `1px solid ${isDark ? 'rgba(14, 165, 233, 0.45)' : 'rgba(0, 120, 212, 0.45)'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.08)' : 'rgba(0, 120, 212, 0.08)',
                      paddingLeft: 10,
                      paddingRight: 10,
                    },
                    rootHovered: {
                      border: `1px solid ${isDark ? '#38bdf8' : '#0078d4'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.18)' : 'rgba(0, 120, 212, 0.16)',
                    },
                    rootPressed: {
                      border: `1px solid ${isDark ? '#0ea5e9' : '#0063b1'}`,
                      background: isDark ? 'rgba(14, 165, 233, 0.26)' : 'rgba(0, 120, 212, 0.24)',
                    },
                    icon: {
                      fontSize: 10,
                      color: isDark ? '#38bdf8' : '#0078d4',
                    },
                    label: {
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.2px',
                      color: isDark ? '#e5e7eb' : '#1f2937',
                    },
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    )
  }, [applyQuerySuggestion, applyPnpjsSnippet, applyGraphSdkSnippet, dispatch, isDark, isSearchContext, isPnpjsContext, isGraphSdkContext, isSpShooterContext, spShooterContext, markdownComponents, queryApplyMode, requestExecuteSearch, setSpShooterBody, setSpShooterHeaders, setSpShooterMethod, setSpShooterPath])

  const renderedMessages = useMemo(() => messages.map(renderMessage), [messages, renderMessage])

  return createPortal(
    <aside
      className={`ai-drawer${isOpen ? ' is-open' : ''}${isDragging ? ' is-dragging' : ''}`}
      data-theme={isDark ? 'dark' : 'light'}
      style={{ width: `${panelWidth}px` } as React.CSSProperties}
      aria-hidden={!isOpen}
      aria-label="AI Assistant"
    >
      <div className="ai-resize-handle" onMouseDown={handleDragStart} title="Drag to resize panel" />

      <div className="ai-drawer-header">
        <span>AI Assistant</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {!isReady && (
            <button
              type="button"
              className={`ai-status-dot-btn${bridgeStatus === 'checking' ? ' is-pulsing' : ''}`}
              style={{ background: BRIDGE_STATUS_COLOR[bridgeStatus] ?? '#888' }}
              onClick={() => dispatch(checkBridgeStatus() as any)}
              disabled={bridgeStatus === 'checking'}
              title={`Copilot: ${BRIDGE_STATUS_LABEL[bridgeStatus] ?? bridgeStatus} — click to recheck`}
              aria-label="Recheck Copilot status"
            />
          )}
          {isReady && (
            <IconButton
              iconProps={{ iconName: 'Settings' }}
              title="Bridge settings"
              ariaLabel="Bridge settings"
              onClick={() => setShowSettings(s => !s)}
            />
          )}
          <IconButton
            iconProps={{ iconName: 'Cancel' }}
            title="Close"
            ariaLabel="Close AI Assistant"
            onClick={() => dispatch(setAiPanelOpen(false))}
          />
        </div>
      </div>

      <Panel
        isOpen={showSettings}
        onDismiss={() => setShowSettings(false)}
        type={PanelType.smallFixedFar}
        headerText="AI Assistant settings"
        isLightDismiss
      >
        <Stack tokens={{ childrenGap: 24 }}>

          <Stack tokens={{ childrenGap: 8 }}>
            <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>About</Text>
            <Text variant="small">The AI Assistant uses GitHub Copilot to answer questions, generate code, and help you work with SharePoint — directly in context of the current page.</Text>
            <Text variant="small">A small local bridge connects the extension to the Copilot CLI on your machine. A GitHub account with an active Copilot subscription is required.</Text>
          </Stack>

          <Stack tokens={{ childrenGap: 6 }}>
            <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>FAQ</Text>
            {[
              { q: 'Do I need a paid GitHub plan?', a: 'Yes — GitHub Copilot requires an active Copilot subscription (Individual, Business, or Enterprise).' },
              { q: 'Is my data sent to the cloud?', a: 'Prompts are sent to GitHub Copilot\'s servers for processing, the same as using Copilot in VS Code. No data is stored by SP Editor itself.' },
              { q: 'What can the assistant see?', a: 'Only the content of the current page context — your code, query, or API request — is included in the prompt. Nothing else from your browser or SharePoint tenant is sent.' },
              { q: 'Why is a bridge needed?', a: 'Browser extensions cannot run local processes directly. The bridge is a small background helper that connects the extension to the Copilot CLI installed on your machine.' },
            ].map(({ q, a }, i) => (
              <Stack
                key={q}
                tokens={{ childrenGap: 4 }}
                styles={{ root: { borderRadius: 6, padding: '6px 10px', background: 'rgba(128,128,128,0.07)', cursor: 'pointer' } }}
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
              >
                <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
                  <Text variant="small" styles={{ root: { fontWeight: 600, flexGrow: 1 } }}>{q}</Text>
                  <Text variant="small" styles={{ root: { opacity: 0.5 } }}>{openFaqIndex === i ? '−' : '+'}</Text>
                </Stack>
                {openFaqIndex === i && (
                  <Text variant="small" styles={{ root: { opacity: 0.75, lineHeight: '1.5' } }}>{a}</Text>
                )}
              </Stack>
            ))}
          </Stack>

          <Stack tokens={{ childrenGap: 8 }}>
            <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>Bridge management</Text>
            {[
              { label: 'Update', cmd: 'npm install -g @sp-editor/native-bridge@latest' },
              { label: 'Uninstall bridge', cmd: 'sp-editor-bridge uninstall' },
              { label: 'Remove package', cmd: 'npm uninstall -g @sp-editor/native-bridge' },
            ].map(({ label, cmd }) => (
              <Stack key={label} tokens={{ childrenGap: 4 }}>
                <Text variant="smallPlus" styles={{ root: { fontWeight: 600, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' } }}>{label}</Text>
                <Text variant="small" styles={{ root: { fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', background: 'rgba(128,128,128,0.12)', padding: '6px 10px', borderRadius: 4, wordBreak: 'break-all' } }}>{cmd}</Text>
              </Stack>
            ))}
          </Stack>

        </Stack>
      </Panel>

      <div className="ai-drawer-content" style={{ position: 'relative' }}>

        {!isReady && (
          <div className="ai-setup-state">
            <div className="ai-setup-title">GitHub Copilot</div>

            <p className="ai-setup-description">
              The AI Assistant uses GitHub Copilot to answer questions, generate code, and help you work with SharePoint — directly in context of the current page.
            </p>

            <p className="ai-setup-description">
              A small local bridge connects the extension to the Copilot CLI on your machine. A GitHub account with Copilot access is required.
            </p>

            <div className="ai-setup-status-row">
              <span
                className={`ai-setup-dot${bridgeStatus === 'checking' ? ' is-pulsing' : ''}`}
                style={{ background: BRIDGE_STATUS_COLOR[bridgeStatus] ?? '#888' }}
              />
              <span className="ai-setup-status-text">
                {BRIDGE_STATUS_LABEL[bridgeStatus] ?? bridgeStatus}
              </span>
              {bridgeStatus !== 'checking' && (
                <button
                  type="button"
                  className="ai-setup-retry-btn"
                  onClick={() => dispatch(checkBridgeStatus() as any)}
                  title="Recheck status"
                  aria-label="Recheck Copilot status"
                >
                  ↻
                </button>
              )}
            </div>

            {bridgeStatus === 'bridge_missing' && (
              <>
                <div className="ai-setup-instruction">
                  <span className="ai-setup-instruction-label">1. Install bridge</span>
                  <code className="ai-setup-code">npm install -g @sp-editor/native-bridge</code>
                </div>
                <p className="ai-setup-step-hint">Run in a terminal. Requires Node.js and npm.</p>

                <div className="ai-setup-instruction">
                  <span className="ai-setup-instruction-label">2. Register bridge</span>
                  <code className="ai-setup-code">sp-editor-bridge install</code>
                </div>
                <p className="ai-setup-step-hint">Registers the bridge with Chrome and Edge so the extension can connect to it.</p>

                <div className="ai-setup-instruction">
                  <span className="ai-setup-instruction-label">3. Install CLI</span>
                  <code className="ai-setup-code">npm install -g @github/copilot</code>
                </div>
                <p className="ai-setup-step-hint">Installs the standalone GitHub Copilot CLI used to send prompts.</p>

                <div className="ai-setup-instruction">
                  <span className="ai-setup-instruction-label">4. Sign in</span>
                  <code className="ai-setup-code">copilot login</code>
                </div>
                <p className="ai-setup-step-hint">Opens a browser to authenticate with your GitHub account. Come back here and click ↻ when done.</p>
              </>
            )}

            {bridgeStatus === 'cli_missing' && (
              <>
                <div className="ai-setup-instruction">
                  <span className="ai-setup-instruction-label">Install CLI</span>
                  <code className="ai-setup-code">npm install -g @github/copilot</code>
                </div>
                <p className="ai-setup-step-hint">Installs the standalone GitHub Copilot CLI. Then click ↻ to recheck.</p>
              </>
            )}

            {bridgeStatus === 'not_authenticated' && (
              <>
                <div className="ai-setup-instruction">
                  <span className="ai-setup-instruction-label">Sign in</span>
                  <code className="ai-setup-code">copilot login</code>
                </div>
                <p className="ai-setup-step-hint">Opens a browser to authenticate with GitHub. Once signed in, click ↻ to recheck.</p>
              </>
            )}

            <div className="ai-setup-faq">
              <details className="ai-setup-faq-item">
                <summary>Do I need a paid GitHub plan?</summary>
                <p>Yes — GitHub Copilot requires an active Copilot subscription (Individual, Business, or Enterprise).</p>
              </details>
              <details className="ai-setup-faq-item">
                <summary>Is my data sent to the cloud?</summary>
                <p>Prompts are sent to GitHub Copilot's servers for processing, the same as using Copilot in VS Code. No data is stored by SP Editor itself.</p>
              </details>
              <details className="ai-setup-faq-item">
                <summary>What can the assistant see?</summary>
                <p>Only the content of the current page context — your code, query, or API request — is included in the prompt. Nothing else from your browser or SharePoint tenant is sent.</p>
              </details>
              <details className="ai-setup-faq-item">
                <summary>Why is a bridge needed?</summary>
                <p>Browser extensions cannot run local processes directly. The bridge is a small background helper that connects the extension to the Copilot CLI installed on your machine.</p>
              </details>
            </div>
          </div>
        )}

        {isReady && (
          <>
            <div
              className="ai-message-list"
              ref={messageListRef}
              onScroll={() => {
                const el = messageListRef.current
                if (!el) return
                userScrolledUpRef.current = el.scrollHeight - el.scrollTop - el.clientHeight > 60
              }}
            >
              {messages.length === 0 && !isSending ? (
                <div className="ai-empty-state">
                  <div className="ai-empty-state-intro">
                    Ask anything about the current page. The assistant has full context of what you see.
                  </div>
                  <ul className="ai-empty-state-hints">
                    <li>Generate or explain PnP JS / Graph SDK code</li>
                    <li>Build and refine search queries</li>
                    <li>Troubleshoot REST API calls</li>
                    <li>Explain SharePoint features or permissions</li>
                  </ul>
                  <div className="ai-empty-state-context">
                    Current page context: <strong>{pageContext}</strong>
                  </div>
                </div>
              ) : (
                renderedMessages
              )}

              {isSending && !messages.some((m) => m.isStreaming) && (
                <div className="ai-thinking">
                  <span className="ai-thinking-text">Thinking</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {error && (
              <MessageBar
                messageBarType={MessageBarType.error}
                onDismiss={() => dispatch(setAiError(null))}
                dismissButtonAriaLabel="Dismiss error"
              >
                {error}
              </MessageBar>
            )}

            <div className="ai-input-row">
              <div className={`ai-input-box-wrapper${isSending ? ' ai-input-box-wrapper--sending' : ''}`}>
              <TextField
                placeholder="Ask anything... (Shift+Enter for new line, ↑/↓ for history)"
                value={input}
                onChange={(_e, newValue) => {
                  setInput(newValue || '')
                  if (historyIndex !== null) {
                    setHistoryIndex(null)
                    draftRef.current = newValue || ''
                  }
                }}
                onKeyDown={handleKeyDown}
                multiline
                autoAdjustHeight
                rows={3}
                resizable={false}
                disabled={isSending}
                styles={isSending
                  ? { fieldGroup: { borderColor: 'transparent', '::after': { border: 'none' } } }
                  : undefined
                }
                errorMessage={
                  input.length > MAX_PROMPT_CHARS
                    ? `Prompt too long: ${input.length} / ${MAX_PROMPT_CHARS} characters.`
                    : undefined
                }
              />
              </div>

              <div className="ai-input-actions">
                <div className="ai-input-meta">
                  <div
                    className="ai-context-badge"
                    title="Current feature context used for AI routing"
                  >
                    <span className="ai-context-value">{pageContextLabel}</span>
                  </div>

                  <Dropdown
                    className="ai-model-picker"
                    options={COPILOT_CLI_MODELS.map((m) => ({ key: m.key, text: m.text }))}
                    selectedKey={selectedModel}
                    onChange={(_e, option) => {
                      if (option) dispatch(setSelectedModel(String(option.key)))
                    }}
                    onRenderTitle={(options) => {
                      const opt = options?.[0]
                      if (!opt) return null
                      const short = String(opt.text)
                        .replace(/\s*\([^)]*\)/g, '')
                        .replace(/^Claude\s+/i, '')
                        .trim()
                      return <span>{short}</span>
                    }}
                    disabled={false}
                    calloutProps={{ calloutWidth: 260 }}
                    styles={{
                      root: { width: 110, flexShrink: 0 },
                      dropdown: {
                        minHeight: 28,
                        border: 'none',
                        background: 'transparent',
                      },
                      title: {
                        border: 'none',
                        background: 'transparent',
                        fontSize: 12,
                        lineHeight: 28,
                        minHeight: 28,
                        paddingLeft: 6,
                        paddingRight: 18,
                      },
                      caretDownWrapper: { lineHeight: 28, height: 28 },
                      caretDown: { fontSize: 10 },
                    }}
                    title={`Model: ${selectedModel}`}
                    ariaLabel="AI model"
                  />

                  {input.length > MAX_PROMPT_CHARS * 0.75 && (
                    <div
                      className="ai-context-badge"
                      title="Prompt character count"
                      style={{
                        color: input.length > MAX_PROMPT_CHARS ? '#a4262c' : undefined,
                      }}
                    >
                      <span className="ai-context-value">
                        {input.length} / {MAX_PROMPT_CHARS}
                      </span>
                    </div>
                  )}

                  {supportsApplyMode && (
                    <Dropdown
                      className="ai-apply-mode-dropdown"
                      options={(isPnpjsContext || isGraphSdkContext) ? PNPJS_APPLY_OPTIONS : QUERY_APPLY_OPTIONS}
                      selectedKey={queryApplyMode}
                      onChange={(_e, option) => {
                        if (option) {
                          dispatch(setAiQueryApplyMode(option.key as AiQueryApplyMode))
                        }
                      }}
                      styles={{
                        root: { width: 86 },
                        dropdown: {
                          minHeight: 28,
                          border: 'none',
                          background: 'transparent',
                        },
                        title: {
                          border: 'none',
                          background: 'transparent',
                          fontSize: 12,
                          lineHeight: 28,
                          minHeight: 28,
                          paddingLeft: 4,
                          paddingRight: 4,
                        },
                        caretDownWrapper: {
                          display: 'none',
                        },
                      }}
                      title={getApplyModeTooltip(queryApplyMode, isPnpjsContext || isGraphSdkContext)}
                      ariaLabel="Payload apply mode"
                    />
                  )}
                </div>

                <IconButton
                  iconProps={{ iconName: 'Send' }}
                  title="Send prompt to AI assistant"
                  ariaLabel="Send prompt to AI assistant"
                  onClick={handleSend}
                  disabled={isSending || input.trim().length === 0 || input.length > MAX_PROMPT_CHARS}
                  styles={{
                    root: { height: 32, width: 32 },
                    icon: { fontSize: 16 },
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </aside>,
    document.body
  )
}

export default AiAssistantPanel
