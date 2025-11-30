import { Constants } from './constants'
import { FormCustomizersActions, IFormCustomizersState } from './types'

const init: IFormCustomizersState = {
  isLoading: false,
  lists: [],
  listsWithCustomizers: [],
  selectedListId: null,
  error: null,
}

export function formCustomizersReducer(
  state: IFormCustomizersState = init,
  action: FormCustomizersActions
): IFormCustomizersState {
  switch (action.type) {
    case Constants.SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading }
    case Constants.SET_LISTS:
      return { ...state, lists: action.payload.lists }
    case Constants.SET_LISTS_WITH_CUSTOMIZERS:
      return { ...state, listsWithCustomizers: action.payload.listsWithCustomizers }
    case Constants.SET_SELECTED_LIST_ID:
      return { ...state, selectedListId: action.payload.selectedListId }
    case Constants.SET_ERROR:
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}