import {
  Panel,
  PanelType,
  Stack,
  PrimaryButton,
  DefaultButton,
  Dropdown,
  IDropdownOption,
  MessageBar,
  MessageBarType,
  Label,
  Text,
  IconButton,
  IIconProps,
  TextField,
} from '@fluentui/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setGeneratePanelOpen, setGeneratedJson, setLists } from '../../../store/siteprovisioning/actions'
import { loadLists, generateSiteScriptFromList, createNewSiteScript, loadAllSiteScripts } from '../chrome/chrome-actions'
import { setAppMessage } from '../../../store/home/actions'
import { MessageBarColors } from '../../../store/home/types'

const copyIcon: IIconProps = { iconName: 'Copy' }
const downloadIcon: IIconProps = { iconName: 'Download' }

const GenerateFromListPanel = () => {
  const dispatch = useDispatch()
  const { generatePanelOpen, lists, generatedJson, showOOTB } = useSelector(
    (state: IRootState) => state.siteProvisioning
  )
  const { isDark } = useSelector((state: IRootState) => state.home)

  // Monaco editor refs
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const editorDivRef = useRef<HTMLDivElement | null>(null)
  const [editorInitialized, setEditorInitialized] = useState(false)

  // Monaco editor config
  const MONACO_CONFIG: monaco.editor.IEditorOptions = useMemo(() => ({
    lineNumbers: 'on',
    fontSize: 12,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    wordWrap: 'on',
    folding: true,
    readOnly: true,
    stickyScroll: { enabled: false },
  }), [])

  const [selectedListId, setSelectedListId] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaveForm, setShowSaveForm] = useState(false)
  const [scriptTitle, setScriptTitle] = useState('')
  const [scriptDescription, setScriptDescription] = useState('')

  // Get tabId
  const tabId = chrome.devtools?.inspectedWindow?.tabId

  const isOpen = generatePanelOpen === 'list'

  // Monaco theme handling
  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
  }, [isDark])

  // Initialize editor when panel opens
  useEffect(() => {
    if (isOpen && !editorInitialized) {
      setTimeout(() => {
        if (editorDivRef.current && !editorRef.current) {
          const uri = monaco.Uri.parse(`inmemory://generate-list-${Date.now()}.json`)
          editorRef.current = monaco.editor.create(editorDivRef.current, {
            model: monaco.editor.createModel(
              generatedJson || '// Select a list and click "Generate" to create a site script',
              'json',
              uri
            ),
            ...MONACO_CONFIG,
          })
          setTimeout(() => window.dispatchEvent(new Event('resize')), 1)
        }
        setEditorInitialized(true)
      }, 100)
    }
    if (!isOpen && editorRef.current) {
      const model = editorRef.current.getModel()
      if (model) model.dispose()
      editorRef.current.dispose()
      editorRef.current = null
      setEditorInitialized(false)
    }
  }, [isOpen, editorInitialized, MONACO_CONFIG, generatedJson])

  // Update editor content when generatedJson changes
  useEffect(() => {
    if (editorRef.current && editorInitialized) {
      const currentValue = editorRef.current.getValue()
      const newValue = generatedJson || '// Select a list and click "Generate" to create a site script'
      if (currentValue !== newValue) {
        editorRef.current.setValue(newValue)
      }
    }
  }, [generatedJson, editorInitialized])

  // Load lists when panel opens
  useEffect(() => {
    if (isOpen && tabId && lists.length === 0) {
      loadLists(dispatch, tabId)
    }
  }, [isOpen, tabId, dispatch, lists.length])

  // Cleanup on panel close
  const handleDismiss = useCallback(() => {
    dispatch(setGeneratePanelOpen(null))
    dispatch(setGeneratedJson(''))
    dispatch(setLists([]))
    setSelectedListId('')
    setShowSaveForm(false)
    setScriptTitle('')
    setScriptDescription('')
  }, [dispatch])

  // Build list dropdown options
  const listOptions: IDropdownOption[] = useMemo(() => {
    return lists.map((list) => ({
      key: list.Id,
      text: list.Title,
      data: list,
    }))
  }, [lists])

  // Get selected list info for URL
  const selectedList = useMemo(() => {
    return lists.find((l) => l.Id === selectedListId)
  }, [lists, selectedListId])

  // Handle generate
  const handleGenerate = async () => {
    if (!selectedList || !tabId) return

    setIsGenerating(true)
    setShowSaveForm(false) // Reset save form when generating new
    try {
      // Build the list URL (server-relative)
      const listUrl = `Lists/${selectedList.Title}`
      await generateSiteScriptFromList(dispatch, tabId, listUrl)
    } catch (error: any) {
      dispatch(
        setAppMessage({
          showMessage: true,
          message: error.message || 'Failed to generate site script',
          color: MessageBarColors.danger,
        })
      )
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle initiating save - show form with defaults
  const handleInitiateSave = () => {
    if (selectedList) {
      setScriptTitle(`Site Script from ${selectedList.Title}`)
      setScriptDescription(`Generated from list: ${selectedList.Title}`)
    }
    setShowSaveForm(true)
  }

  // Handle cancel save
  const handleCancelSave = () => {
    setShowSaveForm(false)
    setScriptTitle('')
    setScriptDescription('')
  }

  // Handle copy to clipboard
  const handleCopy = () => {
    if (generatedJson) {
      const textarea = document.createElement('textarea')
      textarea.value = generatedJson
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      dispatch(
        setAppMessage({
          showMessage: true,
          message: 'Copied to clipboard!',
          color: MessageBarColors.success,
        })
      )
    }
  }

  // Handle download
  const handleDownload = () => {
    if (generatedJson) {
      const blob = new Blob([generatedJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `sitescript-${selectedList?.Title || 'generated'}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  // Handle save as new site script
  const handleSaveAsScript = async () => {
    if (!generatedJson || !tabId || !scriptTitle.trim()) return

    setIsSaving(true)
    try {
      await createNewSiteScript(tabId, scriptTitle.trim(), scriptDescription.trim(), generatedJson)

      dispatch(
        setAppMessage({
          showMessage: true,
          message: `Site script "${scriptTitle}" created successfully!`,
          color: MessageBarColors.success,
        })
      )

      // Refresh site scripts list so the new one appears (respect OOTB toggle)
      loadAllSiteScripts(dispatch, tabId, showOOTB)

      handleDismiss()
    } catch (error: any) {
      dispatch(
        setAppMessage({
          showMessage: true,
          message: error.message || 'Failed to create site script',
          color: MessageBarColors.danger,
        })
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={handleDismiss}
      headerText="Generate Site Script from List"
      type={PanelType.medium}
      isLightDismiss={false}
      onRenderFooterContent={() => (
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          {!showSaveForm ? (
            <PrimaryButton
              onClick={handleInitiateSave}
              text="Save as Site Script"
              disabled={!generatedJson}
              iconProps={{ iconName: 'Save' }}
            />
          ) : (
            <>
              <PrimaryButton
                onClick={handleSaveAsScript}
                text={isSaving ? 'Saving...' : 'Save'}
                disabled={!scriptTitle.trim() || isSaving}
                iconProps={{ iconName: 'Save' }}
              />
              <DefaultButton
                onClick={handleCancelSave}
                text="Cancel"
                disabled={isSaving}
              />
            </>
          )}
          <DefaultButton onClick={handleDismiss} text="Close" />
        </Stack>
      )}
      isFooterAtBottom={true}
    >
      <Stack tokens={{ childrenGap: 16 }} styles={{ root: { height: '100%' } }}>
        {/* List selection - hidden when save form is shown */}
        {!showSaveForm && (
          <>
            <Stack tokens={{ childrenGap: 8 }}>
              <Dropdown
                label="Select a list"
                placeholder="Select a list"
                options={listOptions}
                selectedKey={selectedListId}
                onChange={(_, option) => setSelectedListId(option?.key as string || '')}
                disabled={isGenerating}
              />
              <PrimaryButton
                text={isGenerating ? 'Generating...' : 'Generate'}
                onClick={handleGenerate}
                disabled={!selectedListId || isGenerating}
                iconProps={{ iconName: 'Play' }}
              />
            </Stack>

            {/* Info message */}
            <MessageBar messageBarType={MessageBarType.info}>
              <Text variant="small">
                This will generate a site script JSON that recreates the selected list's structure,
                including columns and views.
              </Text>
            </MessageBar>
          </>
        )}

        {/* Save form - shown when user clicks "Save as Site Script" */}
        {showSaveForm && (
          <Stack tokens={{ childrenGap: 12 }}>
            <Label styles={{ root: { fontWeight: 600 } }}>Save as new Site Script</Label>
            <TextField
              label="Title"
              required
              value={scriptTitle}
              onChange={(_, val) => setScriptTitle(val || '')}
              placeholder="Enter site script title"
            />
            <TextField
              label="Description"
              multiline
              rows={2}
              value={scriptDescription}
              onChange={(_, val) => setScriptDescription(val || '')}
              placeholder="Enter site script description (optional)"
            />
          </Stack>
        )}

        {/* Generated JSON section */}
        <Stack tokens={{ childrenGap: 8 }} styles={{ root: { flex: 1, display: 'flex', flexDirection: 'column' } }}>
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <Label>Generated Site Script:</Label>
            {generatedJson && (
              <Stack horizontal tokens={{ childrenGap: 4 }}>
                <IconButton
                  iconProps={copyIcon}
                  title="Copy to clipboard"
                  ariaLabel="Copy to clipboard"
                  onClick={handleCopy}
                />
                <IconButton
                  iconProps={downloadIcon}
                  title="Download JSON"
                  ariaLabel="Download JSON"
                  onClick={handleDownload}
                />
              </Stack>
            )}
          </Stack>
          <div
            ref={editorDivRef}
            style={{
              flex: 1,
              minHeight: 300,
              height: showSaveForm ? 'calc(100vh - 580px)' : 'calc(100vh - 420px)',
              border: '1px solid #ccc',
              borderRadius: 2,
            }}
          />
        </Stack>
      </Stack>
    </Panel>
  )
}

export default GenerateFromListPanel
