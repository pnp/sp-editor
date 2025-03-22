import { action } from 'typesafe-actions';
import { Constants, ITenantProperty } from './types';

export function setAllTenantProperties(items: ITenantProperty[]) {
  return action(Constants.TP_GET_ITEMS, {
    items,
  });
}

export function setEditPanel(editpanel: boolean) {
  return action(Constants.TP_SET_EDITPANEL, {
    editpanel,
  });
}

export function setNewPanel(newpanel: boolean) {
  return action(Constants.TP_SET_NEWPANEL, {
    newpanel,
  });
}

export function setSelectedItem(selectedItem: ITenantProperty | undefined) {
  return action(Constants.TP_SELECTED_ITEM, {
    selectedItem,
  });
}

export function setSelectedItems(selectedItems: ITenantProperty[]) {
  return action(Constants.TP_SELECTED_ITEMS, {
    selectedItems,
  });
}

export function setConfirmEditDialog(confirmedit: boolean) {
  return action(Constants.TP_SET_CONFIRM_EDIT_DIALOG, {
    confirmedit,
  });
}

export function setConfirmRemoveDialog(confirmremove: boolean) {
  return action(Constants.TP_SET_CONFIRM_REMOVE_DIALOG, {
    confirmremove,
  });
}

export function setSearchString(searchstring: string) {
  return action(Constants.TP_SET_SEARCH_STRING, {
    searchstring,
  });
}
