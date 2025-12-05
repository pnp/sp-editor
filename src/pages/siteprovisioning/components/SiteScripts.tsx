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
  Stack,
  MessageBar,
  MessageBarType,
} from '@fluentui/react'
import { IRootState } from '../../../store'
import { ISiteScript } from '../../../store/siteprovisioning/types'
import { setSelectedScript } from '../../../store/siteprovisioning/actions'
import {
  loadAllSiteScripts,
  createNewSiteScript,
  updateExistingSiteScript,
} from '../chrome/chrome-actions'

interface ISiteScriptsProps {
  tabId: number | null
  addPanelOpen: boolean
  editPanelOpen: boolean
  onAddPanelDismiss: () => void
  onEditPanelDismiss: () => void
  onEditPanelOpen: () => void
  onSelectionChanged: (item: ISiteScript | null) => void
}

const SiteScripts = ({
  tabId,
  addPanelOpen,
  editPanelOpen,
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

  // Edit panel state
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editContent, setEditContent] = useState('')
  const [editError, setEditError] = useState<string | null>(null)

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

    // Validate JSON
    try {
      JSON.parse(addContent)
    } catch {
      setAddError('Invalid JSON content')
      return
    }

    // Close panel immediately (optimistic UI)
    const title = addTitle
    const description = addDescription
    const content = addContent
    onAddPanelDismiss()
    setAddTitle('')
    setAddDescription('')
    setAddContent('{\n  "$schema": "https://developer.microsoft.com/json-schemas/sp/site-design-script-actions.schema.json",\n  "actions": [],\n  "version": 1\n}')
    setAddError(null)

    try {
      await createNewSiteScript(tabId, title, description, content)
      loadAllSiteScripts(dispatch, tabId)
    } catch (err: any) {
      console.error('Failed to create site script:', err)
    }
  }, [tabId, addTitle, addDescription, addContent, dispatch, onAddPanelDismiss])

  const handleSaveEdit = useCallback(async () => {
    if (!tabId || !selectedScript) return
    if (!editTitle.trim()) {
      setEditError('Title is required')
      return
    }

    // Validate JSON
    try {
      JSON.parse(editContent)
    } catch {
      setEditError('Invalid JSON content')
      return
    }

    // Close panel immediately (optimistic UI)
    const id = selectedScript.Id
    const title = editTitle
    const description = editDescription
    const content = editContent
    onEditPanelDismiss()

    try {
      await updateExistingSiteScript(tabId, id, title, description, content)
      loadAllSiteScripts(dispatch, tabId)
    } catch (err: any) {
      console.error('Failed to update site script:', err)
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

  return (
    <>
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
      />

      {/* Add Script Panel */}
      <Panel
        headerText="New Site Script"
        isOpen={addPanelOpen}
        onDismiss={handleAddPanelDismiss}
        type={PanelType.medium}
        closeButtonAriaLabel="Close"
        isLightDismiss={true}
      >
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
            <PrimaryButton text="Create" onClick={handleSaveAdd} />
            <DefaultButton text="Cancel" onClick={handleAddPanelDismiss} />
          </Stack>
        </Stack>
      </Panel>

      {/* Edit/View Script Panel */}
      <Panel
        headerText={selectedScript?.IsOOTB ? 'View Site Script (Microsoft)' : 'Edit Site Script'}
        isOpen={editPanelOpen}
        onDismiss={handleEditPanelDismiss}
        type={PanelType.medium}
        closeButtonAriaLabel="Close"
        isLightDismiss={true}
      >
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
          <TextField
            label="Script Content (JSON)"
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
              <PrimaryButton text="Save" onClick={handleSaveEdit} />
              <DefaultButton text="Cancel" onClick={handleEditPanelDismiss} />
            </Stack>
          )}
        </Stack>
      </Panel>
    </>
  )
}

export default SiteScripts
