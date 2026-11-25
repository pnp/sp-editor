import { useDispatch, useSelector } from 'react-redux'
import { useSavedSnippets } from '../../../components/savedSnippets/useSavedSnippets'
import { IRootState } from '../../../store'
import { setBody, setHeaders, setMethod, setPath } from '../../../store/spshoot/actions'

interface ISavedRequest {
  method: string
  path: string
  headers: string
  body: string
}

function parseSavedRequest(saved: string): ISavedRequest {
  try {
    const r = JSON.parse(saved)
    return {
      method: typeof r?.method === 'string' ? r.method : 'GET',
      path: typeof r?.path === 'string' ? r.path : '',
      headers: typeof r?.headers === 'string' ? r.headers : '',
      body: typeof r?.body === 'string' ? r.body : '',
    }
  } catch {
    return { method: 'GET', path: '', headers: '', body: '' }
  }
}

/**
 * Saved SP Shooter requests: method, site-relative path, headers and body.
 * The site URL is not saved, so a saved request works on any site.
 */
export function useSavedRequests() {
  const dispatch = useDispatch()
  const { method, path, headers, body } = useSelector((state: IRootState) => state.spshoot)

  const saved = useSavedSnippets({
    storageKey: 'spShooterRequests',
    panelTitle: 'Saved requests',
    itemName: 'request',
    saveHint: 'Saves the method, path, headers and body. The site URL is not saved, so the request works on any site.',
    getCode: () => JSON.stringify({ method, path, headers, body }),
    loadCode: (value) => {
      const req = parseSavedRequest(value)
      dispatch(setMethod(req.method))
      dispatch(setPath(req.path))
      dispatch(setHeaders(req.headers))
      dispatch(setBody(req.body))
    },
    preview: (value) => {
      const req = parseSavedRequest(value)
      return `${req.method} /${req.path}`
    },
    tooltip: (value) => {
      const req = parseSavedRequest(value)
      return `${req.method} /${req.path}${req.body ? `\n\n${req.body.slice(0, 500)}` : ''}`
    },
  })

  return { ...saved, canSave: !!path }
}
