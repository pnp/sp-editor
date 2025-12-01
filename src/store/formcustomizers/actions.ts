import { Constants } from './constants'
import {
  IListInfo,
  IListWithFormCustomizers,
  IContentTypeInfo,
  ISetLoading,
  ISetLists,
  ISetListsWithCustomizers,
  ISetAllContentTypesForList,
  ISetSelectedListId,
  ISetError,
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

export const setAllContentTypesForList = (
  allContentTypesForList: IContentTypeInfo[]
): ISetAllContentTypesForList => ({
  type: Constants.SET_ALL_CONTENT_TYPES_FOR_LIST,
  payload: { allContentTypesForList },
})

export const setSelectedListId = (selectedListId: string | null): ISetSelectedListId => ({
  type: Constants.SET_SELECTED_LIST_ID,
  payload: { selectedListId },
})

export const setError = (error: string | null): ISetError => ({
  type: Constants.SET_ERROR,
  payload: { error },
})