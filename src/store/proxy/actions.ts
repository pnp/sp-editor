import { action } from 'typesafe-actions'
import { Constants, IProxy } from './types'

export function setEnabled(enabled: boolean) {
  return action(Constants.PX_SET_ENABLED, {
    enabled,
  })
}
export function setEditPanel(editpanel: boolean) {
  return action(Constants.PX_SET_EDITPANEL, {
    editpanel,
  })
}
export function setSelectedItem(selectedItem: IProxy | undefined) {
  return action(Constants.PX_SET_SELECTED_ITEM, {
    selectedItem,
  })
}
export function updateItem(item: IProxy | undefined) {
  return action(Constants.PX_UPDATE_ITEM, {
    item,
  })
}
export function addItem(item: IProxy) {
  return action(Constants.PX_ADD_ITEM, {
    item,
  })
}
export function removeItem(item: IProxy) {
  return action(Constants.PX_REMOVE_ITEM, {
    item,
  })
}