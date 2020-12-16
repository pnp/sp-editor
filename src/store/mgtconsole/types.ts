import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type MGTConsoleActions = ActionType<typeof actions>

export interface IMGTConsoleState {
  code: string,
  result: string;
  definitions: IDefinitions[],
}

export interface IDefinitions {
  content: string,
  filePath: string
}

export enum Constants {
  MGT_SET_CODE = 'MGT_SET_CODE',
  MGT_SET_RESULT = 'MGT_SET_RESULT',
  MGT_SET_DEFINITIONS = 'MGT_SET_DEFINITIONS',
}
