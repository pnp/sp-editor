/// <reference types='../../../../node_modules/monaco-editor/monaco' />

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CompilerOptions,
  getDefaultCompilerOptions,
  transpileModule,
} from 'typescript'
import { IRootState } from '../../../store'
import { setLoading } from '../../../store/home/actions'
import { IDefinitions } from '../../../store/home/types'
import { appendConsoleOutput, clearConsoleOutput, setCode } from '../../../store/pnpjsconsole/actions'
import { exescript } from '../../../utilities/chromecommon'
import { fetchDefinitions } from '../utils/util'
import { PNPJS_CONSOLE_PROXY_SOURCE } from './consoleProxy'
import PnPjsConsoleOutput from './pnpjsConsoleOutput'
import {
  execme,
  fixImports,
  getDefinitionsInUse,
  mod_queryable,
  mod_core,
  mod_msaljsclient,
  mod_graph,
  mod_logging,
  mod_sp,
  mod_spadmin,
  pnpjsMonacoConfigs,
  sj,
} from './utils'
import { CommandBar } from '@fluentui/react'

const PnPjsEditor = () => {
  const dispatch = useDispatch()
  const [ initialized, setInitialized ] = useState(false)
  const [ consoleHeight, setConsoleHeight ] = useState<number>(220)
  const [ isResizing, setIsResizing ] = useState(false)
  const { definitions, code } = useSelector((state: IRootState) => state.pnpjsconsole)
  const stateCode = code
  const editor = useRef<null | monaco.editor.IStandaloneCodeEditor>(null)
  const outputDiv = useRef<null | HTMLDivElement>(null)
  const completionItems = useRef<null | monaco.IDisposable>(null)

  const { isDark } = useSelector((state: IRootState) => state.home)

  const COMMON_CONFIG: monaco.editor.IEditorOptions = pnpjsMonacoConfigs()

  useEffect(() => {
    const resizeListener = () => {
      if (editor && editor.current) {
        editor.current.layout()
      }
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  const initEditor = useCallback(() => {
    if (outputDiv.current) {
      editor.current = monaco.editor.create(outputDiv.current, {
        model: monaco.editor.createModel(
          stateCode,
          'typescript',
          // @ts-ignore: this is the only way to make it work
          monaco.Uri.file('index.ts'),
        ),
        ...COMMON_CONFIG,
      })

      const codeWOComments = editor.current!.getModel()!.getValue().replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
      const curLibs: IDefinitions[] = getDefinitionsInUse(
        codeWOComments,
        definitions,
      )
      const koko = curLibs.map(dmodule => {
        dmodule.filePath = 'file:///node_modules/' + dmodule.filePath
        return dmodule
      })
      monaco.languages.typescript.typescriptDefaults.setExtraLibs(koko)

      if (editor && editor.current) {
        // adds auto-complete for @pnp module imports
        completionItems.current = monaco.languages.registerCompletionItemProvider('typescript', {
          triggerCharacters: ['@', '/'],
          provideCompletionItems: (model, position) => {
            const textUntilPosition = model.getValueInRange({
              startLineNumber: position.lineNumber,
              startColumn: 1,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            })

            const importText = textUntilPosition.substring(textUntilPosition.indexOf('@'))
            const moduleDepth = importText.split('/')
            const suggestions: any[] = []

            definitions.forEach(file => {
              if (file.filePath.indexOf(importText) > -1) {
                const depthIndex = file.filePath.split('/', moduleDepth.length).join('/').length
                const importedModule = file.filePath.substring(0, depthIndex).replace('.d.ts', '')
                if (!suggestions.find(o => o.label === importedModule)) {
                  suggestions.push({
                    label: importedModule,
                    insertText: importedModule.replace(importText, ''),
                    kind: monaco.languages.CompletionItemKind.Module,
                  })
                }
              }
            })
            return {
              suggestions,
            }
          },
        })

        editor.current.onDidChangeModelContent((x) => {
          const codeWithOutComments = editor.current!.getModel()!.getValue().replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
          const currentLibs: IDefinitions[] = getDefinitionsInUse(codeWithOutComments, definitions)
          // @ts-ignore: getExtraLibs() not defined in monaco.d.ts
          const extralibs = monaco.languages.typescript.typescriptDefaults.getExtraLibs()
          if (currentLibs.length !== Object.keys(extralibs).length) {
            currentLibs.forEach(dmodule => dmodule.filePath = 'file:///node_modules/' + dmodule.filePath.replace('file:///node_modules/', ''))
            monaco.languages.typescript.typescriptDefaults.setExtraLibs(currentLibs)
          }
        })

        editor.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        });

        // tslint:disable-next-line:no-bitwise
        editor.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD, () => {
          runCode()



        })
        // trigget resize to make editor visible (bug in monaco 0.20.0?)
        setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 1)
      }
    }
  }, [COMMON_CONFIG, definitions, dispatch, stateCode])

  function installConsoleRelay() {
    // The MAIN-world console proxy posts window messages with
    // `source === 'sp-editor-pnpjs-console'`. We need an ISOLATED-world
    // listener (where chrome.runtime is available) to forward them back
    // to the devtools panel via chrome.runtime.sendMessage.
    try {
      chrome.scripting.executeScript({
        target: { tabId: chrome.devtools.inspectedWindow.tabId },
        world: 'ISOLATED',
        func: () => {
          const w = window as any
          if (w.__spEditorPnpjsRelayInstalled) return
          w.__spEditorPnpjsRelayInstalled = true
          window.addEventListener('message', (event: MessageEvent) => {
            if (event.source !== window) return
            try {
              const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
              if (!data || data.source !== 'sp-editor-pnpjs-console') return
              chrome.runtime.sendMessage(data)
            } catch (_e) { /* swallow */ }
          })
        },
      }).catch(() => { /* swallow */ })
    } catch (_e) { /* swallow */ }
  }

  function runCode() {
    try {
      dispatch(clearConsoleOutput())
      installConsoleRelay()

      const model = editor.current!.getModel()!.getValue();
      const compilerOptions: CompilerOptions = getDefaultCompilerOptions();
      const js = transpileModule(model, {
        compilerOptions,
      });

      const lines = js.outputText.split('\n');
      const ecode: string[] = [];
      const prepnp: string[] = fixImports(lines, ecode);

      ecode.pop(); // remove the last empty line

      const script = `
    ${PNPJS_CONSOLE_PROXY_SOURCE}
    ${mod_graph}
    ${mod_logging}
    ${mod_sp}
    ${mod_spadmin}
    ${mod_spadmin}
    ${mod_queryable}
    ${mod_core}
    ${mod_msaljsclient}
    ${sj}
    ${exescript}
    ${execme(prepnp, ecode)}
    ${exescript.name}(execme);`;

      // console.log(script)
      // execute the code
      chrome.devtools.inspectedWindow.eval(script);
      // show loading for a sec to make user know the code is being executed
      dispatch(setLoading(true));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1200);
    } catch (e) {
      //console.log(e)
    }
  }

  // this will run always when the isDark changes
  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
  }, [isDark])

  // Receive forwarded console.* / errors from the inspected page (via
  // public/chrome/content.js -> chrome.runtime.sendMessage) and append to
  // the in-panel console output.
  useEffect(() => {
    const listener = (msg: any) => {
      if (!msg || msg.source !== 'sp-editor-pnpjs-console') {
        return
      }
      const args: any[] = Array.isArray(msg.args) ? msg.args : []
      const ts: number = typeof msg.ts === 'number' ? msg.ts : Date.now()
      const text: string = args
        .map((a) =>
          a === null || a === undefined
            ? String(a)
            : typeof a === 'string'
              ? a
              : (() => {
                  try { return JSON.stringify(a) } catch { return String(a) }
                })(),
        )
        .join(' ')
      dispatch(appendConsoleOutput({
        id: `${ts}-${Math.random().toString(36).slice(2, 8)}`,
        level: msg.level || 'log',
        message: text,
        timestamp: ts,
      }))
    }
    chrome.runtime.onMessage.addListener(listener)
    return () => {
      chrome.runtime.onMessage.removeListener(listener)
    }
  }, [dispatch])

  // Resizable splitter between the editor and the console output pane.
  useEffect(() => {
    if (!isResizing) {
      return
    }
    const onMove = (e: MouseEvent) => {
      const containerHeight = window.innerHeight
      // Cap to keep at least ~80px for the editor and 60px for the console.
      const next = Math.min(Math.max(containerHeight - e.clientY, 60), containerHeight - 200)
      setConsoleHeight(next)
      // Make sure Monaco re-layouts as we drag.
      if (editor.current) {
        try { editor.current.layout() } catch (_e) { /* noop */ }
      }
    }
    const onUp = () => {
      setIsResizing(false)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
      if (editor.current) {
        try { editor.current.layout() } catch (_e) { /* noop */ }
      }
    }
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'row-resize'
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [isResizing])

  // Listen for AI assistant apply/execute requests and update the editor
  // (and optionally run the snippet) without waiting for redux state to flow
  // back into the editor (which only happens at unmount).
  useEffect(() => {
    const handleApplyPnpjs = (event: Event) => {
      const ce = event as CustomEvent<{ code?: string; run?: boolean }>
      const newCode = ce.detail?.code
      if (typeof newCode !== 'string' || newCode.length === 0) {
        return
      }
      const run = ce.detail?.run === true

      // Update the live Monaco model so the user sees the change immediately.
      if (editor.current) {
        const model = editor.current.getModel()
        if (model) {
          model.setValue(newCode)
        }
      }
      // Keep redux in sync so it survives navigation/unmount.
      dispatch(setCode(newCode))

      if (run) {
        // Defer slightly so Monaco model + redux state propagate before run.
        setTimeout(() => runCode(), 0)
      }
    }

    window.addEventListener('sp-editor-apply-pnpjs', handleApplyPnpjs as EventListener)
    return () => {
      window.removeEventListener('sp-editor-apply-pnpjs', handleApplyPnpjs as EventListener)
    }
  }, [dispatch])

  // this will run when the compunent unmounts
  useEffect(() => {
    return () => {
      // cleaning models
      const models = editor.current!.getModel()!.getValue()
      completionItems.current?.dispose()
      dispatch(setCode(models))
      monaco.languages.typescript.typescriptDefaults.setExtraLibs([])
      monaco.editor.getModels().forEach(model => model.dispose())
    }
  }, [dispatch])

  useEffect(() => {
    if (definitions.length === 0 && !initialized) {
      fetchDefinitions(dispatch)
    } else if (definitions.length > 0 && !initialized) {
      setInitialized(true)
      initEditor()
    }
  }, [definitions, dispatch, initEditor, initialized])

  return (
    <>
      <CommandBar
        items={[
          {
            key: 'run',
            text: 'Run code',
            iconProps: { iconName: 'SetAction' },
            onClick: () => runCode(),
          },
        ]}
      />
      <div
        ref={outputDiv}
        style={{ width: '100%', height: `calc(100% - 44px - ${consoleHeight}px - 4px)` }}
      />
      <div
        onMouseDown={() => setIsResizing(true)}
        title="Drag to resize console output"
        style={{
          height: 4,
          cursor: 'row-resize',
          background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        }}
      />
      <PnPjsConsoleOutput height={consoleHeight} />
    </>
  );
}

export default PnPjsEditor
