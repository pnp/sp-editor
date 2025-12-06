import {
  Panel,
  PanelType,
  Stack,
  PrimaryButton,
  DefaultButton,
  Checkbox,
  MessageBar,
  MessageBarType,
  Label,
  Text,
  IconButton,
  IIconProps,
  TextField,
  Dropdown,
  IDropdownOption,
} from '@fluentui/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setGeneratePanelOpen, setGeneratedJson, setLists } from '../../../store/siteprovisioning/actions'
import { generateSiteScriptFromWeb, createNewSiteScript, loadAllSiteScripts, loadLists, IGetSiteScriptFromWebInfo } from '../chrome/chrome-actions'
import { setAppMessage } from '../../../store/home/actions'
import { MessageBarColors } from '../../../store/home/types'

const copyIcon: IIconProps = { iconName: 'Copy' }
const downloadIcon: IIconProps = { iconName: 'Download' }

const GenerateFromSitePanel = () => {
  const dispatch = useDispatch()
  const { generatePanelOpen, generatedJson, showOOTB, lists } = useSelector(
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

  // Options for GetSiteScriptFromWeb
  const [includeBranding, setIncludeBranding] = useState(true)
  const [includeRegionalSettings, setIncludeRegionalSettings] = useState(true)
  const [includeSiteExternalSharingCapability, setIncludeSiteExternalSharingCapability] = useState(true)
  const [includeTheme, setIncludeTheme] = useState(true)
  const [includeLinksToExportedItems, setIncludeLinksToExportedItems] = useState(false)
  const [selectedListKeys, setSelectedListKeys] = useState<string[]>([])

  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaveForm, setShowSaveForm] = useState(false)
  const [scriptTitle, setScriptTitle] = useState('')
  const [scriptDescription, setScriptDescription] = useState('')
  const [currentWebUrl, setCurrentWebUrl] = useState('')

  // Get tabId
  const tabId = chrome.devtools?.inspectedWindow?.tabId

  const isOpen = generatePanelOpen === 'site'

  // Monaco theme handling
  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
  }, [isDark])

  // Initialize editor when panel opens
  useEffect(() => {
    if (isOpen && !editorInitialized) {
      setTimeout(() => {
        if (editorDivRef.current && !editorRef.current) {
          const uri = monaco.Uri.parse(`inmemory://generate-site-${Date.now()}.json`)
          editorRef.current = monaco.editor.create(editorDivRef.current, {
            model: monaco.editor.createModel(
              generatedJson || '// Configure options and click "Generate" to create a site script',
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
      const newValue = generatedJson || '// Configure options and click "Generate" to create a site script'
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

  // Build list dropdown options
  const listOptions: IDropdownOption[] = useMemo(() => {
    return lists.map((list) => ({
      key: list.Id,
      text: list.Title,
    }))
  }, [lists])

  // Check if at least one option is selected (including lists)
  const hasAtLeastOneOption = includeBranding || includeRegionalSettings || 
    includeSiteExternalSharingCapability || includeTheme || includeLinksToExportedItems ||
    selectedListKeys.length > 0

  // Cleanup on panel close
  const handleDismiss = useCallback(() => {
    dispatch(setGeneratePanelOpen(null))
    dispatch(setGeneratedJson(''))
    dispatch(setLists([]))
    setShowSaveForm(false)
    setScriptTitle('')
    setScriptDescription('')
    setCurrentWebUrl('')
    setSelectedListKeys([])
  }, [dispatch])

  // Handle generate
  const handleGenerate = async () => {
    if (!tabId) return

    setIsGenerating(true)
    setShowSaveForm(false) // Reset save form when generating new
    try {
      // Build list URLs from selected lists
      const selectedListUrls = selectedListKeys.map((key) => {
        const list = lists.find((l) => l.Id === key)
        return list ? `Lists/${list.Title}` : ''
      }).filter((url) => url !== '')

      const options: IGetSiteScriptFromWebInfo = {
        includeBranding,
        includedLists: selectedListUrls,
        includeRegionalSettings,
        includeSiteExternalSharingCapability,
        includeTheme,
        includeLinksToExportedItems,
      }
      const result = await generateSiteScriptFromWeb(dispatch, tabId, options)
      setCurrentWebUrl(result.webUrl)
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

  // Handle list selection change
  const handleListSelectionChange = (_: any, option?: IDropdownOption) => {
    if (option) {
      setSelectedListKeys((prev) =>
        option.selected
          ? [...prev, option.key as string]
          : prev.filter((key) => key !== option.key)
      )
    }
  }

  // Handle initiating save - show form with defaults
  const handleInitiateSave = () => {
    // Extract site name from URL for default title
    const siteName = currentWebUrl ? currentWebUrl.split('/').pop() || 'Current Site' : 'Current Site'
    setScriptTitle(`Site Script from ${siteName}`)
    setScriptDescription(`Generated from web: ${currentWebUrl}`)
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
      const siteName = currentWebUrl ? currentWebUrl.split('/').pop() || 'site' : 'site'
      const blob = new Blob([generatedJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `sitescript-${siteName}.json`
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
      headerText="Generate Site Script from Current Site"
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
        {/* Options and Generate - hidden when save form is shown */}
        {!showSaveForm && (
          <>
            <Stack tokens={{ childrenGap: 8 }}>
              <Label>Include in site script:</Label>
              <Stack tokens={{ childrenGap: 8 }} styles={{ root: { paddingLeft: 8 } }}>
                <Checkbox
                  label="Branding"
                  checked={includeBranding}
                  onChange={(_, checked) => setIncludeBranding(!!checked)}
                  disabled={isGenerating}
                />
                <Checkbox
                  label="Theme"
                  checked={includeTheme}
                  onChange={(_, checked) => setIncludeTheme(!!checked)}
                  disabled={isGenerating}
                />
                <Checkbox
                  label="Regional settings"
                  checked={includeRegionalSettings}
                  onChange={(_, checked) => setIncludeRegionalSettings(!!checked)}
                  disabled={isGenerating}
                />
                <Checkbox
                  label="External sharing capability"
                  checked={includeSiteExternalSharingCapability}
                  onChange={(_, checked) => setIncludeSiteExternalSharingCapability(!!checked)}
                  disabled={isGenerating}
                />
                <Checkbox
                  label="Links to exported items"
                  checked={includeLinksToExportedItems}
                  onChange={(_, checked) => setIncludeLinksToExportedItems(!!checked)}
                  disabled={isGenerating}
                />
              </Stack>

              {/* Lists multi-select dropdown */}
              <Dropdown
                label="Include lists (optional)"
                placeholder="Select lists to include"
                multiSelect
                options={listOptions}
                selectedKeys={selectedListKeys}
                onChange={handleListSelectionChange}
                disabled={isGenerating}
                styles={{
                  dropdownOptionText: {
                    color: isDark ? '#ffffff !important' : undefined,
                  },
                }}
              />

              <PrimaryButton
                text={isGenerating ? 'Generating...' : 'Generate'}
                onClick={handleGenerate}
                disabled={isGenerating || !hasAtLeastOneOption}
                iconProps={{ iconName: 'Play' }}
                styles={{ root: { marginTop: 8 } }}
              />
            </Stack>

            {/* Info message */}
            <MessageBar messageBarType={MessageBarType.info}>
              <Text variant="small">
                Generate a site script from the current site's configuration. 
                At least one option must be selected.
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
              height: showSaveForm ? 'calc(100vh - 420px)' : 'calc(100vh - 520px)',
              border: '1px solid #ccc',
              borderRadius: 2,
            }}
          />
        </Stack>
      </Stack>
    </Panel>
  )
}

export default GenerateFromSitePanel
