import { CommandBar, ICommandBarItemProps } from '@fluentui/react'

interface IFormCustomizersCommandBarProps {
  onAdd: () => void
  onRemove: () => void
  hasSelection: boolean
}

const FormCustomizersCommandBar = ({ onAdd, onRemove, hasSelection }: IFormCustomizersCommandBarProps) => {
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
  ]

  return <CommandBar items={commandBarItems} />;
}

export default FormCustomizersCommandBar