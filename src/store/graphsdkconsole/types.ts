import { ActionType } from 'typesafe-actions'
import { IDefinitions } from '../home/types'
import * as actions from './actions'

export type GraphSDKConsoleActions = ActionType<typeof actions>

export interface IGraphSDKConsoleState {
  code: string,
  result: string,
  definitions: IDefinitions[],
}

export enum Constants {
  GC_SET_CODE = 'GC_SET_CODE',
  GC_SET_RESULT = 'GC_SET_RESULT',
  GC_SET_DEFINITIONS = 'GC_SET_DEFINITIONS',
}
