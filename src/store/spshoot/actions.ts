import { action } from 'typesafe-actions'
import { Constants } from './types'

export function setPath(path: string) {
  return action(Constants.SPS_SET_PATH, {
    path,
  })
}

export function setMethod(method: string) {
  return action(Constants.SPS_SET_METHOD, {
    method,
  })
}

export function setHeaders(headers: string) {
  return action(Constants.SPS_SET_HEADERS, {
    headers,
  })
}

export function setBody(body: string) {
  return action(Constants.SPS_SET_BODY, {
    body,
  })
}

export function setResults(results: string) {
  return action(Constants.SPS_SET_RESULT, {
    results,
  })
}

export function setShowHeaders(showHeaders: boolean) {
  return action(Constants.SPS_SET_SHOWHEADERS, {
    showHeaders,
  })
}

export function setShowBody(showBody: boolean) {
  return action(Constants.SPS_SET_SHOWBODY, {
    showBody,
  })
}

export function setContext(context: any) {
  return action(Constants.SPS_SET_CONTEXT, {
    context,
  })
}
