/**
 * Thin wrapper around Chrome's native messaging API for the SP Editor bridge host.
 *
 * The host binary receives JSON messages prefixed with a 4-byte little-endian length
 * (Chrome Native Messaging protocol) and returns responses in the same format.
 *
 * Security: prompts are passed as data payloads, never interpolated into shell commands.
 * All argv construction happens inside the host binary, which uses spawn() with no shell.
 */

import { IAiResponseMeta, ITokenUsage } from '../../store/ai-assistant/types'
import { AiProviderId } from './models'

const BRIDGE_HOST = 'fi.fireit.sp_editor_native_bridge'

export interface CliStatus {
  installed: boolean
  authenticated: boolean
  /** Installed but too old for the options the bridge uses (bridge >= 1.3.0). */
  outdated: boolean
  /** Model ids reported by the CLI (github-copilot, bridge >= 1.3.0). */
  models?: string[]
  /** Names and cost of the models the account can use (github-copilot, bridge >= 1.4.0). */
  modelInfo?: CopilotModelInfoMap
}

/** Copilot model id → display name and premium request multiplier ("0.33x"). */
export type CopilotModelInfoMap = Record<string, { name: string; usage?: string }>

function readModelInfo(details: unknown): CopilotModelInfoMap | undefined {
  if (!Array.isArray(details)) return undefined
  const info: CopilotModelInfoMap = {}
  for (const d of details) {
    if (!d || typeof d.id !== 'string' || typeof d.name !== 'string') continue
    info[d.id] = { name: d.name, ...(typeof d.usage === 'string' ? { usage: d.usage } : {}) }
  }
  return Object.keys(info).length > 0 ? info : undefined
}

export interface BridgeStatus {
  /** Bridge package version; undefined for bridges older than 1.3.0. */
  bridgeVersion?: string
  /** Per-provider CLI status. A provider is undefined when the installed bridge
   *  predates it (the bridge needs updating to use that provider). */
  providers: Record<AiProviderId, CliStatus | undefined>
}

function sendBridgeMessage(message: object): Promise<any> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cr = (globalThis as any).chrome
    cr.runtime.sendNativeMessage(BRIDGE_HOST, message, (response: any) => {
      const err = cr.runtime.lastError
      if (err) {
        reject(new Error(err.message ?? 'native_messaging_error'))
        return
      }
      resolve(response)
    })
  })
}

/**
 * Send a prompt to a provider CLI via the native bridge.
 *
 * @param provider   Which CLI to use ('github-copilot' or 'claude-code').
 * @param prompt     The prompt text (system+user for first message, bare user text for continuations).
 * @param sessionId  Session UUID that ties this call to a running CLI session.
 * @param model      Optional CLI model id (e.g. 'gpt-5.5', 'sonnet'). 'auto' / 'default' or omit for the default.
 * @param resume     True when the session already exists (not the first message).
 */
export async function sendViaBridge(
  provider: AiProviderId,
  prompt: string,
  sessionId: string,
  model?: string,
  allowedUrls?: string[],
  resume?: boolean,
): Promise<{ response: string; tokenUsage?: ITokenUsage; responseMeta?: IAiResponseMeta }> {
  const res = await sendBridgeMessage({
    type: 'ai.complete',
    provider,
    payload: { prompt, sessionId, model, allowedUrls, resume },
  })
  if (!res?.ok) {
    const error: string = res?.error ?? 'bridge_error'
    if (error.startsWith('unknown_provider')) {
      throw new Error('Your SP Editor bridge is too old for this provider. Update it with: npm install -g @sp-editor/native-bridge@latest')
    }
    throw new Error(error)
  }
  return {
    response: res.response as string,
    tokenUsage: res.tokenUsage as ITokenUsage | undefined,
    responseMeta: res.responseMeta as IAiResponseMeta | undefined,
  }
}

/**
 * Query the native bridge for its version and the install / auth status of each provider CLI.
 */
export async function checkBridgeStatus(): Promise<BridgeStatus> {
  const response = await sendBridgeMessage({ type: 'providers.status' })
  if (!response?.ok) {
    throw new Error(response?.error ?? 'bridge_error')
  }
  const read = (s: any): CliStatus | undefined =>
    s
      ? {
          installed: !!s.installed,
          authenticated: !!s.authenticated,
          outdated: !!s.outdated,
          models: Array.isArray(s.models)
            ? s.models.filter((m: unknown): m is string => typeof m === 'string' && m.length > 0)
            : undefined,
          modelInfo: readModelInfo(s.modelDetails),
        }
      : undefined
  return {
    bridgeVersion: typeof response.bridgeVersion === 'string' ? response.bridgeVersion : undefined,
    providers: {
      'github-copilot': read(response.providers?.['github-copilot']),
      'claude-code': read(response.providers?.['claude-code']),
    },
  }
}
