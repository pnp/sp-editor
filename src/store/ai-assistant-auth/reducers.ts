import { IAiAuthState, AiAuthActions, Constants } from './types'
import { COPILOT_CLI_MODELS, DEFAULT_CLI_MODEL } from '../../services/ai-assistant/copilotApiClient'

const MODEL_STORAGE_KEY = 'ai_selected_model'

const AVAILABLE_MODEL_KEYS = new Set(COPILOT_CLI_MODELS.map((m) => m.key))

const getStoredModel = (): string => {
  if (typeof localStorage === 'undefined') {
    return DEFAULT_CLI_MODEL
  }

  const stored = localStorage.getItem(MODEL_STORAGE_KEY)
  if (stored && AVAILABLE_MODEL_KEYS.has(stored)) {
    return stored
  }

  return DEFAULT_CLI_MODEL
}

const init: IAiAuthState = {
  selectedModel: getStoredModel(),
  bridgeStatus: 'idle',
}

export function aiAuthReducer(
  state: IAiAuthState = init,
  action: AiAuthActions,
): IAiAuthState {
  switch (action.type) {
    case Constants.AUTH_SET_MODEL:
      if (typeof localStorage !== 'undefined' && AVAILABLE_MODEL_KEYS.has(action.payload.model)) {
        localStorage.setItem(MODEL_STORAGE_KEY, action.payload.model)
      }
      return {
        ...state,
        selectedModel: AVAILABLE_MODEL_KEYS.has(action.payload.model)
          ? action.payload.model
          : DEFAULT_CLI_MODEL,
      }
    case Constants.AUTH_SET_BRIDGE_STATUS:
      return { ...state, bridgeStatus: action.payload.bridgeStatus }
    default:
      return state
  }
}
