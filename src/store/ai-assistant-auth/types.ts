import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { AiProviderId } from '../../services/ai-assistant/models'

export type AiAuthActions = ActionType<typeof actions>

/**
 * Overall bridge status. 'ready' means at least one provider CLI is installed
 * and signed in; 'no_provider' means the bridge works but none is usable yet.
 */
export type BridgeStatusValue = 'idle' | 'checking' | 'ready' | 'bridge_missing' | 'no_provider'

/**
 * Status of one provider CLI.
 * 'bridge_outdated': the installed bridge predates this provider.
 * 'cli_outdated': the CLI is installed but too old for the bridge.
 */
export type ProviderStatusValue = 'unknown' | 'ready' | 'cli_missing' | 'not_authenticated' | 'bridge_outdated' | 'cli_outdated'

export interface IAiAuthState {
  selectedModel: string
  bridgeStatus: BridgeStatusValue
  providerStatus: Record<AiProviderId, ProviderStatusValue>
  /** Bridge version reported by the bridge; null when unknown (bridge older than 1.3.0 or not reachable). */
  bridgeVersion: string | null
  /** Copilot model ids read from the CLI; null when unknown (only "Auto" is offered then). */
  copilotModels: string[] | null
}

export enum Constants {
  AUTH_SET_MODEL         = 'AI_AUTH_SET_MODEL',
  AUTH_SET_BRIDGE_STATUS = 'AI_AUTH_SET_BRIDGE_STATUS',
}
