import { Pivot, PivotItem } from '@fluentui/react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../../store'
import { setBody, setHeaders } from '../../../store/spshoot/actions'
import { getContextInfo } from '../chrome/chrome-actions'

const SPShooterResults = () => {

  const dispatch = useDispatch()
  const { isDark } = useSelector((state: IRootState) => state.home)

  const editor = useRef<null | monaco.editor.IStandaloneCodeEditor>(null)
  const editorBody = useRef<null | monaco.editor.IStandaloneCodeEditor>(null)
  const editorHeaders = useRef<null | monaco.editor.IStandaloneCodeEditor>(null)

  const outputDiv = useRef<null | HTMLDivElement>(null)
  const outputBodyDiv = useRef<null | HTMLDivElement>(null)
  const outputHeadersDiv = useRef<null | HTMLDivElement>(null)

  const { results, body, headers } = useSelector((state: IRootState) => state.spshoot)

  const [selectedKey, setSelectedKey] = useState('0')

  const COMMON_CONFIG: monaco.editor.IEditorOptions = useMemo(() => {
    const config: monaco.editor.IEditorOptions = {
      lineNumbers: 'on',
      readOnly: false,
      fontSize: 16,
      minimap: {
        enabled: true,
      },
      scrollBeyondLastLine: false,
      automaticLayout: true,
    }
    return config
  }, [])

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  })

  const resizeListener = () => {
    if (editor && editor.current) {
      editor.current.layout()
    }
    if (editorBody && editorBody.current) {
      editorBody.current.layout()
    }
    if (editorHeaders && editorHeaders.current) {
      editorHeaders.current.layout()
    }
  }

  useEffect(() => {
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  // load initial data
  useEffect(() => {
    getContextInfo(dispatch)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const initEditor = useCallback(() => {
    if (outputDiv.current) {
      editor.current = monaco.editor.create(outputDiv.current, {
        model: monaco.editor.createModel(
          ``,
          'json',
          // @ts-ignore: this is the only way to make it work
          new monaco.Uri('results.ts'),
        ),
        ...COMMON_CONFIG,
      })

      if (editor && editor.current) {
        // trigget resize to make editor visible (bug in monaco 0.20.0?)
        setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 1)
      }
    }
  }, [COMMON_CONFIG])

  const initBodyEditor = useCallback(() => {
    if (outputBodyDiv.current) {
      editorBody.current = monaco.editor.create(outputBodyDiv.current, {
        model: monaco.editor.createModel(
          ``,
          'text',
          // @ts-ignore: this is the only way to make it work
          new monaco.Uri('body.ts'),
        ),
        ...COMMON_CONFIG,
      })
      editorBody.current.onDidChangeModelContent(() => {
        dispatch(setBody(editorBody.current!.getValue()))
        // alert(editorBody.current?.getValue())
      })
      if (editorBody && editorBody.current) {
        // trigget resize to make editor visible (bug in monaco 0.20.0?)
        setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 1)
      }
    }
  }, [dispatch, COMMON_CONFIG])

  const initHeadersEditor = useCallback(() => {
    if (outputHeadersDiv.current) {
      editorHeaders.current = monaco.editor.create(outputHeadersDiv.current, {
        model: monaco.editor.createModel(
          ``,
          'json',
          // @ts-ignore: this is the only way to make it work
          new monaco.Uri('headers.ts'),
        ),
        ...COMMON_CONFIG,
      })
      editorHeaders.current.onDidChangeModelContent(() => {
        dispatch(setHeaders(editorHeaders.current!.getValue()))
        // alert(editorBody.current?.getValue())
      })
      if (editorHeaders && editorHeaders.current) {
        // trigget resize to make editor visible (bug in monaco 0.20.0?)
        setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 1)
      }
    }
  }, [dispatch, COMMON_CONFIG])

  const [initialized, setInitialized] = useState(false)
  const [initializedBody, setInitializedBody] = useState(false)
  const [initializedHeaders, setInitializedHeaders] = useState(false)

  // this will run always when the isDark changes
  useEffect(() => {
    monaco.editor.setTheme(isDark ? 'vs-dark' : 'vs')
  }, [isDark])

  // this will run when the component unmounts
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

  useEffect(() => {
    if (!initializedBody) {
      setInitializedBody(true)
      initBodyEditor()
    }
  }, [dispatch, initBodyEditor, initializedBody])

  useEffect(() => {
    if (!initializedHeaders) {
      setInitializedHeaders(true)
      initHeadersEditor()
    }
  }, [dispatch, initHeadersEditor, initializedHeaders])

  useEffect(() => {
    if (initialized) {
      const model = editor.current?.getModel()

      if (results && results.error) {
        if (model) {
          monaco.editor.setModelLanguage(model, 'text')
          editor.current?.setValue('')
        }
      } else if (results) {
        if (model) {
          monaco.editor.setModelLanguage(model, 'typescript')
          editor.current?.setValue(JSON.stringify(results, null, 2))
        }
      }
      setSelectedKey('0')
    }
  }, [results, initialized])

  useEffect(() => {
    if (initializedBody) {
      const model = editorBody.current?.getModel()

      if (body && (body !== editorBody.current!.getValue())) {
        if (model) {
          monaco.editor.setModelLanguage(model, 'text')
          editorBody.current?.setValue(body)
        }
      }
    }
  }, [body, initializedBody])

  useEffect(() => {
    if (initializedHeaders) {
      const model = editorHeaders.current?.getModel()

      if (headers && (headers !== editorHeaders.current!.getValue())) {
        if (model) {
          monaco.editor.setModelLanguage(model, 'json')
          let test = headers
          try {
            test = JSON.parse(headers)
            test = JSON.stringify(test, null, 2)
          } catch (ex) { }

          editorHeaders.current?.setValue(test)
        }
      }
    }
  }, [headers, initializedHeaders])

  const handleLinkClick = (item?: PivotItem | undefined) => {
    setSelectedKey(item?.props.itemKey ?? '0')
  }

  return (
    <Pivot
      selectedKey={selectedKey}
      onLinkClick={handleLinkClick}
      style={{
        marginLeft: 27,
        marginRight: 30,
      }}
    >
      <PivotItem
        itemKey='0'
        alwaysRender={true}
        headerText='Response'
        style={{
          height: 'calc(100vh - 218px)',
          marginTop: 8,
        }}
      >
        <div ref={outputDiv} style={{ width: '100%', height: 'calc(100vh - 185px)', border: '1px solid grey' }} />
      </PivotItem>
      <PivotItem
        itemKey='1'
        alwaysRender={true}
        headerText='Headers'
        style={{
          height: 'calc(100vh - 218px)',
          marginTop: 8,
          width: '100%',
        }}
      >
        <div ref={outputHeadersDiv} style={{ width: '100%', height: 'calc(100vh - 185px)', border: '1px solid grey' }} />
      </PivotItem>
      <PivotItem
        itemKey='2'
        alwaysRender={true}
        headerText='Body'
        style={{
          height: 'calc(100vh - 218px)',
          marginTop: 8,
          width: '100%',
        }}
      >
        <div ref={outputBodyDiv} style={{ width: '100%', height: 'calc(100vh - 185px)', border: '1px solid grey' }} />
      </PivotItem>
    </Pivot>
  )
}

export default SPShooterResults
