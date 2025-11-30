import {
  ComboBox,
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dropdown,
  GroupHeader,
  IColumn,
  IComboBoxOption,
  IDropdownOption,
  IGroup,
  IGroupHeaderProps,
  IObjectWithKey,
  MessageBar,
  MessageBarType,
  Panel,
  PanelType,
  PrimaryButton,
  Selection,
  SelectionMode,
  Stack,
  Text,
  TextField,
} from '@fluentui/react'
import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../../store'
import { setLoading } from '../../../../store/home/actions'
import { setError } from '../actions'
import {
  loadAllFormCustomizers,
  loadContentTypesForList,
  saveFormCustomizer,
} from '../chrome/chrome-actions'
import { IFormCustomizerInfo, IListWithFormCustomizers, IContentTypeInfo } from '../types'

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
  selectedFormType: 'New' | 'Edit' | 'Display' | ''
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
  const { lists, listsWithCustomizers, error } = useSelector(
    (state: IRootState) => state.formCustomizers
  )

  const [tabId, setTabId] = useState<number | null>(null)
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  const [contentTypes, setContentTypes] = useState<IContentTypeInfo[]>([])

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
    selectedFormType: '',
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
        selectedFormType: '',
        componentId: '',
        componentProperties: '{}',
      })
      setContentTypes([])
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
    loadAllFormCustomizers(dispatch, tabId).finally(() => dispatch(setLoading(false)))
  }, [tabId, dispatch])

  // Load content types when list is selected
  useEffect(() => {
    if (!tabId || !addPanel.selectedListId) {
      setContentTypes([])
      return
    }

    loadContentTypesForList(tabId, addPanel.selectedListId).then((cts) => {
      setContentTypes(cts)
    })
  }, [tabId, addPanel.selectedListId])

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

  const handleSaveEdit = async () => {
    if (!tabId || !editPanel.form) return

    try {
      dispatch(setLoading(true))
      const componentId = editPanel.componentId || null
      const componentProperties = editPanel.componentProperties || null

      await saveFormCustomizer(
        tabId,
        editPanel.form.listId,
        editPanel.form.contentTypeId,
        editPanel.form.formType,
        componentId,
        componentProperties
      )

      setEditPanel({ isOpen: false, form: null, componentId: '', componentProperties: '' })
      refreshData()
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to save'))
      dispatch(setLoading(false))
    }
  }

  const handleSaveAdd = async () => {
    if (
      !tabId ||
      !addPanel.selectedListId ||
      !addPanel.selectedContentTypeId ||
      !addPanel.selectedFormType ||
      !addPanel.componentId
    )
      return

    try {
      dispatch(setLoading(true))
      const componentId = addPanel.componentId
      const componentProperties = addPanel.componentProperties || null

      await saveFormCustomizer(
        tabId,
        addPanel.selectedListId,
        addPanel.selectedContentTypeId,
        addPanel.selectedFormType as 'New' | 'Edit' | 'Display',
        componentId,
        componentProperties
      )

      setAddPanel({
        isOpen: false,
        selectedListId: '',
        selectedContentTypeId: '',
        selectedFormType: '',
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
      selectedFormType: '',
      componentId: '',
      componentProperties: '{}',
    })
    setContentTypes([])
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
    const flatItems: IFormCustomizerInfoWithKey[] = []
    const groupList: IGroup[] = []

    listsWithCustomizers.forEach((listWithCustomizers: IListWithFormCustomizers) => {
      const startIndex = flatItems.length
      const listId = listWithCustomizers.list.Id

      listWithCustomizers.forms.forEach((form) => {
        flatItems.push({
          ...form,
        })
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
      maxWidth: 180,
      isResizable: true,
      onRender: (item: IFormCustomizerInfoWithKey) => (
        <Text styles={{ root: { fontWeight: 600 } }}>{item.contentTypeName}</Text>
      ),
    },
    {
      key: 'formType',
      name: 'Form Type',
      fieldName: 'formType',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
      onRender: (item: IFormCustomizerInfoWithKey) => <Text>{item.formType} Form</Text>,
    },
    {
      key: 'componentId',
      name: 'Component ID',
      fieldName: 'ClientSideComponentId',
      minWidth: 200,
      maxWidth: 300,
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

  const contentTypeOptions: IDropdownOption[] = contentTypes.map((ct) => ({
    key: ct.StringId,
    text: ct.Name,
  }))

  const formTypeOptions: IDropdownOption[] = [
    { key: 'New', text: 'New Form' },
    { key: 'Edit', text: 'Edit Form' },
    { key: 'Display', text: 'Display Form' },
  ]

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

  const handleItemInvoked = (item: IFormCustomizerInfoWithKey) => {
    handleEdit(item)
  }

  return (
    <div style={{ padding: '0 20px 20px 20px' }}>
      {error && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => dispatch(setError(null))}>
          {error}
        </MessageBar>
      )}

      {!loading && listsWithCustomizers.length === 0 && (
        <MessageBar messageBarType={MessageBarType.info}>
          No form customizers found. Click "Add" to attach one to a content type form.
        </MessageBar>
      )}

      {!loading && listsWithCustomizers.length > 0 && (
        <DetailsList
          items={items}
          columns={columns}
          groups={groups}
          groupProps={{
            onRenderHeader: onRenderGroupHeader,
          }}
          selection={selection}
          selectionMode={SelectionMode.single}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          compact={true}
          onItemInvoked={handleItemInvoked}
        />
      )}

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
                !addPanel.selectedFormType ||
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
                selectedFormType: '',
              }))
            }}
            allowFreeform={false}
            autoComplete="on"
            required
            useComboBoxAsMenuWidth
          />

          {addPanel.selectedListId && (
            <>
              {contentTypes.length === 0 ? (
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
            <Dropdown
              label="Select Form Type"
              placeholder="Choose a form type..."
              options={formTypeOptions}
              selectedKey={addPanel.selectedFormType || undefined}
              onChange={(_, option) =>
                setAddPanel((prev) => ({
                  ...prev,
                  selectedFormType: (option?.key as 'New' | 'Edit' | 'Display') || '',
                }))
              }
              required
            />
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
          </Stack>
          <Stack tokens={{ childrenGap: 4 }}>
            <Text variant="medium" styles={{ root: { fontWeight: 600 } }}>
              Content Type
            </Text>
            <Text>{editPanel.form?.contentTypeName}</Text>
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
    </div>
  )
}

export default FormCustomizers