import { AiAssistantActions, Constants, IAiAssistantState } from './types'

const STORED_WIDTH = typeof localStorage !== 'undefined'
  ? parseInt(localStorage.getItem('ai_panel_width') || '380', 10)
  : 380

const STORED_QUERY_APPLY_MODE =
  typeof localStorage !== 'undefined'
    ? (localStorage.getItem('ai_query_apply_mode') as 'manual' | 'apply' | 'execute' | 'auto' | null)
    : null

const normalizeStoredApplyMode = (mode: typeof STORED_QUERY_APPLY_MODE): IAiAssistantState['queryApplyMode'] => {
  if (mode === 'execute' || mode === 'apply' || mode === 'manual') {
    return mode
  }

  // Backward compatibility: old "auto" maps to "apply"
  if (mode === 'auto') {
    return 'apply'
  }

  return 'manual'
}

const init: IAiAssistantState = {
  isOpen: false,
  messages: [],
  isSending: false,
  error: null,
  panelWidth: STORED_WIDTH,
  queryApplyMode: normalizeStoredApplyMode(STORED_QUERY_APPLY_MODE),
  pendingInput: null,
}

export function aiAssistantReducer(
  state: IAiAssistantState = init,
  action: AiAssistantActions
): IAiAssistantState {
  switch (action.type) {
    case Constants.AI_SET_OPEN:
      return { ...state, isOpen: action.payload.isOpen }
    case Constants.AI_ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload.message] }
    case Constants.AI_UPDATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.payload.id
            ? {
                ...m,
                content: action.payload.content,
                isStreaming: action.payload.isStreaming,
              }
            : m
        ),
      }
    case Constants.AI_CLEAR_MESSAGES:
      return { ...state, messages: [], error: null }
    case Constants.AI_SET_SENDING:
      return { ...state, isSending: action.payload.isSending }
    case Constants.AI_SET_ERROR:
      return { ...state, error: action.payload.error }
    case Constants.AI_SET_PANEL_WIDTH:
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('ai_panel_width', String(action.payload.panelWidth))
      }
      return { ...state, panelWidth: action.payload.panelWidth }
    case Constants.AI_SET_QUERY_APPLY_MODE:
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('ai_query_apply_mode', action.payload.mode)
      }
      return { ...state, queryApplyMode: action.payload.mode }
    case Constants.AI_SET_PENDING_INPUT:
      return { ...state, pendingInput: action.payload.pendingInput }
    default:
      return state
  }
}
