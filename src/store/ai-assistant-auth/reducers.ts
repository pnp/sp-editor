import { Constants, IAiAssistantAuthState, AiAssistantAuthActions } from './types';

const init: IAiAssistantAuthState = {
  isAuthenticated: false,
  apiKey: null,
  user: null,
  loading: false,
  error: null,
};

export function aiAssistantAuthReducer(
  state: IAiAssistantAuthState = init,
  action: AiAssistantAuthActions
): IAiAssistantAuthState {
  switch (action.type) {
    case Constants.AUTH_SET_STATE:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        apiKey: action.payload.apiKey,
        user: action.payload.user,
        loading: false,
        error: null,
      };
    case Constants.AUTH_SET_LOADING:
      return { ...state, loading: action.payload.loading };
    case Constants.AUTH_SET_ERROR:
      return { ...state, error: action.payload.error, loading: false };
    case Constants.AUTH_LOGOUT:
      return init;
    default:
      return state;
  }
}
