import { Constants } from './constants'

export interface IFieldInfo {
  Id: string
  InternalName: string
  Title: string
  TypeAsString: string
  ClientSideComponentId?: string | null
  ClientSideComponentProperties?: string | null
}

export interface IListInfo {
  Id: string
  Title: string
}

export interface IListWithFieldCustomizers {
  list: IListInfo
  fields: IFieldInfo[]
}

export interface IFieldCustomizersState {
  isLoading: boolean
  lists: IListInfo[]
  listsWithCustomizers: IListWithFieldCustomizers[]
  selectedListId: string | null
  allFieldsForList: IFieldInfo[]
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
  payload: { listsWithCustomizers: IListWithFieldCustomizers[] }
  [key: string]: unknown
}

export interface ISetSelectedListId {
  type: typeof Constants.SET_SELECTED_LIST_ID
  payload: { selectedListId: string | null }
  [key: string]: unknown
}

export interface ISetAllFieldsForList {
  type: typeof Constants.SET_ALL_FIELDS_FOR_LIST
  payload: { allFieldsForList: IFieldInfo[] }
  [key: string]: unknown
}

export interface ISetError {
  type: typeof Constants.SET_ERROR
  payload: { error: string | null }
  [key: string]: unknown
}

export type FieldCustomizersActions =
  | ISetLoading
  | ISetLists
  | ISetListsWithCustomizers
  | ISetSelectedListId
  | ISetAllFieldsForList
  | ISetError