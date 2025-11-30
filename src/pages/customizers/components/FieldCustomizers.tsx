import { DetailsList, DetailsListLayoutMode, IColumn, MessageBar, MessageBarType, SelectionMode, Spinner, SpinnerSize, Stack, Text } from '@fluentui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'

interface IFieldCustomizer {
  id: string
  title: string
  fieldId: string
  fieldName: string
  clientSideComponentId: string
  clientSideComponentProperties: string
}

const FieldCustomizers = () => {
  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)

  const [items, setItems] = useState<IFieldCustomizer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const columns: IColumn[] = [
    {
      key: 'fieldName',
      name: 'Field Name',
      fieldName: 'fieldName',
      minWidth: 100,
      maxWidth: 200,
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
    // TODO: Load field customizers from SharePoint
  }, [])

  return (
    <Stack tokens={{ childrenGap: 16 }} styles={{ root: { padding: '16px 0' } }}>
      <Text variant="medium">
        Field Customizers allow you to modify how fields are rendered in list views.
      </Text>

      {loading && (
        <Spinner size={SpinnerSize.large} label="Loading field customizers..." />
      )}

      {error && (
        <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
      )}

      {!loading && !error && items.length === 0 && (
        <MessageBar messageBarType={MessageBarType.info}>
          No field customizers found. Select a list to view its field customizers.
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

export default FieldCustomizers