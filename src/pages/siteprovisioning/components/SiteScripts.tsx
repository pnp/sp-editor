import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  Panel,
  PanelType,
  TextField,
  PrimaryButton,
  DefaultButton,
  IconButton,
  Stack,
  MessageBar,
  MessageBarType,
  ScrollablePane,
  Sticky,
  StickyPositionType,
  IDetailsHeaderProps,
  IRenderFunction,
  Overlay,
  Spinner,
  SpinnerSize,
  Label,
  SearchBox,
} from '@fluentui/react'
import { IRootState } from '../../../store'
import { ISiteScript } from '../../../store/siteprovisioning/types'
import { setSelectedScript } from '../../../store/siteprovisioning/actions'
import { setAppMessage } from '../../../store/home/actions'
import { MessageBarColors } from '../../../store/home/types'
import {
  loadAllSiteScripts,
  createNewSiteScript,
  updateExistingSiteScript,
} from '../chrome/chrome-actions'

interface ISiteScriptsProps {
  tabId: number | null
  addPanelOpen: boolean
  editPanelOpen: boolean
  cloneData?: { title: string; description: string; content: string } | null
  onAddPanelDismiss: () => void
  onEditPanelDismiss: () => void
  onEditPanelOpen: () => void
  onSelectionChanged: (item: ISiteScript | null) => void
}

const SiteScripts = ({
  tabId,
  addPanelOpen,
  editPanelOpen,
  cloneData,
  onAddPanelDismiss,
  onEditPanelDismiss,
  onEditPanelOpen,
  onSelectionChanged,
}: ISiteScriptsProps) => {
  const dispatch = useDispatch()
  const { siteScripts, selectedScriptId, showOOTB } = useSelector(
    (state: IRootState) => state.siteProvisioning
  )
  const { isDark } = useSelector((state: IRootState) => state.home)

  // Monaco editor refs
  const addEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const editEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const addEditorDivRef = useRef<HTMLDivElement | null>(null)
  const editEditorDivRef = useRef<HTMLDivElement | null>(null)
  const [addEditorInitialized, setAddEditorInitialized] = useState(false)
  const [editEditorInitialized, setEditEditorInitialized] = useState(false)

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

  // Add panel state
  const [addTitle, setAddTitle] = useState('')
  const [addDescription, setAddDescription] = useState('')
  const [addContent, setAddContent] = useState('{\n  "$schema": "https://developer.microsoft.com/json-schemas/sp/site-design-script-actions.schema.json",\n  "actions": [],\n  "version": 1\n}')
  const [addError, setAddError] = useState<string | null>(null)
  const [addSaving, setAddSaving] = useState(false)

  // Edit panel state
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editError, setEditError] = useState<string | null>(null)
  const [editSaving, setEditSaving] = useState(false)

  // Filter state
  const [filterText, setFilterText] = useState('')

  // Get selected script
  const selectedScript = useMemo(
    () => siteScripts.find((s) => s.Id === selectedScriptId) || null,
    [siteScripts, selectedScriptId]
  )

  // Filter scripts by title, description, or ID
  const filteredScripts = useMemo(() => {
    if (!filterText.trim()) return siteScripts
    const searchLower = filterText.toLowerCase()
    return siteScripts.filter(
      (script) =>
        script.Title.toLowerCase().includes(searchLower) ||
        script.Description.toLowerCase().includes(searchLower) ||
        script.Id.toLowerCase().includes(searchLower)
    )
  }, [siteScripts, filterText])

  // Populate edit form when selected script changes
  useEffect(() => {
    if (selectedScript && editPanelOpen) {
      setEditTitle(selectedScript.Title)
      setEditDescription(selectedScript.Description)
      setEditContent(selectedScript.Content)
      setEditError(null)
    }
  }, [selectedScript, editPanelOpen])

  // Populate add form with clone data when cloning
  useEffect(() => {
    if (cloneData && addPanelOpen) {
      setAddTitle(cloneData.title)
      setAddDescription(cloneData.description)
      setAddContent(cloneData.content)
      setAddError(null)
    }
  }, [cloneData, addPanelOpen])

  // Monaco theme handling
  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
  }, [isDark])

  // Initialize Add Editor
  const initAddEditor = useCallback(() => {
    if (addEditorDivRef.current && !addEditorRef.current) {
      // Use unique URI to avoid model conflicts
      const uri = monaco.Uri.parse(`inmemory://add-script-${Date.now()}.json`)
      addEditorRef.current = monaco.editor.create(addEditorDivRef.current, {
        model: monaco.editor.createModel(addContent, 'json', uri),
        ...MONACO_CONFIG,
        readOnly: false,
      })
      addEditorRef.current.onDidChangeModelContent(() => {
        const value = addEditorRef.current?.getValue() || ''
        setAddContent(value)
      })
      setTimeout(() => window.dispatchEvent(new Event('resize')), 1)
    }
  }, [MONACO_CONFIG, addContent])

  // Initialize Edit Editor
  const initEditEditor = useCallback(() => {
    if (editEditorDivRef.current && !editEditorRef.current) {
      // Use unique URI to avoid model conflicts
      const uri = monaco.Uri.parse(`inmemory://edit-script-${Date.now()}.json`)
      editEditorRef.current = monaco.editor.create(editEditorDivRef.current, {
        model: monaco.editor.createModel(editContent, 'json', uri),
        ...MONACO_CONFIG,
        readOnly: selectedScript?.IsOOTB || false,
      })
      editEditorRef.current.onDidChangeModelContent(() => {
        const value = editEditorRef.current?.getValue() || ''
        setEditContent(value)
      })
      setTimeout(() => window.dispatchEvent(new Event('resize')), 1)
    }
  }, [MONACO_CONFIG, editContent, selectedScript?.IsOOTB])

  // Initialize add editor when panel opens
  useEffect(() => {
    if (addPanelOpen && !addEditorInitialized) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        initAddEditor()
        setAddEditorInitialized(true)
      }, 100)
    }
    if (!addPanelOpen && addEditorRef.current) {
      // Dispose model first, then editor
      const model = addEditorRef.current.getModel()
      if (model) model.dispose()
      addEditorRef.current.dispose()
      addEditorRef.current = null
      setAddEditorInitialized(false)
    }
  }, [addPanelOpen, addEditorInitialized, initAddEditor])

  // Initialize edit editor when panel opens
  useEffect(() => {
    if (editPanelOpen && !editEditorInitialized) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        initEditEditor()
        setEditEditorInitialized(true)
      }, 100)
    }
    if (!editPanelOpen && editEditorRef.current) {
      // Dispose model first, then editor
      const model = editEditorRef.current.getModel()
      if (model) model.dispose()
      editEditorRef.current.dispose()
      editEditorRef.current = null
      setEditEditorInitialized(false)
    }
  }, [editPanelOpen, editEditorInitialized, initEditEditor])

  // Update edit editor content when selected script changes
  useEffect(() => {
    if (editEditorRef.current && editEditorInitialized && selectedScript) {
      const currentValue = editEditorRef.current.getValue()
      if (currentValue !== selectedScript.Content) {
        editEditorRef.current.setValue(selectedScript.Content)
      }
      editEditorRef.current.updateOptions({ readOnly: selectedScript.IsOOTB || false })
    }
  }, [selectedScript, editEditorInitialized])

  // Update add editor content when clone data changes
  useEffect(() => {
    if (addEditorRef.current && addEditorInitialized && cloneData) {
      addEditorRef.current.setValue(cloneData.content)
    }
  }, [cloneData, addEditorInitialized])

  // Selection handler
  const selection = useMemo(
    () =>
      new Selection({
        onSelectionChanged: () => {
          const selected = selection.getSelection()[0] as ISiteScript | undefined
          dispatch(setSelectedScript(selected?.Id || null))
          onSelectionChanged(selected || null)
        },
      }),
    [dispatch, onSelectionChanged]
  )

  const columns: IColumn[] = useMemo(
    () => [
      {
        key: 'title',
        name: 'Title',
        fieldName: 'Title',
        minWidth: 150,
        maxWidth: 250,
        isResizable: true,
      },
      {
        key: 'description',
        name: 'Description',
        fieldName: 'Description',
        minWidth: 200,
        maxWidth: 400,
        isResizable: true,
      },
      {
        key: 'version',
        name: 'Version',
        fieldName: 'Version',
        minWidth: 60,
        maxWidth: 80,
        isResizable: true,
      },
      {
        key: 'source',
        name: 'Source',
        minWidth: 80,
        maxWidth: 100,
        isResizable: true,
        onRender: (item: ISiteScript) => (
          <span style={{ color: item.IsOOTB ? '#0078d4' : '#107c10' }}>
            {item.IsOOTB ? 'Microsoft' : 'Custom'}
          </span>
        ),
      },
      {
        key: 'id',
        name: 'ID',
        fieldName: 'Id',
        minWidth: 250,
        maxWidth: 300,
        isResizable: true,
      },
    ],
    []
  )

  const handleSaveAdd = useCallback(async () => {
    if (!tabId) return
    if (!addTitle.trim()) {
      setAddError('Title is required')
      return
    }

    setAddError(null)
    setAddSaving(true)

    try {
      await createNewSiteScript(tabId, addTitle, addDescription, addContent)
      
      // Close panel and reset form
      onAddPanelDismiss()
      setAddTitle('')
      setAddDescription('')
      setAddContent('{\n  "$schema": "https://developer.microsoft.com/json-schemas/sp/site-design-script-actions.schema.json",\n  "actions": [],\n  "version": 1\n}')
      loadAllSiteScripts(dispatch, tabId, showOOTB)
    } catch (err: any) {
      setAddError(err.message || 'Failed to create site script')
    } finally {
      setAddSaving(false)
    }
  }, [tabId, addTitle, addDescription, addContent, dispatch, onAddPanelDismiss, showOOTB])

  const handleSaveEdit = useCallback(async () => {
    if (!tabId || !selectedScript) return
    if (!editTitle.trim()) {
      setEditError('Title is required')
      return
    }

    setEditError(null)
    setEditSaving(true)

    try {
      await updateExistingSiteScript(tabId, selectedScript.Id, editTitle, editDescription, editContent)
      
      // Close panel
      onEditPanelDismiss()
      loadAllSiteScripts(dispatch, tabId, showOOTB)
    } catch (err: any) {
      setEditError(err.message || 'Failed to update site script')
    } finally {
      setEditSaving(false)
    }
  }, [tabId, selectedScript, editTitle, editDescription, editContent, dispatch, onEditPanelDismiss, showOOTB])

  const handleAddPanelDismiss = () => {
    setAddError(null)
    onAddPanelDismiss()
  }

  const handleEditPanelDismiss = () => {
    setEditError(null)
    onEditPanelDismiss()
  }

  const handleItemInvoked = (item: ISiteScript) => {
    dispatch(setSelectedScript(item.Id))
    onSelectionChanged(item)
    onEditPanelOpen()
  }

  const onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (props, defaultRender) => {
    if (!props || !defaultRender) return null
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
        {defaultRender(props)}
      </Sticky>
    )
  }

  return (
    <>
      <Stack tokens={{ childrenGap: 8 }} styles={{ root: { marginBottom: 8 } }}>
        <SearchBox
          placeholder="Filter by title, description, or ID..."
          value={filterText}
          onChange={(_, newValue) => setFilterText(newValue || '')}
          onClear={() => setFilterText('')}
          styles={{ root: { maxWidth: 400 } }}
        />
      </Stack>
      <div style={{ height: 'calc(100vh - 240px)', position: 'relative' }}>
        <ScrollablePane>
          <DetailsList
            items={filteredScripts}
            columns={columns}
            setKey="Id"
            layoutMode={DetailsListLayoutMode.justified}
            selection={selection}
            selectionMode={SelectionMode.single}
            selectionPreservedOnEmptyClick={true}
            getKey={(item: ISiteScript) => item.Id}
            onItemInvoked={handleItemInvoked}
            onRenderDetailsHeader={onRenderDetailsHeader}
          />
        </ScrollablePane>
      </div>

      {/* Add Script Panel */}
      <Panel
        headerText="New Site Script"
        isOpen={addPanelOpen}
        onDismiss={handleAddPanelDismiss}
        type={PanelType.medium}
        closeButtonAriaLabel="Close"
        isLightDismiss={!addSaving}
      >
        <div style={{ position: 'relative' }}>
          {addSaving && (
            <Overlay styles={{ root: { zIndex: 1 } }}>
              <Stack verticalAlign="center" horizontalAlign="center" styles={{ root: { height: '100%' } }}>
                <Spinner size={SpinnerSize.large} label="Saving..." />
              </Stack>
            </Overlay>
          )}
          <Stack tokens={{ childrenGap: 15 }} styles={{ root: { marginTop: 20 } }}>
          {addError && (
            <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setAddError(null)}>
              {addError}
            </MessageBar>
          )}
          <TextField
            label="Title"
            required
            value={addTitle}
            onChange={(_, val) => setAddTitle(val || '')}
          />
          <TextField
            label="Description"
            multiline
            rows={2}
            value={addDescription}
            onChange={(_, val) => setAddDescription(val || '')}
          />
          <Label required>Script Content (JSON)</Label>
          <div
            ref={addEditorDivRef}
            style={{
              height: 300,
              border: '1px solid #ccc',
              borderRadius: 2,
            }}
          />
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <PrimaryButton text="Create" onClick={handleSaveAdd} disabled={addSaving} />
            <DefaultButton text="Cancel" onClick={handleAddPanelDismiss} disabled={addSaving} />
          </Stack>
        </Stack>
        </div>
      </Panel>

      {/* Edit/View Script Panel */}
      <Panel
        headerText={selectedScript?.IsOOTB ? 'View Site Script (Microsoft)' : 'Edit Site Script'}
        isOpen={editPanelOpen}
        onDismiss={handleEditPanelDismiss}
        type={PanelType.medium}
        closeButtonAriaLabel="Close"
        isLightDismiss={!editSaving}
      >
        <div style={{ position: 'relative' }}>
          {editSaving && (
            <Overlay styles={{ root: { zIndex: 1 } }}>
              <Stack verticalAlign="center" horizontalAlign="center" styles={{ root: { height: '100%' } }}>
                <Spinner size={SpinnerSize.large} label="Saving..." />
              </Stack>
            </Overlay>
          )}
          <Stack tokens={{ childrenGap: 15 }} styles={{ root: { marginTop: 20 } }}>
          {editError && (
            <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setEditError(null)}>
              {editError}
            </MessageBar>
          )}
          <TextField
            label="Title"
            required={!selectedScript?.IsOOTB}
            readOnly={selectedScript?.IsOOTB}
            value={editTitle}
            onChange={(_, val) => setEditTitle(val || '')}
          />
          <TextField
            label="Description"
            multiline
            rows={2}
            readOnly={selectedScript?.IsOOTB}
            value={editDescription}
            onChange={(_, val) => setEditDescription(val || '')}
          />
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <Label>Script Content (JSON)</Label>
            <Stack horizontal tokens={{ childrenGap: 4 }}>
              <IconButton
                iconProps={{ iconName: 'Copy' }}
                title="Copy to clipboard"
                ariaLabel="Copy to clipboard"
                onClick={() => {
                  const textarea = document.createElement('textarea')
                  textarea.value = editContent
                  document.body.appendChild(textarea)
                  textarea.select()
                  document.execCommand('copy')
                  document.body.removeChild(textarea)
                  dispatch(setAppMessage({
                    showMessage: true,
                    message: 'Copied to clipboard!',
                    color: MessageBarColors.success,
                  }))
                }}
              />
              <IconButton
                iconProps={{ iconName: 'Download' }}
                title="Download as JSON"
                ariaLabel="Download as JSON"
                onClick={() => {
                  const blob = new Blob([editContent], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `${editTitle || 'sitescript'}.json`
                  document.body.appendChild(a)
                  a.click()
                  document.body.removeChild(a)
                  URL.revokeObjectURL(url)
                }}
              />
            </Stack>
          </Stack>
          <div
            ref={editEditorDivRef}
            style={{
              height: 300,
              border: '1px solid #ccc',
              borderRadius: 2,
            }}
          />
          {!selectedScript?.IsOOTB && (
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <PrimaryButton text="Save" onClick={handleSaveEdit} disabled={editSaving} />
              <DefaultButton text="Cancel" onClick={handleEditPanelDismiss} disabled={editSaving} />
            </Stack>
          )}
        </Stack>
        </div>
      </Panel>
    </>
  )
}

export default SiteScripts
