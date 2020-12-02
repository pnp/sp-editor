import { CommandBar } from '@fluentui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setConfirmCacheDialog, setConfirmRemoveDialog, setNewPanel } from '../../../store/scriptlinks/actions'
import { installApp, unInstallApp } from '../chrome/chrome-actions'

const ScriptLinkCommands = () => {
  const dispatch = useDispatch()
  const { selectedItems } = useSelector((state: IRootState) => state.scriptLinks)

  return (
    <CommandBar
      items={[
        {
          key: 'newItem',
          text: 'New',
          iconProps: { iconName: 'Add' },
          onClick: () => {
            dispatch(setNewPanel(true))
          },
        },
        {
          key: 'deleteRow',
          text: 'Remove',
          iconProps: { iconName: 'Delete' },
          onClick: () => {
            dispatch(setConfirmRemoveDialog(false))
          },
          disabled: selectedItems.length < 1,
        },
        {
          key: 'refreshCaches',
          text: 'Refresh caches',
          iconProps: { iconName: 'Refresh' },
          onClick: () => {
            dispatch(setConfirmCacheDialog(false))
          },
          disabled: selectedItems.length < 1,
        },
      ]}
      farItems={[
        {
          key: 'app',
          text: 'Modern ScriptLinks App',
          cacheKey: 'myCacheKey',
          iconProps: { iconName: 'AppIconDefault' },
          subMenuProps: {
            items: [
              {
                key: 'addApp',
                text: 'Install',
                iconProps: { iconName: 'AppIconDefaultAdd' },
                onClick: () => {
                  installApp(dispatch)
                },
              },
              {
                key: 'removeApp',
                text: 'Uninstall',
                iconProps: { iconName: 'Delete' },
                onClick: () => {
                  unInstallApp(dispatch)
                },
              },
            ],
          },
        },
      ]}
    />
  )
}

export default ScriptLinkCommands
