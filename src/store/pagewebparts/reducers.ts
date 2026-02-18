import { Constants, IPageWebPartsState, PageWebPartsActions } from './types'

const init: IPageWebPartsState = {
  webparts: [],
  loading: false,
  selectedItem: undefined,
  checkedItems: [],
  propertiesPanel: false,
  searchstring: '',
  viewMode: 'list',
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
    case Constants.PWP_SET_VIEW_MODE:
      return { ...state, ...action.payload }
    case Constants.PWP_SET_CHECKED_ITEMS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
