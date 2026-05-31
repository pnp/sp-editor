/**
 * Thin wrapper around Chrome's native messaging API for the SP Editor bridge host.
 *
 * The host binary receives JSON messages prefixed with a 4-byte little-endian length
 * (Chrome Native Messaging protocol) and returns responses in the same format.
 *
 * Security: prompts are passed as data payloads, never interpolated into shell commands.
 * All argv construction happens inside the host binary, which uses spawn() with no shell.
 */

import { ITokenUsage } from '../../store/ai-assistant/types'

const BRIDGE_HOST = 'fi.fireit.sp_editor_native_bridge'

export interface BridgeStatus {
  copilotCliInstalled: boolean
  copilotCliAuthenticated: boolean
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
 * Send a prompt to the Copilot CLI via the native bridge.
 *
 * @param prompt     The prompt text (system+user for first message, bare user text for continuations).
 * @param sessionId  Session UUID that ties this call to a running copilot session.
 * @param model      Optional model key (e.g. 'gpt-5.2'). Pass 'auto' or omit for the default.
 */
export async function sendViaBridge(
  prompt: string,
  sessionId: string,
  model?: string,
  allowedUrls?: string[],
): Promise<{ response: string; tokenUsage?: ITokenUsage }> {
  const res = await sendBridgeMessage({
    type: 'ai.complete',
    provider: 'github-copilot',
    payload: { prompt, sessionId, model, allowedUrls },
  })
  if (!res?.ok) {
    throw new Error(res?.error ?? 'bridge_error')
  }
  return {
    response: res.response as string,
    tokenUsage: res.tokenUsage as ITokenUsage | undefined,
  }
}

/**
 * Query the native bridge for Copilot CLI install / auth status.
 */
export async function checkBridgeStatus(): Promise<BridgeStatus> {
  const response = await sendBridgeMessage({ type: 'providers.status' })
  if (!response?.ok) {
    throw new Error(response?.error ?? 'bridge_error')
  }
  const status = response.providers?.['github-copilot']
  return {
    copilotCliInstalled: status?.installed ?? false,
    copilotCliAuthenticated: status?.authenticated ?? false,
  }
}
