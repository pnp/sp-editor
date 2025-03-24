import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IOverlayProps,
  Panel,
  PanelType,
  PrimaryButton,
  Stack,
  TextField,
  Toggle,
} from '@fluentui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
// mport { updateScriptLink } from '../../../store/scriptlinks/async-actions'
import { setConfirmEditDialog, setEditPanel, setSelectedItem } from '../../../store/webproperties/actions'
import { IWebProperty } from '../../../store/webproperties/types'
import { addWebProperty } from '../chrome/chrome-actions'

const WebPropertiesEditPanel = () => {

  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)
  const { editpanel, selectedItem, confirmedit } = useSelector((state: IRootState) => state.webProperties)

  const [editItem, setEditItem] = useState<IWebProperty>()

  useEffect(() => {
    setEditItem(selectedItem)
  }, [selectedItem])

  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark }
  const _onRenderItemFooterContent = () => {
    return (
      <PrimaryButton
        onClick={() => {
          if (editItem) {
            dispatch(setSelectedItem(editItem))
            dispatch(setConfirmEditDialog(false))
          }
        }}
        style={{ marginRight: '8px' }}
        text={'Update'}
      />
    )
  }

  return (
    <Panel
      isOpen={editpanel}
      type={PanelType.smallFixedFar}
      onDismiss={() => {
        dispatch(setSelectedItem(undefined))
        dispatch(setEditPanel(false))
      }
      }
      isLightDismiss={true}
      isFooterAtBottom={true}
      headerText='Edit Web Property'
      closeButtonAriaLabel='Close'
      onRenderFooterContent={_onRenderItemFooterContent}
      overlayProps={panelOverlayProps}
    >
      {selectedItem && editItem &&
        <Stack>
          <TextField
            label='Property Key'
            description='The key of the property'
            value={editItem.key}
            readOnly
            disabled
            required
          />
          <TextField
            label='Property Value'
            description='The value of the property'
            value={editItem.value}
            multiline
            rows={5}
            autoAdjustHeight
            onChange={(event, newValue?: string) => {
              setEditItem({ ...editItem, value: newValue ? newValue : '' })
            }}
          />
        <Toggle
          label='Indexed'
          checked={editItem.indexed}
          onText='Yes'
          offText='No'
          onChange={(event, checked?: boolean) => {
            setEditItem({ ...editItem, indexed: checked ? true : false })
          }}
        />

        </Stack>
      }
      <Dialog
        hidden={confirmedit}
        onDismiss={() => dispatch(setConfirmEditDialog(true))}
        dialogContentProps={{
          showCloseButton: true,
          type: DialogType.normal,
          title: 'Edit Web Property',
          closeButtonAriaLabel: 'Cancel',
          subText: `Sure you want to edit the selected web property?`,
        }}
        modalProps={{
          isDarkOverlay: isDark,
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => { addWebProperty(dispatch, selectedItem!, true) }} text='Update' />
          <DefaultButton onClick={() => { dispatch(setConfirmEditDialog(true)) }} text='Cancel' />
        </DialogFooter>
      </Dialog>
    </Panel>
  )
}

export default WebPropertiesEditPanel