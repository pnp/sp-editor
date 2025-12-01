import { Constants } from './constants'
import { FormCustomizersActions, IFormCustomizersState } from './types'

const initialState: IFormCustomizersState = {
  isLoading: false,
  lists: [],
  listsWithCustomizers: [],
  allContentTypesForList: [],
  selectedListId: null,
  error: null,
}

export const formCustomizersReducer = (
  state: IFormCustomizersState = initialState,
  action: FormCustomizersActions
): IFormCustomizersState => {
  switch (action.type) {
    case Constants.SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading }
    case Constants.SET_LISTS:
      return { ...state, lists: action.payload.lists }
    case Constants.SET_LISTS_WITH_CUSTOMIZERS:
      return { ...state, listsWithCustomizers: action.payload.listsWithCustomizers }
    case Constants.SET_ALL_CONTENT_TYPES_FOR_LIST:
      return { ...state, allContentTypesForList: action.payload.allContentTypesForList }
    case Constants.SET_SELECTED_LIST_ID:
      return { ...state, selectedListId: action.payload.selectedListId }
    case Constants.SET_ERROR:
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}