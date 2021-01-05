/// <reference types='../../../../node_modules/monaco-editor/monaco' />

import {
  Dropdown,
  IDropdownOption,
  Stack,
} from '@fluentui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LiveError, LivePreview, LiveProvider } from 'react-live'
import { useDispatch, useSelector } from 'react-redux'
import ts, { transpileModule } from 'typescript'
import { IRootState } from '../../../store'
import { setCode, setTranspiled } from '../../../store/mgtconsole/actions'
import { fetchDefinitions } from '../utils/util'
import { getDefinitionsInUse, GraphSDKConsoleMonacoConfigs } from './utils'

/* Preview component imports */
import * as PREVIEW_MGT from '@microsoft/mgt'
import * as PREVIEW_MGT_ELEMENT from '@microsoft/mgt-element'
import * as PREVIEW_MGT_REACT from '@microsoft/mgt-react'
import * as PREVIEW_MSAL from 'msal'
import * as PREVIEW_REACT from 'react'
import { setAppMessage } from '../../../store/home/actions'
import { IDefinitions, MessageBarColors } from '../../../store/home/types'
import { componentSnippets } from './componentSnippets'
import { ErrorBoundary } from './ErrorBoundary'

const MGTEditor = () => {
  const dispatch = useDispatch()
  const [grapgEditorInitialized, setGrapgEditorInitialized] = useState(false)

  const { definitions, code, transpiled } = useSelector(
    (state: IRootState) => state.mgtconsole,
  )

  const grapheditor = useRef<null | monaco.editor.IStandaloneCodeEditor>(null)

  const grapgsdkEditorDiv = useRef<null | HTMLDivElement>(null)

  const completionItems = useRef<null | monaco.IDisposable>(null)

  const { isDark } = useSelector((state: IRootState) => state.home)

  const COMMON_CONFIG: monaco.editor.IEditorOptions = GraphSDKConsoleMonacoConfigs()

  useEffect(() => {
    const resizeListener = () => {
      if (grapheditor && grapheditor.current) {
        grapheditor.current.layout()
      }
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  const transpileIt = useCallback(() => {
    try {
      const model = grapheditor.current!.getModel()!

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
        const requires = js.outputText.match(/(var ).*( = require).*/g)

        const reqs: string[] = []
        if (requires) {
          requires.forEach((iText) => {
            preview_code = preview_code.replace(iText, '')
            reqs.push(iText)
          })
        }
        reqs
          .sort((a, b) => b.length - a.length)
          .forEach((req) => {
            const match = req.match('var (.*) = require')
            if (match!.input!.indexOf('require("@microsoft/mgt-react') > -1) {
              preview_code = preview_code.replaceAll(
                match![1] + '.default',
                'preview_mgt_react.'.toUpperCase(),
              )
              preview_code = preview_code.replaceAll(
                match![1],
                'preview_mgt_react'.toUpperCase(),
              )
            } else if (
              match!.input!.indexOf('require(”@microsoft/mgt-element') > -1
            ) {
              preview_code = preview_code.replaceAll(
                match![1] + '.default.',
                'preview_mgt_element.'.toUpperCase(),
              )
              preview_code = preview_code.replaceAll(
                match![1],
                'preview_mgt_element'.toUpperCase(),
              )
            } else if (match!.input!.indexOf('require("@microsoft/mgt') > -1) {
              preview_code = preview_code.replaceAll(
                match![1] + '.default.',
                'preview_mgt.'.toUpperCase(),
              )
              preview_code = preview_code.replaceAll(
                match![1],
                'preview_mgt'.toUpperCase(),
              )
            } else if (match!.input!.indexOf('require("react"') > -1) {
              preview_code = preview_code.replaceAll(
                match![1] + '.default.',
                'preview_react.'.toUpperCase(),
              )
              preview_code = preview_code.replaceAll(
                match![1],
                'preview_react'.toUpperCase(),
              )
            } else if (match!.input!.indexOf('require("msal"') > -1) {
              preview_code = preview_code.replaceAll(
                match![1] + '.default.',
                'preview_msal.'.toUpperCase(),
              )
              preview_code = preview_code.replaceAll(
                match![1],
                'preview_msal'.toUpperCase(),
              )
            }
          })

        preview_code = preview_code.replaceAll('"use strict";', '')
        preview_code = preview_code.replaceAll(
          'Object.defineProperty(exports, "__esModule", { value: true });',
          '',
        )
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

  const initGraphEditor = useCallback(() => {
    const filename = 'main.tsx'
    if (grapgsdkEditorDiv.current) {
      grapheditor.current = monaco.editor.create(grapgsdkEditorDiv.current, {
        model: monaco.editor.createModel(
          code,
          'typescript',
          // @ts-ignore: this is the only way to make it work
          monaco.Uri.file(filename),
        ),
        ...COMMON_CONFIG,
      })

      const codeWOComments = grapheditor
        .current!.getModel()!
        .getValue()
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
      const curLibs: IDefinitions[] = getDefinitionsInUse(
        codeWOComments,
        definitions,
      )
      const koko = curLibs.map((dmodule) => {
        dmodule.filePath = 'file:///node_modules/' + dmodule.filePath
        return dmodule
      })
      monaco.languages.typescript.typescriptDefaults.setExtraLibs(koko)
      // console.log(monaco.languages.typescript.typescriptDefaults.getExtraLibs())
      if (grapheditor && grapheditor.current) {
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

        grapheditor.current.onDidChangeModelContent(() => {
          const codeWithOutComments = grapheditor
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

        grapheditor.current.addCommand(
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
  }, [COMMON_CONFIG, definitions, code, transpileIt])

  // this will run always when the isDark changes
  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
  }, [isDark])

  // this will run when the compunent unmounts
  useEffect(() => {
    return () => {
      // cleaning models
      const models = grapheditor.current!.getModel()!.getValue()
      completionItems.current?.dispose()
      dispatch(setCode(models))
      monaco.languages.typescript.typescriptDefaults.setExtraLibs([])
      monaco.editor.getModels().forEach((model) => model.dispose())
    }
  }, [dispatch])

  useEffect(() => {
    if (definitions.length === 0 && !grapgEditorInitialized) {
      fetchDefinitions(dispatch)
    } else if (definitions.length > 0 && !grapgEditorInitialized) {
      setGrapgEditorInitialized(true)
      initGraphEditor()
    }
  }, [definitions, dispatch, initGraphEditor, grapgEditorInitialized])

  const changeModel = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption | undefined,
  ) => {
    if (option) {
      const componentSnippet = componentSnippets.find((components) => components.option.key === option.key)

      if (componentSnippet && componentSnippet.snippet) {
        grapheditor.current?.setValue(componentSnippet.snippet)
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
            ref={grapgsdkEditorDiv}
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
