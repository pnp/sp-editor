import {
  IconButton,
  MessageBar,
  MessageBarType,
  TextField,
} from '@fluentui/react'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { IRootState } from '../../store'
import {
  addAiMessage,
  setAiError,
  setAiPanelOpen,
  setAiSending,
} from '../../store/ai-assistant/actions'
import { IAiMessage } from '../../store/ai-assistant/types'
import { sendChatMessage } from '../../services/ai-assistant/aiAssistantService'
import './aiAssistantPanel.css'

const BODY_OPEN_CLASS = 'ai-panel-open'
const AI_PANEL_WIDTH = 380

const generateId = (): string => {
  const cryptoRef = (globalThis as { crypto?: Crypto & { randomUUID?: () => string } })
    .crypto
  if (cryptoRef?.randomUUID) {
    return cryptoRef.randomUUID()
  }
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10)
}

const derivePageContext = (pathname: string): string => {
  if (!pathname || pathname === '/' || pathname === '/index.html') {
    return 'home'
  }
  const cleaned = pathname.replace(/^\/+/, '').replace(/\/+$/, '')
  return cleaned || 'home'
}

const AiAssistantPanel = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { isOpen, messages, isSending, error } = useSelector(
    (state: IRootState) => state.aiAssistant
  )
  const { isDark } = useSelector((state: IRootState) => state.home)

  const [input, setInput] = useState('')
  // Index into the user-prompt history while navigating with Up/Down arrows.
  // null = not navigating (input reflects whatever the user has typed).
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  // Snapshot of the in-progress draft so Down-past-the-end can restore it.
  const draftRef = useRef<string>('')
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const pageContext = derivePageContext(location.pathname)

  // Most-recent-first list of unique user prompts.
  const promptHistory = React.useMemo(() => {
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
    body.style.setProperty('--ai-panel-width', `${AI_PANEL_WIDTH}px`)
    if (isOpen) {
      body.classList.add(BODY_OPEN_CLASS)
    } else {
      body.classList.remove(BODY_OPEN_CLASS)
    }
    return () => {
      body.classList.remove(BODY_OPEN_CLASS)
    }
  }, [isOpen])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isSending])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || isSending) {
      return
    }

    const userMessage: IAiMessage = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    }

    dispatch(addAiMessage(userMessage))
    dispatch(setAiError(null))
    dispatch(setAiSending(true))
    setInput('')
    setHistoryIndex(null)
    draftRef.current = ''

    const conversation = [...messages, userMessage]

    sendChatMessage({ messages: conversation, pageContext })
      .then((res) => {
        dispatch(
          addAiMessage({
            id: generateId(),
            role: 'assistant',
            content: res.reply,
            timestamp: Date.now(),
          })
        )
      })
      .catch((err: any) => {
        const msg = err?.message ?? 'Failed to get response from AI assistant.'
        dispatch(setAiError(msg))
      })
      .then(() => {
        dispatch(setAiSending(false))
      })
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    const caretAtStart =
      target.selectionStart === 0 && target.selectionEnd === 0
    const caretAtEnd =
      target.selectionStart === target.value.length &&
      target.selectionEnd === target.value.length

    if (event.key === 'ArrowUp') {
      // Only hijack ArrowUp when caret is at the start of the field, so
      // multi-line editing still works as expected.
      if (!caretAtStart) return
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

    if (event.key === 'ArrowDown') {
      if (historyIndex === null) return
      if (!caretAtEnd) return
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
  }

  const renderMessage = (m: IAiMessage) => {
    if (m.role === 'user') {
      return (
        <div key={m.id} className="ai-user-row">
          <div className="ai-user-bubble">{m.content}</div>
        </div>
      )
    }
    return (
      <div key={m.id} className="ai-assistant-row">
        <div className="ai-assistant-header">
          <span role="img" aria-label="assistant">✨</span>
          <span>Assistant</span>
        </div>
        <div className="ai-assistant-body">{m.content}</div>
      </div>
    )
  }

  return createPortal(
    <aside
      className={`ai-drawer${isOpen ? ' is-open' : ''}`}
      data-theme={isDark ? 'dark' : 'light'}
      aria-hidden={!isOpen}
      aria-label="AI Assistant"
    >
      <div className="ai-drawer-header">
        <span>AI Assistant</span>
        <IconButton
          iconProps={{ iconName: 'Cancel' }}
          title="Close"
          ariaLabel="Close AI Assistant"
          onClick={() => dispatch(setAiPanelOpen(false))}
        />
      </div>

      <div className="ai-drawer-content">
        <div className="ai-message-list">
          {messages.length === 0 && !isSending ? (
            <div className="ai-empty-state">
              <div>
                Ask the assistant to help build a search query, explain a
                feature, or generate code snippets for the current page.
              </div>
              <div style={{ marginTop: 12 }}>
                <em>
                  Current page context: <strong>{pageContext}</strong>
                </em>
              </div>
            </div>
          ) : (
            messages.map(renderMessage)
          )}
          {isSending && <div className="ai-thinking">Assistant is thinking…</div>}
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
            placeholder="Ask anything… (Shift+Enter for new line, ↑/↓ for history)"
            value={input}
            onChange={(_e, newValue) => {
              setInput(newValue || '')
              if (historyIndex !== null) {
                // User started editing the recalled prompt — leave history mode.
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
            <IconButton
              iconProps={{ iconName: 'Send' }}
              title="Send"
              ariaLabel="Send message"
              onClick={handleSend}
              disabled={isSending || input.trim().length === 0}
              styles={{
                root: { height: 32, width: 32 },
                icon: { fontSize: 16 },
              }}
            />
          </div>
        </div>
      </div>
    </aside>,
    document.body
  )
}

export default AiAssistantPanel
