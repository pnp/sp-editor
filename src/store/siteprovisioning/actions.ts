import { Constants } from './constants'
import {
  ISetLoading,
  ISetError,
  ISetActiveTab,
  ISetSiteScripts,
  ISetSiteDesigns,
  ISetSelectedScript,
  ISetSelectedDesign,
  ActiveTab,
  ISiteScript,
  ISiteDesign,
} from './types'

export const setLoading = (isLoading: boolean): ISetLoading => ({
  type: Constants.SET_LOADING,
  payload: { isLoading },
})

export const setError = (error: string | null): ISetError => ({
  type: Constants.SET_ERROR,
  payload: { error },
})

export const setActiveTab = (activeTab: ActiveTab): ISetActiveTab => ({
  type: Constants.SET_ACTIVE_TAB,
  payload: { activeTab },
})

export const setSiteScripts = (siteScripts: ISiteScript[]): ISetSiteScripts => ({
  type: Constants.SET_SITE_SCRIPTS,
  payload: { siteScripts },
})

export const setSiteDesigns = (siteDesigns: ISiteDesign[]): ISetSiteDesigns => ({
  type: Constants.SET_SITE_DESIGNS,
  payload: { siteDesigns },
})

export const setSelectedScript = (selectedScriptId: string | null): ISetSelectedScript => ({
  type: Constants.SET_SELECTED_SCRIPT,
  payload: { selectedScriptId },
})

export const setSelectedDesign = (selectedDesignId: string | null): ISetSelectedDesign => ({
  type: Constants.SET_SELECTED_DESIGN,
  payload: { selectedDesignId },
})
