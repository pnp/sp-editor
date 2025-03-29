import { action } from 'typesafe-actions';
import { Constants, ISiteProperty, ISitePropertyList } from './types';

export function setAllSiteProperties(items: ISiteProperty[]) {
  return action(Constants.SP_GET_ITEMS, {
    items,
  });
}

export function setAllSites(sites: ISitePropertyList[]) {
  return action(Constants.SP_GET_ITEMS_SITES, {
    sites,
  });
}

export function setSelectedSite(selectedSite: string | undefined) {
  return action(Constants.SP_SET_SELECTED_ITEM, {
    selectedSite,
  });
}

export function setEditPanel(editpanel: boolean) {
  return action(Constants.SP_SET_EDITPANEL, {
    editpanel,
  });
}

export function setNewPanel(newpanel: boolean) {
  return action(Constants.SP_SET_NEWPANEL, {
    newpanel,
  });
}

export function setSelectedItem(selectedItem: ISiteProperty | undefined) {
  return action(Constants.SP_SELECTED_ITEM, {
    selectedItem,
  });
}

export function setSelectedItems(selectedItems: ISiteProperty[]) {
  return action(Constants.SP_SELECTED_ITEMS, {
    selectedItems,
  });
}

export function setConfirmEditDialog(confirmedit: boolean) {
  return action(Constants.SP_SET_CONFIRM_EDIT_DIALOG, {
    confirmedit,
  });
}

export function setConfirmRemoveDialog(confirmremove: boolean) {
  return action(Constants.SP_SET_CONFIRM_REMOVE_DIALOG, {
    confirmremove,
  });
}

export function setSearchString(searchstring: string) {
  return action(Constants.SP_SET_SEARCH_STRING, {
    searchstring,
  });
}
