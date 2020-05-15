import { IStackStyles, Stack, StackItem } from 'office-ui-fabric-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'

const ApiTesterResults = () => {

  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)

  const editor = useRef<null | monaco.editor.IStandaloneCodeEditor>(null)
  const outputDiv = useRef<null | HTMLDivElement>(null)

  const COMMON_CONFIG: monaco.editor.IEditorOptions = {
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    readOnly: false,
    fontSize: 16,
    renderIndentGuides: true,
    suggestOnTriggerCharacters: true,
    colorDecorators: true,
    minimap: {
      enabled: false,
    },
    // automaticLayout: true,
  }
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES5,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    // typeRoots: ['@pnp', '@microsoft'],
    allowSyntheticDefaultImports: true,
  })

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
          ``,
          'json',
          // @ts-ignore: this is the only way to make it work
          new monaco.Uri('indexkoko.ts'),
        ),
        ...COMMON_CONFIG,
      })

      if (editor && editor.current) {
        // trigget resize to make editor visible (bug in monaco 0.20.0?)
        setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 1)
      }
    }
  }, [COMMON_CONFIG])

  const [ initialized, setInitialized ] = useState(false)

  // this will run always when the isDark changes
  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
  }, [isDark])

  // this will run when the compunent unmounts
  useEffect(() => {
    return () => {
      monaco.editor.getModels().forEach(model => model.dispose())
    }
  }, [dispatch])

  useEffect(() => {
    if (!initialized) {
      setInitialized(true)
      initEditor()
    }
  }, [dispatch, initEditor, initialized])

  return (
      <div ref={outputDiv} style={{ width: 'calc(100% - 50px)', height: '100%', marginTop: 15, marginLeft: 24 }} />
  )
}

export default ApiTesterResults
