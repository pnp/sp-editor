import { ActionButton, CommandBar, ICommandBarItemProps, Panel, PanelType, Stack, Text } from '@fluentui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { deleteControl, setAllSavedControls } from '../../../store/pagewebparts/actions'
import { getAllPageWebParts } from '../chrome/chrome-actions'

const PageWebPartsCommands = () => {
  const dispatch = useDispatch()
  const { savedControls } = useSelector((state: IRootState) => state.pageWebParts)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('savedControls')
    if (stored) {
      try {
        dispatch(setAllSavedControls(JSON.parse(stored)))
      } catch { /* ignore parse errors */ }
    }
  }, [dispatch])

  useEffect(() => {
    getAllPageWebParts(dispatch)
  }, [dispatch])

  const items: ICommandBarItemProps[] = [
    {
      key: 'refresh',
      text: 'Refresh',
      iconProps: { iconName: 'Refresh' },
      onClick: () => { getAllPageWebParts(dispatch) },
    },
    {
      key: 'savedControls',
      text: `Saved Controls (${savedControls.length})`,
      iconProps: { iconName: 'FavoriteStar' },
      onClick: () => setPanelOpen(true),
    },
  ]

  return (
    <>
      <CommandBar items={items} />
      <Panel
        isOpen={panelOpen}
        onDismiss={() => setPanelOpen(false)}
        type={PanelType.smallFixedFar}
        headerText='Saved Controls'
        closeButtonAriaLabel='Close'
        isLightDismiss={true}
      >
        {savedControls.length === 0 && (
          <Text variant='small' style={{ display: 'block', padding: 16, opacity: 0.5 }}>
            No saved controls yet. Open a control and click Save to add one.
          </Text>
        )}
        <Stack tokens={{ childrenGap: 4 }} style={{ marginTop: 8 }}>
          {savedControls.map((saved, index) => (
            <Stack
              horizontal
              key={`${saved.name}-${index}`}
              verticalAlign='center'
              styles={{ root: { borderBottom: '1px solid rgba(128,128,128,0.15)', padding: '2px 0' } }}
            >
              <Stack.Item grow>
                <Text variant='small' style={{ fontWeight: 600, padding: '0 8px' }}>{saved.name}</Text>
              </Stack.Item>
              <ActionButton
                iconProps={{ iconName: 'Copy' }}
                title='Copy JSON to clipboard'
                onClick={() => { navigator.clipboard.writeText(saved.json) }}
              />
              <ActionButton
                iconProps={{ iconName: 'Delete' }}
                title='Delete'
                onClick={() => { dispatch(deleteControl(index)) }}
              />
            </Stack>
          ))}
        </Stack>
      </Panel>
    </>
  )
}

export default PageWebPartsCommands
