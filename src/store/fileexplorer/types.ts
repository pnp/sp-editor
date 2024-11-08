import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { IFileInfo } from '@pnp/sp/files';

export type FileExplorerActions = ActionType<typeof actions>

export interface IFile {
  ServerRelativeUrl: string
  webId: string
  webUrl: string
  id: string
  parent: number
  droppable: boolean
  text: string
  type: string
  name: string
  toggled: boolean
  children: IFile[]
  loading: boolean
  content: string
  loadedContent: string
  fileInfo?: IFileInfo
  portalUrl: string
  webServerRelativeUrl: string
  parentFile?: IFile
}

export interface IFileExplorerState {
  files: IFile[],
  loading: boolean,
  selectedFile: IFile | undefined,
  selectedFolder: IFile | undefined,
  webServerRelativeUrl: string,
}

export enum Constants {
  FE_GET_ITEMS = 'FE_GET_ITEMS',
  FE_ADD_ITEMS_TO_CHILDREN = 'FE_ADD_ITEMS_TO_CHILDREN',
  FE_UPDATE_LOADING = 'FE_UPDATE_LOADING',
  FE_UPDATE_TOGGLE = 'FE_UPDATE_TOGGLE',
  FE_SET_SELECTED_FILE = 'FE_SET_SELECTED_FILE',
  FE_SET_SELECTED_FOLDER = 'FE_SET_SELECTED_FOLDER',
  FE_SET_SELECTED_FILE_CONTENT = 'FE_SET_SELECTED_FILE_CONTENT',
  FE_SET_SITESERVER_RELATIVE_URL = 'FE_SET_SITESERVER_RELATIVE_URL',

}
