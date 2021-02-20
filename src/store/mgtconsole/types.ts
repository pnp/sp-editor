import { ActionType } from 'typesafe-actions'
import { IDefinitions } from '../home/types'
import * as actions from './actions'

export type MGTConsoleActions = ActionType<typeof actions>

export interface IMGTConsoleState {
  code: string,
  transpiled: string,
  result: string,
  definitions: IDefinitions[],
}

export enum Constants {
  MGT_SET_CODE = 'MGT_SET_CODE',
  MGT_SET_TRANSPILED = 'MGT_SET_TRANSPILED',
  MGT_SET_RESULT = 'MGT_SET_RESULT',
  MGT_SET_DEFINITIONS = 'MGT_SET_DEFINITIONS',
}
