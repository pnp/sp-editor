import { Constants } from './constants'

export type ActiveTab = 'scripts' | 'designs'

export interface ISiteScript {
  Id: string
  Title: string
  Description: string
  Content: string
  Version: number
  IsOOTB?: boolean
}

export interface ISiteDesign {
  Id: string
  Title: string
  Description: string
  WebTemplate: string // 64 = Team Site, 68 = Communication Site, 1 = Team Site (no M365 group)
  SiteScriptIds: string[]
  IsDefault: boolean
  PreviewImageUrl: string
  PreviewImageAltText: string
  Version: number
  IsOOTB?: boolean
}

export interface ISiteProvisioningState {
  isLoading: boolean
  error: string | null
  activeTab: ActiveTab
  siteScripts: ISiteScript[]
  siteDesigns: ISiteDesign[]
  selectedScriptId: string | null
  selectedDesignId: string | null
}

export interface ISetLoading {
  type: typeof Constants.SET_LOADING
  payload: { isLoading: boolean }
  [key: string]: unknown
}

export interface ISetError {
  type: typeof Constants.SET_ERROR
  payload: { error: string | null }
  [key: string]: unknown
}

export interface ISetActiveTab {
  type: typeof Constants.SET_ACTIVE_TAB
  payload: { activeTab: ActiveTab }
  [key: string]: unknown
}

export interface ISetSiteScripts {
  type: typeof Constants.SET_SITE_SCRIPTS
  payload: { siteScripts: ISiteScript[] }
  [key: string]: unknown
}

export interface ISetSiteDesigns {
  type: typeof Constants.SET_SITE_DESIGNS
  payload: { siteDesigns: ISiteDesign[] }
  [key: string]: unknown
}

export interface ISetSelectedScript {
  type: typeof Constants.SET_SELECTED_SCRIPT
  payload: { selectedScriptId: string | null }
  [key: string]: unknown
}

export interface ISetSelectedDesign {
  type: typeof Constants.SET_SELECTED_DESIGN
  payload: { selectedDesignId: string | null }
  [key: string]: unknown
}

export type SiteProvisioningActions =
  | ISetLoading
  | ISetError
  | ISetActiveTab
  | ISetSiteScripts
  | ISetSiteDesigns
  | ISetSelectedScript
  | ISetSelectedDesign
