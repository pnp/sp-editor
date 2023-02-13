import { ActionButton, DefaultButton, Dialog, DialogFooter, DialogType, Dropdown, IStackStyles, PrimaryButton, Stack, TextField } from '@fluentui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setMethod, setPath } from '../../../store/spshoot/actions'
import { runRestCall } from '../chrome/chrome-actions'

const SPShooterCommands = () => {

  const dispatch = useDispatch()
  const { path, method, headers, body, context } = useSelector((state: IRootState) => state.spshoot)
  const { isDark } = useSelector((state: IRootState) => state.home)
  const [ warning, setWarning] = useState(true)

  const methodStyles: IStackStyles = {
    root: {
      marginLeft: '-11px',
      marginRight: '-11px',
      width: 120,
    },
  }

  const makeRequest = () => {
    if (context) {
      setWarning(true)
      const fullPath: string = `${context && context.siteAbsoluteUrl ? context.siteAbsoluteUrl : ''}/${path}`
      runRestCall(dispatch, { path: fullPath, method, headers, body })
    }
  }

  const onRenderSuffix = () => {
    return (
      <Stack
        horizontal
        styles={{
          root: {
            marginRight: '-8px',
            height: '-webkit-fill-available',
          },
        }}
      >
        <ActionButton
          styles={{
            root: {
              marginLeft: '-10px',
              height: '-webkit-fill-available',
            },
          }}
          iconProps={{ iconName: 'LightningBolt' }}
          onClick={() => {
            if (method !== 'DELETE') {
              makeRequest()
            } else {
              setWarning(false)
            }
          }}
          text={'Shoot!'}
        />
      </Stack>
    )
  }

  const onRenderPrefix = () => {
    return (
      <Dropdown
        styles={methodStyles}
        ariaLabel='Method'
        selectedKey={method}
        options={[
          { key: 'GET', text: 'GET' },
          { key: 'POST', text: 'POST' },
          { key: 'PUT', text: 'PUT' },
          { key: 'PATCH', text: 'PATCH' },
          { key: 'DELETE', text: 'DELETE' },
        ]}
        onChange={(ev, option) => {
          if (option) {
            dispatch(setMethod(option.key.toString()))
          }
        }}
      />
    )
  }

  return (
    <>
      <Stack
        style={{
          width: 'calc(100% - 54px)',
          marginLeft: 27,
          marginRight: 54,
        }}
      >
        <TextField
          value={path}
          autoComplete={'on'}
          styles={{
            root: {
              width: '100%',
            },
          }}
          onRenderSuffix={onRenderSuffix}
          onRenderPrefix={onRenderPrefix}
          onChange={(ev, newValue) => {
            dispatch(setPath(newValue ? newValue : ''))
          }}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              if (method !== 'DELETE') {
                makeRequest()
              } else {
                setWarning(false)
              }
            }
          }}
        />
        <TextField readOnly underlined value={`${context && context.siteAbsoluteUrl ? context.siteAbsoluteUrl : ''}/${path}`} />
      </Stack>
      <Dialog
        hidden={warning}
        onDismiss={() => setWarning(true)}
        dialogContentProps={{
          showCloseButton: true,
          type: DialogType.normal,
          title: 'Warning',
          closeButtonAriaLabel: 'Cancel',
          subText: `Sure you want use DELETE method?`,
        }}
        modalProps={{
          isDarkOverlay: isDark,
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => makeRequest()} text='Shoot!' />
          <DefaultButton onClick={() => setWarning(true)} text='Cancel' />
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default SPShooterCommands
