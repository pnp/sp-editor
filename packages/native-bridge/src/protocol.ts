// ─── Shared protocol types for the SP Editor native messaging bridge ──────────
// These are the message shapes exchanged between the Chrome extension and the
// native host over stdin/stdout (Chrome native messaging protocol).

// ── Inbound (extension → host) ──────────────────────────────────────────────

export interface PingRequest {
  type: 'ping'
}

export interface ProviderStatusRequest {
  type: 'providers.status'
}

export interface AiCompleteRequest {
  type: 'ai.complete'
  provider: 'github-copilot'
  payload: {
    /** The prompt text to send (system+user for first message, user-only for continuations). */
    prompt: string
    /** Session UUID for conversation continuity. Omit for a stateless one-shot call. */
    sessionId?: string
    /** Model identifier, e.g. 'gpt-5.2'. Omit or 'auto' to use the default model. */
    model?: string
    /** URL patterns pre-approved for copilot CLI web fetching (e.g. 'https://pnp.github.io/*'). */
    allowedUrls?: string[]
  }
}

export type BridgeRequest = PingRequest | ProviderStatusRequest | AiCompleteRequest

// ── Outbound (host → extension) ─────────────────────────────────────────────

export interface PingResponse {
  ok: true
}

export interface GithubCopilotStatus {
  installed: boolean
  authenticated: boolean
}

export interface ProviderStatusResponse {
  ok: true
  providers: {
    'github-copilot': GithubCopilotStatus
  }
}

export interface AiCompleteResponse {
  ok: true
  response: string
  tokenUsage?: {
    input: number
    output: number
    cached: number
    total: number
  }
}

export interface ErrorResponse {
  ok: false
  error: string
}

export type BridgeResponse =
  | PingResponse
  | ProviderStatusResponse
  | AiCompleteResponse
  | ErrorResponse

// ── Constants ────────────────────────────────────────────────────────────────

/** Maximum combined prompt size in characters (32 KB). Enforced by the host. */
export const PROMPT_SIZE_LIMIT = 32_768

/** Name used in Chrome / Edge native messaging registration. */
export const BRIDGE_NAME = 'fi.fireit.sp_editor_native_bridge'

/** Published extension IDs for SP Editor. */
export const EXTENSION_ID_CHROME = 'ecblfcmjnbbgaojblcpmjoamegpbodhd'
export const EXTENSION_ID_EDGE   = 'affnnhcbfmcbbdlcadgkdbfafigmjdkk'
/** Default set of allowed origins (both Chrome Web Store and Edge Add-ons). */
export const DEFAULT_EXTENSION_IDS = [EXTENSION_ID_CHROME, EXTENSION_ID_EDGE]
