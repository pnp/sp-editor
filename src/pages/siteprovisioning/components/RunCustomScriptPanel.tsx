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
  Dialog,
  DialogType,
  DialogFooter,
  Checkbox,
  Label,
} from '@fluentui/react'
import * as monaco from 'monaco-editor'
import { IRootState } from '../../../store'
import { runSiteScript, IExecuteSiteScriptResult } from '../chrome/chrome-actions'

interface ISiteScriptAction {
  verb: string
  [key: string]: any
}

interface IParsedAction {
  index: number
  verb: string
  displayName: string
  action: ISiteScriptAction
}

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

  // Select actions dialog state
  const [selectActionsDialogOpen, setSelectActionsDialogOpen] = useState(false)
  const [parsedActions, setParsedActions] = useState<IParsedAction[]>([])
  const [selectedActionIndices, setSelectedActionIndices] = useState<Set<number>>(new Set())

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Extract bindings from script for resolving placeholders
  const getBindings = useCallback((): { [key: string]: any } => {
    try {
      const parsed = JSON.parse(scriptContent)
      const rawBindings = parsed.bindings || {}
      const bindings: { [key: string]: any } = {}
      
      for (const key of Object.keys(rawBindings)) {
        const binding = rawBindings[key]
        if (binding && typeof binding === 'object' && binding.defaultValue !== undefined) {
          bindings[key] = binding.defaultValue
        } else {
          bindings[key] = binding
        }
      }
      
      // Also include parameters
      const parameters = parsed.parameters || {}
      return { ...bindings, ...parameters }
    } catch {
      return {}
    }
  }, [scriptContent])

  // Resolve a placeholder value like [[key]] or [key]
  const resolvePlaceholder = useCallback((str: string, bindings: { [key: string]: any }): string => {
    if (!str || typeof str !== 'string') return String(str ?? '')
    
    // Replace [[key]] placeholders
    let result = str.replace(/\[\[([^\]]+)\]\]/g, (_, key) => {
      const value = bindings[key]
      return value !== undefined ? String(value) : `[[${key}]]`
    })
    
    // Replace [key] placeholders (but not [[key]] which was already handled)
    // eslint-disable-next-line no-useless-escape
    result = result.replace(/\[([^\[\]]+)\]/g, (_, key) => {
      const value = bindings[key]
      return value !== undefined ? String(value) : `[${key}]`
    })
    
    return result
  }, [])

  // Helper to get a display name for an action
  const getActionDisplayName = useCallback((action: ISiteScriptAction, resolveBindings: boolean = false): string => {
    const verb = action.verb
    // Try to find a meaningful identifier
    let identifier = action.listName || action.name || action.displayName || 
                       action.fieldName || action.title || action.viewName ||
                       action.themeName || action.siteDesignId || action.url || ''
    
    // If we should resolve bindings and identifier contains placeholders
    if (resolveBindings && identifier && typeof identifier === 'string' && 
        (identifier.includes('[[') || identifier.includes('['))) {
      const bindings = getBindings()
      identifier = resolvePlaceholder(identifier, bindings)
    }
    
    return identifier ? `${verb} - "${identifier}"` : verb
  }, [getBindings, resolvePlaceholder])

  // Parse actions from current script
  const parseActions = useCallback((resolveBindings: boolean = false): IParsedAction[] => {
    try {
      const parsed = JSON.parse(scriptContent)
      const actions = parsed.actions || []
      return actions.map((action: ISiteScriptAction, index: number) => ({
        index,
        verb: action.verb,
        displayName: getActionDisplayName(action, resolveBindings),
        action,
      }))
    } catch {
      return []
    }
  }, [scriptContent, getActionDisplayName])

  // Open select actions dialog
  const handleOpenSelectActions = () => {
    const actions = parseActions(replaceParameters)
    setParsedActions(actions)
    // Select all by default
    setSelectedActionIndices(new Set(actions.map((a) => a.index)))
    setSelectActionsDialogOpen(true)
  }

  // Toggle action selection
  const handleToggleAction = (index: number, checked: boolean) => {
    setSelectedActionIndices((prev) => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(index)
      } else {
        newSet.delete(index)
      }
      return newSet
    })
  }

  // Select/deselect all
  const handleSelectAll = () => {
    setSelectedActionIndices(new Set(parsedActions.map((a) => a.index)))
  }

  const handleClearAll = () => {
    setSelectedActionIndices(new Set())
  }

  // Run only selected actions
  const handleRunSelectedActions = async () => {
    if (!tabId || selectedActionIndices.size === 0) return

    // Build a modified script with only selected actions
    try {
      const parsed = JSON.parse(scriptContent)
      const allActions = parsed.actions || []
      
      // Filter actions by selected indices
      const selectedActions = allActions.filter((_: any, index: number) => 
        selectedActionIndices.has(index)
      )
      
      const modifiedScript = {
        ...parsed,
        actions: selectedActions,
      }

      setSelectActionsDialogOpen(false)
      setIsRunning(true)
      setError(null)
      setResult(null)

      const res = await runSiteScript(tabId, JSON.stringify(modifiedScript, null, 2), replaceParameters)
      setResult(res)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run selected actions')
    } finally {
      setIsRunning(false)
    }
  }

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
                  {result.actionOutcomes?.map((outcome, index) => {
                    // Determine message bar type based on outcome
                    let messageBarType = MessageBarType.error;
                    let iconName = 'ErrorBadge';

                    if (outcome.outcome === 'Success') {
                      messageBarType = MessageBarType.success;
                      iconName = 'CheckMark';
                    } else if (outcome.outcome === 'Failure') {
                      messageBarType = MessageBarType.error;
                      iconName = 'ErrorBadge';
                    }

                    return (
                      <MessageBar key={index} messageBarType={messageBarType} isMultiline>
                        <Stack tokens={{ childrenGap: 4 }}>
                          <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
                            {outcome.title || `Action ${index + 1}`}
                          </Text>
                          <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center" wrap>
                            <Icon iconName={iconName} />
                            <Text variant="small">{outcome.outcome}</Text>
                          </Stack>
                          {outcome.target && (
                            <Text variant="small" styles={{ root: { wordBreak: 'break-word', opacity: 0.8 } }}>
                              {outcome.target}
                            </Text>
                          )}
                        </Stack>
                      </MessageBar>
                    );
                  })}
                  {(!result.actionOutcomes || result.actionOutcomes.length === 0) && (
                    <MessageBar messageBarType={MessageBarType.info}>No action outcomes returned</MessageBar>
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
            },
          }}
        >
          <PrimaryButton onClick={handleRun} disabled={isRunning || !scriptContent.trim()}>
            {isRunning ? <Spinner size={SpinnerSize.small} /> : 'Run Script'}
          </PrimaryButton>
          <DefaultButton
            onClick={handleOpenSelectActions}
            disabled={isRunning || !scriptContent.trim()}
            iconProps={{ iconName: 'CheckList' }}
          >
            Select Actions...
          </DefaultButton>
          <DefaultButton onClick={handleClear} disabled={isRunning}>
            Reset
          </DefaultButton>
          <DefaultButton onClick={handleDismiss}>Close</DefaultButton>
        </Stack>
      </Stack>

      {/* Select Actions Dialog */}
      <Dialog
        hidden={!selectActionsDialogOpen}
        onDismiss={() => setSelectActionsDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Select Actions to Run',
          subText: 'Choose which actions to execute from the script',
        }}
        modalProps={{
          isBlocking: false,
          styles: {
            main: {
              maxWidth: '700px !important',
              minWidth: '500px !important',
              width: '90vw',
            },
          },
        }}
      >
        <Stack tokens={{ childrenGap: 8 }}>
          {parsedActions.length === 0 ? (
            <MessageBar messageBarType={MessageBarType.warning}>
              No actions found in the script. Make sure the JSON is valid and contains an "actions" array.
            </MessageBar>
          ) : (
            <>
              <Stack horizontal tokens={{ childrenGap: 8 }} styles={{ root: { marginBottom: 8 } }}>
                <DefaultButton onClick={handleSelectAll} text="Select All" />
                <DefaultButton onClick={handleClearAll} text="Clear All" />
              </Stack>
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                <Stack tokens={{ childrenGap: 8 }}>
                  {parsedActions.map((action) => (
                    <Checkbox
                      key={action.index}
                      label={action.displayName}
                      checked={selectedActionIndices.has(action.index)}
                      onChange={(_, checked) => handleToggleAction(action.index, !!checked)}
                      styles={{
                        root: {
                          padding: '8px 12px',
                          backgroundColor: isDark ? '#2d2d2d' : '#f3f2f1',
                          borderRadius: 4,
                        },
                        label: {
                          fontFamily: 'monospace',
                          fontSize: 13,
                        },
                      }}
                    />
                  ))}
                </Stack>
              </div>
              <Label styles={{ root: { marginTop: 8, fontStyle: 'italic', opacity: 0.7 } }}>
                Note: Some actions may depend on others. Running actions out of order may cause errors.
              </Label>
            </>
          )}
        </Stack>
        <DialogFooter>
          <PrimaryButton
            onClick={handleRunSelectedActions}
            text={`Run Selected (${selectedActionIndices.size})`}
            disabled={selectedActionIndices.size === 0}
          />
          <DefaultButton onClick={() => setSelectActionsDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </Panel>
  );
}

export default RunCustomScriptPanel
