import { CommandBar, ICommandBarItemProps } from '@fluentui/react'

interface IFieldCustomizersCommandBarProps {
  onAdd: () => void
  onRefresh: () => void
  onRemove: () => void
  hasSelection: boolean
}

const FieldCustomizersCommandBar = ({ onAdd, onRefresh, onRemove, hasSelection }: IFieldCustomizersCommandBarProps) => {
  const commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'add',
      text: 'Add',
      iconProps: { iconName: 'Add' },
      onClick: onAdd,
    },
    {
      key: 'remove',
      text: 'Remove',
      iconProps: { iconName: 'Delete' },
      onClick: onRemove,
      disabled: !hasSelection,
    },
    {
      key: 'refresh',
      text: 'Refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: onRefresh,
    },
  ]

  return (
    <div style={{ padding: '0 8px' }}>
      <CommandBar items={commandBarItems} />
    </div>
  )
}

export default FieldCustomizersCommandBar