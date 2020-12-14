import { dateAdd } from '@pnp/pnpjs'
import {
  DatePicker,
  DayOfWeek,
  Dropdown,
  IDropdownOption,
  IOverlayProps,
  mergeStyleSets,
  Panel,
  PanelType,
  PrimaryButton,
  Stack,
  TextField,
} from '@fluentui/react'
import { addDays } from '@fluentui/date-time-utilities'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setNewPanel } from '../../../store/webhooks/actions'
import { INewWebHook } from '../../../store/webhooks/types'
import { addWebHook } from '../chrome/chrome-actions'

const WebhooksNewPanel = () => {

  const { newpanel, lists } = useSelector((state: IRootState) => state.webHooks)

  const dispatch = useDispatch()

  const initDate = () => {
    const now = new Date()
    // now.setUTCHours(0, 0, 0, 0)
    const expirationDate = addDays(now, 179).toISOString() // expire in 6 months
    return expirationDate
  }

  const [newItem, setNewItem] = useState<INewWebHook>({
    ListId: '',
    HookUrl: '',
    ClientState: '',
    expirationDate: '',
  })

  const [times, setTimes] = useState<any>({
    min: '',
    max: '',
  })

  const { isDark } = useSelector((state: IRootState) => state.home)
  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark }

  useEffect(() => {
    const curday: Date = new Date(Date.now())
    setNewItem({
      ListId: '',
      HookUrl: '',
      ClientState: '',
      expirationDate: initDate(),
    })
    setTimes({
      min: addDays(curday, 0),
      max: addDays(curday, 179),
    })
  }, [newpanel])

  const _onRenderNewFooterContent = () => {

    return (
      <PrimaryButton
        onClick={() => {
          if (newItem && newItem.ListId && newItem.HookUrl && newItem.expirationDate) {
            addWebHook(dispatch, newItem)
          }
        }
        }
        style={{ marginRight: '8px' }}
        text={'Add'}
      />
    )
  }

  const controlClass = mergeStyleSets({
    control: {
      margin: '0 0 15px 0',
      maxWidth: '300px',
    },
  })

  const onFormatDate = (date: Date | undefined): string => {
    let formattedDate: string = ''
    if (date !== undefined && date) {
      // const fixTime = new Date()
      date.setHours(times.min.getHours())
      date.setMinutes(times.min.getMinutes())
      date.setSeconds(times.min.getSeconds())
      date.setMilliseconds(times.min.getMilliseconds())
      formattedDate = dateAdd(date, 'minute', date.getTimezoneOffset() * -1)?.toISOString() ?? ''
    }

    return formattedDate
  }

  return (
    <Panel
      isOpen={newpanel}
      type={PanelType.smallFixedFar}
      onDismiss={() => { dispatch(setNewPanel(false)) }}
      isLightDismiss={true}
      isFooterAtBottom={true}
      headerText='Add webhook'
      closeButtonAriaLabel='Close'
      onRenderFooterContent={_onRenderNewFooterContent}
      overlayProps={panelOverlayProps}
    >
      {/* Panel new form */}
      < Stack >
        <Dropdown
          label='Resource'
          placeholder='Select list'
          options={lists}
          selectedKey={newItem.ListId}
          onChange={(event, option?: IDropdownOption) =>
            setNewItem({ ...newItem, ListId: option ? option.key.toString() : newItem.ListId })
          }
          required
        />
        <DatePicker
          label='Expiration date'
          className={controlClass.control}
          isRequired={true}
          firstDayOfWeek={DayOfWeek.Monday}
          placeholder='Select a date...'
          ariaLabel='Select a date'
          minDate={times.min}
          maxDate={times.max}
          allowTextInput={true}
          formatDate={(d) => onFormatDate(d)}
          // defaultValue={times.max}
          value={new Date(newItem.expirationDate)}
          onSelectDate={(date: Date | null | undefined): void => {
            if (date !== undefined && date) {
              setNewItem({ ...newItem, expirationDate: dateAdd(date!, 'minute', date!.getTimezoneOffset() * -1)?.toISOString() ?? '' })
            }
          }}
        />
        <TextField
          label='Server notification URL'
          description='Your service endpoint URL. SharePoint sends an HTTP POST to this endpoint when events occur in the specified resource.'
          placeholder=''
          multiline
          autoAdjustHeight
          required
          rows={5}
          onChange={(event, newValue?: string) =>
            setNewItem({ ...newItem, HookUrl: newValue ? newValue : '' })
          }
        />
        <TextField
          label='Client State'
          description='An opaque string passed back to the client on all notifications. You can use this for validating notifications, tagging different subscriptions, or other reasons.'
          placeholder=''
          autoAdjustHeight
          rows={5}
          onChange={(event, newValue?: string) =>
            setNewItem({ ...newItem, ClientState: newValue ? newValue : '' })
          }
        />
      </Stack >
    </Panel >
  )
}

export default WebhooksNewPanel
