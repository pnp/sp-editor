import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CommandBar,
  ICommandBarItemProps,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  Checkbox,
  MessageBar,
  MessageBarType,
  IconButton,
  TooltipHost,
} from '@fluentui/react'
import { IRootState } from '../../store'
import { setAiPanelOpen, setAiPendingInput } from '../../store/ai-assistant/actions'
import { trackAiAnalyzeClick } from '../../services/analytics'

export type ConsoleLevel = 'log' | 'info' | 'warn' | 'error' | 'debug'

export interface IConsoleEntry {
  id: string
  level: ConsoleLevel
  message: string
  timestamp: number
}

export interface IConsoleOutputProps {
  entries: IConsoleEntry[]
  onClear: () => void
  height: number
  /** Used to tailor the AI prompt label. Pass the page route key, e.g. 'pnpjsconsole' or 'graphsdkconsole'. */
  pageContext: string
}

const AI_CONSENT_KEY = 'sp-editor.ai.analyzeConsent'

const buildAnalyzePrompt = (entry: IConsoleEntry, pageContext: string): string => {
  const label = pageContext === 'graphsdkconsole' ? 'Graph SDK snippet' : 'snippet'
  return [
    `Please analyze the following console output from my ${label} and explain what it means. If it indicates a problem, suggest a fix.`,
    '',
    '```',
    `[${entry.level.toUpperCase()}] ${entry.message}`,
    '```',
  ].join('\n')
}

const levelColor = (level: ConsoleLevel, isDark: boolean): string => {
  switch (level) {
    case 'error': return isDark ? '#ff7b7b' : '#b00020'
    case 'warn':  return isDark ? '#f5c451' : '#8a6d00'
    case 'info':  return isDark ? '#7cc7ff' : '#0063b1'
    case 'debug': return isDark ? '#b8b8b8' : '#5c5c5c'
    default:      return isDark ? '#e5e7eb' : '#1f2937'
  }
}

const levelBg = (level: ConsoleLevel, isDark: boolean): string | undefined => {
  if (level === 'error') return isDark ? 'rgba(255,80,80,0.10)' : 'rgba(176,0,32,0.06)'
  if (level === 'warn')  return isDark ? 'rgba(245,196,81,0.10)' : 'rgba(138,109,0,0.06)'
  return undefined
}

const formatTime = (ts: number): string => {
  const d = new Date(ts)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${String(d.getMilliseconds()).padStart(3, '0')}`
}

const ConsoleOutput: React.FC<IConsoleOutputProps> = ({ entries, onClear, height, pageContext }) => {
  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)
  const { bridgeStatus } = useSelector((state: IRootState) => state.aiAuth)
  const isAiReady = bridgeStatus === 'ready'
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [dontAskAgain, setDontAskAgain] = useState(false)
  const [pendingEntry, setPendingEntry] = useState<IConsoleEntry | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [entries])

  const prefillAi = (entry: IConsoleEntry) => {
    const message = buildAnalyzePrompt(entry, pageContext)
    trackAiAnalyzeClick(pageContext)
    dispatch(setAiPanelOpen(true))
    dispatch(setAiPendingInput(message))
  }

  const sendToAi = (entry: IConsoleEntry) => {
    let consented = false
    try { consented = sessionStorage.getItem(AI_CONSENT_KEY) === '1' } catch { /* ignore */ }
    if (consented) {
      prefillAi(entry)
    } else {
      setDontAskAgain(false)
      setPendingEntry(entry)
      setConfirmOpen(true)
    }
  }

  const onConfirmSend = () => {
    if (dontAskAgain) {
      try { sessionStorage.setItem(AI_CONSENT_KEY, '1') } catch { /* ignore */ }
    }
    setConfirmOpen(false)
    if (pendingEntry) {
      prefillAi(pendingEntry)
      setPendingEntry(null)
    }
  }

  const items: ICommandBarItemProps[] = useMemo(() => ([
    {
      key: 'clear',
      text: 'Clear',
      iconProps: { iconName: 'ClearFormatting' },
      onClick: () => { onClear(); return true },
    },
    {
      key: 'count',
      text: `${entries.length} entr${entries.length === 1 ? 'y' : 'ies'}`,
      disabled: true,
    },
  ]), [onClear, entries])

  const borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
  const headerBg = isDark ? '#1e1e1e' : '#fafafa'
  const bodyBg = isDark ? '#0f0f10' : '#ffffff'

  return (
    <div
      style={{
        height,
        display: 'flex',
        flexDirection: 'column',
        borderTop: `1px solid ${borderColor}`,
        background: bodyBg,
      }}
    >
      <div
        style={{
          flex: '0 0 auto',
          background: headerBg,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <CommandBar
          items={items}
          styles={{ root: { padding: 0, height: 32, background: headerBg } }}
        />
      </div>
      <div
        ref={scrollRef}
        style={{
          flex: '1 1 auto',
          overflow: 'auto',
          fontFamily: 'Menlo, Consolas, "Courier New", monospace',
          fontSize: 12,
          lineHeight: '16px',
          padding: '4px 0',
        }}
      >
        {entries.length === 0 ? (
          <div style={{ padding: '8px 12px', color: isDark ? '#888' : '#666', fontStyle: 'italic' }}>
            Console output from your snippet will appear here.
          </div>
        ) : entries.map((e) => (
          <div
            key={e.id}
            style={{
              display: 'flex',
              gap: 8,
              padding: '2px 12px',
              background: levelBg(e.level, isDark),
              color: levelColor(e.level, isDark),
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
            }}
          >
            <span style={{ flex: '0 0 auto', color: isDark ? '#777' : '#999' }}>{formatTime(e.timestamp)}</span>
            <span
              style={{
                flex: '0 0 44px',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: 10,
                letterSpacing: '0.5px',
                opacity: 0.85,
              }}
            >
              {e.level}
            </span>
            <span style={{ flex: '1 1 auto', minWidth: 0 }}>{e.message}</span>
            {(e.level === 'error' || e.level === 'warn') && (
              <TooltipHost
                content={
                  isAiReady
                    ? 'Copy this entry into the AI Assistant chat box for review before sending.'
                    : 'Set up the AI Assistant (GitHub Copilot required) to use this feature.'
                }
              >
                <IconButton
                  iconProps={{ iconName: 'Robot' }}
                  ariaLabel="Analyze with AI"
                  disabled={!isAiReady}
                  onClick={() => sendToAi(e)}
                  styles={{
                    root: { height: 20, width: 24, padding: 0, color: 'inherit', opacity: 0.6 },
                    rootHovered: { opacity: 1, background: 'transparent' },
                    rootPressed: { background: 'transparent' },
                    icon: { fontSize: 12 },
                  }}
                />
              </TooltipHost>
            )}
          </div>
        ))}
      </div>
      <Dialog
        hidden={!confirmOpen}
        onDismiss={() => { setConfirmOpen(false); setPendingEntry(null) }}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Send console output to AI?',
          subText:
            'The selected console entry will be pasted into the AI Assistant chat box, together with the code currently in the editor. Nothing is sent until you press Send in the chat.',
        }}
        modalProps={{ isBlocking: true }}
      >
        <MessageBar messageBarType={MessageBarType.warning} isMultiline>
          Console output may contain sensitive information such as tenant URLs,
          user names or emails, item IDs, GUIDs, list/site data or error
          stacks. Review the pasted text before pressing Send and do not send
          anything you would not paste into a third-party chat service.
        </MessageBar>
        <div style={{ marginTop: 12 }}>
          <Checkbox
            label="Don't ask again for this session"
            checked={dontAskAgain}
            onChange={(_, c) => setDontAskAgain(!!c)}
          />
        </div>
        <DialogFooter>
          <PrimaryButton onClick={onConfirmSend} text="Paste into chat" />
          <DefaultButton onClick={() => { setConfirmOpen(false); setPendingEntry(null) }} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default ConsoleOutput
