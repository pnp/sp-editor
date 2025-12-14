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
  IconButton,
  Stack,
  MessageBar,
  MessageBarType,
  Label,
  Text,
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
  Toggle,
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
  const [addIsDefault, setAddIsDefault] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)
  const [addSaving, setAddSaving] = useState(false)

  // Edit panel state
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editWebTemplate, setEditWebTemplate] = useState('64')
  const [editSelectedScripts, setEditSelectedScripts] = useState<string[]>([])
  const [editPreviewImageUrl, setEditPreviewImageUrl] = useState('')
  const [editPreviewImageAltText, setEditPreviewImageAltText] = useState('')
  const [editIsDefault, setEditIsDefault] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)
  const [editSaving, setEditSaving] = useState(false)

  // Filter state
  const [filterText, setFilterText] = useState('')
  
  // Script picker filter state for each panel
  const [addScriptFilter, setAddScriptFilter] = useState('')
  const [editScriptFilter, setEditScriptFilter] = useState('')

  // Drag and drop state
  const [draggedScriptId, setDraggedScriptId] = useState<string | null>(null)
  const [dragOverScriptId, setDragOverScriptId] = useState<string | null>(null)

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
      setEditIsDefault(selectedDesign.IsDefault || false)
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
        key: 'isDefault',
        name: 'Default',
        minWidth: 60,
        maxWidth: 80,
        isResizable: true,
        onRender: (item: ISiteDesign) => (
          item.IsDefault ? (
            <Icon iconName="CheckMark" styles={{ root: { color: '#107c10', fontSize: 14 } }} title="Default for this web template" />
          ) : null
        ),
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

  // Handle drag and drop reordering
  const handleDragStart = (e: React.DragEvent, scriptId: string) => {
    setDraggedScriptId(scriptId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, scriptId: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (scriptId !== draggedScriptId) {
      setDragOverScriptId(scriptId)
    }
  }

  const handleDragLeave = () => {
    setDragOverScriptId(null)
  }

  const handleDrop = (e: React.DragEvent, targetScriptId: string, isAdd: boolean) => {
    e.preventDefault()
    if (!draggedScriptId || draggedScriptId === targetScriptId) {
      setDraggedScriptId(null)
      setDragOverScriptId(null)
      return
    }

    const setScripts = isAdd ? setAddSelectedScripts : setEditSelectedScripts
    setScripts((prev) => {
      const draggedIndex = prev.indexOf(draggedScriptId)
      const targetIndex = prev.indexOf(targetScriptId)
      if (draggedIndex === -1 || targetIndex === -1) return prev

      const newArray = [...prev]
      newArray.splice(draggedIndex, 1)
      newArray.splice(targetIndex, 0, draggedScriptId)
      return newArray
    })

    setDraggedScriptId(null)
    setDragOverScriptId(null)
  }

  const handleDragEnd = () => {
    setDraggedScriptId(null)
    setDragOverScriptId(null)
  }

  // Compact script picker with search and selected chips
  // Render the script picker (2 columns: selected scripts + available scripts with search)
  const renderScriptPicker = (
    selectedScripts: string[], 
    isAdd: boolean, 
    filterValue: string, 
    setFilterValue: (val: string) => void,
    isReadOnly: boolean = false
  ) => {
    // Filter available scripts (search by title or ID)
    const availableScripts = siteScripts.filter((script: ISiteScript) => {
      const searchLower = filterValue.trim().toLowerCase()
      const matchesFilter = !searchLower || 
        script.Title.toLowerCase().includes(searchLower) ||
        script.Id.toLowerCase().includes(searchLower)
      const notSelected = !selectedScripts.includes(script.Id)
      return matchesFilter && notSelected
    })

    // Get selected script objects
    const selectedScriptObjects = selectedScripts
      .map((id) => siteScripts.find((s: ISiteScript) => s.Id === id))
      .filter(Boolean) as ISiteScript[]

    return (
      <Stack horizontal tokens={{ childrenGap: 16 }} styles={{ root: { flex: 1 } }}>
        {/* Middle column - Selected Scripts */}
        <Stack tokens={{ childrenGap: 8 }} styles={{ root: { flex: 1, minWidth: 0 } }}>
          <Label>Selected Scripts ({selectedScripts.length})</Label>
          {selectedScripts.length === 0 ? (
            <Stack 
              styles={{ 
                root: { 
                  flex: 1,
                  padding: 16, 
                  backgroundColor: isDark ? '#1e1e1e' : '#faf9f8',
                  borderRadius: 4,
                  border: `1px solid ${isDark ? '#333' : '#edebe9'}`,
                  justifyContent: 'center',
                  alignItems: 'center',
                } 
              }}
            >
              <Text variant="small" styles={{ root: { fontStyle: 'italic', opacity: 0.7, textAlign: 'center' } }}>
                No scripts selected.{!isReadOnly && ' Click a script on the right to add it.'}
              </Text>
            </Stack>
          ) : (
            <Stack 
              tokens={{ childrenGap: 4 }} 
              styles={{ 
                root: { 
                  flex: 1,
                  overflowY: 'auto', 
                  padding: 8, 
                  backgroundColor: isDark ? '#1e1e1e' : '#faf9f8',
                  borderRadius: 4,
                  border: `1px solid ${isDark ? '#333' : '#edebe9'}`,
                } 
              }}
            >
              {selectedScriptObjects.map((script) => (
                <Stack 
                  key={script.Id} 
                  horizontal 
                  verticalAlign="center" 
                  tokens={{ childrenGap: 8 }}
                  draggable={!isReadOnly}
                  onDragStart={(e) => handleDragStart(e, script.Id)}
                  onDragOver={(e) => handleDragOver(e, script.Id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, script.Id, isAdd)}
                  onDragEnd={handleDragEnd}
                  styles={{
                    root: {
                      padding: '6px 10px',
                      backgroundColor: draggedScriptId === script.Id 
                        ? (isDark ? '#3a3a3a' : '#e1dfdd')
                        : dragOverScriptId === script.Id
                          ? (isDark ? '#0078d4' : '#deecf9')
                          : (isDark ? '#2d2d2d' : '#ffffff'),
                      borderRadius: 4,
                      border: dragOverScriptId === script.Id
                        ? `2px solid ${isDark ? '#4fc3f7' : '#0078d4'}`
                        : `1px solid ${isDark ? '#444' : '#e1dfdd'}`,
                      cursor: isReadOnly ? 'default' : 'grab',
                      opacity: draggedScriptId === script.Id ? 0.5 : 1,
                      transition: 'background-color 0.15s, border-color 0.15s',
                    },
                  }}
                >
                  {!isReadOnly && (
                    <Icon iconName="GripperDotsVertical" styles={{ root: { fontSize: 12, opacity: 0.5, cursor: 'grab' } }} />
                  )}
                  <Icon iconName="Script" styles={{ root: { fontSize: 12, opacity: 0.7, flexShrink: 0 } }} />
                  <Stack styles={{ root: { flex: 1, minWidth: 0, overflow: 'hidden' } }}>
                    <Text variant="small" styles={{ root: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>{script.Title}</Text>
                    <Text variant="tiny" styles={{ root: { opacity: 0.6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>{script.Id}</Text>
                  </Stack>
                  {!isReadOnly && (
                    <IconButton
                      iconProps={{ iconName: 'Cancel' }}
                      title="Remove"
                      ariaLabel="Remove script"
                      styles={{ 
                        root: { width: 24, height: 24 },
                        icon: { fontSize: 10 },
                      }}
                      onClick={() => handleScriptToggle(script.Id, false, isAdd)}
                    />
                  )}
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>

        {/* Right column - Available Scripts with search */}
        {!isReadOnly && (
          <Stack tokens={{ childrenGap: 8 }} styles={{ root: { flex: 1, minWidth: 0 } }}>
            <Label>Available Scripts</Label>
            <SearchBox
              placeholder="Search by name or ID..."
              value={filterValue}
              onChange={(_, val) => setFilterValue(val || '')}
            />
            {siteScripts.length === 0 ? (
              <MessageBar>No site scripts available. Create a site script first.</MessageBar>
            ) : availableScripts.length === 0 ? (
              <Stack 
                styles={{ 
                  root: { 
                    flex: 1,
                    padding: 16, 
                    backgroundColor: isDark ? '#1e1e1e' : '#faf9f8',
                    borderRadius: 4,
                    border: `1px solid ${isDark ? '#333' : '#edebe9'}`,
                    justifyContent: 'center',
                    alignItems: 'center',
                  } 
                }}
              >
                <Text variant="small" styles={{ root: { fontStyle: 'italic', opacity: 0.7, textAlign: 'center' } }}>
                  {filterValue ? 'No matching scripts found.' : 'All scripts are selected.'}
                </Text>
              </Stack>
            ) : (
              <div 
                style={{ 
                  flex: 1,
                  overflowY: 'auto',
                  border: `1px solid ${isDark ? '#333' : '#edebe9'}`,
                  borderRadius: 4,
                }}
              >
                {availableScripts.map((script: ISiteScript) => (
                  <Stack
                    key={script.Id}
                    horizontal
                    verticalAlign="center"
                    tokens={{ childrenGap: 8 }}
                    styles={{
                      root: {
                        padding: '8px 12px',
                        cursor: 'pointer',
                        borderBottom: `1px solid ${isDark ? '#333' : '#edebe9'}`,
                        ':hover': {
                          backgroundColor: isDark ? '#2d2d2d' : '#f3f2f1',
                        },
                      },
                    }}
                    onClick={() => handleScriptToggle(script.Id, true, isAdd)}
                  >
                    <Icon iconName="Add" styles={{ root: { fontSize: 12, color: isDark ? '#4fc3f7' : '#0078d4', flexShrink: 0 } }} />
                    <Stack styles={{ root: { flex: 1, minWidth: 0, overflow: 'hidden' } }}>
                      <Text variant="small" styles={{ root: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>{script.Title}</Text>
                      <Text variant="tiny" styles={{ root: { opacity: 0.6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}>{script.Id}</Text>
                    </Stack>
                  </Stack>
                ))}
              </div>
            )}
          </Stack>
        )}
      </Stack>
    )
  }

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
      isDefault: addIsDefault,
    }

    try {
      await createNewSiteDesign(tabId, info)
      
      // Success - close panel and reset form
      onAddPanelDismiss()
      setAddTitle('')
      setAddDescription('')
      setAddWebTemplate('64')
      setAddSelectedScripts([])
      setAddPreviewImageUrl('')
      setAddPreviewImageAltText('')
      setAddIsDefault(false)
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
    addIsDefault,
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
      isDefault: editIsDefault,
    }

    try {
      await updateExistingSiteDesign(tabId, info)
      
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
    editIsDefault,
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
        type={PanelType.large}
        closeButtonAriaLabel="Close"
        isLightDismiss={!addSaving}
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
        <Stack styles={{ root: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' } }}>
          {addSaving && (
            <Overlay styles={{ root: { zIndex: 1 } }}>
              <Stack verticalAlign="center" horizontalAlign="center" styles={{ root: { height: '100%' } }}>
                <Spinner size={SpinnerSize.large} label="Saving..." />
              </Stack>
            </Overlay>
          )}
          {addError && (
            <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setAddError(null)} styles={{ root: { marginBottom: 12 } }}>
              {addError}
            </MessageBar>
          )}

          {/* Scrollable content - 3-column horizontal layout */}
          <div style={{ flex: 1, overflow: 'auto', paddingRight: 4 }}>
            <Stack horizontal tokens={{ childrenGap: 20 }} styles={{ root: { height: '100%' } }}>
              {/* Left column - Form fields */}
              <Stack tokens={{ childrenGap: 12 }} styles={{ root: { width: 240, flexShrink: 0 } }}>
                <TextField 
                  label="Title" 
                  required 
                  value={addTitle} 
                  onChange={(_, val) => setAddTitle(val || '')} 
                />
                <TextField
                  label="Description"
                  multiline
                  rows={3}
                  value={addDescription}
                  onChange={(_, val) => setAddDescription(val || '')}
                />
                <Dropdown
                  label="Web Template"
                  selectedKey={addWebTemplate}
                  options={webTemplateOptions}
                  onChange={(_, option) => option && setAddWebTemplate(option.key as string)}
                />
                <TextField
                  label="Preview Image URL"
                  value={addPreviewImageUrl}
                  onChange={(_, val) => setAddPreviewImageUrl(val || '')}
                  placeholder="https://..."
                />
                <TextField
                  label="Preview Image Alt Text"
                  value={addPreviewImageAltText}
                  onChange={(_, val) => setAddPreviewImageAltText(val || '')}
                />
                <Toggle
                  label="Set as default"
                  checked={addIsDefault}
                  onChange={(_, checked) => setAddIsDefault(checked || false)}
                  onText="Yes"
                  offText="No"
                  title="When enabled, this design becomes the default for the selected web template"
                />
              </Stack>
              
              {/* Middle + Right columns - Script picker (selected + available) */}
              {renderScriptPicker(addSelectedScripts, true, addScriptFilter, setAddScriptFilter)}
            </Stack>
          </div>

          {/* Sticky footer */}
          <Stack 
            horizontal 
            tokens={{ childrenGap: 10 }} 
            styles={{ 
              root: { 
                flexShrink: 0,
                paddingTop: 16,
                paddingBottom: 16,
                borderTop: `1px solid ${isDark ? '#333' : '#edebe9'}`,
              } 
            }}
          >
            <PrimaryButton text="Create" onClick={handleSaveAdd} disabled={addSaving} />
            <DefaultButton text="Cancel" onClick={handleAddPanelDismiss} disabled={addSaving} />
          </Stack>
        </Stack>
      </Panel>

      {/* Edit/View Design Panel */}
      <Panel
        headerText={selectedDesign?.IsOOTB ? 'View Site Design (Microsoft)' : 'Edit Site Design'}
        isOpen={editPanelOpen}
        onDismiss={handleEditPanelDismiss}
        type={PanelType.large}
        closeButtonAriaLabel="Close"
        isLightDismiss={!editSaving}
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
        <Stack styles={{ root: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' } }}>
          {editSaving && (
            <Overlay styles={{ root: { zIndex: 1 } }}>
              <Stack verticalAlign="center" horizontalAlign="center" styles={{ root: { height: '100%' } }}>
                <Spinner size={SpinnerSize.large} label="Saving..." />
              </Stack>
            </Overlay>
          )}
          {editError && (
            <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setEditError(null)} styles={{ root: { marginBottom: 12 } }}>
              {editError}
            </MessageBar>
          )}

          {/* Scrollable content - 3-column horizontal layout */}
          <div style={{ flex: 1, overflow: 'auto', paddingRight: 4 }}>
            <Stack horizontal tokens={{ childrenGap: 20 }} styles={{ root: { height: '100%' } }}>
              {/* Left column - Form fields */}
              <Stack tokens={{ childrenGap: 12 }} styles={{ root: { width: 240, flexShrink: 0 } }}>
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
                  rows={3}
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
                <TextField
                  label="Preview Image URL"
                  readOnly={selectedDesign?.IsOOTB}
                  value={editPreviewImageUrl}
                  onChange={(_, val) => setEditPreviewImageUrl(val || '')}
                  placeholder="https://..."
                />
                <TextField
                  label="Preview Image Alt Text"
                  readOnly={selectedDesign?.IsOOTB}
                  value={editPreviewImageAltText}
                  onChange={(_, val) => setEditPreviewImageAltText(val || '')}
                />
                <Toggle
                  label="Set as default"
                  checked={editIsDefault}
                  onChange={(_, checked) => setEditIsDefault(checked || false)}
                  disabled={selectedDesign?.IsOOTB}
                  onText="Yes"
                  offText="No"
                  title="When enabled, this design becomes the default for the selected web template"
                />
                {selectedDesign?.IsOOTB && (
                  <MessageBar messageBarType={MessageBarType.info}>
                    This is a Microsoft out-of-the-box site design and cannot be edited.
                  </MessageBar>
                )}
              </Stack>
              
              {/* Middle + Right columns - Script picker (selected + available) */}
              {renderScriptPicker(editSelectedScripts, false, editScriptFilter, setEditScriptFilter, selectedDesign?.IsOOTB)}
            </Stack>
          </div>

          {/* Sticky footer - only show for custom designs */}
          {!selectedDesign?.IsOOTB && (
            <Stack 
              horizontal 
              tokens={{ childrenGap: 10 }} 
              styles={{ 
                root: { 
                  flexShrink: 0,
                  paddingTop: 16,
                  paddingBottom: 16,
                  borderTop: `1px solid ${isDark ? '#333' : '#edebe9'}`,
                } 
              }}
            >
              <PrimaryButton text="Save" onClick={handleSaveEdit} disabled={editSaving} />
              <DefaultButton text="Cancel" onClick={handleEditPanelDismiss} disabled={editSaving} />
            </Stack>
          )}
        </Stack>
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
