import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type AiAssistantActions = ActionType<typeof actions>

export type AiMessageRole = 'user' | 'assistant' | 'system'
export type AiQueryApplyMode = 'manual' | 'apply' | 'execute'

export interface IAiMessage {
  id: string
  role: AiMessageRole
  content: string
  timestamp: number
  isStreaming?: boolean
  // Optional: for search query suggestions from /ai/search
  queryData?: {
    query: any // ISearchQuery object or string
    explanation: string
  }
}

export interface IAiAssistantState {
  isOpen: boolean
  messages: IAiMessage[]
  isSending: boolean
  error: string | null
  panelWidth: number
  queryApplyMode: AiQueryApplyMode
  pendingInput: string | null
}

export enum Constants {
  AI_SET_OPEN = 'AI_SET_OPEN',
  AI_ADD_MESSAGE = 'AI_ADD_MESSAGE',
  AI_UPDATE_MESSAGE = 'AI_UPDATE_MESSAGE',
  AI_CLEAR_MESSAGES = 'AI_CLEAR_MESSAGES',
  AI_SET_SENDING = 'AI_SET_SENDING',
  AI_SET_ERROR = 'AI_SET_ERROR',
  AI_SET_PANEL_WIDTH = 'AI_SET_PANEL_WIDTH',
  AI_SET_QUERY_APPLY_MODE = 'AI_SET_QUERY_APPLY_MODE',
  AI_SET_PENDING_INPUT = 'AI_SET_PENDING_INPUT',
}
