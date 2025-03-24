import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type TenantPropertiesActions = ActionType<typeof actions>;

export interface ITenantProperty {
  key: string;
  value: string;
  description: string;
  comment: string;
}

export interface ITenantPropertiesState {
  tenantproperties: ITenantProperty[];
  loading: boolean;
  editpanel: boolean;
  newpanel: boolean;
  selectedItems: ITenantProperty[];
  selectedItem: ITenantProperty | undefined;
  confirmremove: boolean;
  confirmedit: boolean;
  searchstring: string;
}

export enum Constants {
  TP_GET_ITEMS = 'TP_GET_ITEMS',
  TP_ADD_ITEM = 'TP_ADD_ITEM',
  TP_UPDATE_ITEM = 'TP_UPDATE_ITEM',
  TP_REMOVE_ITEMS = 'TP_REMOVE_ITEM"',
  TP_SET_EDITPANEL = 'TP_SET_EDITPANEL',
  TP_SET_NEWPANEL = 'TP_SET_NEWPANEL',
  TP_SELECTED_ITEM = 'TP_SELECTED_ITEM',
  TP_SELECTED_ITEMS = 'TP_SELECTED_ITEMS',
  TP_SET_CONFIRM_REMOVE_DIALOG = 'TP_SET_CONFIRM_REMOVE_DIALOG',
  TP_SET_CONFIRM_EDIT_DIALOG = 'TP_SET_CONFIRM_EDIT_DIALOG',
  TP_SET_SEARCH_STRING = 'TP_SET_SEARCH_STRING',
}
