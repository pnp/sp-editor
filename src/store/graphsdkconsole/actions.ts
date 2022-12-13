import { AuthenticationResult } from '@azure/msal-browser'
import { action } from 'typesafe-actions'
import { IDefinitions } from '../home/types'
import { Constants, IScope, SPEditorUser } from './types'

export function setCode(code: string) {
  return action(Constants.GC_SET_CODE, {
    code,
  })
}

export function setResult(result: string) {
  return action(Constants.GC_SET_RESULT, {
    result,
  })
}

export function setDefinitions(definitions: IDefinitions[]) {
  return action(Constants.GC_SET_DEFINITIONS, {
    definitions,
  })
}

export function setEditPanel(editpanel: boolean) {
  return action(Constants.GC_SET_EDITPANEL, {
    editpanel,
  })
}

export function setScopes(scopes: string[]) {
  return action(Constants.GC_SET_SCOPES, {
    scopes,
  })
}

export function setAuthdata(authData: AuthenticationResult) {
  return action(Constants.GC_SET_AUTHDATA, {
    authData,
  })
}

export function setUser(spuoser: SPEditorUser) {
  return action(Constants.GC_SET_USER, {
    spuoser,
  })
}