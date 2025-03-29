import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type SitePropertiesActions = ActionType<typeof actions>;

export interface ISiteProperty {
  key: string;
  value: string;
  siteId: string;
  indexed: boolean;
}

export interface ISitePropertyList {
  key: string;
  text: string;
}

export interface ISitePropertiesState {
  siteproperties: ISiteProperty[];
  sites: ISitePropertyList[];
  loading: boolean;
  editpanel: boolean;
  newpanel: boolean;
  selectedSite: string | undefined;
  selectedItems: ISiteProperty[];
  selectedItem: ISiteProperty | undefined;
  confirmremove: boolean;
  confirmedit: boolean;
  searchstring: string;
}

export enum Constants {
  SP_GET_ITEMS = 'SP_GET_ITEMS',
  SP_GET_ITEMS_SITES = 'SP_GET_ITEMS_SITES',
  SP_ADD_ITEM = 'SP_ADD_ITEM',
  SP_UPDATE_ITEM = 'SP_UPDATE_ITEM',
  SP_REMOVE_ITEMS = 'SP_REMOVE_ITEM"',
  SP_SET_SELECTED_ITEM = 'SP_SET_SELECTED_ITEM',
  SP_SET_EDITPANEL = 'SP_SET_EDITPANEL',
  SP_SET_NEWPANEL = 'SP_SET_NEWPANEL',
  SP_SELECTED_ITEM = 'SP_SELECTED_ITEM',
  SP_SELECTED_ITEMS = 'SP_SELECTED_ITEMS',
  SP_SET_CONFIRM_REMOVE_DIALOG = 'SP_SET_CONFIRM_REMOVE_DIALOG',
  SP_SET_CONFIRM_EDIT_DIALOG = 'SP_SET_CONFIRM_EDIT_DIALOG',
  SP_SET_SEARCH_STRING = 'SP_SET_SEARCH_STRING',
}
