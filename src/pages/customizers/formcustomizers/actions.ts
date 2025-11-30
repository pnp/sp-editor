import { Constants } from './constants'
import {
  ISetLoading,
  ISetLists,
  ISetListsWithCustomizers,
  ISetSelectedListId,
  ISetError,
  IListInfo,
  IListWithFormCustomizers,
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
  listsWithCustomizers: IListWithFormCustomizers[]
): ISetListsWithCustomizers => ({
  type: Constants.SET_LISTS_WITH_CUSTOMIZERS,
  payload: { listsWithCustomizers },
})

export const setSelectedListId = (selectedListId: string | null): ISetSelectedListId => ({
  type: Constants.SET_SELECTED_LIST_ID,
  payload: { selectedListId },
})

export const setError = (error: string | null): ISetError => ({
  type: Constants.SET_ERROR,
  payload: { error },
})