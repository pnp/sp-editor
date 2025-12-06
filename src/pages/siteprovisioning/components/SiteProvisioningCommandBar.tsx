import { CommandBar, ICommandBarItemProps, Label, Stack } from '@fluentui/react'
import { IonToggle } from '@ionic/react'
import { ActiveTab } from '../../../store/siteprovisioning/types'

interface ISiteProvisioningCommandBarProps {
  activeTab: ActiveTab
  hasSelection: boolean
  showOOTB: boolean
  selectedIsOOTB: boolean
  onNew: () => void
  onClone: () => void
  onDelete: () => void
  onExport?: () => void
  onToggleOOTB: () => void
  onGenerateFromList?: () => void
  onGenerateFromSite?: () => void
  onViewRunHistory?: () => void
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
  onClone,
  onDelete,
  onExport,
  onToggleOOTB,
  onGenerateFromList,
  onGenerateFromSite,
  onViewRunHistory,
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
        key: 'clone',
        text: 'Clone',
        iconProps: { iconName: 'Copy' },
        onClick: onClone,
        disabled: !hasSelection,
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

    // Add Generate submenu only on scripts tab
    if (activeTab === 'scripts') {
      items.push({
        key: 'generate',
        text: 'Generate',
        iconProps: { iconName: 'Processing' },
        buttonStyles,
        subMenuProps: {
          items: [
            {
              key: 'generateFromList',
              text: 'From List',
              iconProps: { iconName: 'BulletedList2' },
              onClick: onGenerateFromList,
            },
            {
              key: 'generateFromSite',
              text: 'From Site',
              iconProps: { iconName: 'Globe' },
              onClick: onGenerateFromSite,
            },
          ],
        },
      })
    }

    // Add Run History button on designs tab
    if (activeTab === 'designs') {
      items.push({
        key: 'history',
        text: 'Run History',
        iconProps: { iconName: 'History' },
        onClick: onViewRunHistory,
        buttonStyles,
      })
    }

    return items
  }

  const getFarItems = (): ICommandBarItemProps[] => {
    return [
      {
        key: 'toggleOOTB',
        onRender: () => (
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }} styles={{ root: { paddingRight: 10 } }}>
            <Label styles={{ root: { margin: 0, padding: 0, fontWeight: 400 } }}>Include Microsoft</Label>
            <IonToggle
              checked={showOOTB}
              onIonChange={() => onToggleOOTB()}
              color="success"
            />
          </Stack>
        ),
      },
    ]
  }

  return (
    <CommandBar
      items={getItems()}
      farItems={getFarItems()}
      styles={{ root: { padding: 0 } }}
    />
  )
}

export default SiteProvisioningCommandBar
