import { Constants, ISitePropertiesState, SitePropertiesActions } from './types';

const init: ISitePropertiesState = {
  siteproperties: [],
  sites: [],
  loading: false,
  editpanel: false,
  newpanel: false,
  selectedSite: undefined,
  selectedItems: [],
  selectedItem: undefined,
  confirmremove: true,
  confirmedit: true,
  searchstring: '',
};

export function sitePropertiesReducer(
  state: ISitePropertiesState = init,
  action: SitePropertiesActions
): ISitePropertiesState {
  switch (action.type) {
    case Constants.SP_GET_ITEMS:
      return { ...state, siteproperties: action.payload.items };
    case Constants.SP_GET_ITEMS_SITES:
      return { ...state, sites: action.payload.sites };
    case Constants.SP_SET_SELECTED_ITEM:
      return { ...state, ...action.payload };
    case Constants.SP_SET_EDITPANEL:
      return { ...state, ...action.payload };
    case Constants.SP_SET_NEWPANEL:
      return { ...state, ...action.payload };
    case Constants.SP_SELECTED_ITEMS:
      return { ...state, ...action.payload };
    case Constants.SP_SELECTED_ITEM:
      return { ...state, ...action.payload };
    case Constants.SP_SET_CONFIRM_EDIT_DIALOG:
      return { ...state, ...action.payload };
    case Constants.SP_SET_CONFIRM_REMOVE_DIALOG:
      return { ...state, ...action.payload };
    case Constants.SP_SET_SEARCH_STRING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
