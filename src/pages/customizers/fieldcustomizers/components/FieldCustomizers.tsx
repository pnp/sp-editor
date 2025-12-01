import {
  ComboBox,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dropdown,
  GroupHeader,
  IColumn,
  IComboBoxOption,
  IDetailsFooterProps,
  IDropdownOption,
  IGroup,
  IGroupHeaderProps,
  IObjectWithKey,
  MessageBar,
  MessageBarType,
  Panel,
  PanelType,
  PrimaryButton,
  ScrollablePane,
  Selection,
  SelectionMode,
  Stack,
  Sticky,
  StickyPositionType,
  Text,
  TextField,
} from '@fluentui/react'
import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../../store'
import { setLoading } from '../../../../store/home/actions'
import { setError } from '../../../../store/fieldcustomizers/actions'
import { IFieldInfo, IListWithFieldCustomizers } from '../../../../store/fieldcustomizers/types'
import {
  loadAllFieldCustomizers,
  loadFieldsForList,
  saveListFieldCustomizer,
} from '../chrome/chrome-actions'

// Extended field info to include listId for actions
interface IFieldInfoWithList extends IFieldInfo, IObjectWithKey {
  listId: string
  listTitle: string
}

interface IEditPanelState {
  isOpen: boolean
  listId: string
  field: IFieldInfo | null
  componentId: string
  componentProperties: string
}

interface IAddPanelState {
  isOpen: boolean
  selectedListId: string
  selectedFieldId: string
  componentId: string
  componentProperties: string
}

interface IFieldCustomizersProps {
  addPanelOpen: boolean
  onAddPanelDismiss: () => void
  onSelectionChanged: (selectedItem: IFieldInfoWithList | null) => void
}

// GUID validation helper
const isValidGuid = (value: string): boolean => {
  const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  return guidRegex.test(value)
}

const FieldCustomizers = ({ addPanelOpen, onAddPanelDismiss, onSelectionChanged }: IFieldCustomizersProps) => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: IRootState) => state.home)
  const { lists, listsWithCustomizers, allFieldsForList, error } = useSelector(
    (state: IRootState) => state.fieldCustomizers
  )
  // Track if initial load has completed
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)

  const [tabId, setTabId] = useState<number | null>(null)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())

  const [editPanel, setEditPanel] = useState<IEditPanelState>({
    isOpen: false,
    listId: '',
    field: null,
    componentId: '',
    componentProperties: '',
  })

  const [addPanel, setAddPanel] = useState<IAddPanelState>({
    isOpen: addPanelOpen,
    selectedListId: '',
    selectedFieldId: '',
    componentId: '',
    componentProperties: '{}',
  })

  // Selection for the DetailsList
  const selection = useMemo(
    () =>
      new Selection({
        onSelectionChanged: () => {
          const selectedItems = selection.getSelection() as IFieldInfoWithList[]
          onSelectionChanged(selectedItems.length > 0 ? selectedItems[0] : null)
        },
        getKey: (item: IObjectWithKey) => {
          const fieldItem = item as IFieldInfoWithList
          return `${fieldItem.listId}-${fieldItem.Id}`
        },
      }),
    [onSelectionChanged]
  )

  // Sync addPanel with prop
  useEffect(() => {
    if (addPanelOpen) {
      setAddPanel({
        isOpen: true,
        selectedListId: '',
        selectedFieldId: '',
        componentId: '',
        componentProperties: '{}',
      })
    }
  }, [addPanelOpen])

  // Get current tab
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        setTabId(tabs[0].id)
      }
    })
  }, [])

  // Load all field customizers on mount
  useEffect(() => {
    if (!tabId) return
    dispatch(setLoading(true))
    loadAllFieldCustomizers(dispatch, tabId).finally(() => {
      dispatch(setLoading(false))
      setInitialLoadComplete(true)
    })
  }, [tabId, dispatch])

  // Load fields when list is selected in add panel
  useEffect(() => {
    if (!tabId || !addPanel.selectedListId) return
    loadFieldsForList(dispatch, tabId, addPanel.selectedListId)
  }, [tabId, addPanel.selectedListId, dispatch])

  const handleEdit = (listId: string, field: IFieldInfo) => {
    setEditPanel({
      isOpen: true,
      listId,
      field,
      componentId: field.ClientSideComponentId || '',
      componentProperties: field.ClientSideComponentProperties || '',
    })
  }

  const refreshData = () => {
    if (!tabId) return
    dispatch(setLoading(true))
    loadAllFieldCustomizers(dispatch, tabId).finally(() => dispatch(setLoading(false)))
  }

  const handleSaveEdit = async () => {
    if (!tabId || !editPanel.field || !editPanel.listId) return

    try {
      dispatch(setLoading(true))
      const componentId = editPanel.componentId || null
      const componentProperties = editPanel.componentProperties || null

      await saveListFieldCustomizer(
        tabId,
        editPanel.listId,
        editPanel.field.Id,
        componentId,
        componentProperties
      )

      setEditPanel({ isOpen: false, listId: '', field: null, componentId: '', componentProperties: '' })
      refreshData()
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to save'))
      dispatch(setLoading(false))
    }
  }

  const handleSaveAdd = async () => {
    if (!tabId || !addPanel.selectedListId || !addPanel.selectedFieldId || !addPanel.componentId) return

    try {
      dispatch(setLoading(true))
      const componentId = addPanel.componentId
      const componentProperties = addPanel.componentProperties || null

      await saveListFieldCustomizer(
        tabId,
        addPanel.selectedListId,
        addPanel.selectedFieldId,
        componentId,
        componentProperties
      )

      setAddPanel({
        isOpen: false,
        selectedListId: '',
        selectedFieldId: '',
        componentId: '',
        componentProperties: '{}',
      })
      onAddPanelDismiss()
      refreshData()
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to add customizer'))
      dispatch(setLoading(false))
    }
  }

  const handleDismissAddPanel = () => {
    setAddPanel({
      isOpen: false,
      selectedListId: '',
      selectedFieldId: '',
      componentId: '',
      componentProperties: '{}',
    })
    onAddPanelDismiss()
  }

  const getComponentIdErrorMessage = (value: string): string => {
    if (!value) return ''
    if (!isValidGuid(value)) {
      return 'Please enter a valid GUID (e.g., 12345678-1234-1234-1234-123456789abc)'
    }
    return ''
  }

  const toggleGroupCollapse = (groupKey: string) => {
    setCollapsedGroups((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(groupKey)) {
        newSet.delete(groupKey)
      } else {
        newSet.add(groupKey)
      }
      return newSet
    })
  }

  // Flatten items and create groups for the DetailsList
  const { items, groups } = useMemo(() => {
    const flatItems: IFieldInfoWithList[] = []
    const groupList: IGroup[] = []

    listsWithCustomizers.forEach((listWithCustomizers: IListWithFieldCustomizers) => {
      const startIndex = flatItems.length
      const listId = listWithCustomizers.list.Id

      listWithCustomizers.fields.forEach((field) => {
        flatItems.push({
          ...field,
          listId,
          listTitle: listWithCustomizers.list.Title,
        })
      })

      groupList.push({
        key: listId,
        name: `${listWithCustomizers.list.Title} (${listWithCustomizers.fields.length})`,
        startIndex,
        count: listWithCustomizers.fields.length,
        isCollapsed: collapsedGroups.has(listId),
      })
    })

    return { items: flatItems, groups: groupList }
  }, [listsWithCustomizers, collapsedGroups])

  const columns: IColumn[] = [
    {
      key: 'title',
      name: 'Field',
      fieldName: 'Title',
      minWidth: 120,
      maxWidth: 300,
      isResizable: true,
      onRender: (item: IFieldInfoWithList) => (
        <Stack>
          <Text styles={{ root: { fontWeight: 600 } }}>{item.Title}</Text>
          <Text variant="small">
            {item.InternalName} ({item.TypeAsString})
          </Text>
          <Text variant="tiny" styles={{ root: { fontFamily: 'monospace', fontSize: 10 } }}>
            {item.Id}
          </Text>
        </Stack>
      ),
    },
    {
      key: 'componentId',
      name: 'Component ID',
      fieldName: 'ClientSideComponentId',
      minWidth: 200,
      maxWidth: 280,
      isResizable: true,
      onRender: (item: IFieldInfoWithList) => (
        <Text variant="small" styles={{ root: { fontFamily: 'monospace', fontSize: 11 } }}>
          {item.ClientSideComponentId}
        </Text>
      ),
    },
    {
      key: 'properties',
      name: 'Properties',
      fieldName: 'ClientSideComponentProperties',
      minWidth: 150,
      isResizable: true,
      onRender: (item: IFieldInfoWithList) => (
        <Text variant="small" styles={{ root: { fontFamily: 'monospace', fontSize: 11 } }}>
          {item.ClientSideComponentProperties || '{}'}
        </Text>
      ),
    },
  ]

  const listOptions: IDropdownOption[] = lists.map((list) => ({
    key: list.Id,
    text: list.Title,
  }))

  // ComboBox options for field selection
  const fieldOptions: IComboBoxOption[] = allFieldsForList.map((field) => ({
    key: field.Id,
    text: field.Title,
    data: { 
      internalName: field.InternalName,
      type: field.TypeAsString,
      id: field.Id 
    },
  }))

  const onRenderGroupHeader = (props?: IGroupHeaderProps): JSX.Element | null => {
    if (!props || !props.group) return null

    return (
      <GroupHeader
        {...props}
        onToggleCollapse={() => toggleGroupCollapse(props.group!.key)}
        styles={{
          headerCount: { display: 'none' },
          title: { fontWeight: 600 },
        }}
      />
    )
  }

  const handleItemInvoked = (item: IFieldInfoWithList) => {
    handleEdit(item.listId, item)
  }

  // Render empty message when no items
  const onRenderDetailsFooter = (props?: IDetailsFooterProps): JSX.Element | null => {
    if (items.length > 0) return null

    return (
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
        styles={{
          root: {
            padding: '40px 20px',
            // backgroundColor: 'var(--neutralLighterAlt, #faf9f8)',
            // borderTop: '1px solid var(--neutralLight, #edebe9)',
          },
        }}
      >
        <Text
          variant="large"
          styles={{
            root: {
              // color: 'var(--neutralSecondary, #605e5c)',
              marginBottom: 8,
            },
          }}
        >
          No field customizers found
        </Text>
        <Text
          variant="medium"
          styles={{
            root: {
              // color: 'var(--neutralTertiary, #a19f9d)',
            },
          }}
        >
          Click "Add" in the command bar to attach a customizer to a list field.
        </Text>
      </Stack>
    )
  }

  // Make columns sticky
  const onRenderDetailsHeader = (headerProps: any, defaultRender: any) => {
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
        {defaultRender(headerProps)}
      </Sticky>
    )
  }

  return (
    <>
      <ScrollablePane styles={{ root: { position: 'relative', height: '100%' } }}>
        <div>
          {error && (
            <MessageBar messageBarType={MessageBarType.error} onDismiss={() => dispatch(setError(null))}>
              {error}
            </MessageBar>
          )}

          {/* Always show the list after initial load */}
          {initialLoadComplete && (
            <DetailsList
              items={items}
              columns={columns}
              groups={items.length > 0 ? groups : undefined}
              groupProps={{
                onRenderHeader: onRenderGroupHeader,
              }}
              selection={selection}
              selectionMode={SelectionMode.single}
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              compact={true}
              onItemInvoked={handleItemInvoked}
              onRenderDetailsFooter={onRenderDetailsFooter}
              onRenderDetailsHeader={onRenderDetailsHeader}
            />
          )}
        </div>
      </ScrollablePane>

      {/* Add Panel */}
      <Panel
        isOpen={addPanel.isOpen}
        onDismiss={handleDismissAddPanel}
        headerText="Add Field Customizer"
        type={PanelType.medium}
        isLightDismiss={true}
        onRenderFooterContent={() => (
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <PrimaryButton
              onClick={handleSaveAdd}
              text="Save"
              disabled={
                !addPanel.selectedListId ||
                !addPanel.selectedFieldId ||
                !addPanel.componentId ||
                !isValidGuid(addPanel.componentId)
              }
            />
            <DefaultButton onClick={handleDismissAddPanel} text="Cancel" />
          </Stack>
        )}
        isFooterAtBottom={true}
      >
        <Stack tokens={{ childrenGap: 16 }} styles={{ root: { marginTop: 16 } }}>
          <Dropdown
            label="Select List"
            placeholder="Choose a list..."
            options={listOptions}
            selectedKey={addPanel.selectedListId || undefined}
            onChange={(_, option) => {
              setAddPanel((prev) => ({
                ...prev,
                selectedListId: (option?.key as string) || '',
                selectedFieldId: '',
              }))
            }}
            required
          />

          {addPanel.selectedListId && (
            <>
              {allFieldsForList.length === 0 ? (
                <MessageBar messageBarType={MessageBarType.info}>Loading fields...</MessageBar>
              ) : (
                <ComboBox
                  label="Select Field"
                  placeholder="Type to search fields..."
                  options={fieldOptions}
                  selectedKey={addPanel.selectedFieldId || undefined}
                  onChange={(_, option) =>
                    setAddPanel((prev) => ({ ...prev, selectedFieldId: (option?.key as string) || '' }))
                  }
                  allowFreeform={false}
                  autoComplete="on"
                  required
                  useComboBoxAsMenuWidth
                  calloutProps={{
                    calloutMaxHeight: 300,
                  }}
                  onRenderOption={(option) => {
                    const comboOption = option as IComboBoxOption
                    return (
                      <Stack styles={{ root: { padding: '4px 0' } }}>
                        <Text styles={{ root: { fontWeight: 600 } }}>{comboOption?.text}</Text>
                        <Text variant="small">
                          {comboOption?.data?.internalName} ({comboOption?.data?.type})
                        </Text>
                        <Text variant="tiny" styles={{ root: { fontFamily: 'monospace', fontSize: 10 } }}>
                          {comboOption?.data?.id}
                        </Text>
                      </Stack>
                    )
                  }}
                />
              )}
            </>
          )}

          <TextField
            label="Component ID (GUID)"
            placeholder="e.g., 12345678-1234-1234-1234-123456789abc"
            value={addPanel.componentId}
            onChange={(_, value) => setAddPanel((prev) => ({ ...prev, componentId: value || '' }))}
            required
            onGetErrorMessage={getComponentIdErrorMessage}
            validateOnLoad={false}
            validateOnFocusOut
          />
          <TextField
            label="Component Properties (JSON)"
            placeholder='e.g., {"sampleText": "Hello"}'
            value={addPanel.componentProperties}
            onChange={(_, value) => setAddPanel((prev) => ({ ...prev, componentProperties: value || '' }))}
            multiline
            rows={6}
          />
        </Stack>
      </Panel>

      {/* Edit Panel */}
      <Panel
        isOpen={editPanel.isOpen}
        onDismiss={() =>
          setEditPanel({ isOpen: false, listId: '', field: null, componentId: '', componentProperties: '' })
        }
        headerText="Edit Field Customizer"
        type={PanelType.medium}
        isLightDismiss={true}
        onRenderFooterContent={() => (
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <PrimaryButton
              onClick={handleSaveEdit}
              text="Save"
              disabled={!editPanel.componentId || !isValidGuid(editPanel.componentId)}
            />
            <DefaultButton
              onClick={() =>
                setEditPanel({ isOpen: false, listId: '', field: null, componentId: '', componentProperties: '' })
              }
              text="Cancel"
            />
          </Stack>
        )}
        isFooterAtBottom={true}
      >
        <Stack tokens={{ childrenGap: 16 }} styles={{ root: { marginTop: 16 } }}>
          <Stack tokens={{ childrenGap: 4 }}>
            <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
              Field
            </Text>
            <Text>
              {editPanel.field?.Title} ({editPanel.field?.InternalName})
            </Text>
            <Text variant="small">
              Type: {editPanel.field?.TypeAsString}
            </Text>
            <Text variant="tiny" styles={{ root: { fontFamily: 'monospace', fontSize: 10 } }}>
              {editPanel.field?.Id}
            </Text>
          </Stack>
          <TextField
            label="Component ID (GUID)"
            placeholder="e.g., 12345678-1234-1234-1234-123456789abc"
            value={editPanel.componentId}
            onChange={(_, value) => setEditPanel((prev) => ({ ...prev, componentId: value || '' }))}
            required
            onGetErrorMessage={getComponentIdErrorMessage}
            validateOnLoad={false}
            validateOnFocusOut
          />
          <TextField
            label="Component Properties (JSON)"
            placeholder='e.g., {"sampleText": "Hello"}'
            value={editPanel.componentProperties}
            onChange={(_, value) => setEditPanel((prev) => ({ ...prev, componentProperties: value || '' }))}
            multiline
            rows={6}
          />
        </Stack>
      </Panel>
    </>
  )
}

export default FieldCustomizers