import { Constants } from './constants'
import { FieldCustomizersActions, IFieldCustomizersState } from './types'

const init: IFieldCustomizersState = {
  isLoading: false,
  lists: [],
  listsWithCustomizers: [],
  selectedListId: null,
  allFieldsForList: [],
  error: null,
}

export function fieldCustomizersReducer(
  state: IFieldCustomizersState = init,
  action: FieldCustomizersActions
): IFieldCustomizersState {
  switch (action.type) {
    case Constants.SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading }
    case Constants.SET_LISTS:
      return { ...state, lists: action.payload.lists }
    case Constants.SET_LISTS_WITH_CUSTOMIZERS:
      return { ...state, listsWithCustomizers: action.payload.listsWithCustomizers }
    case Constants.SET_SELECTED_LIST_ID:
      return { ...state, selectedListId: action.payload.selectedListId, allFieldsForList: [] }
    case Constants.SET_ALL_FIELDS_FOR_LIST:
      return { ...state, allFieldsForList: action.payload.allFieldsForList }
    case Constants.SET_ERROR:
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}