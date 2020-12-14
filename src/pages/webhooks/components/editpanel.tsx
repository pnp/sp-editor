import { dateAdd } from '@pnp/pnpjs'
import {
  DatePicker,
  DayOfWeek,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  Dropdown,
  IOverlayProps,
  mergeStyleSets,
  Panel,
  PanelType,
  PrimaryButton,
  Stack,
  TextField,
} from '@fluentui/react'
import { addDays } from '@fluentui/date-time-utilities'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setConfirmEditDialog, setEditPanel, setSelectedItem } from '../../../store/webhooks/actions'
import { updateWebHook } from '../chrome/chrome-actions'

const WebHookEditPanel = () => {

  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)
  const { editpanel, selectedItem, confirmedit, lists } = useSelector((state: IRootState) => state.webHooks)

  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark }
  const _onRenderItemFooterContent = () => {
    return (
      <PrimaryButton
        onClick={() => dispatch(setConfirmEditDialog(false))}
        style={{ marginRight: '8px' }}
        text={'Update'}
      />
    )
  }

  const onFormatDate = (date: Date | undefined): string => {
    let formattedDate: string = ''
    if (selectedItem && date !== undefined && date) {
      const selectedItemTime = new Date(selectedItem.expirationDateTime)
      // there a bug on format not showing time of the date
      date.setHours(selectedItemTime.getUTCHours())
      date.setMinutes(selectedItemTime.getMinutes())
      date.setSeconds(selectedItemTime.getSeconds())
      date.setMilliseconds(selectedItemTime.getMilliseconds())
      formattedDate = dateAdd(date, 'minute', date.getTimezoneOffset() * -1)?.toISOString() ?? ''
    }

    return formattedDate
  }

  const controlClass = mergeStyleSets({
    control: {
      margin: '0 0 15px 0',
      maxWidth: '300px',
    },
  })

  return (
    <Panel
      isOpen={editpanel}
      type={PanelType.smallFixedFar}
      onDismiss={() => {
        // dispatch(setSelectedItem(undefined))
        dispatch(setEditPanel(false))
      }
      }
      isLightDismiss={true}
      isFooterAtBottom={true}
      headerText='Edit Webhook'
      closeButtonAriaLabel='Close'
      onRenderFooterContent={_onRenderItemFooterContent}
      overlayProps={panelOverlayProps}
    >
      {selectedItem &&
        <Stack>
          <Dropdown
            label='Resource'
            placeholder='Select list'
            options={lists}
            selectedKey={selectedItem.listId}
            required
            disabled
          />
          <DatePicker
            label='Expiration date'
            className={controlClass.control}
            isRequired={true}
            firstDayOfWeek={DayOfWeek.Monday}
            placeholder='Select a date...'
            ariaLabel='Select a date'
            minDate={new Date(Date.now())}
            maxDate={addDays(new Date(), 179)}
            today={new Date(Date.now())}
            allowTextInput={true}
            formatDate={(d) => onFormatDate(d)}
            value={new Date(selectedItem.expirationDateTime)}
            onSelectDate={(date: Date | null | undefined) => {
              if (date !== undefined && date) {
                dispatch(setSelectedItem({ ...selectedItem, expirationDateTime: dateAdd(date!, 'minute', date!.getTimezoneOffset() * -1)?.toISOString() ?? '' }))
              }
            }}
          />
          <TextField
            label='Server notification URL'
            description='Your service endpoint URL. SharePoint sends an HTTP POST to this endpoint when events occur in the specified resource.'
            placeholder=''
            multiline
            autoAdjustHeight
            value={selectedItem.notificationUrl}
            required
            rows={5}
            onChange={(event, newValue?: string) =>
              dispatch(setSelectedItem({ ...selectedItem, notificationUrl: newValue ? newValue : '' }))
            }
          />
          <TextField
            label='Client State'
            description='An opaque string passed back to the client on all notifications. You can use this for validating notifications, tagging different subscriptions, or other reasons.'
            placeholder=''
            autoAdjustHeight
            value={selectedItem.clientState}
            rows={5}
            onChange={(event, newValue?: string) =>
              dispatch(setSelectedItem({ ...selectedItem, clientState: newValue ?? '' }))
            }
          />
        </Stack>
      }
      <Dialog
        hidden={confirmedit}
        onDismiss={() => dispatch(setConfirmEditDialog(true))}
        dialogContentProps={{
          showCloseButton: true,
          type: DialogType.normal,
          title: 'Edit Webhook',
          closeButtonAriaLabel: 'Cancel',
          subText: `Sure you want to edit the selected webhook?`,
        }}
        modalProps={{
          isDarkOverlay: isDark,
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => { updateWebHook(dispatch, selectedItem!) }} text='Update' />
          <DefaultButton onClick={() => { dispatch(setConfirmEditDialog(true)) }} text='Cancel' />
        </DialogFooter>
      </Dialog>
    </Panel>
  )
}

export default WebHookEditPanel
