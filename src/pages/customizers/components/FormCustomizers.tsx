import { DetailsList, DetailsListLayoutMode, IColumn, MessageBar, MessageBarType, SelectionMode, Spinner, SpinnerSize, Stack, Text } from '@fluentui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'

interface IFormCustomizer {
  id: string
  title: string
  formType: 'New' | 'Edit' | 'Display'
  clientSideComponentId: string
  clientSideComponentProperties: string
  contentTypeId: string
}

const FormCustomizers = () => {
  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)

  const [items, setItems] = useState<IFormCustomizer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const columns: IColumn[] = [
    {
      key: 'formType',
      name: 'Form Type',
      fieldName: 'formType',
      minWidth: 80,
      maxWidth: 100,
      isResizable: true,
    },
    {
      key: 'contentTypeId',
      name: 'Content Type',
      fieldName: 'contentTypeId',
      minWidth: 150,
      maxWidth: 250,
      isResizable: true,
    },
    {
      key: 'clientSideComponentId',
      name: 'Component ID',
      fieldName: 'clientSideComponentId',
      minWidth: 200,
      maxWidth: 300,
      isResizable: true,
    },
    {
      key: 'clientSideComponentProperties',
      name: 'Properties',
      fieldName: 'clientSideComponentProperties',
      minWidth: 200,
      isResizable: true,
    },
  ]

  useEffect(() => {
    // TODO: Load form customizers from SharePoint
  }, [])

  return (
    <Stack tokens={{ childrenGap: 16 }} styles={{ root: { padding: '16px 0' } }}>
      <Text variant="medium">
        Form Customizers allow you to customize how list forms (New, Edit, Display) are rendered.
      </Text>

      {loading && (
        <Spinner size={SpinnerSize.large} label="Loading form customizers..." />
      )}

      {error && (
        <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
      )}

      {!loading && !error && items.length === 0 && (
        <MessageBar messageBarType={MessageBarType.info}>
          No form customizers found. Select a list to view its form customizers.
        </MessageBar>
      )}

      {!loading && items.length > 0 && (
        <DetailsList
          items={items}
          columns={columns}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        />
      )}
    </Stack>
  )
}

export default FormCustomizers