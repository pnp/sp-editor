import { AiAssistantActions, Constants, IAiAssistantState } from './types'

const init: IAiAssistantState = {
  isOpen: false,
  messages: [],
  isSending: false,
  error: null,
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
    default:
      return state
  }
}
