import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type FileExplorerActions = ActionType<typeof actions>

export interface IFile {
  id: number
  parent: number
  droppable: boolean
  text: string
}

export interface IFileExplorerState {
  files: IFile[],
  loading: boolean,
}

export enum Constants {
  FE_GET_ITEMS = 'FE_GET_ITEMS',
}
