import {
  IOverlayProps,
  Panel,
  PanelType,
  PrimaryButton,
  DefaultButton,
  Stack,
  Label,
  TextField,
  Dialog,
  DialogType,
  DialogFooter,
} from '@fluentui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { saveControl, setPropertiesPanel, setSelectedWebPart } from '../../../store/pagewebparts/actions'

const WebPartPropertiesPanel = () => {

  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)
  const { propertiesPanel, selectedItem } = useSelector((state: IRootState) => state.pageWebParts)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [saveName, setSaveName] = useState('')
  const [saveJson, setSaveJson] = useState('')

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

  // Build the web part data JSON from available fields
  const getWebPartDataJson = () => {
    if (!selectedItem) return ''
    if (selectedItem.webPartDataJson) return selectedItem.webPartDataJson

    // webPartDataJson may not survive chrome.scripting serialization,
    // so reconstruct from the fields we do have
    if (selectedItem.controlType === 4) {
      const props = selectedItem.properties ? JSON.parse(selectedItem.properties) : {}
      return JSON.stringify({
        controlType: 4,
        innerHTML: props.innerHTML || '',
      }, null, 2)
    }

    const data: any = {
      id: selectedItem.webPartId,
      title: selectedItem.title,
      properties: selectedItem.properties ? JSON.parse(selectedItem.properties) : {},
    }
    return JSON.stringify(data, null, 2)
  }

  return (
    <>
    <Panel
      isOpen={propertiesPanel}
      type={PanelType.medium}
      onDismiss={onDismiss}
      isLightDismiss={true}
      headerText={selectedItem
        ? (selectedItem.controlType === 4 ? 'Text Control' : (selectedItem.title || 'Web Part Properties'))
        : 'Properties'}
      closeButtonAriaLabel='Close'
      overlayProps={panelOverlayProps}
      isFooterAtBottom={true}
      onRenderFooterContent={() => (
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <PrimaryButton
            iconProps={{ iconName: 'Copy' }}
            text='Copy Data'
            title='Copy full JSON data (paste into Add Control panel)'
            onClick={() => copyToClipboard(getWebPartDataJson())}
            disabled={!selectedItem}
          />
          <DefaultButton
            iconProps={{ iconName: 'FavoriteStar' }}
            text='Save'
            title='Save to favorites for reuse'
            onClick={() => {
              setSaveName(selectedItem?.title || '')
              setSaveJson(getWebPartDataJson())
              setShowSaveDialog(true)
            }}
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
          {selectedItem.controlType !== 4 && (
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
          )}
          <Stack>
            <Label>{selectedItem.controlType === 4 ? 'Control Data (JSON)' : 'Web Part Data (JSON)'}</Label>
            <TextField
              value={getWebPartDataJson()}
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
    <Dialog
      hidden={!showSaveDialog}
      onDismiss={() => { setShowSaveDialog(false); setSaveName('') }}
      dialogContentProps={{
        type: DialogType.normal,
        title: 'Save to Favorites',
        closeButtonAriaLabel: 'Close',
      }}
    >
      <TextField
        label='Name'
        value={saveName}
        onChange={(_e, v) => setSaveName(v ?? '')}
      />
      <DialogFooter>
        <PrimaryButton
          text='Save'
          disabled={!saveName.trim()}
          onClick={() => {
            dispatch(saveControl({ name: saveName, json: saveJson }))
            setShowSaveDialog(false)
            setSaveName('')
            setSaveJson('')
          }}
        />
        <DefaultButton text='Cancel' onClick={() => { setShowSaveDialog(false); setSaveName('') }} />
      </DialogFooter>
    </Dialog>
    </>
  )
}

export default WebPartPropertiesPanel
