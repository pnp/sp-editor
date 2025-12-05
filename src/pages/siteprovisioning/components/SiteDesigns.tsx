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
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  DefaultButton,
  Stack,
  MessageBar,
  MessageBarType,
  Checkbox,
  Label,
} from '@fluentui/react'
import { IRootState } from '../../../store'
import { ISiteDesign, ISiteScript } from '../../../store/siteprovisioning/types'
import { setSelectedDesign } from '../../../store/siteprovisioning/actions'
import {
  loadAllSiteDesigns,
  createNewSiteDesign,
  updateExistingSiteDesign,
  ICreateSiteDesignInfo,
  IUpdateSiteDesignInfo,
} from '../chrome/chrome-actions'

interface ISiteDesignsProps {
  tabId: number | null
  addPanelOpen: boolean
  editPanelOpen: boolean
  onAddPanelDismiss: () => void
  onEditPanelDismiss: () => void
  onEditPanelOpen: () => void
  onSelectionChanged: (item: ISiteDesign | null) => void
}

const webTemplateOptions: IDropdownOption[] = [
  { key: '64', text: 'Team Site' },
  { key: '68', text: 'Communication Site' },
  { key: '1', text: 'Team Site (no Microsoft 365 Group)' },
]

const SiteDesigns = ({
  tabId,
  addPanelOpen,
  editPanelOpen,
  onAddPanelDismiss,
  onEditPanelDismiss,
  onEditPanelOpen,
  onSelectionChanged,
}: ISiteDesignsProps) => {
  const dispatch = useDispatch()
  const { siteDesigns, siteScripts, selectedDesignId } = useSelector(
    (state: IRootState) => state.siteProvisioning
  )

  // Add panel state
  const [addTitle, setAddTitle] = useState('')
  const [addDescription, setAddDescription] = useState('')
  const [addWebTemplate, setAddWebTemplate] = useState('64')
  const [addSelectedScripts, setAddSelectedScripts] = useState<string[]>([])
  const [addPreviewImageUrl, setAddPreviewImageUrl] = useState('')
  const [addPreviewImageAltText, setAddPreviewImageAltText] = useState('')
  const [addError, setAddError] = useState<string | null>(null)

  // Edit panel state
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editWebTemplate, setEditWebTemplate] = useState('64')
  const [editSelectedScripts, setEditSelectedScripts] = useState<string[]>([])
  const [editPreviewImageUrl, setEditPreviewImageUrl] = useState('')
  const [editPreviewImageAltText, setEditPreviewImageAltText] = useState('')
  const [editError, setEditError] = useState<string | null>(null)

  // Get selected design
  const selectedDesign = useMemo(
    () => siteDesigns.find((d) => d.Id === selectedDesignId) || null,
    [siteDesigns, selectedDesignId]
  )

  // Populate edit form when selected design changes
  useEffect(() => {
    if (selectedDesign && editPanelOpen) {
      setEditTitle(selectedDesign.Title)
      setEditDescription(selectedDesign.Description)
      setEditWebTemplate(selectedDesign.WebTemplate)
      setEditSelectedScripts(selectedDesign.SiteScriptIds || [])
      setEditPreviewImageUrl(selectedDesign.PreviewImageUrl || '')
      setEditPreviewImageAltText(selectedDesign.PreviewImageAltText || '')
      setEditError(null)
    }
  }, [selectedDesign, editPanelOpen])

  // Selection handler
  const selection = useMemo(
    () =>
      new Selection({
        onSelectionChanged: () => {
          const selected = selection.getSelection()[0] as ISiteDesign | undefined
          dispatch(setSelectedDesign(selected?.Id || null))
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
        maxWidth: 350,
        isResizable: true,
      },
      {
        key: 'webTemplate',
        name: 'Web Template',
        fieldName: 'WebTemplate',
        minWidth: 120,
        maxWidth: 150,
        isResizable: true,
        onRender: (item: ISiteDesign) => {
          const template = webTemplateOptions.find((o) => o.key === item.WebTemplate)
          return template?.text || item.WebTemplate
        },
      },
      {
        key: 'scripts',
        name: 'Scripts',
        minWidth: 60,
        maxWidth: 80,
        isResizable: true,
        onRender: (item: ISiteDesign) => item.SiteScriptIds?.length || 0,
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

  const handleScriptToggle = (scriptId: string, checked: boolean, isAdd: boolean) => {
    if (isAdd) {
      setAddSelectedScripts((prev) =>
        checked ? [...prev, scriptId] : prev.filter((id) => id !== scriptId)
      )
    } else {
      setEditSelectedScripts((prev) =>
        checked ? [...prev, scriptId] : prev.filter((id) => id !== scriptId)
      )
    }
  }

  const handleSaveAdd = useCallback(async () => {
    if (!tabId) return
    if (!addTitle.trim()) {
      setAddError('Title is required')
      return
    }

    // Close panel immediately (optimistic UI)
    const info: ICreateSiteDesignInfo = {
      title: addTitle,
      description: addDescription,
      webTemplate: addWebTemplate,
      siteScriptIds: addSelectedScripts,
      previewImageUrl: addPreviewImageUrl,
      previewImageAltText: addPreviewImageAltText,
    }
    onAddPanelDismiss()
    setAddTitle('')
    setAddDescription('')
    setAddWebTemplate('64')
    setAddSelectedScripts([])
    setAddPreviewImageUrl('')
    setAddPreviewImageAltText('')
    setAddError(null)

    try {
      await createNewSiteDesign(tabId, info)
      loadAllSiteDesigns(dispatch, tabId)
    } catch (err: any) {
      console.error('Failed to create site design:', err)
    }
  }, [
    tabId,
    addTitle,
    addDescription,
    addWebTemplate,
    addSelectedScripts,
    addPreviewImageUrl,
    addPreviewImageAltText,
    dispatch,
    onAddPanelDismiss,
  ])

  const handleSaveEdit = useCallback(async () => {
    if (!tabId || !selectedDesign) return
    if (!editTitle.trim()) {
      setEditError('Title is required')
      return
    }

    // Close panel immediately (optimistic UI)
    const info: IUpdateSiteDesignInfo = {
      id: selectedDesign.Id,
      title: editTitle,
      description: editDescription,
      webTemplate: editWebTemplate,
      siteScriptIds: editSelectedScripts,
      previewImageUrl: editPreviewImageUrl,
      previewImageAltText: editPreviewImageAltText,
    }
    onEditPanelDismiss()

    try {
      await updateExistingSiteDesign(tabId, info)
      loadAllSiteDesigns(dispatch, tabId)
    } catch (err: any) {
      console.error('Failed to update site design:', err)
    }
  }, [
    tabId,
    selectedDesign,
    editTitle,
    editDescription,
    editWebTemplate,
    editSelectedScripts,
    editPreviewImageUrl,
    editPreviewImageAltText,
    dispatch,
    onEditPanelDismiss,
  ])

  const handleAddPanelDismiss = () => {
    setAddError(null)
    onAddPanelDismiss()
  }

  const handleEditPanelDismiss = () => {
    setEditError(null)
    onEditPanelDismiss()
  }

  const renderScriptCheckboxes = (selectedScripts: string[], isAdd: boolean) => (
    <Stack tokens={{ childrenGap: 8 }}>
      <Label>Site Scripts</Label>
      {siteScripts.length === 0 ? (
        <MessageBar>No site scripts available. Create a site script first.</MessageBar>
      ) : (
        siteScripts.map((script: ISiteScript) => (
          <Checkbox
            key={script.Id}
            label={script.Title}
            checked={selectedScripts.includes(script.Id)}
            disabled={!isAdd && selectedDesign?.IsOOTB}
            onChange={(_, checked) => handleScriptToggle(script.Id, !!checked, isAdd)}
          />
        ))
      )}
    </Stack>
  )

  const handleItemInvoked = (item: ISiteDesign) => {
    dispatch(setSelectedDesign(item.Id))
    onSelectionChanged(item)
    onEditPanelOpen()
  }

  return (
    <>
      <DetailsList
        items={siteDesigns}
        columns={columns}
        setKey="Id"
        layoutMode={DetailsListLayoutMode.justified}
        selection={selection}
        selectionMode={SelectionMode.single}
        selectionPreservedOnEmptyClick={true}
        getKey={(item: ISiteDesign) => item.Id}
        onItemInvoked={handleItemInvoked}
      />

      {/* Add Design Panel */}
      <Panel
        headerText="New Site Design"
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
          <Dropdown
            label="Web Template"
            selectedKey={addWebTemplate}
            options={webTemplateOptions}
            onChange={(_, option) => option && setAddWebTemplate(option.key as string)}
          />
          {renderScriptCheckboxes(addSelectedScripts, true)}
          <TextField
            label="Preview Image URL"
            value={addPreviewImageUrl}
            onChange={(_, val) => setAddPreviewImageUrl(val || '')}
          />
          <TextField
            label="Preview Image Alt Text"
            value={addPreviewImageAltText}
            onChange={(_, val) => setAddPreviewImageAltText(val || '')}
          />
          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <PrimaryButton text="Create" onClick={handleSaveAdd} />
            <DefaultButton text="Cancel" onClick={handleAddPanelDismiss} />
          </Stack>
        </Stack>
      </Panel>

      {/* Edit/View Design Panel */}
      <Panel
        headerText={selectedDesign?.IsOOTB ? 'View Site Design (Microsoft)' : 'Edit Site Design'}
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
            required={!selectedDesign?.IsOOTB}
            readOnly={selectedDesign?.IsOOTB}
            value={editTitle}
            onChange={(_, val) => setEditTitle(val || '')}
          />
          <TextField
            label="Description"
            multiline
            rows={2}
            readOnly={selectedDesign?.IsOOTB}
            value={editDescription}
            onChange={(_, val) => setEditDescription(val || '')}
          />
          <Dropdown
            label="Web Template"
            selectedKey={editWebTemplate}
            options={webTemplateOptions}
            disabled={selectedDesign?.IsOOTB}
            onChange={(_, option) => option && setEditWebTemplate(option.key as string)}
          />
          {renderScriptCheckboxes(editSelectedScripts, false)}
          <TextField
            label="Preview Image URL"
            readOnly={selectedDesign?.IsOOTB}
            value={editPreviewImageUrl}
            onChange={(_, val) => setEditPreviewImageUrl(val || '')}
          />
          <TextField
            label="Preview Image Alt Text"
            readOnly={selectedDesign?.IsOOTB}
            value={editPreviewImageAltText}
            onChange={(_, val) => setEditPreviewImageAltText(val || '')}
          />
          {!selectedDesign?.IsOOTB && (
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

export default SiteDesigns
