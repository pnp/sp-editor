import { Constants, IPageWebPartsState, PageWebPartsActions } from './types'

const init: IPageWebPartsState = {
  webparts: [],
  loading: false,
  selectedItem: undefined,
  checkedItems: [],
  propertiesPanel: false,
  searchstring: '',
  savedControls: [],
}

export function pageWebPartsReducer(state: IPageWebPartsState = init, action: PageWebPartsActions): IPageWebPartsState {
  switch (action.type) {
    case Constants.PWP_GET_ITEMS:
      return { ...state, webparts: action.payload.items }
    case Constants.PWP_SELECTED_ITEM:
      return { ...state, ...action.payload }
    case Constants.PWP_SET_PROPERTIES_PANEL:
      return { ...state, ...action.payload }
    case Constants.PWP_SET_SEARCH_STRING:
      return { ...state, ...action.payload }
    case Constants.PWP_SET_CHECKED_ITEMS:
      return { ...state, ...action.payload }
    case Constants.PWP_SAVE_CONTROL:
      return { ...state, savedControls: [...state.savedControls, action.payload.savedControl] }
    case Constants.PWP_DELETE_CONTROL:
      return { ...state, savedControls: state.savedControls.filter((_, i) => i !== action.payload.index) }
    case Constants.PWP_SET_ALL_SAVED_CONTROLS:
      return { ...state, savedControls: action.payload.savedControls }
    default:
      return state
  }
}
