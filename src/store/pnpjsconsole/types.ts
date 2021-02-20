import { ActionType } from 'typesafe-actions'
import { IDefinitions } from '../home/types'
import * as actions from './actions'

export type PnPjsConsoleActions = ActionType<typeof actions>

export interface IPnPjsConsoleState {
  code: string,
  definitions: IDefinitions[],
}

export enum Constants {
  PC_SET_CODE = 'PC_SET_CODE',
  PC_SET_DEFINITIONS = 'PC_SET_DEFINITIONS',
}
