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

export type ProviderId = 'github-copilot' | 'claude-code'

export interface AiCompleteRequest {
  type: 'ai.complete'
  provider: ProviderId
  payload: {
    /** The prompt text to send (system+user for first message, user-only for continuations). */
    prompt: string
    /** Session UUID for conversation continuity. Omit for a stateless one-shot call. */
    sessionId?: string
    /** Model identifier, e.g. 'gpt-5.2'. Omit or 'auto' to use the default model. */
    model?: string
    /** URL patterns pre-approved for copilot CLI web fetching (e.g. 'https://pnp.github.io/*'). */
    allowedUrls?: string[]
    /** True when sessionId refers to an existing conversation (claude-code: --resume instead of --session-id). */
    resume?: boolean
  }
}

export type BridgeRequest = PingRequest | ProviderStatusRequest | AiCompleteRequest

// ── Outbound (host → extension) ─────────────────────────────────────────────

export interface PingResponse {
  ok: true
}

/** A Copilot model the signed-in account can use (from `copilot --acp`). */
export interface CopilotModelInfo {
  id: string
  /** Display name from Copilot, e.g. "GPT-5.3-Codex". */
  name: string
  /** Premium request multiplier, e.g. "1x", "0.33x", "14x". */
  usage?: string
}

export interface CliProviderStatus {
  installed: boolean
  authenticated: boolean
  /** True when the CLI is installed but too old for the options the bridge uses. */
  outdated?: boolean
  /** Model ids the CLI accepts (github-copilot only). Missing when they cannot be read. */
  models?: string[]
  /** Copilot only, since 1.4.0: the models the account can use, with names and
   *  cost. When present, `models` holds the same ids. */
  modelDetails?: CopilotModelInfo[]
}

/** @deprecated use CliProviderStatus */
export type GithubCopilotStatus = CliProviderStatus

export interface ProviderStatusResponse {
  ok: true
  /** Bridge package version (since 1.3.0; missing in older bridges). */
  bridgeVersion?: string
  providers: {
    'github-copilot': CliProviderStatus
    'claude-code': CliProviderStatus
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
  responseMeta?: {
    aiCredits?: number
    elapsedSeconds?: number
    modelLabel?: string
    modelId?: string
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
