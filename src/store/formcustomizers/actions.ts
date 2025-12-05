import { IListInfo, IFormCustomizerInfo, IContentTypeInfo, IListWithFormCustomizers, IAvailableFormCustomizer } from './types'

export const SET_LISTS = 'formcustomizers/SET_LISTS'
export const SET_LISTS_WITH_CUSTOMIZERS = 'formcustomizers/SET_LISTS_WITH_CUSTOMIZERS'
export const SET_ALL_CONTENT_TYPES_FOR_LIST = 'formcustomizers/SET_ALL_CONTENT_TYPES_FOR_LIST'
export const SET_AVAILABLE_CUSTOMIZERS = 'formcustomizers/SET_AVAILABLE_CUSTOMIZERS'
export const SET_ERROR = 'formcustomizers/SET_ERROR'

export const setLists = (lists: IListInfo[]) => ({
  type: SET_LISTS,
  payload: lists,
} as const)

export const setListsWithCustomizers = (listsWithCustomizers: IListWithFormCustomizers[]) => ({
  type: SET_LISTS_WITH_CUSTOMIZERS,
  payload: listsWithCustomizers,
} as const)

export const setAllContentTypesForList = (contentTypes: IContentTypeInfo[]) => ({
  type: SET_ALL_CONTENT_TYPES_FOR_LIST,
  payload: contentTypes,
} as const)

export const setAvailableCustomizers = (customizers: IAvailableFormCustomizer[]) => ({
  type: SET_AVAILABLE_CUSTOMIZERS,
  payload: customizers,
} as const)

export const setError = (error: string | null) => ({
  type: SET_ERROR,
  payload: error,
} as const)

export type FormCustomizersActionTypes =
  | ReturnType<typeof setLists>
  | ReturnType<typeof setListsWithCustomizers>
  | ReturnType<typeof setAllContentTypesForList>
  | ReturnType<typeof setAvailableCustomizers>
  | ReturnType<typeof setError>