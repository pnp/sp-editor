import { ActionType } from 'typesafe-actions'
import { IDefinitions } from '../home/types'
import * as actions from './actions'

export type PnPjsConsoleActions = ActionType<typeof actions>

export type PnPjsConsoleLevel = 'log' | 'info' | 'warn' | 'error' | 'debug'

export interface IPnPjsConsoleEntry {
  id: string
  level: PnPjsConsoleLevel
  message: string
  timestamp: number
}

export interface IPnPjsConsoleState {
  code: string,
  definitions: IDefinitions[],
  consoleOutput: IPnPjsConsoleEntry[],
}

export enum Constants {
  PC_SET_CODE = 'PC_SET_CODE',
  PC_SET_DEFINITIONS = 'PC_SET_DEFINITIONS',
  PC_APPEND_CONSOLE = 'PC_APPEND_CONSOLE',
  PC_CLEAR_CONSOLE = 'PC_CLEAR_CONSOLE',
}
