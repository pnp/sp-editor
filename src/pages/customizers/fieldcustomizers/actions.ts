import { Constants } from './constants'
import {
  ISetLoading,
  ISetLists,
  ISetListsWithCustomizers,
  ISetSelectedListId,
  ISetAllFieldsForList,
  ISetError,
  IListInfo,
  IListWithFieldCustomizers,
  IFieldInfo,
} from './types'

export const setLoading = (isLoading: boolean): ISetLoading => ({
  type: Constants.SET_LOADING,
  payload: { isLoading },
})

export const setLists = (lists: IListInfo[]): ISetLists => ({
  type: Constants.SET_LISTS,
  payload: { lists },
})

export const setListsWithCustomizers = (
  listsWithCustomizers: IListWithFieldCustomizers[]
): ISetListsWithCustomizers => ({
  type: Constants.SET_LISTS_WITH_CUSTOMIZERS,
  payload: { listsWithCustomizers },
})

export const setSelectedListId = (selectedListId: string | null): ISetSelectedListId => ({
  type: Constants.SET_SELECTED_LIST_ID,
  payload: { selectedListId },
})

export const setAllFieldsForList = (allFieldsForList: IFieldInfo[]): ISetAllFieldsForList => ({
  type: Constants.SET_ALL_FIELDS_FOR_LIST,
  payload: { allFieldsForList },
})

export const setError = (error: string | null): ISetError => ({
  type: Constants.SET_ERROR,
  payload: { error },
})