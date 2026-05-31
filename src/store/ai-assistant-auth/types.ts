import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type AiAuthActions = ActionType<typeof actions>

export interface IAiAuthState {
  selectedModel: string
  bridgeStatus: 'idle' | 'checking' | 'ready' | 'bridge_missing' | 'cli_missing' | 'not_authenticated'
}

export enum Constants {
  AUTH_SET_MODEL         = 'AI_AUTH_SET_MODEL',
  AUTH_SET_BRIDGE_STATUS = 'AI_AUTH_SET_BRIDGE_STATUS',
}
