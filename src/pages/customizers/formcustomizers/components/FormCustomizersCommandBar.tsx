import { CommandBar, ICommandBarItemProps } from '@fluentui/react'

interface IFormCustomizersCommandBarProps {
  onAdd: () => void
  onRefresh: () => void
  onRemove: () => void
  hasSelection: boolean
}

const FormCustomizersCommandBar = ({ onAdd, onRefresh, onRemove, hasSelection }: IFormCustomizersCommandBarProps) => {
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

  return <CommandBar items={commandBarItems} />;
}

export default FormCustomizersCommandBar