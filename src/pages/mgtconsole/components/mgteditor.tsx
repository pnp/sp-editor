/// <reference types='../../../../node_modules/monaco-editor/monaco' />

import {
  Dropdown,
  IDropdownOption,
  Stack,
} from '@fluentui/react'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ts, { transpileModule } from 'typescript'
import { IRootState } from '../../../store'
import { setAppMessage, setLoading } from '../../../store/home/actions'
import { IDefinitions, MessageBarColors } from '../../../store/home/types'
import { setCode, setTranspiled } from '../../../store/mgtconsole/actions'
import { fetchDefinitions } from '../utils/util'
import { componentSnippets } from './componentSnippets'
import { getDefinitionsInUse, MGTPlaygroundMonacoConfigs, parseClassComponent, parseModules } from './utils'
import { AuthenticationResult, BrowserUtils } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'

const MGTEditor = () => {
  const { instance, accounts } = useMsal();
  const dispatch = useDispatch()
  const [mgtEditorInitialized, setMGTEditorInitialized] = useState(false)
  const [selectedItem, setSelectedItem] = useState<IDropdownOption>();

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

      const owner = model.getLanguageId()
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

        console.log(preview_code)
        preview_code = parseModules(preview_code)

        preview_code = preview_code.replaceAll(
          'Object.defineProperty(exports, "__esModule", { value: true });',
          '',
        )
        preview_code = parseClassComponent(preview_code)

        dispatch(setLoading(true))
        setTimeout(() => { dispatch(setLoading(false)) }, 400)
        
       let frame: HTMLIFrameElement = document.getElementById("testSandboxFrame") as HTMLIFrameElement;
       frame.contentWindow?.postMessage(JSON.stringify({
        code: preview_code,
      }), "*");
      
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

  const onMessageReceivedFromIframe = React.useCallback(
    async (event: any) => {
      try {
        let data = JSON.parse(event.data);
        if (data.scopes) {
          let response: AuthenticationResult;
          try {
            response = await instance.acquireTokenSilent({
              ...data,
              account: accounts[0],
            })
          }
          catch {
            response = await instance.acquireTokenPopup({
              ...data,
              account: accounts[0],
              prompt: 'select_account'
            })
          }
          console.log(response.accessToken)
          let frame: HTMLIFrameElement = document.getElementById("testSandboxFrame") as HTMLIFrameElement;
          frame.contentWindow?.postMessage(JSON.stringify({
            token: response.accessToken,
          }), "*");
        }
        if (data.logout) {
          instance.logoutRedirect({
            account: instance.getActiveAccount(),
            onRedirectNavigate: () => !BrowserUtils.isInIframe()
          })
        }
      }
      catch (e) { }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("message", onMessageReceivedFromIframe);
    return () =>
      window.removeEventListener("message", onMessageReceivedFromIframe);
  }, [onMessageReceivedFromIframe]);

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
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD,
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
    setSelectedItem(option);
    if (option) {
      const componentSnippet = componentSnippets.find((components) => components.option.key === option.key)

      if (componentSnippet && componentSnippet.snippet) {
        mgtEditorRef.current?.setValue(componentSnippet.snippet)
        transpileIt()
      }
    }
  }

  const loaded = () => {
    transpileIt()
  }

  return (
      <Stack grow horizontal style={{ height: '100%' }}>
        <Stack style={{ width: '60%' }}>
          <Dropdown
            selectedKey={selectedItem ? selectedItem.key : undefined}
            placeholder='Select sample:'
            options={componentSnippets.map(componentSnippet => componentSnippet.option)}
            onChange={changeModel}
            defaultSelectedKey={componentSnippets[1].option.key}
          />
          <div
            ref={mgtEditorDiv}
            style={{ width: '100%', height: 'calc(100vh - 90px)' }}
          />
        </Stack>
        <Stack style={{ width: '40%', marginLeft: '10px', marginRight: '10px'  }}>
            <iframe onLoad={loaded} style={{ width: '100%', height: '100vh', borderWidth: '0px'}} id='testSandboxFrame' src="build/index.html#/mgtiframe" />
        </Stack>
      </Stack>
  )
}

export default MGTEditor
