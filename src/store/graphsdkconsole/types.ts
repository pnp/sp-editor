import { AuthenticationResult } from '@azure/msal-browser'
import { ActionType } from 'typesafe-actions'
import { IDefinitions } from '../home/types'
import * as actions from './actions'

export type GraphSDKConsoleActions = ActionType<typeof actions>

export interface SPEditorUser {
  Name: string
  Initials: String
  TenantName: string
  TenantId: string
  userId: string
  imageUrl?: string
}
export interface IScope {
  scope: string
}

export interface IGraphSDKConsoleState {
  code: string,
  result: string,
  definitions: IDefinitions[],
  editpanel: boolean,
  scopes: string[],
  authData?: AuthenticationResult
  spuoser?: SPEditorUser;
}

export enum Constants {
  GC_SET_CODE = 'GC_SET_CODE',
  GC_SET_RESULT = 'GC_SET_RESULT',
  GC_SET_DEFINITIONS = 'GC_SET_DEFINITIONS',
  GC_SET_EDITPANEL = 'GC_SET_EDITPANEL',
  GC_SET_SCOPES = 'GC_SET_SCOPES',
  GC_SET_AUTHDATA = 'GC_SET_AUTHDATA',
  GC_SET_USER = 'GC_SET_USER',
}
