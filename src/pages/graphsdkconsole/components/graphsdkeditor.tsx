/// <reference types='../../../../node_modules/monaco-editor/monaco' />

import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CompilerOptions,
  getDefaultCompilerOptions,
  transpileModule,
} from 'typescript'
import { IRootState } from '../../../store'
import { setLoading } from '../../../store/home/actions'
import { IDefinitions, MessageBarColors } from '../../../store/home/types'
import { fetchDefinitions } from '../utils/util'
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import {
  fixImports,
  getDefinitionsInUse,
  GraphSDKConsoleMonacoConfigs,
  mod_graph_sdk,
  sj,
} from './utils'
import * as rootActions from '../../../store/home/actions'
import { loginRequest } from '../../..'
import { appendConsoleOutput, clearConsoleOutput, setCode, setEditPanel, setScopes, setUser } from '../../../store/graphsdkconsole/actions'
import { GraphClient } from '../../../services/graph-client/graph-client'
import { IGraphSDKConsoleEntry, SPEditorUser } from '../../../store/graphsdkconsole/types'
import { GRAPHSDK_CONSOLE_PROXY_SOURCE } from './graphsdkConsoleProxy'
import GraphSDKConsoleOutput from './graphsdkConsoleOutput'
import { CommandBar, Icon, IIconStyles, Persona, PersonaSize } from '@fluentui/react'
import { AuthenticationResult, BrowserUtils } from '@azure/msal-browser'
import React from 'react'

const GraphSDKEditor = () => {
  const dispatch = useDispatch()
  const [grapgEditorInitialized, setGrapgEditorInitialized] = useState(false)
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const { definitions, code } = useSelector(
    (state: IRootState) => state.graphsdkconsole,
  )
  const stateCode = code

  const grapheditor = useRef<null | monaco.editor.IStandaloneCodeEditor>(null)
  const outputeditor = useRef<null | monaco.editor.IStandaloneCodeEditor>(null)

  const grapgsdkEditorDiv = useRef<null | HTMLDivElement>(null)

  const completionItems = useRef<null | monaco.IDisposable>(null)

  const { isDark } = useSelector((state: IRootState) => state.home)

  const COMMON_CONFIG: monaco.editor.IEditorOptions = GraphSDKConsoleMonacoConfigs()

  const [consoleHeight, setConsoleHeight] = useState<number>(220)
  const [isResizing, setIsResizing] = useState(false)

  useEffect(() => {
    const resizeListener = () => {
      if (grapheditor && grapheditor.current) {
        grapheditor.current.layout()
      }
      if (outputeditor && outputeditor.current) {
        outputeditor.current.layout()
      }
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  //const dispatch = useDispatch()
  //const { instance, accounts } = useMsal();
  //const isAuthenticated = useIsAuthenticated();

  const iconStyles: Partial<IIconStyles> = { root: { marginRight: 5 } };

  const { spuoser } = useSelector(
    (state: IRootState) => state.graphsdkconsole,
  )


  const installGraphSdkConsoleRelay = () => {
    if (chrome?.scripting) {
      chrome.scripting.executeScript({
        target: { tabId: chrome.devtools.inspectedWindow.tabId },
        world: 'ISOLATED' as any,
        func: () => {
          const w = window as any
          if (w.__spEditorGraphSdkRelayInstalled) return
          w.__spEditorGraphSdkRelayInstalled = true
          window.addEventListener('message', (event) => {
            try {
              const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
              if (data && data.source === 'sp-editor-graphsdk-console') {
                chrome.runtime.sendMessage(data)
              }
            } catch (_e) { /* swallow */ }
          })
        },
      })
    }
  }

  async function runCode() {
    dispatch(clearConsoleOutput())
    installGraphSdkConsoleRelay()

    if (!instance.getActiveAccount()) {

      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'You need to signin before you can run the script!',
        color: MessageBarColors.warning,
      }))

    }
    else {

      try {
        const code = grapheditor.current!.getModel()!.getValue()
        var modCode = code.replace("(async () => {",
          `
        import {
          Client
        } from '@microsoft/microsoft-graph-client'

        const graphClient = Client.initWithMiddleware({
          authProvider: {
            getAccessToken: async () => {
              return "TOKENHERE";
            },
          },
        });
        (async () => {`)
        const compilerOptions: CompilerOptions = getDefaultCompilerOptions()
        const js = transpileModule(modCode, {
          compilerOptions,
        })
        const lines = js.outputText.split('\n')
        const ecode: string[] = []
        const prepnp: string[] = fixImports(lines, ecode)

        ecode.pop() // remove the last empty line

        const exescript = [
          'var exescript = function (script) {',
          '\t var params = arguments;',
          '\t\t if (typeof SystemJS == "undefined") {',
          '\t\t\t var s = document.createElement("script");',
          '\t\t\t s.src = sj;',
          '\t\t\t s.onload = function () {',
          '\t\t\t\t script.apply(this, params);',
          '\t\t\t };',
          '\t\t\t (document.head || document.documentElement).appendChild(s);',
          '\t\t }',
          '\t\t else script.apply(this, params);',
          '}',
        ].join('\n')

        const ecodeStr = JSON.stringify(ecode.join('\n'))
        const execme = [
          'var execme = function execme() {',
          '\twindow.__spEditorGraphSdkRunning = true;',
          '\tPromise.all([SystemJS.import(mod_graph_sdk)]).then(function (modules) {',
          '\t\t' + prepnp.join('\n'),
          '\t\t// Your code starts here',
          '\t\t// #####################',
          '\t\tvar __result;',
          '\t\ttry {',
          `\t\t\t__result = eval(${ecodeStr});`,
          '\t\t} catch(e) {',
          "\t\t\tconsole.error(e);",
          "\t\t\twindow.__spEditorGraphSdkRunning = false;",
          "\t\t\twindow.postMessage(JSON.stringify({ source: 'sp-editor-graphsdk-console', type: 'exec-done' }), '*');",
          '\t\t\treturn;',
          '\t\t}',
          '\t\t// #####################',
          '\t\t// Your code ends here',
          '\t\tPromise.resolve(__result).then(function() {',
          '\t\t\twindow.__spEditorGraphSdkRunning = false;',
          "\t\t\twindow.postMessage(JSON.stringify({ source: 'sp-editor-graphsdk-console', type: 'exec-done' }), '*');",
          '\t\t}, function(e) {',
          '\t\t\tconsole.error(e);',
          '\t\t\twindow.__spEditorGraphSdkRunning = false;',
          "\t\t\twindow.postMessage(JSON.stringify({ source: 'sp-editor-graphsdk-console', type: 'exec-done' }), '*');",
          '\t\t});',
          '\t}, function(e) {',
          '\t\tconsole.error(e);',
          '\t\twindow.__spEditorGraphSdkRunning = false;',
          "\t\twindow.postMessage(JSON.stringify({ source: 'sp-editor-graphsdk-console', type: 'exec-done' }), '*');",
          '\t});',
          '};'
        ].join('\n')

        // tslint:disable-next-line:prefer-template
        let script = GRAPHSDK_CONSOLE_PROXY_SOURCE + '\n' +
          mod_graph_sdk + '\n' +
          sj + '\n\n' +
          exescript + '\n\n' +
          execme + '\n\n'

        script += 'exescript(execme);'

        try {
          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          })
          chrome.devtools.inspectedWindow.eval(script.replace(/TOKENHERE/g, response.accessToken))
        } catch (e) {
          const response = await instance.acquireTokenPopup({
            ...loginRequest,
            account: accounts[0],
          })
          chrome.devtools.inspectedWindow.eval(script.replace(/TOKENHERE/g, response.accessToken))
        }
        // spinner stays until exec-done message is received (or 30 s safety cap)
        dispatch(setLoading(true))
        const safetyTimer = setTimeout(() => dispatch(setLoading(false)), 30000)
        ;(window as any).__spEditorGraphSdkSafetyTimer = safetyTimer
      } catch (e) {
        //console.log(e)
      }
    }
  }
  const initGraphEditor = useCallback(async () => {
    if (grapgsdkEditorDiv.current) {
      grapheditor.current = monaco.editor.create(grapgsdkEditorDiv.current, {
        model: monaco.editor.createModel(
          stateCode,
          'typescript',
          // @ts-ignore: this is the only way to make it work
          monaco.Uri.file('graph-index.ts'),
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

      const newLibs = curLibs.map((dmodule) => {
        dmodule.filePath = 'file:///node_modules/' + dmodule.filePath
        return dmodule
      })

      monaco.languages.typescript.typescriptDefaults.setExtraLibs(newLibs)

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

        grapheditor.current.onDidChangeModelContent((x) => {
          const codeWithOutComments = grapheditor
            .current!.getModel()!
            .getValue()
            .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
          const currentLibs: IDefinitions[] = getDefinitionsInUse(
            codeWithOutComments,
            definitions,
          )
          // @ts-ignore: getExtraLibs() not defined in monaco.d.ts
          const extralibs = monaco.languages.typescript.typescriptDefaults.getExtraLibs()
          if (currentLibs.length !== Object.keys(extralibs).length) {
            const newContentLibs = currentLibs.map((dmodule) => {
              dmodule.filePath = 'file:///node_modules/' + dmodule.filePath
              return dmodule
            })
            monaco.languages.typescript.typescriptDefaults.setExtraLibs(newContentLibs)
          }
        })
        grapheditor.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        });
        // tslint:disable-next-line:no-bitwise
        grapheditor.current.addCommand(
          // tslint:disable-next-line: no-bitwise
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyD,
          async () => {

            await runCode()


          },
        )
        if (isAuthenticated) {
          try {
            const response = await instance.acquireTokenSilent({
              ...loginRequest,
              account: accounts[0],
            })
            dispatch(setScopes(response.scopes))

            var client = GraphClient.createInstance(instance, accounts[0])

            const org = await client.api('organization').get()

            const user = await client.api('me/profile').version('beta').get()

            var image;
            try {
              const photo = await client.api('me/photo/$value').version('beta').get()
              const buffer = await photo.arrayBuffer();
              const blob = new Blob([buffer], { type: 'image/jpeg' });
              image = URL.createObjectURL(blob)
            } catch (e) {
            }

            var payload: SPEditorUser = {
              Name: user.names[0].displayName,
              Initials: '',
              TenantName: org.value[0].displayName,
              TenantId: org.value[0].id,
              userId: user.account[0].userPrincipalName,
              imageUrl: image
            }
            dispatch(setUser(payload))

          }
          catch { }
        }
        // trigget resize to make editor visible (bug in monaco 0.20.0?)
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
        }, 1)
      }
    }
  }, [COMMON_CONFIG, dispatch, definitions, stateCode])


  // this will run always when the isDark changes
  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
  }, [isDark])

  // Forward console messages from the inspected page to Redux
  useEffect(() => {
    const handler = (msg: any) => {
      if (!msg || msg.source !== 'sp-editor-graphsdk-console') return
      if (msg.type === 'exec-done') {
        clearTimeout((window as any).__spEditorGraphSdkSafetyTimer)
        dispatch(setLoading(false))
        return
      }
      const level = (msg.level || 'log') as IGraphSDKConsoleEntry['level']
      const args: string[] = Array.isArray(msg.args) ? msg.args : [String(msg.args)]
      const entry: IGraphSDKConsoleEntry = {
        id: `${Date.now()}-${Math.random()}`,
        level,
        message: args.join(' '),
        timestamp: msg.ts || Date.now(),
      }
      dispatch(appendConsoleOutput(entry))
    }
    chrome.runtime.onMessage.addListener(handler)
    return () => { chrome.runtime.onMessage.removeListener(handler) }
  }, [dispatch])

  // Handle drag-to-resize the console panel
  useEffect(() => {
    if (!isResizing) return
    const onMouseMove = (e: MouseEvent) => {
      const newHeight = window.innerHeight - e.clientY
      if (newHeight > 60 && newHeight < window.innerHeight - 200) {
        setConsoleHeight(newHeight)
        if (grapheditor.current) { grapheditor.current.layout() }
      }
    }
    const onMouseUp = () => { setIsResizing(false) }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [isResizing])

  // Listen for AI-generated code snippets from the AI assistant panel
  useEffect(() => {
    const handleApplyGraphSdk = (e: Event) => {
      const ce = e as CustomEvent<{ code?: string }>
      const newCode = ce.detail?.code
      if (typeof newCode !== 'string' || !newCode.trim()) return

      if (grapheditor.current) {
        const model = grapheditor.current.getModel()
        if (model) {
          model.setValue(newCode)
        }
      }
      dispatch(setCode(newCode))
    }

    window.addEventListener('sp-editor-apply-graphsdk', handleApplyGraphSdk as EventListener)
    return () => {
      window.removeEventListener('sp-editor-apply-graphsdk', handleApplyGraphSdk as EventListener)
    }
  }, [dispatch])

  // this will run when the compunent unmounts
  useEffect(() => {
    return () => {
      // cleaning models
      completionItems.current?.dispose()
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

  return (
    <>
      <CommandBar
        items={[
          {
            key: 'Signin',
            text: 'Signin',
            iconProps: { iconName: 'Signin' },
            disabled: isAuthenticated,
            onClick: () => {
              (async () => {
  
                if (!isAuthenticated) {
  
                  let response: AuthenticationResult;
                  try {
                    response = await instance.acquireTokenSilent({
                      ...loginRequest,
                      account: accounts[0],
                    })
                  }
                  catch {
                    response = await instance.acquireTokenPopup({
                      ...loginRequest,
                      account: accounts[0],
                      prompt: 'select_account'
                    })
                  }
  
                  dispatch(setScopes(response.scopes))
                  GraphClient.createInstance(instance, accounts[0])
                }
  
                var client = GraphClient.createInstance(instance, accounts[0])
                const org = await client.api('organization').get()
                const user = await client.api('me/profile').version('beta').get()
    
                let image: string = ''; // Initialize with a default value
                try {
                  const photo = await client.api('me/photo/$value').version('beta').get();
                  const buffer = await photo.arrayBuffer();
                  const blob = new Blob([buffer], { type: 'image/jpeg' });
                  image = URL.createObjectURL(blob);
                } catch (e) {
                  console.error("Failed to load image:", e); // Log the error
                }
                
                // Ensure that the objects and properties you're accessing exist to avoid runtime errors
                const payload = {
                  Name: user.names && user.names[0] ? user.names[0].displayName : '',
                  Initials: '',
                  TenantName: org.value && org.value[0] ? org.value[0].displayName : '',
                  TenantId: org.value && org.value[0] ? org.value[0].id : '',
                  userId: user.account && user.account[0] ? user.account[0].userPrincipalName : '',
                  imageUrl: image
                };
                
                // Assuming dispatch is properly defined and accessible in this context
                dispatch(setUser(payload));
  
              })();
            }
          },
          {
            key: 'run',
            text: 'Run code',
            iconProps: { iconName: 'SetAction' },
            onClick: () => {
              runCode()
            },
            disabled: !isAuthenticated,
          },
          {
            key: 'Signout',
            text: 'Signout',
            iconProps: { iconName: 'Signout' },
            onClick: () => {
              instance.logoutRedirect({
                account: instance.getActiveAccount(),
                onRedirectNavigate: () => !BrowserUtils.isInIframe()
              })
              dispatch(setScopes([]))
              dispatch(setUser(undefined))
  
            },
            disabled: !isAuthenticated
          },
          {
            key: 'manageScopes',
            text: 'Manage Scopes',
            iconProps: { iconName: 'PageEdit' },
            onClick: () => {
              dispatch(setEditPanel(true))
            },
            disabled: !isAuthenticated,
          }
        ]}
        farItems={isAuthenticated ? [
          {
            key: 'app2',
            commandBarButtonAs: () => (<Persona
              imageInitials={spuoser?.Name?.split(" ").map((n) => n[0]).join("")}
              text={spuoser?.Name}
              optionalText={'kukkuu'}
              secondaryText={spuoser?.TenantName}
              imageUrl={spuoser?.imageUrl}
              size={PersonaSize.size40}
              imageAlt="Annie Lindqvist, status is away"
              onRenderSecondaryText={(props) => (
                <div>
                  <Icon iconName="Globe" styles={iconStyles} />
                  {props?.secondaryText}
                </div>
              )}
            />)
          },
        ] : []}
      />      <div ref={grapgsdkEditorDiv} style={{ width: '100%', height: `calc(100vh - 80px - ${consoleHeight}px - 4px)` }} />
      <div
        onMouseDown={() => setIsResizing(true)}
        style={{
          height: 4,
          cursor: 'row-resize',
          background: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
          flexShrink: 0,
        }}
      />
      <GraphSDKConsoleOutput height={consoleHeight} />
    </>
  );
}

export default GraphSDKEditor
