import { action } from 'typesafe-actions'
import { BridgeStatusValue, Constants, IAiAuthState, ProviderStatusValue } from './types'
import { checkBridgeStatus as bridgeCheckStatus, CliStatus } from '../../services/ai-assistant/nativeBridgeClient'
import { AI_PROVIDERS, AiProviderId, getModelProvider, isModelAvailable } from '../../services/ai-assistant/models'

export const setSelectedModel = (model: string) =>
  action(Constants.AUTH_SET_MODEL, { model })

export interface IBridgeStatusDetails {
  providerStatus: Record<AiProviderId, ProviderStatusValue>
  bridgeVersion: string | null
  copilotModels: string[] | null
  copilotModelInfo: IAiAuthState['copilotModelInfo']
}

export const setBridgeStatus = (bridgeStatus: BridgeStatusValue, details?: IBridgeStatusDetails) =>
  action(Constants.AUTH_SET_BRIDGE_STATUS, { bridgeStatus, details })

const toProviderStatus = (s: CliStatus | undefined): ProviderStatusValue => {
  if (!s) return 'bridge_outdated'
  if (!s.installed) return 'cli_missing'
  if (s.outdated) return 'cli_outdated'
  if (!s.authenticated) return 'not_authenticated'
  return 'ready'
}

// ── Status simulation (unpacked builds only) ─────────────────────────────────
//
// Lets a developer preview the setup screens without breaking their real setup.
// In the extension's DevTools console (e.g. right-click the popup → Inspect):
//   localStorage.setItem('sp_ai_simulate', 'bridge_missing')
//   localStorage.setItem('sp_ai_simulate', JSON.stringify({ 'claude-code': 'not_authenticated' }))
//   localStorage.removeItem('sp_ai_simulate')
// then click Recheck. Values per provider: ready | cli_missing | not_authenticated | bridge_outdated | cli_outdated.
// Ignored in store installs (those have an update_url in their manifest).

const SIMULATE_KEY = 'sp_ai_simulate'
const SIMULATABLE: ProviderStatusValue[] = ['ready', 'cli_missing', 'not_authenticated', 'bridge_outdated', 'cli_outdated']

type Simulation = 'bridge_missing' | Partial<Record<AiProviderId, ProviderStatusValue>>

function readSimulation(): Simulation | undefined {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const manifest = (globalThis as any).chrome?.runtime?.getManifest?.()
    if (!manifest || manifest.update_url) return undefined
    const raw = localStorage.getItem(SIMULATE_KEY)
    if (!raw) return undefined
    if (raw.trim() === 'bridge_missing') return 'bridge_missing'
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return undefined
    const sim: Partial<Record<AiProviderId, ProviderStatusValue>> = {}
    for (const p of AI_PROVIDERS) {
      if (SIMULATABLE.includes(parsed[p.id])) sim[p.id] = parsed[p.id]
    }
    return sim
  } catch {
    return undefined
  }
}

// ── Thunk ─────────────────────────────────────────────────────────────────────

/**
 * Check the native bridge and the status of every provider CLI.
 * If the selected model's provider is not usable but another provider is,
 * switches to that provider's default model.
 */
export function checkBridgeStatus() {
  return async (dispatch: (a: any) => void, getState: () => { aiAuth: IAiAuthState }): Promise<void> => {
    dispatch(setBridgeStatus('checking'))
    const simulation = readSimulation()
    if (simulation) {
      console.warn(`[SP Editor] AI status is simulated (localStorage '${SIMULATE_KEY}'):`, simulation)
    }
    if (simulation === 'bridge_missing') {
      dispatch(setBridgeStatus('bridge_missing'))
      return
    }
    try {
      const status = await bridgeCheckStatus()
      const providerStatus = {
        'github-copilot': toProviderStatus(status.providers['github-copilot']),
        'claude-code': toProviderStatus(status.providers['claude-code']),
        ...simulation,
      }
      const copilotModels = status.providers['github-copilot']?.models ?? null
      const copilotModelInfo = status.providers['github-copilot']?.modelInfo ?? {}
      const readyProviders = AI_PROVIDERS.filter((p) => providerStatus[p.id] === 'ready')
      dispatch(
        setBridgeStatus(readyProviders.length > 0 ? 'ready' : 'no_provider', {
          providerStatus,
          bridgeVersion: status.bridgeVersion ?? null,
          copilotModels,
          copilotModelInfo,
        }),
      )

      // Keep the selected model only if its provider is ready and the CLI still
      // offers it; otherwise use that provider's default, or the first ready one.
      const selected = getState().aiAuth.selectedModel
      const selectedProvider = getModelProvider(selected)
      if (readyProviders.length > 0) {
        if (providerStatus[selectedProvider] !== 'ready') {
          dispatch(setSelectedModel(readyProviders[0].defaultModel))
        } else if (!isModelAvailable(selected, copilotModels)) {
          const fallback = AI_PROVIDERS.find((p) => p.id === selectedProvider) ?? readyProviders[0]
          dispatch(setSelectedModel(fallback.defaultModel))
        }
      }
    } catch {
      // Native messaging host not installed or not reachable
      dispatch(setBridgeStatus('bridge_missing'))
    }
  }
}
