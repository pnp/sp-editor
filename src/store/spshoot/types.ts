import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type SPShootActions = ActionType<typeof actions>

export interface ISPShootState {
  path: string
  method: string
  headers: string
  body: string
  results: any
  showHeaders: boolean
  showBody: boolean
  context: any
}

export interface ISPShootPayload {
  path: string
  method: string
  headers: string
  body: string
}

export enum Constants {
  SPS_SET_PATH = 'SPS_SET_PATH',
  SPS_SET_METHOD = 'SPS_SET_METHOD',
  SPS_SET_HEADERS = 'SPS_SET_HEADERS',
  SPS_SET_BODY = 'SPS_SET_BODY',
  SPS_SET_RESULT = 'SPS_SET_RESULT',
  SPS_SET_SHOWHEADERS = 'SPS_SET_SHOWHEADERS',
  SPS_SET_SHOWBODY = 'SPS_SET_SHOWBODY',
  SPS_SET_CONTEXT = 'SPS_SET_CONTEXT',
}
