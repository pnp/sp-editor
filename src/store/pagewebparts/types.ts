import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type PageWebPartsActions = ActionType<typeof actions>

export interface IPageWebPart {
  id: string
  webPartId: string
  title: string
  /** 3 = web part, 4 = text/RichText */
  controlType: number
  properties: string
  /** Full webPartData JSON (includes serverProcessedContent, dataVersion, etc.) */
  webPartDataJson: string
  zoneIndex: number
  sectionIndex: number
  controlIndex: number
  sectionFactor: number
}

export interface ISavedControl {
  name: string
  json: string
}

export interface IPageWebPartsState {
  webparts: IPageWebPart[]
  loading: boolean
  selectedItem: IPageWebPart | undefined
  checkedItems: IPageWebPart[]
  propertiesPanel: boolean
  searchstring: string
  savedControls: ISavedControl[]
}

export enum Constants {
  PWP_GET_ITEMS = 'PWP_GET_ITEMS',
  PWP_SELECTED_ITEM = 'PWP_SELECTED_ITEM',
  PWP_SET_PROPERTIES_PANEL = 'PWP_SET_PROPERTIES_PANEL',
  PWP_SET_SEARCH_STRING = 'PWP_SET_SEARCH_STRING',
  PWP_SET_CHECKED_ITEMS = 'PWP_SET_CHECKED_ITEMS',
  PWP_SAVE_CONTROL = 'PWP_SAVE_CONTROL',
  PWP_DELETE_CONTROL = 'PWP_DELETE_CONTROL',
  PWP_SET_ALL_SAVED_CONTROLS = 'PWP_SET_ALL_SAVED_CONTROLS',
}
