import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type FileExplorerActions = ActionType<typeof actions>

export interface IFile {
  name: string;
};

export interface IFolder {
  name: string;
  children: (IFolder | IFile)[];
  isBranch?: boolean;
  id?: string;
  ServerRelativeUrl?: string;
};

export interface IFileExplorerState extends IFolder{
}

export enum Constants {
  FE_GET_ITEMS = 'FE_GET_ITEMS',
  FE_GET_CHILDREN = 'FE_GET_CHILDREN',
}