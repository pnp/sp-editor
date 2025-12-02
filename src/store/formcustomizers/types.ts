import { Constants } from './constants'

export interface IListInfo {
  Id: string
  Title: string
}

export interface IContentTypeInfo {
  StringId: string
  Name: string
}

export interface IFormCustomizerInfo {
  listId: string
  listTitle: string
  contentTypeId: string
  contentTypeName: string
  formType: 'New' | 'Edit' | 'Display'
  ClientSideComponentId: string
  ClientSideComponentProperties: string | null
}

export interface IListWithFormCustomizers {
  list: IListInfo
  forms: IFormCustomizerInfo[]
}

export interface IAvailableFormCustomizer {
  id: string
  alias: string
  solutionName: string
}

export interface IFormCustomizersState {
  lists: IListInfo[]
  listsWithCustomizers: IListWithFormCustomizers[]
  allContentTypesForList: IContentTypeInfo[]
  availableCustomizers: IAvailableFormCustomizer[]
  error: string | null
}

export interface ISetLoading {
  type: typeof Constants.SET_LOADING
  payload: { isLoading: boolean }
  [key: string]: unknown
}

export interface ISetLists {
  type: typeof Constants.SET_LISTS
  payload: { lists: IListInfo[] }
  [key: string]: unknown
}

export interface ISetListsWithCustomizers {
  type: typeof Constants.SET_LISTS_WITH_CUSTOMIZERS
  payload: { listsWithCustomizers: IListWithFormCustomizers[] }
  [key: string]: unknown
}

export interface ISetAllContentTypesForList {
  type: typeof Constants.SET_ALL_CONTENT_TYPES_FOR_LIST
  payload: { allContentTypesForList: IContentTypeInfo[] }
  [key: string]: unknown
}

export interface ISetSelectedListId {
  type: typeof Constants.SET_SELECTED_LIST_ID
  payload: { selectedListId: string | null }
  [key: string]: unknown
}

export interface ISetError {
  type: typeof Constants.SET_ERROR
  payload: { error: string | null }
  [key: string]: unknown
}

export type FormCustomizersActions =
  | ISetLoading
  | ISetLists
  | ISetListsWithCustomizers
  | ISetAllContentTypesForList
  | ISetSelectedListId
  | ISetError