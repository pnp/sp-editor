import { useEffect, useMemo, useState, useCallback } from 'react'
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
  const { siteScripts, selectedScriptId } = useSelector(
    (state: IRootState) => state.siteProvisioning
  )

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

  // Get selected script
  const selectedScript = useMemo(
    () => siteScripts.find((s) => s.Id === selectedScriptId) || null,
    [siteScripts, selectedScriptId]
  )

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
      // Success - close panel and reset form
      onAddPanelDismiss()
      setAddTitle('')
      setAddDescription('')
      setAddContent('{\n  "$schema": "https://developer.microsoft.com/json-schemas/sp/site-design-script-actions.schema.json",\n  "actions": [],\n  "version": 1\n}')
      loadAllSiteScripts(dispatch, tabId)
    } catch (err: any) {
      setAddError(err.message || 'Failed to create site script')
    } finally {
      setAddSaving(false)
    }
  }, [tabId, addTitle, addDescription, addContent, dispatch, onAddPanelDismiss])

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
      // Success - close panel
      onEditPanelDismiss()
      loadAllSiteScripts(dispatch, tabId)
    } catch (err: any) {
      setEditError(err.message || 'Failed to update site script')
    } finally {
      setEditSaving(false)
    }
  }, [tabId, selectedScript, editTitle, editDescription, editContent, dispatch, onEditPanelDismiss])

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
      <div style={{ height: 'calc(100vh - 200px)', position: 'relative' }}>
        <ScrollablePane>
          <DetailsList
            items={siteScripts}
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
          <TextField
            label="Script Content (JSON)"
            required
            multiline
            rows={15}
            value={addContent}
            onChange={(_, val) => setAddContent(val || '')}
            styles={{ field: { fontFamily: 'monospace', fontSize: 12 } }}
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
          <TextField
            required={!selectedScript?.IsOOTB}
            multiline
            rows={15}
            readOnly={selectedScript?.IsOOTB}
            value={editContent}
            onChange={(_, val) => setEditContent(val || '')}
            styles={{ field: { fontFamily: 'monospace', fontSize: 12 } }}
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
