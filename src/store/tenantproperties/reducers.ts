import { Constants, ITenantPropertiesState, TenantPropertiesActions } from './types';

const init: ITenantPropertiesState = {
  tenantproperties: [],
  loading: false,
  editpanel: false,
  newpanel: false,
  selectedItems: [],
  selectedItem: undefined,
  confirmremove: true,
  confirmedit: true,
  searchstring: '',
};

export function tenantPropertiesReducer(
  state: ITenantPropertiesState = init,
  action: TenantPropertiesActions
): ITenantPropertiesState {
  switch (action.type) {
    case Constants.TP_GET_ITEMS:
      return { ...state, tenantproperties: action.payload.items };
    case Constants.TP_SET_EDITPANEL:
      return { ...state, ...action.payload };
    case Constants.TP_SET_NEWPANEL:
      return { ...state, ...action.payload };
    case Constants.TP_SELECTED_ITEMS:
      return { ...state, ...action.payload };
    case Constants.TP_SELECTED_ITEM:
      return { ...state, ...action.payload };
    case Constants.TP_SET_CONFIRM_EDIT_DIALOG:
      return { ...state, ...action.payload };
    case Constants.TP_SET_CONFIRM_REMOVE_DIALOG:
      return { ...state, ...action.payload };
    case Constants.TP_SET_SEARCH_STRING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
