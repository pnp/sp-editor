import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type PageWebPartsActions = ActionType<typeof actions>

export interface IPageWebPart {
  id: string
  webPartId: string
  title: string
  properties: string
  zoneIndex: number
  sectionIndex: number
  controlIndex: number
  sectionFactor: number
}

export interface IPageWebPartsState {
  webparts: IPageWebPart[]
  loading: boolean
  selectedItem: IPageWebPart | undefined
  checkedItems: IPageWebPart[]
  propertiesPanel: boolean
  searchstring: string
  viewMode: 'list' | 'layout'
}

export enum Constants {
  PWP_GET_ITEMS = 'PWP_GET_ITEMS',
  PWP_SELECTED_ITEM = 'PWP_SELECTED_ITEM',
  PWP_SET_PROPERTIES_PANEL = 'PWP_SET_PROPERTIES_PANEL',
  PWP_SET_SEARCH_STRING = 'PWP_SET_SEARCH_STRING',
  PWP_SET_VIEW_MODE = 'PWP_SET_VIEW_MODE',
  PWP_SET_CHECKED_ITEMS = 'PWP_SET_CHECKED_ITEMS',
}
