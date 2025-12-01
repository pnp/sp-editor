import {
  Checkbox,
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
import { setError } from '../../../../store/formcustomizers/actions'
import { IFormCustomizerInfo, IListWithFormCustomizers, IContentTypeInfo } from '../../../../store/formcustomizers/types'
import {
  loadAllFormCustomizers,
  loadContentTypesForList,
  saveFormCustomizer,
} from '../chrome/chrome-actions'

// Extended form info for list display
interface IFormCustomizerInfoWithKey extends IFormCustomizerInfo, IObjectWithKey {}

interface IEditPanelState {
  isOpen: boolean
  form: IFormCustomizerInfo | null
  componentId: string
  componentProperties: string
}

interface IAddPanelState {
  isOpen: boolean
  selectedListId: string
  selectedContentTypeId: string
  applyToNewForm: boolean
  applyToEditForm: boolean
  applyToDisplayForm: boolean
  componentId: string
  componentProperties: string
}

interface IFormCustomizersProps {
  addPanelOpen: boolean
  onAddPanelDismiss: () => void
  onSelectionChanged: (selectedItem: IFormCustomizerInfoWithKey | null) => void
}

// GUID validation helper
const isValidGuid = (value: string): boolean => {
  const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  return guidRegex.test(value)
}

const FormCustomizers = ({ addPanelOpen, onAddPanelDismiss, onSelectionChanged }: IFormCustomizersProps) => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: IRootState) => state.home)
  const formCustomizersState = useSelector((state: IRootState) => state.formCustomizers)
  
  const lists = formCustomizersState?.lists || []
  const listsWithCustomizers = formCustomizersState?.listsWithCustomizers || []
  const allContentTypesForList = formCustomizersState?.allContentTypesForList || []
  const error = formCustomizersState?.error || null

  // Track if initial load has completed
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [tabId, setTabId] = useState<number | null>(null)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())

  const [editPanel, setEditPanel] = useState<IEditPanelState>({
    isOpen: false,
    form: null,
    componentId: '',
    componentProperties: '',
  })

  const [addPanel, setAddPanel] = useState<IAddPanelState>({
    isOpen: addPanelOpen,
    selectedListId: '',
    selectedContentTypeId: '',
    applyToNewForm: true,
    applyToEditForm: true,
    applyToDisplayForm: true,
    componentId: '',
    componentProperties: '{}',
  })

  // Selection for the DetailsList
  const selection = useMemo(
    () =>
      new Selection({
        onSelectionChanged: () => {
          const selectedItems = selection.getSelection() as IFormCustomizerInfoWithKey[]
          onSelectionChanged(selectedItems.length > 0 ? selectedItems[0] : null)
        },
        getKey: (item: IObjectWithKey) => {
          const formItem = item as IFormCustomizerInfoWithKey
          return `${formItem.listId}-${formItem.contentTypeId}-${formItem.formType}`
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
        selectedContentTypeId: '',
        applyToNewForm: true,
        applyToEditForm: true,
        applyToDisplayForm: true,
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

  // Load all form customizers on mount
  useEffect(() => {
    if (!tabId) return
    dispatch(setLoading(true))
    loadAllFormCustomizers(dispatch, tabId).finally(() => {
      dispatch(setLoading(false))
      setInitialLoadComplete(true)
    })
  }, [tabId, dispatch])

  // Load content types when list is selected
  useEffect(() => {
    if (!tabId || !addPanel.selectedListId) return

    loadContentTypesForList(tabId, addPanel.selectedListId).then((cts) => {
      dispatch({ type: 'formcustomizers/SET_ALL_CONTENT_TYPES_FOR_LIST', payload: { allContentTypesForList: cts } })
    })
  }, [tabId, addPanel.selectedListId, dispatch])

  const handleEdit = (form: IFormCustomizerInfo) => {
    setEditPanel({
      isOpen: true,
      form,
      componentId: form.ClientSideComponentId || '',
      componentProperties: form.ClientSideComponentProperties || '',
    })
  }

  const refreshData = () => {
    if (!tabId) return
    dispatch(setLoading(true))
    loadAllFormCustomizers(dispatch, tabId).finally(() => dispatch(setLoading(false)))
  }

  // Update handleSaveEdit to use single call
  const handleSaveEdit = async () => {
    if (!tabId || !editPanel.form) return

    try {
      dispatch(setLoading(true))

      // Single call for the specific form type
      await saveFormCustomizer(
        tabId,
        editPanel.form.listId,
        editPanel.form.contentTypeId,
        { [editPanel.form.formType]: true } as { New?: boolean; Edit?: boolean; Display?: boolean },
        editPanel.componentId || null,
        editPanel.componentProperties || null
      )

      setEditPanel({ isOpen: false, form: null, componentId: '', componentProperties: '' })
      refreshData()
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to save'))
      dispatch(setLoading(false))
    }
  }

  // Update handleSaveAdd to use single call
  const handleSaveAdd = async () => {
    if (
      !tabId ||
      !addPanel.selectedListId ||
      !addPanel.selectedContentTypeId ||
      !addPanel.componentId ||
      (!addPanel.applyToNewForm && !addPanel.applyToEditForm && !addPanel.applyToDisplayForm)
    )
      return

    try {
      dispatch(setLoading(true))

      // Single call with all form types
      await saveFormCustomizer(
        tabId,
        addPanel.selectedListId,
        addPanel.selectedContentTypeId,
        {
          New: addPanel.applyToNewForm,
          Edit: addPanel.applyToEditForm,
          Display: addPanel.applyToDisplayForm,
        },
        addPanel.componentId,
        addPanel.componentProperties || null
      )

      setAddPanel({
        isOpen: false,
        selectedListId: '',
        selectedContentTypeId: '',
        applyToNewForm: true,
        applyToEditForm: true,
        applyToDisplayForm: true,
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
      selectedContentTypeId: '',
      applyToNewForm: true,
      applyToEditForm: true,
      applyToDisplayForm: true,
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

  // Check if at least one form type is selected
  const hasFormTypeSelected = addPanel.applyToNewForm || addPanel.applyToEditForm || addPanel.applyToDisplayForm

  // Flatten items and create groups for the DetailsList
  const { items, groups } = useMemo(() => {
    const flatItems: IFormCustomizerInfoWithKey[] = []
    const groupList: IGroup[] = []

    listsWithCustomizers.forEach((listWithCustomizers: IListWithFormCustomizers) => {
      const startIndex = flatItems.length
      const listId = listWithCustomizers.list.Id

      listWithCustomizers.forms.forEach((form) => {
        flatItems.push({ ...form })
      })

      groupList.push({
        key: listId,
        name: `${listWithCustomizers.list.Title} (${listWithCustomizers.forms.length})`,
        startIndex,
        count: listWithCustomizers.forms.length,
        isCollapsed: collapsedGroups.has(listId),
      })
    })

    return { items: flatItems, groups: groupList }
  }, [listsWithCustomizers, collapsedGroups])

  const columns: IColumn[] = [
    {
      key: 'contentType',
      name: 'Content Type',
      fieldName: 'contentTypeName',
      minWidth: 120,
      maxWidth: 300,
      isResizable: true,
      onRender: (item: IFormCustomizerInfoWithKey) => (
        <Stack>
          <Text styles={{ root: { fontWeight: 600 } }}>{item.contentTypeName}</Text>
          <Text variant="tiny" styles={{ root: { fontFamily: 'monospace', fontSize: 10 } }}>
            {item.contentTypeId}
          </Text>
        </Stack>
      ),
    },
    {
      key: 'formType',
      name: 'Form',
      fieldName: 'formType',
      minWidth: 60,
      maxWidth: 80,
      isResizable: true,
      onRender: (item: IFormCustomizerInfoWithKey) => <Text>{item.formType}</Text>,
    },
    {
      key: 'componentId',
      name: 'Component ID',
      fieldName: 'ClientSideComponentId',
      minWidth: 200,
      maxWidth: 280,
      isResizable: true,
      onRender: (item: IFormCustomizerInfoWithKey) => (
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
      onRender: (item: IFormCustomizerInfoWithKey) => (
        <Text variant="small" styles={{ root: { fontFamily: 'monospace', fontSize: 11 } }}>
          {item.ClientSideComponentProperties || '{}'}
        </Text>
      ),
    },
  ]

  const listOptions: IComboBoxOption[] = lists.map((list) => ({
    key: list.Id,
    text: list.Title,
  }))

  const contentTypeOptions: IDropdownOption[] = allContentTypesForList.map((ct) => ({
    key: ct.StringId,
    text: ct.Name,
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

  // Make columns sticky
  const onRenderDetailsHeader = (headerProps: any, defaultRender: any) => {
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
        {defaultRender(headerProps)}
      </Sticky>
    )
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
          },
        }}
      >
        <Text variant="large" styles={{ root: { marginBottom: 8 } }}>
          No form customizers found
        </Text>
        <Text variant="medium">
          Click "Add" in the command bar to attach a customizer to a content type form.
        </Text>
      </Stack>
    )
  }

  const handleItemInvoked = (item: IFormCustomizerInfoWithKey) => {
    handleEdit(item)
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
        headerText="Add Form Customizer"
        type={PanelType.medium}
        isLightDismiss={true}
        onRenderFooterContent={() => (
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <PrimaryButton
              onClick={handleSaveAdd}
              text="Save"
              disabled={
                !addPanel.selectedListId ||
                !addPanel.selectedContentTypeId ||
                !hasFormTypeSelected ||
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
          <ComboBox
            label="Select List"
            placeholder="Type to search lists..."
            options={listOptions}
            selectedKey={addPanel.selectedListId || undefined}
            onChange={(_, option) => {
              setAddPanel((prev) => ({
                ...prev,
                selectedListId: (option?.key as string) || '',
                selectedContentTypeId: '',
              }))
            }}
            allowFreeform={false}
            autoComplete="on"
            required
            useComboBoxAsMenuWidth
          />

          {addPanel.selectedListId && (
            <>
              {allContentTypesForList.length === 0 ? (
                <MessageBar messageBarType={MessageBarType.info}>Loading content types...</MessageBar>
              ) : (
                <Dropdown
                  label="Select Content Type"
                  placeholder="Choose a content type..."
                  options={contentTypeOptions}
                  selectedKey={addPanel.selectedContentTypeId || undefined}
                  onChange={(_, option) =>
                    setAddPanel((prev) => ({
                      ...prev,
                      selectedContentTypeId: (option?.key as string) || '',
                    }))
                  }
                  required
                />
              )}
            </>
          )}

          {addPanel.selectedContentTypeId && (
            <Stack tokens={{ childrenGap: 8 }}>
              <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
                Apply to Form Types
              </Text>
              <Stack horizontal tokens={{ childrenGap: 16 }}>
                <Checkbox
                  label="New Form"
                  checked={addPanel.applyToNewForm}
                  onChange={(_, checked) =>
                    setAddPanel((prev) => ({ ...prev, applyToNewForm: !!checked }))
                  }
                />
                <Checkbox
                  label="Edit Form"
                  checked={addPanel.applyToEditForm}
                  onChange={(_, checked) =>
                    setAddPanel((prev) => ({ ...prev, applyToEditForm: !!checked }))
                  }
                />
                <Checkbox
                  label="Display Form"
                  checked={addPanel.applyToDisplayForm}
                  onChange={(_, checked) =>
                    setAddPanel((prev) => ({ ...prev, applyToDisplayForm: !!checked }))
                  }
                />
              </Stack>
              {!hasFormTypeSelected && (
                <Text variant="small" styles={{ root: { color: '#a4262c' } }}>
                  Please select at least one form type
                </Text>
              )}
            </Stack>
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
          setEditPanel({ isOpen: false, form: null, componentId: '', componentProperties: '' })
        }
        headerText="Edit Form Customizer"
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
                setEditPanel({ isOpen: false, form: null, componentId: '', componentProperties: '' })
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
              List
            </Text>
            <Text>{editPanel.form?.listTitle}</Text>
            <Text variant="tiny" styles={{ root: { fontFamily: 'monospace', fontSize: 10 } }}>
              {editPanel.form?.listId}
            </Text>
          </Stack>
          <Stack tokens={{ childrenGap: 4 }}>
            <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
              Content Type
            </Text>
            <Text>{editPanel.form?.contentTypeName}</Text>
            <Text variant="tiny" styles={{ root: { fontFamily: 'monospace', fontSize: 10 } }}>
              {editPanel.form?.contentTypeId}
            </Text>
          </Stack>
          <Stack tokens={{ childrenGap: 4 }}>
            <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
              Form Type
            </Text>
            <Text>{editPanel.form?.formType} Form</Text>
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

export default FormCustomizers