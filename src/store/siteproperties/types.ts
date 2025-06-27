import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type SitePropertiesActions = ActionType<typeof actions>;

export const EditableProperties = [
  'LockState',
  'Title',
  'SharingCapability',
  'StorageQuota',
  'StorageQuotaWarningLevel',
  'Owner',
  'TimeZoneId',
  'ResourceQuota',
  'ResourceQuotaWarningLevel',
  'DenyAddAndCustomizePages',
];

export interface ISiteProperty {
  key: string;
  value: string;
}

export interface ISite {
  key: string;
  text: string;
  siteId: string;
}

export interface ISitePropertiesState {
  siteproperties: ISiteProperty[];
  sites: ISite[];
  loading: boolean;
  editpanel: boolean;
  newpanel: boolean;
  selectedSite: ISite | undefined;
  selectedItems: ISiteProperty[];
  selectedItem: ISiteProperty | undefined;
  confirmremove: boolean;
  confirmedit: boolean;
  searchstring: string;
  showAllProperties: boolean;
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
  SP_SET_SHOWALLPROPERTIES = 'SP_SET_SHOWALLPROPERTIES',
}
