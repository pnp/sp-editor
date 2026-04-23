import {
  DefaultButton,
  Dropdown,
  IOverlayProps,
  ITextField,
  Label,
  MessageBar,
  MessageBarType,
  Panel,
  PanelType,
  PrimaryButton,
  Stack,
  TextField,
} from '@fluentui/react'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { addWebPart } from '../chrome/chrome-actions'

interface AddWebPartPanelProps {
  isOpen: boolean
  onDismiss: () => void
  targetZoneIndex: number
  targetSectionIndex: number
  targetSectionFactor: number
}

const AddWebPartPanel: React.FC<AddWebPartPanelProps> = ({
  isOpen,
  onDismiss,
  targetZoneIndex,
  targetSectionIndex,
  targetSectionFactor,
}) => {
  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)
  const { savedControls } = useSelector((state: IRootState) => state.pageWebParts)

  const [jsonText, setJsonText] = useState<string>('')
  const [jsonError, setJsonError] = useState<string>('')
  const textFieldRef = useRef<ITextField>(null)

  const panelOverlayProps: IOverlayProps = { isDarkThemed: isDark }

  const isValidControl = (parsed: any) => {
    // Text controls have controlType 4 + innerHTML
    if (parsed.controlType === 4) return true
    // Web parts need an id
    return !!parsed.id
  }

  const onJsonChange = (_event: React.FormEvent, value?: string) => {
    setJsonText(value || '')
    if (value) {
      try {
        const parsed = JSON.parse(value)
        if (!isValidControl(parsed)) {
          setJsonError('Missing "id" field — the web part manifest GUID is required (or use a text control with controlType 4)')
        } else {
          setJsonError('')
        }
      } catch {
        setJsonError('Invalid JSON format')
      }
    }
  }

  const onAdd = () => {
    let parsed: any
    try {
      parsed = JSON.parse(jsonText)
    } catch {
      setJsonError('Invalid JSON. Please fix before adding.')
      return
    }
    if (!isValidControl(parsed)) {
      setJsonError('Missing "id" field — the web part manifest GUID is required.')
      return
    }

    addWebPart(
      dispatch,
      jsonText,
      targetZoneIndex,
      targetSectionIndex,
      targetSectionFactor
    )
    onDismiss()
  }

  const handleDismiss = () => {
    setJsonError('')
    setJsonText('')
    onDismiss()
  }

  return (
    <Panel
      isOpen={isOpen}
      type={PanelType.medium}
      onDismiss={handleDismiss}
      isLightDismiss={true}
      headerText='Paste Control from JSON'
      closeButtonAriaLabel='Close'
      overlayProps={panelOverlayProps}
      isFooterAtBottom={true}
      onRenderFooterContent={() => (
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <PrimaryButton
            iconProps={{ iconName: 'Add' }}
            text='Add Control'
            onClick={onAdd}
            disabled={!!jsonError || !jsonText.trim()}
          />
          <DefaultButton text='Cancel' onClick={handleDismiss} />
        </Stack>
      )}
    >
      <Stack tokens={{ childrenGap: 16 }} style={{ marginTop: 12 }}>
        <MessageBar messageBarType={MessageBarType.info}>
          Adding to <strong>Section {targetZoneIndex}</strong>, Column{' '}
          <strong>{targetSectionIndex}</strong> (width {targetSectionFactor}/12).
          Paste a control JSON below, or select one from your <strong>Saved Controls</strong>.
          Use <strong>Copy Data</strong> from the properties panel to grab JSON from any existing control.
        </MessageBar>

        {savedControls.length > 0 && (
          <Dropdown
            label='Load from Saved Controls'
            placeholder='Select a saved control…'
            options={savedControls.map((saved, idx) => ({
              key: String(idx),
              text: saved.name,
            }))}
            onChange={(_ev, option) => {
              if (option) {
                const idx = Number(option.key)
                if (idx >= 0 && idx < savedControls.length) {
                  setJsonText(savedControls[idx].json || '')
                  setJsonError('')
                }
              }
            }}
          />
        )}

        <Stack>
          <Label>Web Part Data (JSON)</Label>
          <TextField
            componentRef={textFieldRef}
            value={jsonText}
            onChange={onJsonChange}
            multiline
            rows={20}
            resizable={true}
            placeholder='Paste webPartData JSON here...'
            styles={{
              field: { fontFamily: 'monospace', fontSize: 12 },
            }}
            errorMessage={jsonError}
            description='Paste the webPartData JSON copied from any web part. Instance ID and position are set automatically.'
          />
        </Stack>
      </Stack>
    </Panel>
  )
}

export default AddWebPartPanel
