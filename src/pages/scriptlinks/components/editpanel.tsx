import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  Dropdown,
  IDropdownOption,
  IOverlayProps,
  Panel,
  PanelType,
  PrimaryButton,
  Stack,
  TextField,
} from '@fluentui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setConfirmEditDialog, setEditPanel, setSelectedItem } from '../../../store/scriptlinks/actions'
import { IScriptLink } from '../../../store/scriptlinks/types'
import { updateScriptLink } from '../chrome/chrome-actions'

const ScriptLinksEditPanel = () => {
  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)
  const { editpanel, selectedItem, confirmedit } = useSelector((state: IRootState) => state.scriptLinks)
  
  // Add local state to store edits
  const [editItem, setEditItem] = useState<IScriptLink>()
  
  // Update local state when selected item changes
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
  const sequenceValidator = (value: string): string => {
    return +value > -1 && +value < 65537 ? '' : `The value specified must be between 0 and 65536 inclusively.`
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
        headerText='Edit ScriptLink'
        closeButtonAriaLabel='Close'
        onRenderFooterContent={_onRenderItemFooterContent}
        overlayProps={panelOverlayProps}
      >
        {selectedItem && editItem &&
          <Stack>
            <TextField
              label='Url'
              description='Url of the file to be injected.'
              multiline
              autoAdjustHeight
              value={editItem.Url}
              onChange={(event, newValue?: string) =>
                setEditItem({ ...editItem, Url: newValue ? newValue : '' })
              }
              required
            />
            <TextField
              label='Sequence'
              description='The sequence of the scriplink'
              styles={{ fieldGroup: { width: 100 } }}
              value={editItem.Sequence.toString()}
              type={'number'}
              onChange={(event, newValue?: string) =>
                setEditItem({ ...editItem, Sequence: newValue ? +newValue : editItem.Sequence })
              }
              onGetErrorMessage={sequenceValidator}
              required
            />
            <Dropdown
              placeholder='Select scope'
              label='Scope'
              options={[
                { key: 2, text: 'Site Collection' },
                { key: 3, text: 'Current Web' },
              ]}
              selectedKey={editItem.Scope}
              onChange={(event, option?: IDropdownOption) =>
                setEditItem({ ...editItem, Scope: option ? +option.key : editItem.Scope })
              }
            />
            <TextField
              label='Id'
              description='Id of the custom action'
              value={editItem.Id}
              readOnly
              disabled
            />
          </Stack>
        }
        <Dialog
          hidden={confirmedit}
          onDismiss={() => dispatch(setConfirmEditDialog(true))}
          dialogContentProps={{
            showCloseButton: true,
            type: DialogType.normal,
            title: 'Edit ScriptLink',
            closeButtonAriaLabel: 'Cancel',
            subText: `Sure you want to edit the selected scriptlink?`,
          }}
          modalProps={{
            isDarkOverlay: isDark,
          }}
        >
          <DialogFooter>
            <PrimaryButton onClick={() => updateScriptLink(dispatch, selectedItem!)} text='Update' />
            <DefaultButton onClick={() => dispatch(setConfirmEditDialog(true))} text='Cancel' />
          </DialogFooter>
        </Dialog>
      </Panel>
  )
}

export default ScriptLinksEditPanel