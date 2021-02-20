/// <reference types='../../../../node_modules/monaco-editor/monaco' />

import {
  Dropdown,
  IDropdownOption,
  Stack,
} from '@fluentui/react'

/* Preview component imports */
import * as PREVIEW_MGT from '@microsoft/mgt'
import * as PREVIEW_MGT_ELEMENT from '@microsoft/mgt-element'
import * as PREVIEW_MGT_REACT from '@microsoft/mgt-react'
import * as PREVIEW_MSAL from 'msal'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as PREVIEW_REACT from 'react'
import { LiveError, LivePreview, LiveProvider } from 'react-live'
import { useDispatch, useSelector } from 'react-redux'
import ts, { transpileModule } from 'typescript'
import { IRootState } from '../../../store'
import { setAppMessage } from '../../../store/home/actions'
import { IDefinitions, MessageBarColors } from '../../../store/home/types'
import { setCode, setTranspiled } from '../../../store/mgtconsole/actions'
import { fetchDefinitions } from '../utils/util'
import { componentSnippets } from './componentSnippets'
import { ErrorBoundary } from './ErrorBoundary'
import { getDefinitionsInUse, MGTPlaygroundMonacoConfigs, parseClassComponent, parseModules } from './utils'

const MGTEditor = () => {
  const dispatch = useDispatch()
  const [mgtEditorInitialized, setMGTEditorInitialized] = useState(false)

  const { definitions, transpiled } = useSelector(
    (state: IRootState) => state.mgtconsole,
  )

  const mgtEditorRef = useRef<null | monaco.editor.IStandaloneCodeEditor>(null)

  const mgtEditorDiv = useRef<null | HTMLDivElement>(null)

  const completionItems = useRef<null | monaco.IDisposable>(null)

  const { isDark } = useSelector((state: IRootState) => state.home)

  const COMMON_CONFIG: monaco.editor.IEditorOptions = MGTPlaygroundMonacoConfigs()

  useEffect(() => {
    const resizeListener = () => {
      if (mgtEditorRef && mgtEditorRef.current) {
        mgtEditorRef.current.layout()
      }
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  const transpileIt = useCallback(() => {
    try {
      const model = mgtEditorRef.current!.getModel()!

      const owner = model.getModeId()
      const markers = monaco.editor.getModelMarkers({ owner })

      const errors: string[] = []
      markers.forEach((mark) => {
        if (mark.severity === 8) {
          errors.push(mark.message)
        }
      })

      if (errors.length === 0) {
        const modelValue = model.getValue()
        const js = transpileModule(modelValue, {
          compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            jsx: ts.JsxEmit.React,
          },
        })

        let preview_code = js.outputText

        // console.log(preview_code)
        preview_code = parseModules(preview_code)

        preview_code = preview_code.replaceAll(
          'Object.defineProperty(exports, "__esModule", { value: true });',
          '',
        )
        preview_code = parseClassComponent(preview_code)

       // console.log(preview_code)
        dispatch(setTranspiled(preview_code))
      } else {
        dispatch(
          setAppMessage({
            showMessage: true,
            message: errors.join('\n'),
            color: MessageBarColors.danger,
          }),
        )
      }
    } catch (e) {
      console.log(e)
    }
  }, [dispatch])

  const initMGTEditor = useCallback(() => {
    if (mgtEditorDiv.current) {
      mgtEditorRef.current = monaco.editor.create(mgtEditorDiv.current, {
        model: monaco.editor.createModel(
          componentSnippets[1].snippet!,
          'typescript',
          // @ts-ignore: this is the only way to make it work
          monaco.Uri.file('main.tsx'),
        ),
        ...COMMON_CONFIG,
      })

      const codeWOComments = mgtEditorRef
        .current!.getModel()!
        .getValue()
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
      const curLibs: IDefinitions[] = getDefinitionsInUse(
        codeWOComments,
        definitions,
      )
      const modLibs = curLibs.map((dmodule) => {
        dmodule.filePath = 'file:///node_modules/' + dmodule.filePath
        return dmodule
      })
      monaco.languages.typescript.typescriptDefaults.setExtraLibs(modLibs)
      // console.log(monaco.languages.typescript.typescriptDefaults.getExtraLibs())
      if (mgtEditorRef && mgtEditorRef.current) {
        // adds auto-complete for @pnp module imports
        completionItems.current = monaco.languages.registerCompletionItemProvider(
          'typescript',
          {
            triggerCharacters: ['@', '/'],
            provideCompletionItems: (model, position) => {
              const textUntilPosition = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              })

              const importText = textUntilPosition.substring(
                textUntilPosition.indexOf('@'),
              )
              const moduleDepth = importText.split('/')
              const suggestions: any[] = []
              definitions.forEach((file) => {
                if (file.filePath.indexOf(importText) > -1) {
                  const depthIndex = file.filePath
                    .split('/', moduleDepth.length)
                    .join('/').length
                  const importedModule = file.filePath
                    .substring(0, depthIndex)
                    .replace('.d.ts', '')
                  if (!suggestions.find((o) => o.label === importedModule)) {
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
          },
        )

        mgtEditorRef.current.onDidChangeModelContent(() => {
          const codeWithOutComments = mgtEditorRef
            .current!.getModel()!
            .getValue()
            .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')

          const currentLibs: IDefinitions[] = getDefinitionsInUse(
            codeWithOutComments,
            definitions,
          )

          const extralibs = monaco.languages.typescript.typescriptDefaults.getExtraLibs()
          if (currentLibs.length !== Object.keys(extralibs).length) {
            currentLibs.forEach(
              (dmodule) =>
                (dmodule.filePath =
                  'file:///node_modules/' +
                  dmodule.filePath.replace('file:///node_modules/', '')),
            )
            monaco.languages.typescript.typescriptDefaults.setExtraLibs(
              currentLibs,
            )
          }
        })

        mgtEditorRef.current.addCommand(
          // tslint:disable-next-line:no-bitwise
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_D,
          () => transpileIt(),
        )
        // trigget resize to make editor visible (bug in monaco 0.20.0?)
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
        }, 1)
        transpileIt()
      }
    }
  }, [COMMON_CONFIG, definitions, transpileIt])

  // this will run always when the isDark changes
  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
  }, [isDark])

  // this will run when the compunent unmounts
  useEffect(() => {
    return () => {
      // cleaning models
      const models = mgtEditorRef.current!.getModel()!.getValue()
      completionItems.current?.dispose()
      dispatch(setCode(models))
      monaco.languages.typescript.typescriptDefaults.setExtraLibs([])
      monaco.editor.getModels().forEach((model) => model.dispose())
    }
  }, [dispatch])

  useEffect(() => {
    if (definitions.length === 0 && !mgtEditorInitialized) {
      fetchDefinitions(dispatch)
    } else if (definitions.length > 0 && !mgtEditorInitialized) {
      setMGTEditorInitialized(true)
      initMGTEditor()
    }
  }, [definitions, dispatch, initMGTEditor, mgtEditorInitialized])

  const changeModel = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption | undefined,
  ) => {
    if (option) {
      const componentSnippet = componentSnippets.find((components) => components.option.key === option.key)

      if (componentSnippet && componentSnippet.snippet) {
        mgtEditorRef.current?.setValue(componentSnippet.snippet)
        transpileIt()
      }
    }
  }

  const scope = {
    PREVIEW_REACT,
    PREVIEW_MGT_REACT,
    PREVIEW_MGT,
    PREVIEW_MGT_ELEMENT,
    PREVIEW_MSAL,
  }

  return (
    <LiveProvider code={transpiled} scope={scope}>
      <Stack grow horizontal style={{ height: '100%' }}>
        <Stack style={{ width: '60%' }}>
          <Dropdown
            placeholder='Select sample:'
            options={componentSnippets.map(componentSnippet => componentSnippet.option)}
            onChange={changeModel}
          />
          <div
            ref={mgtEditorDiv}
            style={{ width: '100%', height: 'calc(100vh - 90px)' }}
          />
        </Stack>
        <Stack style={{ marginLeft: '10px' }}>
          <ErrorBoundary>
            <LivePreview className='viewer' />
          </ErrorBoundary>
          <LiveError
            className='error'
            hidden={transpiled && transpiled.length > 0 ? false : true}
          />
        </Stack>
      </Stack>
    </LiveProvider>
  )
}

export default MGTEditor