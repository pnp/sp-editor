import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import {
  Panel,
  PanelType,
  PrimaryButton,
  DefaultButton,
  Stack,
  MessageBar,
  MessageBarType,
  Text,
  Icon,
  Spinner,
  SpinnerSize,
  Toggle,
} from '@fluentui/react'
import * as monaco from 'monaco-editor'
import { IRootState } from '../../../store'
import { runSiteScript, IExecuteSiteScriptResult } from '../chrome/chrome-actions'

interface IRunCustomScriptPanelProps {
  isOpen: boolean
  onDismiss: () => void
  tabId: number | null
  initialScript?: string
}

const defaultScript = `{
  "actions": [
    {
      "verb": "createSPList",
      "listName": "My Custom List",
      "templateType": 100,
      "subactions": [
        {
          "verb": "setTitle",
          "title": "My Custom List"
        },
        {
          "verb": "addSPField",
          "fieldType": "Text",
          "displayName": "Description",
          "addToDefaultView": true
        }
      ]
    }
  ]
}`

const RunCustomScriptPanel = ({ isOpen, onDismiss, tabId, initialScript }: IRunCustomScriptPanelProps) => {
  const { isDark } = useSelector((state: IRootState) => state.home)
  
  const [scriptContent, setScriptContent] = useState(initialScript || defaultScript)
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<IExecuteSiteScriptResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [editorInitialized, setEditorInitialized] = useState(false)
  const [replaceParameters, setReplaceParameters] = useState(true)

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Monaco editor config
  const MONACO_CONFIG: monaco.editor.IEditorOptions = useMemo(() => ({
    lineNumbers: 'on',
    fontSize: 12,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: false,
    wordWrap: 'on',
    folding: false,
    formatOnPaste: true,
    stickyScroll: { enabled: false },
  }), [])

  // Monaco theme handling
  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
  }, [isDark])

  // Initialize editor
  const initEditor = useCallback(() => {
    if (containerRef.current && !editorRef.current) {
      // Use initialScript if provided, otherwise use current scriptContent or default
      const contentToUse = initialScript || scriptContent || defaultScript
      const uri = monaco.Uri.parse(`inmemory://run-custom-script-${Date.now()}.json`)
      editorRef.current = monaco.editor.create(containerRef.current, {
        model: monaco.editor.createModel(contentToUse, 'json', uri),
        ...MONACO_CONFIG,
        readOnly: false,
      })
      editorRef.current.onDidChangeModelContent(() => {
        const value = editorRef.current?.getValue() || ''
        setScriptContent(value)
      })
      // Sync state with what's in the editor
      setScriptContent(contentToUse)
      setTimeout(() => window.dispatchEvent(new Event('resize')), 1)
    }
  }, [MONACO_CONFIG, scriptContent, initialScript])

  // Update script content when initialScript changes (e.g., opening with a selected script)
  useEffect(() => {
    const newContent = initialScript || defaultScript
    setScriptContent(newContent)
    // Clear previous results when opening with new content
    setResult(null)
    setError(null)
    // Also update the editor if it exists
    if (editorRef.current) {
      const currentValue = editorRef.current.getValue()
      if (currentValue !== newContent) {
        editorRef.current.setValue(newContent)
      }
    }
  }, [initialScript])

  // Initialize editor when panel opens
  useEffect(() => {
    if (isOpen && !editorInitialized) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        initEditor()
        setEditorInitialized(true)
      }, 100)
    }
    if (!isOpen && editorRef.current) {
      // Dispose model first, then editor
      const model = editorRef.current.getModel()
      if (model) model.dispose()
      editorRef.current.dispose()
      editorRef.current = null
      setEditorInitialized(false)
    }
  }, [isOpen, editorInitialized, initEditor])

  const handleRun = async () => {
    if (!tabId) {
      setError('No active tab found')
      return
    }

    // Validate JSON
    try {
      JSON.parse(scriptContent)
    } catch (e) {
      setError('Invalid JSON: ' + (e instanceof Error ? e.message : 'Unknown error'))
      return
    }

    setIsRunning(true)
    setError(null)
    setResult(null)

    try {
      const res = await runSiteScript(tabId, scriptContent, replaceParameters)
      setResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run script')
    } finally {
      setIsRunning(false)
    }
  }

  const handleDismiss = () => {
    setResult(null)
    setError(null)
    onDismiss()
  }

  const handleClear = () => {
    setScriptContent(defaultScript)
    setResult(null)
    setError(null)
    if (editorRef.current) {
      editorRef.current.setValue(defaultScript)
    }
  }

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={handleDismiss}
      headerText="Run Custom Script"
      type={PanelType.large}
      isLightDismiss={!isRunning}
      closeButtonAriaLabel="Close"
      styles={{
        scrollableContent: { 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          overflow: 'hidden',
        },
        content: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
          paddingBottom: 0,
        },
      }}
    >
      <Stack styles={{ root: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' } }}>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }} styles={{ root: { marginBottom: 12 } }}>
          <MessageBar messageBarType={MessageBarType.info} styles={{ root: { flex: 1 } }}>
            Paste your site script JSON below and click "Run Script" to execute it on the current site.
          </MessageBar>
          <Toggle
            label="Replace [[parameters]]"
            checked={replaceParameters}
            onChange={(_, checked) => setReplaceParameters(checked ?? true)}
            inlineLabel
            styles={{ root: { marginBottom: 0 } }}
          />
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 16 }} styles={{ root: { flex: 1, overflow: 'hidden' } }}>
          {/* Editor - Left side */}
          <div
            ref={containerRef}
            style={{
              flex: 2,
              height: '100%',
              border: '1px solid #ccc',
              borderRadius: 4,
            }}
          />

          {/* Results - Right side */}
          <Stack styles={{ root: { flex: 1, minWidth: 300, height: '100%', overflow: 'hidden' } }}>
            <Text variant="large" styles={{ root: { fontWeight: 600, marginBottom: 8 } }}>
              Execution Results
            </Text>
            
            <Stack styles={{ root: { flex: 1, overflow: 'auto' } }} tokens={{ childrenGap: 8 }}>
              {error && (
                <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(null)}>
                  {error}
                </MessageBar>
              )}

            {result ? (
              <Stack tokens={{ childrenGap: 8 }}>
                {result.actionOutcomes?.map((outcome, index) => (
                  <MessageBar
                    key={index}
                    messageBarType={
                      outcome.outcome === 'Success'
                        ? MessageBarType.success
                        : outcome.outcome === 'Skipped'
                          ? MessageBarType.warning
                          : MessageBarType.error
                    }
                    isMultiline
                  >
                    <Stack tokens={{ childrenGap: 4 }}>
                      <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
                        {outcome.title || `Action ${index + 1}`}
                      </Text>
                      <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center" wrap>
                        <Icon
                          iconName={
                            outcome.outcome === 'Success'
                              ? 'CheckMark'
                              : outcome.outcome === 'Skipped'
                                ? 'Skipped'
                                : 'ErrorBadge'
                          }
                        />
                        <Text variant="small">{outcome.outcome}</Text>
                      </Stack>
                      {outcome.target && (
                        <Text variant="small" styles={{ root: { wordBreak: 'break-word', opacity: 0.8 } }}>
                          {outcome.target}
                        </Text>
                      )}
                    </Stack>
                  </MessageBar>
                ))}
                {(!result.actionOutcomes || result.actionOutcomes.length === 0) && (
                  <MessageBar messageBarType={MessageBarType.info}>
                    No action outcomes returned
                  </MessageBar>
                )}
              </Stack>
            ) : (
              <Text styles={{ root: { opacity: 0.6, fontStyle: 'italic' } }}>
                Click "Run Script" to see results here
              </Text>
            )}
            </Stack>
          </Stack>
        </Stack>

        {/* Buttons - Always at bottom */}
        <Stack 
          horizontal 
          tokens={{ childrenGap: 10 }} 
          styles={{ 
            root: { 
              marginTop: 16,
              paddingTop: 16,
              paddingBottom: 16,
              borderTop: `1px solid ${isDark ? '#333' : '#edebe9'}`,
            } 
          }}
        >
          <PrimaryButton onClick={handleRun} disabled={isRunning || !scriptContent.trim()}>
            {isRunning ? <Spinner size={SpinnerSize.small} /> : 'Run Script'}
          </PrimaryButton>
          <DefaultButton onClick={handleClear} disabled={isRunning}>
            Reset
          </DefaultButton>
          <DefaultButton onClick={handleDismiss}>Close</DefaultButton>
        </Stack>
      </Stack>
    </Panel>
  )
}

export default RunCustomScriptPanel
