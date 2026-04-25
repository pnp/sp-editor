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
} from '@fluentui/react'
import { IRootState } from '../../../store'
import { clearConsoleOutput } from '../../../store/pnpjsconsole/actions'
import { setAiPanelOpen } from '../../../store/ai-assistant/actions'
import { IPnPjsConsoleEntry, PnPjsConsoleLevel } from '../../../store/pnpjsconsole/types'

const MAX_PROMPT_ENTRIES = 30
// Session-scoped consent: cleared when the extension/devtools is restarted,
// so the user is reminded again at the start of every session.
const AI_CONSENT_KEY = 'sp-editor.ai.analyzeConsent'

const buildAnalyzePrompt = (entries: IPnPjsConsoleEntry[]): string => {
  const recent = entries.slice(-MAX_PROMPT_ENTRIES)
  const errorsOnly = recent.filter((e) => e.level === 'error' || e.level === 'warn')
  const selected = errorsOnly.length > 0 ? errorsOnly : recent

  const logBlock = selected
    .map((e) => `[${e.level.toUpperCase()}] ${e.message}`)
    .join('\n')

  // Code is sent automatically via the AI panel's pnpjs contextData, so we
  // only need to include the captured console output here.
  return [
    'Analyze the console output below from the snippet currently in the editor. ' +
      'Explain what went wrong and provide a corrected version of the code.',
    '',
    'Console output:',
    '```',
    logBlock || '(no output captured)',
    '```',
  ].join('\n')
}

const levelColor = (level: PnPjsConsoleLevel, isDark: boolean): string => {
  switch (level) {
    case 'error':
      return isDark ? '#ff7b7b' : '#b00020'
    case 'warn':
      return isDark ? '#f5c451' : '#8a6d00'
    case 'info':
      return isDark ? '#7cc7ff' : '#0063b1'
    case 'debug':
      return isDark ? '#b8b8b8' : '#5c5c5c'
    case 'log':
    default:
      return isDark ? '#e5e7eb' : '#1f2937'
  }
}

const levelBg = (level: PnPjsConsoleLevel, isDark: boolean): string | undefined => {
  if (level === 'error') return isDark ? 'rgba(255, 80, 80, 0.10)' : 'rgba(176, 0, 32, 0.06)'
  if (level === 'warn') return isDark ? 'rgba(245, 196, 81, 0.10)' : 'rgba(138, 109, 0, 0.06)'
  return undefined
}

const formatTime = (ts: number): string => {
  const d = new Date(ts)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${String(d.getMilliseconds()).padStart(3, '0')}`
}

interface IPnPjsConsoleOutputProps {
  height: number
}

const PnPjsConsoleOutput: React.FC<IPnPjsConsoleOutputProps> = ({ height }) => {
  const dispatch = useDispatch()
  const entries = useSelector((state: IRootState) => state.pnpjsconsole.consoleOutput)
  const { isDark } = useSelector((state: IRootState) => state.home)
  const { isAuthenticated } = useSelector((state: IRootState) => state.aiAssistantAuth)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [dontAskAgain, setDontAskAgain] = useState(false)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [entries])

  const hasErrors = useMemo(
    () => entries.some((e) => e.level === 'error' || e.level === 'warn'),
    [entries]
  )

  const performSend = () => {
    const message = buildAnalyzePrompt(entries)
    // Open the panel and dispatch a silent send event. The chat bubble shows
    // a short "Analyzing output..." label while the full prompt (with logs)
    // is sent to the model. The current editor code is attached automatically
    // by the AI panel as pnpjs contextData.
    dispatch(setAiPanelOpen(true))
    window.dispatchEvent(
      new CustomEvent('sp-editor-ai-send', {
        detail: { message, display: 'Analyze output' },
      })
    )
  }

  const sendToAi = () => {
    let consented = false
    try { consented = sessionStorage.getItem(AI_CONSENT_KEY) === '1' } catch { /* ignore */ }
    if (consented) {
      performSend()
    } else {
      setDontAskAgain(false)
      setConfirmOpen(true)
    }
  }

  const onConfirmSend = () => {
    if (dontAskAgain) {
      try { sessionStorage.setItem(AI_CONSENT_KEY, '1') } catch { /* ignore */ }
    }
    setConfirmOpen(false)
    performSend()
  }

  const items: ICommandBarItemProps[] = useMemo(() => ([
    {
      key: 'clear',
      text: 'Clear',
      iconProps: { iconName: 'ClearFormatting' },
      onClick: () => { dispatch(clearConsoleOutput()); return true },
    },
    {
      key: 'analyze',
      text: 'Analyze with AI',
      iconProps: { iconName: 'Robot' },
      disabled: entries.length === 0 || !isAuthenticated,
      title: !isAuthenticated
        ? 'Sign in to the AI Assistant to use this feature.'
        : entries.length === 0
          ? 'Run code to capture output first.'
          : hasErrors
            ? 'Send the captured errors and current editor code to the AI Assistant. Output may contain sensitive data — you will be asked to confirm.'
            : 'Send the captured console output and current editor code to the AI Assistant. Output may contain sensitive data — you will be asked to confirm.',
      onClick: () => { sendToAi(); return true },
    },
    {
      key: 'count',
      text: `${entries.length} entr${entries.length === 1 ? 'y' : 'ies'}`,
      disabled: true,
    },
  ]), [dispatch, entries, isAuthenticated, hasErrors])

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
        ) : entries.map((e: IPnPjsConsoleEntry) => (
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
          </div>
        ))}
      </div>
      <Dialog
        hidden={!confirmOpen}
        onDismiss={() => setConfirmOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Send console output to AI?',
          subText:
            'The captured console output and the code in the editor will be sent to the AI Assistant for analysis.',
        }}
        modalProps={{ isBlocking: true }}
      >
        <MessageBar messageBarType={MessageBarType.warning} isMultiline>
          Console output may contain sensitive information such as tenant URLs,
          user names or emails, item IDs, GUIDs, list/site data or error
          stacks. Review the output before sending and do not send anything
          you would not paste into a third-party chat service.
        </MessageBar>
        <div style={{ marginTop: 12 }}>
          <Checkbox
            label="Don't ask again for this session"
            checked={dontAskAgain}
            onChange={(_, c) => setDontAskAgain(!!c)}
          />
        </div>
        <DialogFooter>
          <PrimaryButton onClick={onConfirmSend} text="Send to AI" />
          <DefaultButton onClick={() => setConfirmOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default PnPjsConsoleOutput
