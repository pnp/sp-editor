import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type AiAssistantActions = ActionType<typeof actions>

export type AiMessageRole = 'user' | 'assistant' | 'system'
export type AiQueryApplyMode = 'manual' | 'apply' | 'execute'

export type AiSuggestionData =
  | {
      kind: 'search'
      query: any // ISearchQuery object or string
      explanation: string
    }
  | {
      kind: 'pnpjs'
      code: string
      explanation: string
    }
  | {
      kind: 'spshooter'
      restRequest: {
        method?: string
        path?: string
        body?: string | null
        headers?: any
      }
      explanation: string
    }
  | {
      kind: 'graphsdk'
      code: string
      explanation: string
    }

export interface ITokenUsage {
  /** Prompt tokens sent to the model. */
  input: number
  /** Completion tokens returned by the model. */
  output: number
  /** Input tokens served from cache (not billed or billed at reduced rate). */
  cached: number
  /** Total tokens (input + output). */
  total: number
}

export interface IAiMessage {
  id: string
  role: AiMessageRole
  content: string
  timestamp: number
  isStreaming?: boolean
  /** Reasoning/thinking content from o-series or DeepSeek models. */
  reasoning?: string
  /** Token usage for this message (assistant messages only, from CLI footer). */
  tokenUsage?: ITokenUsage
  // Optional: structured suggestion attached to assistant messages.
  // - search: payload to apply to the Search query editor
  // - pnpjs: code snippet to apply to the PnPjs editor
  suggestionData?: AiSuggestionData
}

export interface IAiTokenInfo {
  remaining: number | null
  tier: string | null
  lastUsed: number | null
}

export interface IAiAssistantState {
  isOpen: boolean
  messages: IAiMessage[]
  isSending: boolean
  error: string | null
  panelWidth: number
  queryApplyMode: AiQueryApplyMode
  pendingInput: string | null
  tokens: IAiTokenInfo
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
  AI_SET_TOKENS = 'AI_SET_TOKENS',
}
