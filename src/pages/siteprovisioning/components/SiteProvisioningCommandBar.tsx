import { CommandBar, ICommandBarItemProps, Label, Stack } from '@fluentui/react'
import { IonToggle } from '@ionic/react'
import { ActiveTab } from '../../../store/siteprovisioning/types'

interface ISiteProvisioningCommandBarProps {
  activeTab: ActiveTab
  hasSelection: boolean
  showOOTB: boolean
  selectedIsOOTB: boolean
  onNew: () => void
  onDelete: () => void
  onExport?: () => void
  onToggleOOTB: () => void
}

// Fixed button width style for consistent layout
const buttonStyles = {
  root: { minWidth: 100 },
}

const SiteProvisioningCommandBar = ({
  activeTab,
  hasSelection,
  showOOTB,
  selectedIsOOTB,
  onNew,
  onDelete,
  onExport,
  onToggleOOTB,
}: ISiteProvisioningCommandBarProps) => {
  const getItems = (): ICommandBarItemProps[] => {
    const items: ICommandBarItemProps[] = [
      {
        key: 'new',
        text: 'New',
        iconProps: { iconName: 'Add' },
        onClick: onNew,
        buttonStyles,
      },
      {
        key: 'delete',
        text: 'Delete',
        iconProps: { iconName: 'Delete' },
        onClick: onDelete,
        disabled: !hasSelection || selectedIsOOTB,
        buttonStyles,
      },
      {
        key: 'export',
        text: 'Export',
        iconProps: { iconName: 'Download' },
        onClick: onExport,
        disabled: !hasSelection || activeTab !== 'scripts',
        buttonStyles,
        // Hide visually but keep space on designs tab
        style: activeTab !== 'scripts' ? { visibility: 'hidden' } : undefined,
      },
    ]

    return items
  }

  return (
    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
      <CommandBar items={getItems()} styles={{ root: { padding: 0 } }} />
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }} styles={{ root: { marginLeft: 'auto', paddingRight: 10 } }}>
        <Label styles={{ root: { margin: 0, padding: 0, fontWeight: 400 } }}>Include Microsoft</Label>
        <IonToggle
          checked={showOOTB}
          onIonChange={() => onToggleOOTB()}
          color="success"
        />
      </Stack>
    </Stack>
  )
}

export default SiteProvisioningCommandBar
