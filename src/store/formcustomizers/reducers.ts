import {
  SET_LISTS,
  SET_LISTS_WITH_CUSTOMIZERS,
  SET_ALL_CONTENT_TYPES_FOR_LIST,
  SET_AVAILABLE_CUSTOMIZERS,
  SET_ERROR,
  FormCustomizersActionTypes,
} from './actions'
import { IFormCustomizersState } from './types'

const initialState: IFormCustomizersState = {
  lists: [],
  listsWithCustomizers: [],
  allContentTypesForList: [],
  availableCustomizers: [],
  error: null,
}

export const formCustomizersReducer = (
  state: IFormCustomizersState = initialState,
  action: FormCustomizersActionTypes
): IFormCustomizersState => {
  switch (action.type) {
    case SET_LISTS:
      return { ...state, lists: action.payload }
    case SET_LISTS_WITH_CUSTOMIZERS:
      return { ...state, listsWithCustomizers: action.payload }
    case SET_ALL_CONTENT_TYPES_FOR_LIST:
      return { ...state, allContentTypesForList: action.payload }
    case SET_AVAILABLE_CUSTOMIZERS:
      return { ...state, availableCustomizers: action.payload }
    case SET_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}