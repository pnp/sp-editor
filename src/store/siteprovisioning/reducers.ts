import { Constants } from './constants'
import { SiteProvisioningActions, ISiteProvisioningState } from './types'

const initialState: ISiteProvisioningState = {
  isLoading: false,
  error: null,
  activeTab: 'scripts',
  siteScripts: [],
  siteDesigns: [],
  selectedScriptId: null,
  selectedDesignId: null,
}

export const siteProvisioningReducer = (
  state = initialState,
  action: SiteProvisioningActions
): ISiteProvisioningState => {
  switch (action.type) {
    case Constants.SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading }
    case Constants.SET_ERROR:
      return { ...state, error: action.payload.error }
    case Constants.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload.activeTab }
    case Constants.SET_SITE_SCRIPTS:
      return { ...state, siteScripts: action.payload.siteScripts }
    case Constants.SET_SITE_DESIGNS:
      return { ...state, siteDesigns: action.payload.siteDesigns }
    case Constants.SET_SELECTED_SCRIPT:
      return { ...state, selectedScriptId: action.payload.selectedScriptId }
    case Constants.SET_SELECTED_DESIGN:
      return { ...state, selectedDesignId: action.payload.selectedDesignId }
    default:
      return state
  }
}
