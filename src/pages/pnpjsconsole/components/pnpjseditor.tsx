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
import { setCode } from '../../../store/pnpjsconsole/actions'
import { exescript } from '../../../utilities/chromecommon'
import { fetchDefinitions } from '../utils/util'
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

const PnPjsEditor = () => {
  const dispatch = useDispatch()
  const [ initialized, setInitialized ] = useState(false)
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

        // tslint:disable-next-line:no-bitwise
        editor.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD, () => {
          try {
            const model = editor.current!.getModel()!.getValue()
            const compilerOptions: CompilerOptions = getDefaultCompilerOptions()
            const js = transpileModule(model, {
              compilerOptions,
            })

            const lines = js.outputText.split('\n')
            const ecode: string[] = []
            const prepnp: string[] = fixImports(lines, ecode)

            ecode.pop() // remove the last empty line

            const script = `
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
            ${exescript.name}(execme);`

            // console.log(script)

            // execute the code
            chrome.devtools.inspectedWindow.eval(script)
            // show loading for a sec to make user know the code is being executed
            dispatch(setLoading(true))
            setTimeout(() => { dispatch(setLoading(false)) }, 1200)

          } catch (e) {
            //console.log(e)
          }

        })
        // trigget resize to make editor visible (bug in monaco 0.20.0?)
        setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 1)
      }
    }
  }, [COMMON_CONFIG, definitions, dispatch, stateCode])

  // this will run always when the isDark changes
  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
  }, [isDark])

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
    <div ref={outputDiv} style={{ width: '100%', height: '100%' }} />
  )
}

export default PnPjsEditor
