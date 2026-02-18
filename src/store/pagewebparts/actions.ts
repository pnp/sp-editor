import { action } from 'typesafe-actions'
import { Constants, IPageWebPart } from './types'

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

export function setViewMode(viewMode: 'list' | 'layout') {
  return action(Constants.PWP_SET_VIEW_MODE, {
    viewMode,
  })
}

export function setCheckedItems(checkedItems: IPageWebPart[]) {
  return action(Constants.PWP_SET_CHECKED_ITEMS, {
    checkedItems,
  })
}
