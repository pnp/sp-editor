import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  ICommandBarItemProps,
  IconButton,
  mergeStyles,
  Panel,
  PanelType,
  PrimaryButton,
  Stack,
  Text,
  TextField,
} from '@fluentui/react'
import { useCallback, useState } from 'react'

export interface ISavedSnippet {
  name: string
  /** The saved content: editor code, or a serialized request (see SP Shooter). */
  code: string
  savedAt: number
}

interface IUseSavedSnippetsOptions {
  /** localStorage key; each page keeps its own list. */
  storageKey: string
  /** Header of the saved items panel, e.g. "Saved PnPjs snippets". */
  panelTitle: string
  /** Returns the content to save (as a string). */
  getCode: () => string
  /** Loads saved content back into the page. */
  loadCode: (code: string) => void
  /** Singular noun used in labels: "snippet" (default) or e.g. "request". */
  itemName?: string
  /** Second line shown under the name. Defaults to the first line of code. */
  preview?: (code: string) => string
  /** Hover text. Defaults to the start of the code. */
  tooltip?: (code: string) => string
  /** What "Save" stores, shown in the save dialog. */
  saveHint?: string
}

function readSnippets(storageKey: string): ISavedSnippet[] {
  try {
    const raw = window.localStorage.getItem(storageKey)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed)
      ? parsed.filter((s) => s && typeof s.name === 'string' && typeof s.code === 'string')
      : []
  } catch {
    return []
  }
}

function writeSnippets(storageKey: string, snippets: ISavedSnippet[]): void {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(snippets))
  } catch {
    // Storage full or unavailable — the in-memory list still works for this session.
  }
}

/** First line of actual code (skipping comments and imports), shown under the snippet name. */
function previewLine(code: string): string {
  const lines = code.split('\n').map((l) => l.trim()).filter((l) => l.length > 0)
  let inBlockComment = false
  for (const line of lines) {
    if (inBlockComment) {
      if (line.includes('*/')) inBlockComment = false
      continue
    }
    if (line.startsWith('/*')) {
      inBlockComment = !line.includes('*/')
      continue
    }
    if (line.startsWith('//') || line.startsWith('import ')) continue
    return line
  }
  return lines[0] ?? ''
}

const formatSavedAt = (savedAt: number): string =>
  savedAt ? new Date(savedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : ''

const rowClass = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  borderRadius: 6,
  background: 'rgba(128,128,128,0.07)',
  selectors: {
    ':hover': { background: 'rgba(128,128,128,0.16)' },
    ':hover .snippet-delete': { opacity: 1 },
  },
})

const rowButtonClass = mergeStyles({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  padding: '8px 4px 8px 12px',
  border: 'none',
  background: 'transparent',
  color: 'inherit',
  font: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
  borderRadius: 6,
  selectors: {
    ':focus-visible': { outline: '1px solid currentColor', outlineOffset: '-1px' },
  },
})

const ellipsis = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } as const

/**
 * Save / view saved code snippets for a Monaco-based console.
 * Returns CommandBar items ("Save snippet", "Saved snippets") and the dialog +
 * panel UI to render next to the CommandBar.
 */
export function useSavedSnippets({
  storageKey,
  panelTitle,
  getCode,
  loadCode,
  itemName = 'snippet',
  preview = previewLine,
  tooltip = (code: string) => code.slice(0, 1000),
  saveHint = 'Saves the code currently in the editor.',
}: IUseSavedSnippetsOptions) {
  const ItemName = itemName.charAt(0).toUpperCase() + itemName.slice(1)
  const [snippets, setSnippets] = useState<ISavedSnippet[]>(() => readSnippets(storageKey))
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [name, setName] = useState('')

  const update = useCallback(
    (next: ISavedSnippet[]) => {
      setSnippets(next)
      writeSnippets(storageKey, next)
    },
    [storageKey],
  )

  const closeSaveDialog = () => {
    setShowSaveDialog(false)
    setName('')
  }

  const save = () => {
    const code = getCode()
    if (!name.trim() || !code.trim()) return
    update([...snippets, { name: name.trim(), code, savedAt: Date.now() }])
    closeSaveDialog()
  }

  const commandItems: ICommandBarItemProps[] = [
    {
      key: 'saveSnippet',
      text: `Save ${itemName}`,
      iconProps: { iconName: 'Save' },
      onClick: () => setShowSaveDialog(true),
    },
    {
      key: 'savedSnippets',
      text: `Saved ${itemName}s`,
      iconProps: { iconName: 'BookmarkReport' },
      onClick: () => setShowPanel(true),
    },
  ]

  const ui = (
    <>
      <Dialog
        hidden={!showSaveDialog}
        onDismiss={closeSaveDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: `Save ${itemName}`,
          subText: saveHint,
          closeButtonAriaLabel: 'Close',
        }}
      >
        <TextField
          label={`${ItemName} name`}
          value={name}
          autoFocus
          onChange={(_e, v) => setName(v ?? '')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
          }}
        />
        <DialogFooter>
          <PrimaryButton text="Save" onClick={save} disabled={!name.trim()} />
          <DefaultButton text="Cancel" onClick={closeSaveDialog} />
        </DialogFooter>
      </Dialog>

      <Panel
        isOpen={showPanel}
        onDismiss={() => setShowPanel(false)}
        type={PanelType.smallFixedFar}
        headerText={panelTitle}
        closeButtonAriaLabel="Close"
        isLightDismiss
      >
        {snippets.length === 0 ? (
          <Text variant="small" styles={{ root: { display: 'block', marginTop: 8, opacity: 0.7 } }}>
            No saved {itemName}s yet. Use "Save {itemName}" to save one.
          </Text>
        ) : (
          <Stack tokens={{ childrenGap: 6 }} styles={{ root: { marginTop: 8 } }}>
            <Text variant="small" styles={{ root: { opacity: 0.6 } }}>Click a {itemName} to load it.</Text>
            {snippets.map((snippet, index) => (
              <div key={`${snippet.savedAt}-${index}`} className={rowClass}>
                <button
                  type="button"
                  className={rowButtonClass}
                  title={tooltip(snippet.code)}
                  onClick={() => {
                    loadCode(snippet.code)
                    setShowPanel(false)
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: 8, width: '100%' }}>
                    <Text styles={{ root: { fontSize: 14, fontWeight: 600, flex: 1, minWidth: 0, ...ellipsis } }}>{snippet.name}</Text>
                    <Text styles={{ root: { fontSize: 11, opacity: 0.6, flexShrink: 0 } }}>{formatSavedAt(snippet.savedAt)}</Text>
                  </span>
                  <Text
                    styles={{
                      root: {
                        display: 'block',
                        fontSize: 12,
                        opacity: 0.7,
                        fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
                        width: '100%',
                        ...ellipsis,
                      },
                    }}
                  >
                    {preview(snippet.code)}
                  </Text>
                </button>
                <IconButton
                  className="snippet-delete"
                  iconProps={{ iconName: 'Delete' }}
                  title={`Delete "${snippet.name}"`}
                  ariaLabel={`Delete ${snippet.name}`}
                  onClick={() => update(snippets.filter((_, i) => i !== index))}
                  styles={{ root: { opacity: 0.6, marginRight: 4, flexShrink: 0 } }}
                />
              </div>
            ))}
          </Stack>
        )}
      </Panel>
    </>
  )

  return {
    commandItems,
    ui,
    openSaveDialog: () => setShowSaveDialog(true),
    openSavedPanel: () => setShowPanel(true),
  }
}
