import { action } from 'typesafe-actions'
import { Constants } from './types'
import { checkBridgeStatus as bridgeCheckStatus } from '../../services/ai-assistant/nativeBridgeClient'

export const setSelectedModel = (model: string) =>
  action(Constants.AUTH_SET_MODEL, { model })

export const setBridgeStatus = (bridgeStatus: 'idle' | 'checking' | 'ready' | 'bridge_missing' | 'cli_missing' | 'not_authenticated') =>
  action(Constants.AUTH_SET_BRIDGE_STATUS, { bridgeStatus })

// ── Thunk ─────────────────────────────────────────────────────────────────────

/**
 * Check the native bridge and Copilot CLI status.
 * Updates bridgeStatus to 'ready', 'cli_missing', or 'not_authenticated'.
 */
export function checkBridgeStatus() {
  return async (dispatch: (a: any) => void): Promise<void> => {
    dispatch(setBridgeStatus('checking'))
    try {
      const { copilotCliInstalled, copilotCliAuthenticated } = await bridgeCheckStatus()
      if (!copilotCliInstalled) {
        dispatch(setBridgeStatus('cli_missing'))
      } else if (!copilotCliAuthenticated) {
        dispatch(setBridgeStatus('not_authenticated'))
      } else {
        dispatch(setBridgeStatus('ready'))
      }
    } catch {
      // Native messaging host not installed or not reachable
      dispatch(setBridgeStatus('bridge_missing'))
    }
  }
}
