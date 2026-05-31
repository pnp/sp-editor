import { IAiAuthState, AiAuthActions, Constants } from './types'
import { DEFAULT_CLI_MODEL } from '../../services/ai-assistant/copilotApiClient'

const init: IAiAuthState = {
  selectedModel: DEFAULT_CLI_MODEL,
  bridgeStatus: 'idle',
}

export function aiAuthReducer(
  state: IAiAuthState = init,
  action: AiAuthActions,
): IAiAuthState {
  switch (action.type) {
    case Constants.AUTH_SET_MODEL:
      return { ...state, selectedModel: action.payload.model }
    case Constants.AUTH_SET_BRIDGE_STATUS:
      return { ...state, bridgeStatus: action.payload.bridgeStatus }
    default:
      return state
  }
}
