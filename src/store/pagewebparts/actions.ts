import { action } from 'typesafe-actions'
import { Constants, IPageWebPart, ISavedControl } from './types'

export function setAllPageWebParts(items: IPageWebPart[]) {
  return action(Constants.PWP_GET_ITEMS, {
    items,
  })
}

export function setSelectedWebPart(selectedItem: IPageWebPart | undefined) {
  return action(Constants.PWP_SELECTED_ITEM, {
    selectedItem,
  })
}

export function setPropertiesPanel(propertiesPanel: boolean) {
  return action(Constants.PWP_SET_PROPERTIES_PANEL, {
    propertiesPanel,
  })
}

export function setSearchString(searchstring: string) {
  return action(Constants.PWP_SET_SEARCH_STRING, {
    searchstring,
  })
}

export function setCheckedItems(checkedItems: IPageWebPart[]) {
  return action(Constants.PWP_SET_CHECKED_ITEMS, {
    checkedItems,
  })
}

export function saveControl(savedControl: ISavedControl) {
  return action(Constants.PWP_SAVE_CONTROL, { savedControl })
}

export function deleteControl(index: number) {
  return action(Constants.PWP_DELETE_CONTROL, { index })
}

export function setAllSavedControls(savedControls: ISavedControl[]) {
  return action(Constants.PWP_SET_ALL_SAVED_CONTROLS, { savedControls })
}
