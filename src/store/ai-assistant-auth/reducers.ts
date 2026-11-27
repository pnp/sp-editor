import { IAiAuthState, AiAuthActions, Constants } from './types'
import { DEFAULT_CLI_MODEL } from '../../services/ai-assistant/copilotApiClient'

const MODEL_STORAGE_KEY = 'ai_selected_model'

const getStoredModel = (): string => {
  if (typeof localStorage === 'undefined') {
    return DEFAULT_CLI_MODEL
  }

  // Any stored id is accepted here; checkBridgeStatus() switches to a default
  // once it knows which models the CLIs actually offer.
  const stored = localStorage.getItem(MODEL_STORAGE_KEY)
  if (stored && stored.trim()) {
    return stored
  }

  return DEFAULT_CLI_MODEL
}

const init: IAiAuthState = {
  selectedModel: getStoredModel(),
  bridgeStatus: 'idle',
  providerStatus: {
    'github-copilot': 'unknown',
    'claude-code': 'unknown',
  },
  bridgeVersion: null,
  copilotModels: null,
  copilotModelInfo: {},
}

export function aiAuthReducer(
  state: IAiAuthState = init,
  action: AiAuthActions,
): IAiAuthState {
  switch (action.type) {
    case Constants.AUTH_SET_MODEL: {
      const model = action.payload.model?.trim() ? action.payload.model : DEFAULT_CLI_MODEL
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(MODEL_STORAGE_KEY, model)
      }
      return { ...state, selectedModel: model }
    }
    case Constants.AUTH_SET_BRIDGE_STATUS:
      return {
        ...state,
        bridgeStatus: action.payload.bridgeStatus,
        providerStatus: action.payload.details?.providerStatus ?? state.providerStatus,
        bridgeVersion: action.payload.details ? action.payload.details.bridgeVersion : state.bridgeVersion,
        copilotModels: action.payload.details ? action.payload.details.copilotModels : state.copilotModels,
        copilotModelInfo: action.payload.details ? action.payload.details.copilotModelInfo : state.copilotModelInfo,
      }
    default:
      return state
  }
}
