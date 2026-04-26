import {
  DefaultButton,
  Dropdown,
  IconButton,
  IDropdownOption,
  Link,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  TextField,
} from '@fluentui/react'
import { ISearchQuery } from '@pnp/sp/search/types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { getContextDisplayName, getContextKeyFromPath } from '../../config/featureContext'
import { sendChatMessage } from '../../services/ai-assistant/aiAssistantService'
import { IRootState } from '../../store'
import {
  addAiMessage,
  setAiError,
  setAiPanelOpen,
  setAiPanelWidth,
  setAiPendingInput,
  setAiQueryApplyMode,
  setAiSending,
} from '../../store/ai-assistant/actions'
import { IAiMessage, AiQueryApplyMode, AiSuggestionData } from '../../store/ai-assistant/types'
import { setSearchQuery } from '../../store/search/actions'
import { setCode as setPnpjsCode } from '../../store/pnpjsconsole/actions'
import SignInModal from './SignInModal'
import './aiAssistantPanel.css'

const BODY_OPEN_CLASS = 'ai-panel-open'

const QUERY_APPLY_OPTIONS: IDropdownOption[] = [
  { key: 'manual', text: 'Manual' },
  { key: 'apply', text: 'Apply' },
  { key: 'execute', text: 'Execute' },
]

const LOW_TOKEN_THRESHOLD = 50

const getApplyModeTooltip = (mode: AiQueryApplyMode, isPnpjs: boolean): string => {
  if (isPnpjs) {
    if (mode === 'apply') {
      return 'Apply: insert generated code into the editor automatically.'
    }
    if (mode === 'execute') {
      return 'Execute: insert code and run it automatically.'
    }
    return 'Manual: review the code and click Apply Code under the response.'
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

const AiAssistantPanel = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { isOpen, messages, isSending, error, panelWidth, queryApplyMode, pendingInput } = useSelector(
    (state: IRootState) => state.aiAssistant
  )
  const { isDark } = useSelector((state: IRootState) => state.home)
  const { isAuthenticated, apiKey, error: authError, loading: authLoading } = useSelector(
    (state: IRootState) => state.aiAssistantAuth
  )
  const { searchQuery } = useSelector((state: IRootState) => state.search)
  const { code: pnpjsCode } = useSelector((state: IRootState) => state.pnpjsconsole)

  const [input, setInput] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartWidth, setDragStartWidth] = useState(0)
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [lowTokenWarning, setLowTokenWarning] = useState<string | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const draftRef = useRef<string>('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (pendingInput) {
      setInput((prev) => (prev ? `${prev}\n${pendingInput}` : pendingInput))
      dispatch(setAiPendingInput(null))
    }
  }, [pendingInput, dispatch])

  const pageContext = getContextKeyFromPath(location.pathname)
  const pageContextLabel = getContextDisplayName(pageContext)
  const isSearchContext = pageContext === 'search'
  const isPnpjsContext = pageContext === 'pnpjsconsole'
  const supportsApplyMode = isSearchContext || isPnpjsContext

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
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
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
    }

    sendChatMessage({
      messages: conversation,
      pageContext,
      apiKey: apiKey || '',
      contextData,
    })
      .then((res) => {
        let assistantContent = res.explanation || res.reply
        const assistantMessage: IAiMessage = {
          id: generateId(),
          role: 'assistant',
          content: assistantContent,
          timestamp: Date.now(),
        }

        if (isSearchContext && res.query) {
          const effectiveQuery = buildAppliedQuerySuggestion(res.query) ?? res.query
          const payloadMarkdown = `\n\nPayload:\n\`\`\`json\n${JSON.stringify(
            effectiveQuery,
            null,
            2
          )}\n\`\`\``
          assistantContent = `${res.explanation || 'Generated search payload.'}${payloadMarkdown}`
          assistantMessage.content = assistantContent

          assistantMessage.suggestionData = {
            kind: 'search',
            query: effectiveQuery,
            explanation: res.explanation || '',
          }

          if (queryApplyMode === 'apply' || queryApplyMode === 'execute') {
            applyQuerySuggestion(effectiveQuery)
          }

          if (queryApplyMode === 'execute') {
            requestExecuteSearch(effectiveQuery as ISearchQuery)
          }
        } else if (isPnpjsContext && typeof res.code === 'string' && res.code.length > 0) {
          const snippetMarkdown = `\n\n\`\`\`ts\n${res.code}\n\`\`\``
          assistantContent = `${res.explanation || 'Generated PnPjs snippet.'}${snippetMarkdown}`
          assistantMessage.content = assistantContent

          assistantMessage.suggestionData = {
            kind: 'pnpjs',
            code: res.code,
            explanation: res.explanation || '',
          }

          if (queryApplyMode === 'apply') {
            applyPnpjsSnippet(res.code)
          } else if (queryApplyMode === 'execute') {
            requestExecutePnpjs(res.code)
          }
        }

        dispatch(addAiMessage(assistantMessage))

        if (typeof res.tokensRemaining === 'number' && res.tokensRemaining <= LOW_TOKEN_THRESHOLD) {
          const tierText = res.tier ? ` (${res.tier})` : ''
          setLowTokenWarning(
            `Low token balance${tierText}: ${res.tokensRemaining} remaining${
              typeof res.tokensUsed === 'number' ? `, ${res.tokensUsed} used in this request` : ''
            }.`
          )
        } else {
          setLowTokenWarning(null)
        }
      })
      .catch((err: any) => {
        const msg = err?.message ?? 'Failed to get response from AI assistant.'
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
    searchQuery,
    pnpjsCode,
    pageContext,
    apiKey,
    queryApplyMode,
    applyQuerySuggestion,
    requestExecuteSearch,
    applyPnpjsSnippet,
    requestExecutePnpjs,
    buildAppliedQuerySuggestion,
    dispatch,
  ])

  const handleSend = () => {
    if (!input.trim() || isSending) {
      return
    }
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

    return (
      <div key={m.id} className="ai-assistant-row">
        <div className="ai-assistant-body">
          <ReactMarkdown components={markdownComponents}>
            {m.content}
          </ReactMarkdown>

          {queryApplyMode === 'manual' && m.suggestionData && (
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
            </div>
          )}
        </div>
      </div>
    )
  }, [applyQuerySuggestion, applyPnpjsSnippet, isDark, isSearchContext, isPnpjsContext, markdownComponents, queryApplyMode, requestExecuteSearch])

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
          {isAuthenticated && (
            <IconButton
              iconProps={{ iconName: 'Settings' }}
              title="Manage AI access"
              ariaLabel="Manage AI access"
              onClick={() => setAuthModalOpen(true)}
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

      <div className="ai-drawer-content" style={{ position: 'relative' }}>
        <SignInModal
          isOpen={authModalOpen}
          error={authError}
          loading={authLoading}
          isSignedIn={isAuthenticated}
          currentApiKey={apiKey}
          onClose={() => setAuthModalOpen(false)}
        />

        {!isAuthenticated && (
          <div className="ai-empty-state">
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
              AI assistant is not configured
            </div>
            <div style={{ marginBottom: 16, maxWidth: 320 }}>
              Add your API key to start chatting. You can get one by registering on{' '}
              <Link
                href={process.env.REACT_APP_AI_BACKEND_URL || 'http://localhost:5221'}
                target="_blank"
                rel="noopener noreferrer"
              >
                the account website
              </Link>{' '}
              and choosing a plan.
            </div>
            <PrimaryButton text="Set up AI access" onClick={() => setAuthModalOpen(true)} />
          </div>
        )}

        {isAuthenticated && (
          <>
            <div className="ai-message-list">
              {messages.length === 0 && !isSending ? (
                <div className="ai-empty-state">
                  <div>
                    Ask the assistant to help build a search query, explain a feature, or generate code snippets for
                    the current page.
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <em>
                      Current page context: <strong>{pageContext}</strong>
                    </em>
                  </div>
                </div>
              ) : (
                renderedMessages
              )}

              {isSending && (
                <div className="ai-thinking">
                  <span className="ai-thinking-text">Assistant is thinking</span>
                  <span className="ai-thinking-dots"></span>
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
              />

              <div className="ai-input-actions">
                <div className="ai-input-meta">
                  <div
                    className="ai-context-badge"
                    title="Current feature context used for AI routing"
                  >
                    <span className="ai-context-value">{pageContextLabel}</span>
                  </div>

                  {supportsApplyMode && (
                    <Dropdown
                      className="ai-apply-mode-dropdown"
                      options={QUERY_APPLY_OPTIONS}
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
                      title={getApplyModeTooltip(queryApplyMode, isPnpjsContext)}
                      ariaLabel="Payload apply mode"
                    />
                  )}
                </div>

                <IconButton
                  iconProps={{ iconName: 'Send' }}
                  title="Send prompt to AI assistant"
                  ariaLabel="Send prompt to AI assistant"
                  onClick={handleSend}
                  disabled={isSending || input.trim().length === 0}
                  styles={{
                    root: { height: 32, width: 32 },
                    icon: { fontSize: 16 },
                  }}
                />
              </div>

              {lowTokenWarning && (
                <MessageBar
                  messageBarType={MessageBarType.warning}
                  onDismiss={() => setLowTokenWarning(null)}
                  dismissButtonAriaLabel="Dismiss token warning"
                  styles={{ root: { marginTop: 6 } }}
                >
                  {lowTokenWarning}
                </MessageBar>
              )}
            </div>
          </>
        )}
      </div>
    </aside>,
    document.body
  )
}

export default AiAssistantPanel
