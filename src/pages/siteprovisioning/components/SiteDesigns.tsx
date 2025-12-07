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
  ScrollablePane,
  Sticky,
  StickyPositionType,
  IDetailsHeaderProps,
  IRenderFunction,
  Overlay,
  Spinner,
  SpinnerSize,
  Dialog,
  DialogType,
  DialogFooter,
  Icon,
  SearchBox,
} from '@fluentui/react'
import { IRootState } from '../../../store'
import { ISiteDesign, ISiteScript } from '../../../store/siteprovisioning/types'
import { setSelectedDesign } from '../../../store/siteprovisioning/actions'
import {
  loadAllSiteDesigns,
  createNewSiteDesign,
  updateExistingSiteDesign,
  fetchSiteDesignStages,
  ICreateSiteDesignInfo,
  IUpdateSiteDesignInfo,
  ISiteDesignStage,
} from '../chrome/chrome-actions'

interface ISiteDesignsProps {
  tabId: number | null
  addPanelOpen: boolean
  editPanelOpen: boolean
  cloneData?: { title: string; description: string; webTemplate: string; scriptIds: string[]; previewImageUrl: string; previewImageAltText: string } | null
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
  cloneData,
  onAddPanelDismiss,
  onEditPanelDismiss,
  onEditPanelOpen,
  onSelectionChanged,
}: ISiteDesignsProps) => {
  const dispatch = useDispatch()
  const { siteDesigns, siteScripts, selectedDesignId, showOOTB } = useSelector(
    (state: IRootState) => state.siteProvisioning
  )
  const { isDark } = useSelector((state: IRootState) => state.home)

  // Preview dialog state
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [previewStages, setPreviewStages] = useState<ISiteDesignStage[]>([])
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewError, setPreviewError] = useState<string | null>(null)
  const [previewDesignTitle, setPreviewDesignTitle] = useState('')

  // Add panel state
  const [addTitle, setAddTitle] = useState('')
  const [addDescription, setAddDescription] = useState('')
  const [addWebTemplate, setAddWebTemplate] = useState('64')
  const [addSelectedScripts, setAddSelectedScripts] = useState<string[]>([])
  const [addPreviewImageUrl, setAddPreviewImageUrl] = useState('')
  const [addPreviewImageAltText, setAddPreviewImageAltText] = useState('')
  const [addError, setAddError] = useState<string | null>(null)
  const [addSaving, setAddSaving] = useState(false)

  // Edit panel state
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editWebTemplate, setEditWebTemplate] = useState('64')
  const [editSelectedScripts, setEditSelectedScripts] = useState<string[]>([])
  const [editPreviewImageUrl, setEditPreviewImageUrl] = useState('')
  const [editPreviewImageAltText, setEditPreviewImageAltText] = useState('')
  const [editError, setEditError] = useState<string | null>(null)
  const [editSaving, setEditSaving] = useState(false)

  // Filter state
  const [filterText, setFilterText] = useState('')

  // Get selected design
  const selectedDesign = useMemo(
    () => siteDesigns.find((d) => d.Id === selectedDesignId) || null,
    [siteDesigns, selectedDesignId]
  )

  // Filter designs by title, description, or ID
  const filteredDesigns = useMemo(() => {
    if (!filterText.trim()) return siteDesigns
    const searchLower = filterText.toLowerCase()
    return siteDesigns.filter(
      (design) =>
        design.Title.toLowerCase().includes(searchLower) ||
        (design.Description && design.Description.toLowerCase().includes(searchLower)) ||
        design.Id.toLowerCase().includes(searchLower)
    )
  }, [siteDesigns, filterText])

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

  // Populate add form with clone data when cloning
  useEffect(() => {
    if (cloneData && addPanelOpen) {
      setAddTitle(cloneData.title)
      setAddDescription(cloneData.description)
      setAddWebTemplate(cloneData.webTemplate)
      setAddSelectedScripts(cloneData.scriptIds)
      setAddPreviewImageUrl(cloneData.previewImageUrl)
      setAddPreviewImageAltText(cloneData.previewImageAltText)
      setAddError(null)
    }
  }, [cloneData, addPanelOpen])

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
        key: 'source',
        name: 'Source',
        minWidth: 80,
        maxWidth: 100,
        isResizable: true,
        onRender: (item: ISiteDesign) => (
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

  const handleSaveAdd = useCallback(async () => {
    if (!tabId) return
    if (!addTitle.trim()) {
      setAddError('Title is required')
      return
    }

    setAddError(null)
    setAddSaving(true)

    const info: ICreateSiteDesignInfo = {
      title: addTitle,
      description: addDescription,
      webTemplate: addWebTemplate,
      siteScriptIds: addSelectedScripts,
      previewImageUrl: addPreviewImageUrl,
      previewImageAltText: addPreviewImageAltText,
    }

    try {
      const result = await createNewSiteDesign(tabId, info)
      
      // Show preview dialog with stages
      setPreviewDesignTitle(addTitle)
      setPreviewLoading(true)
      setPreviewError(null)
      setPreviewDialogOpen(true)
      
      try {
        const stagesResult = await fetchSiteDesignStages(tabId, result.Id)
        setPreviewStages(stagesResult.stages)
      } catch (stageErr: any) {
        setPreviewError(stageErr.message || 'Failed to load preview')
        setPreviewStages([])
      } finally {
        setPreviewLoading(false)
      }
      
      // Success - close panel and reset form
      onAddPanelDismiss()
      setAddTitle('')
      setAddDescription('')
      setAddWebTemplate('64')
      setAddSelectedScripts([])
      setAddPreviewImageUrl('')
      setAddPreviewImageAltText('')
      loadAllSiteDesigns(dispatch, tabId, showOOTB)
    } catch (err: any) {
      setAddError(err.message || 'Failed to create site design')
    } finally {
      setAddSaving(false)
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
    showOOTB,
  ])

  const handleSaveEdit = useCallback(async () => {
    if (!tabId || !selectedDesign) return
    if (!editTitle.trim()) {
      setEditError('Title is required')
      return
    }

    setEditError(null)
    setEditSaving(true)

    const info: IUpdateSiteDesignInfo = {
      id: selectedDesign.Id,
      title: editTitle,
      description: editDescription,
      webTemplate: editWebTemplate,
      siteScriptIds: editSelectedScripts,
      previewImageUrl: editPreviewImageUrl,
      previewImageAltText: editPreviewImageAltText,
    }

    try {
      await updateExistingSiteDesign(tabId, info)
      
      // Show preview dialog with stages
      setPreviewDesignTitle(editTitle)
      setPreviewLoading(true)
      setPreviewError(null)
      setPreviewDialogOpen(true)
      
      try {
        const stagesResult = await fetchSiteDesignStages(tabId, selectedDesign.Id)
        setPreviewStages(stagesResult.stages)
      } catch (stageErr: any) {
        setPreviewError(stageErr.message || 'Failed to load preview')
        setPreviewStages([])
      } finally {
        setPreviewLoading(false)
      }
      
      // Success - close panel
      onEditPanelDismiss()
      loadAllSiteDesigns(dispatch, tabId, showOOTB)
    } catch (err: any) {
      setEditError(err.message || 'Failed to update site design')
    } finally {
      setEditSaving(false)
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
    showOOTB,
  ])

  const handleAddPanelDismiss = () => {
    setAddError(null)
    onAddPanelDismiss()
  }

  const handleEditPanelDismiss = () => {
    setEditError(null)
    onEditPanelDismiss()
  }

  const handleItemInvoked = (item: ISiteDesign) => {
    dispatch(setSelectedDesign(item.Id))
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
        <div style={{ padding: '0 0 10px 0' }}>
          <SearchBox
            placeholder="Filter by title, description, or ID..."
            value={filterText}
            onChange={(_, newValue) => setFilterText(newValue || '')}
            onClear={() => setFilterText('')}
            styles={{ root: { maxWidth: 400 } }}
          />
        </div>
        <ScrollablePane styles={{ root: { top: 42 } }}>
          <DetailsList
            items={filteredDesigns}
            columns={columns}
            setKey="Id"
            layoutMode={DetailsListLayoutMode.justified}
            selection={selection}
            selectionMode={SelectionMode.single}
            selectionPreservedOnEmptyClick={true}
            getKey={(item: ISiteDesign) => item.Id}
            onItemInvoked={handleItemInvoked}
            onRenderDetailsHeader={onRenderDetailsHeader}
          />
        </ScrollablePane>
      </div>

      {/* Add Design Panel */}
      <Panel
        headerText="New Site Design"
        isOpen={addPanelOpen}
        onDismiss={handleAddPanelDismiss}
        type={PanelType.medium}
        closeButtonAriaLabel="Close"
        isLightDismiss={!addSaving}
      >
        <div style={{ position: 'relative' }}>
          {addSaving && (
            <Overlay styles={{ root: { position: 'absolute', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' } }}>
              <Spinner size={SpinnerSize.large} label="Saving..." />
            </Overlay>
          )}
        <Stack tokens={{ childrenGap: 15 }} styles={{ root: { marginTop: 20 } }}>
          {addError && (
            <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setAddError(null)}>
              {addError}
            </MessageBar>
          )}
          <TextField label="Title" required value={addTitle} onChange={(_, val) => setAddTitle(val || '')} />
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
            <PrimaryButton text="Create" onClick={handleSaveAdd} disabled={addSaving} />
            <DefaultButton text="Cancel" onClick={handleAddPanelDismiss} disabled={addSaving} />
          </Stack>
        </Stack>
        </div>
      </Panel>

      {/* Edit/View Design Panel */}
      <Panel
        headerText={selectedDesign?.IsOOTB ? 'View Site Design (Microsoft)' : 'Edit Site Design'}
        isOpen={editPanelOpen}
        onDismiss={handleEditPanelDismiss}
        type={PanelType.medium}
        closeButtonAriaLabel="Close"
        isLightDismiss={!editSaving}
      >
        <div style={{ position: 'relative' }}>
          {editSaving && (
            <Overlay styles={{ root: { position: 'absolute', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' } }}>
              <Spinner size={SpinnerSize.large} label="Saving..." />
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
              <PrimaryButton text="Save" onClick={handleSaveEdit} disabled={editSaving} />
              <DefaultButton text="Cancel" onClick={handleEditPanelDismiss} disabled={editSaving} />
            </Stack>
          )}
        </Stack>
        </div>
      </Panel>

      {/* Preview Dialog - Shows stages/actions after save */}
      <Dialog
        hidden={!previewDialogOpen}
        onDismiss={() => setPreviewDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Site Design Saved',
          subText: `Preview of actions for "${previewDesignTitle}"`,
        }}
        modalProps={{
          isBlocking: false,
          styles: { 
            main: { 
              maxWidth: '700px !important', 
              minWidth: '500px !important',
              width: '90vw',
            } 
          },
        }}
      >
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          {previewLoading && (
            <Stack horizontalAlign="center" tokens={{ padding: 20 }}>
              <Spinner size={SpinnerSize.medium} label="Loading preview..." />
            </Stack>
          )}
          
          {previewError && (
            <MessageBar messageBarType={MessageBarType.warning}>
              {previewError}
            </MessageBar>
          )}
          
          {!previewLoading && !previewError && previewStages.length === 0 && (
            <MessageBar messageBarType={MessageBarType.info}>
              No actions found in this site design, or the preview is not available.
            </MessageBar>
          )}
          
          {!previewLoading && previewStages.length > 0 && (
            <Stack tokens={{ childrenGap: 8 }}>
              <Label>Updates that will be made to your site:</Label>
              {previewStages.map((stage, index) => (
                <Stack 
                  key={index} 
                  horizontal 
                  verticalAlign="start" 
                  tokens={{ childrenGap: 10 }}
                  styles={{
                    root: {
                      padding: '8px 12px',
                      backgroundColor: isDark ? '#2d2d2d' : '#f3f2f1',
                      borderRadius: 4,
                    }
                  }}
                >
                  <Icon 
                    iconName="CheckMark" 
                    styles={{ 
                      root: { 
                        color: '#107c10',
                        marginTop: 2,
                        fontSize: 14
                      } 
                    }} 
                  />
                  <Stack tokens={{ childrenGap: 2 }}>
                    <span style={{ 
                      fontWeight: 500,
                      color: isDark ? '#ffffff' : '#323130'
                    }}>
                      {stage.title}
                    </span>
                    {stage.outcome && (
                      <span style={{ 
                        fontSize: 12, 
                        color: isDark ? '#d2d0ce' : '#605e5c' 
                      }}>
                        {stage.outcome}
                      </span>
                    )}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          )}
        </div>
        <DialogFooter>
          <PrimaryButton onClick={() => setPreviewDialogOpen(false)} text="OK" />
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default SiteDesigns
