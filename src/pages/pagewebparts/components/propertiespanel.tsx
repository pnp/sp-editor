import {
  IOverlayProps,
  Panel,
  PanelType,
  PrimaryButton,
  DefaultButton,
  Stack,
  Label,
  TextField,
} from '@fluentui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setPropertiesPanel, setSelectedWebPart } from '../../../store/pagewebparts/actions'

const WebPartPropertiesPanel = () => {

  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)
  const { propertiesPanel, selectedItem } = useSelector((state: IRootState) => state.pageWebParts)

  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark }

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }

  const onDismiss = () => {
    dispatch(setPropertiesPanel(false))
    dispatch(setSelectedWebPart(undefined))
  }

  return (
    <Panel
      isOpen={propertiesPanel}
      type={PanelType.medium}
      onDismiss={onDismiss}
      isLightDismiss={true}
      headerText={selectedItem ? selectedItem.title || 'Web Part Properties' : 'Web Part Properties'}
      closeButtonAriaLabel='Close'
      overlayProps={panelOverlayProps}
      isFooterAtBottom={true}
      onRenderFooterContent={() => (
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <PrimaryButton
            iconProps={{ iconName: 'Copy' }}
            text='Copy JSON'
            onClick={() => selectedItem && copyToClipboard(selectedItem.properties)}
            disabled={!selectedItem}
          />
          <DefaultButton text='Close' onClick={onDismiss} />
        </Stack>
      )}
    >
      {selectedItem && (
        <Stack tokens={{ childrenGap: 12 }} style={{ marginTop: 12 }}>
          <Stack>
            <Label>Title</Label>
            <TextField
              value={selectedItem.title}
              readOnly
              disabled
            />
          </Stack>
          <Stack>
            <Label>Instance ID</Label>
            <Stack horizontal tokens={{ childrenGap: 4 }}>
              <TextField
                value={selectedItem.id}
                readOnly
                disabled
                styles={{ root: { flex: 1 } }}
              />
              <DefaultButton
                iconProps={{ iconName: 'Copy' }}
                title='Copy'
                onClick={() => copyToClipboard(selectedItem.id)}
              />
            </Stack>
          </Stack>
          <Stack>
            <Label>Web Part ID</Label>
            <Stack horizontal tokens={{ childrenGap: 4 }}>
              <TextField
                value={selectedItem.webPartId}
                readOnly
                disabled
                styles={{ root: { flex: 1 } }}
              />
              <DefaultButton
                iconProps={{ iconName: 'Copy' }}
                title='Copy'
                onClick={() => copyToClipboard(selectedItem.webPartId)}
              />
            </Stack>
          </Stack>
          <Stack>
            <Label>Properties (JSON)</Label>
            <TextField
              value={selectedItem.properties}
              readOnly
              multiline
              autoAdjustHeight
              resizable={false}
              styles={{
                field: { fontFamily: 'monospace', fontSize: 12 },
              }}
            />
          </Stack>
        </Stack>
      )}
    </Panel>
  )
}

export default WebPartPropertiesPanel
