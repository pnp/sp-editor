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
import { setCode, setResult } from '../../../store/graphsdkconsole/actions'
import { IDefinitions } from '../../../store/graphsdkconsole/types'
import { fetchDefinitions } from '../utils/util'
import {
  fixImports,
  getDefinitionsInUse,
  GraphSDKConsoleMonacoConfigs,
  mod_graph_sdk,
  mod_msal,
  sj,
} from './utils'
import { Stack } from '@fluentui/react'

const GraphSDKEditor = () => {
  const dispatch = useDispatch();
  const [grapgEditorInitialized, setGrapgEditorInitialized] = useState(false);
  const [graphOutputinitialized, setGraphOutputinitialized] = useState(false);

  const { definitions, code, result } = useSelector(
    (state: IRootState) => state.graphsdkconsole
  );
  const stateCode = code;

  const grapheditor = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);
  const outputeditor = useRef<null | monaco.editor.IStandaloneCodeEditor>(null);

  const grapgsdkEditorDiv = useRef<null | HTMLDivElement>(null);
  const graphOutputDiv = useRef<null | HTMLDivElement>(null);

  const completionItems = useRef<null | monaco.IDisposable>(null);

  const { isDark } = useSelector((state: IRootState) => state.home);

  const COMMON_CONFIG: monaco.editor.IEditorOptions = GraphSDKConsoleMonacoConfigs();

  useEffect(() => {
    const resizeListener = () => {
      if (grapheditor && grapheditor.current) {
        grapheditor.current.layout();
      }
      if (outputeditor && outputeditor.current) {
        outputeditor.current.layout();
      }
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const initGraphEditor = useCallback(() => {
    if (grapgsdkEditorDiv.current) {
      grapheditor.current = monaco.editor.create(grapgsdkEditorDiv.current, {
        model: monaco.editor.createModel(
          stateCode,
          "typescript",
          // @ts-ignore: this is the only way to make it work
          new monaco.Uri("graph-index.ts")
        ),
        ...COMMON_CONFIG,
      });

      const codeWOComments = grapheditor
        .current!.getModel()!
        .getValue()
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
      const curLibs: IDefinitions[] = getDefinitionsInUse(
        codeWOComments,
        definitions
      );
      monaco.languages.typescript.typescriptDefaults.setExtraLibs(curLibs);
      if (grapheditor && grapheditor.current) {
        // adds auto-complete for @pnp module imports
        completionItems.current = monaco.languages.registerCompletionItemProvider(
          "typescript",
          {
            triggerCharacters: ["@", "/"],
            provideCompletionItems: (model, position) => {
              const textUntilPosition = model.getValueInRange({
                startLineNumber: position.lineNumber,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              });

              const importText = textUntilPosition.substring(
                textUntilPosition.indexOf("@")
              );
              const moduleDepth = importText.split("/");
              const suggestions: any[] = [];

              definitions.forEach((file) => {
                if (file.filePath.indexOf(importText) > -1) {
                  const depthIndex = file.filePath
                    .split("/", moduleDepth.length)
                    .join("/").length;
                  const importedModule = file.filePath
                    .substring(0, depthIndex)
                    .replace(".d.ts", "");
                  if (!suggestions.find((o) => o.label === importedModule)) {
                    suggestions.push({
                      label: importedModule,
                      insertText: importedModule.replace(importText, ""),
                      kind: monaco.languages.CompletionItemKind.Module,
                    });
                  }
                }
              });
              return {
                suggestions,
              };
            },
          }
        );

        grapheditor.current.onDidChangeModelContent((x) => {
          const codeWithOutComments = grapheditor
            .current!.getModel()!
            .getValue()
            .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
          const currentLibs: IDefinitions[] = getDefinitionsInUse(
            codeWithOutComments,
            definitions
          );
          // @ts-ignore: getExtraLibs() not defined in monaco.d.ts
          const extralibs = monaco.languages.typescript.typescriptDefaults.getExtraLibs();
          if (currentLibs.length !== Object.keys(extralibs).length) {
            monaco.languages.typescript.typescriptDefaults.setExtraLibs(
              currentLibs
            );
          }
        });

        // tslint:disable-next-line:no-bitwise
        grapheditor.current.addCommand(
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_D,
          () => {
            try {
              const model = grapheditor.current!.getModel()!.getValue();
              const compilerOptions: CompilerOptions = getDefaultCompilerOptions();
              const js = transpileModule(model, {
                compilerOptions,
              });

              const lines = js.outputText.split("\n");
              const ecode: string[] = [];
              const prepnp: string[] = fixImports(lines, ecode);

              ecode.pop(); // remove the last empty line

              var exescript = [
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
              ].join('\n');

              var execme = [
                'var execme = function execme() {',
                '\tPromise.all([SystemJS.import(mod_msal),SystemJS.import(mod_graph_sdk)]).then(function (modules) {',
                '\t\t' + prepnp.join('\n'),
                '\t\t// Your code starts here',
                '\t\t// #####################',
                '' + ecode.map(function (e) { return '\t\t\t' + e }).join('\n'),
                '\t\t// #####################',
                '\t\t// Your code ends here',
                '\t});',
                '};'].join('\n').replace(/console.log/g, 'clone.logNew');

              var script = mod_msal + '\n' +
                mod_graph_sdk + '\n' +
                sj + '\n\n' +
                exescript + '\n\n' +
                execme + '\n\n';

              script += "exescript(execme);";

              var clone = Object.create(console);

              clone.logNew = console.log;
              clone.logNew = function (value: string) {
                dispatch(setLoading(false))
                dispatch(setResult(JSON.stringify(value, null, 2)));
              };
              
              dispatch(setLoading(true))
              // eslint-disable-next-line no-eval
              eval(script)
            } catch (e) {
              console.log(e);
            }
          }
        );
        // trigget resize to make editor visible (bug in monaco 0.20.0?)
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 1);
      }
    }
  }, [COMMON_CONFIG, dispatch, definitions, stateCode]);

  const initOutputEditor = useCallback(() => {
    if (graphOutputDiv.current) {
      outputeditor.current = monaco.editor.create(graphOutputDiv.current, {
        model: monaco.editor.createModel(
          result,
          "json",
          // @ts-ignore: this is the only way to make it work
          new monaco.Uri("results2.ts")
        ),
        ...COMMON_CONFIG,
      });

      if (outputeditor && outputeditor.current) {
        // trigget resize to make editor visible (bug in monaco 0.20.0?)
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 1);
      }
    }
  }, [COMMON_CONFIG, result]);

  // this will run always when the isDark changes
  useEffect(() => {
    monaco.editor.setTheme(isDark ? "vs-dark" : "vs");
  }, [isDark]);

  // this will run when the compunent unmounts
  useEffect(() => {
    return () => {
      // cleaning models
      const models = grapheditor.current!.getModel()!.getValue();
      completionItems.current?.dispose();
      dispatch(setCode(models));
      monaco.languages.typescript.typescriptDefaults.setExtraLibs([]);
      monaco.editor.getModels().forEach((model) => model.dispose());
    };
  }, [dispatch]);

  useEffect(() => {
    if (definitions.length === 0 && !grapgEditorInitialized) {
      fetchDefinitions(dispatch);
    } else if (definitions.length > 0 && !grapgEditorInitialized) {
      setGrapgEditorInitialized(true);
      initGraphEditor();
    }
  }, [definitions, dispatch, initGraphEditor, grapgEditorInitialized]);

  useEffect(() => {
    if (!graphOutputinitialized) {
      setGraphOutputinitialized(true);
      initOutputEditor();
    }
  }, [dispatch, initOutputEditor, graphOutputinitialized]);

  useEffect(() => {
    if (graphOutputinitialized) {
      const model = outputeditor.current?.getModel();
      if (model) {
        outputeditor.current?.setValue(result);
      }
    }
  }, [graphOutputinitialized, result]);

  return (
    <Stack grow horizontal style={{ height: "100%" }}>
      <div ref={grapgsdkEditorDiv} style={{ width: "60%", height: "100%" }} />
      <div ref={graphOutputDiv} style={{ width: "40%", height: "100%" }} />
    </Stack>
  );
};

export default GraphSDKEditor
