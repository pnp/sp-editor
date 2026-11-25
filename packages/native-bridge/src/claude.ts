import { PROMPT_SIZE_LIMIT } from './protocol'
import { ResponseMeta, TOKEN_LINE_MARKER, TokenUsage, formatTokenUsage, runCommand } from './cli'

/** Timeout for a single claude call (ms). */
const CLAUDE_TIMEOUT_MS = 180_000

/** Timeout for fast health-check spawns (claude --version). */
const CHECK_TIMEOUT_MS = 10_000

/** Timeout for `claude auth status` (reads the OS credential store, no network). */
const AUTH_CHECK_TIMEOUT_MS = 15_000

/** Returns true if the `claude` CLI (Claude Code) is available in PATH. */
export async function isClaudeCliInstalled(): Promise<boolean> {
  const result = await runCommand('claude', ['--version'], CHECK_TIMEOUT_MS)
  return result.exitCode === 0
}

/** Message shown when the installed Claude Code lacks options the bridge relies on. */
export const CLAUDE_OUTDATED_MESSAGE =
  'Your Claude Code version is too old for SP Editor. Run `claude update` (or reinstall Claude Code), then try again.'

/** Errors an older CLI prints for options or commands it does not know. */
const UNKNOWN_OPTION_PATTERN = /unknown (?:option|command|argument)|unrecognized (?:option|argument)/i

/**
 * Returns true if the installed Claude Code supports everything the bridge
 * uses. Checks `claude --help` for the options and the `auth` command instead
 * of comparing version numbers, so it does not depend on knowing which
 * release added which option.
 */
export async function isClaudeCliSupported(): Promise<boolean> {
  const result = await runCommand('claude', ['--help'], CHECK_TIMEOUT_MS, { NO_COLOR: '1', TERM: 'dumb' })
  const help = `${result.stdout}\n${result.stderr}`
  const required = ['--restricted', '--tools', '--output-format', '--session-id', '--resume', '--strict-mcp-config']
  return required.every((flag) => help.includes(flag)) && /^\s+auth\b/m.test(help)
}

/**
 * Returns true if Claude Code is signed in (claude.ai account or API key).
 * `claude auth status` prints JSON like { "loggedIn": true, ... } and exits 0
 * when signed in. No model call is made. Only call this after
 * isClaudeCliSupported(), since older versions have no `auth` command.
 */
export async function isClaudeAuthenticated(): Promise<boolean> {
  const result = await runCommand('claude', ['auth', 'status'], AUTH_CHECK_TIMEOUT_MS, { NO_COLOR: '1' })
  try {
    const status = JSON.parse(result.stdout.trim())
    if (typeof status?.loggedIn === 'boolean') return status.loggedIn
  } catch {
    // Not JSON — fall back to the exit code.
  }
  return result.exitCode === 0
}

/** "https://learn.microsoft.com/*" → "learn.microsoft.com" */
function toDomain(urlPattern: string): string | undefined {
  try {
    return new URL(urlPattern.replace(/\*+$/, '')).hostname || undefined
  } catch {
    return undefined
  }
}

/** Same intent as the Copilot tool policy note: reading the approved docs is in scope. */
function toolPolicyNote(domains: string[]): string {
  return `\n\n---\nTOOL POLICY (SP Editor bridge): you may use the WebFetch tool on these pre-approved documentation sites when you need to confirm current API details: ${domains.join(', ')}. Reading them is IN SCOPE for your role, and you should do so when unsure or when the user asks you to. No other tools or sites are available.`
}

/** "claude-sonnet-5-5" → "Claude Sonnet 5.5"; unknown shapes are returned unchanged. */
function modelLabelFromId(id: string): string {
  const m = /^claude-([a-z]+)-(\d+)(?:-(\d{1,2}))?(?:-|$)/i.exec(id)
  if (!m) return id
  const family = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase()
  return `Claude ${family} ${m[2]}${m[3] ? `.${m[3]}` : ''}`
}

interface ClaudeJsonResult {
  type?: string
  subtype?: string
  is_error?: boolean
  result?: string
  duration_ms?: number
  usage?: {
    input_tokens?: number
    output_tokens?: number
    cache_creation_input_tokens?: number
    cache_read_input_tokens?: number
  }
  modelUsage?: Record<string, { outputTokens?: number }>
}

function parseJsonResult(stdout: string): ClaudeJsonResult | undefined {
  const trimmed = stdout.trim()
  if (!trimmed) return undefined
  const candidates = [trimmed, trimmed.split('\n').pop() ?? '']
  for (const c of candidates) {
    try {
      const parsed = JSON.parse(c)
      if (parsed && typeof parsed === 'object') return parsed as ClaudeJsonResult
    } catch {
      // try next candidate
    }
  }
  return undefined
}

/** The main model is the one that produced the most output (WebFetch may use a small helper model). */
function primaryModel(modelUsage: ClaudeJsonResult['modelUsage']): string | undefined {
  const entries = Object.entries(modelUsage ?? {})
  if (entries.length === 0) return undefined
  entries.sort((a, b) => (b[1]?.outputTokens ?? 0) - (a[1]?.outputTokens ?? 0))
  return entries[0][0]
}

/**
 * Sends a prompt to Claude Code (`claude -p`) and returns the plain-text response.
 *
 * Security notes:
 *  - The prompt is passed via stdin, never through a shell.
 *  - --restricted ignores user/project settings files and removes code-running tools.
 *  - --tools WebFetch makes WebFetch the only built-in tool; --allowedTools pre-approves
 *    it for the documentation domains only. In print mode anything else that needs
 *    permission is denied, so other sites cannot be fetched.
 *  - --strict-mcp-config (with no --mcp-config) loads no MCP servers.
 *  - --disable-slash-commands disables skills and commands.
 *  - A 3-minute hard timeout prevents the host from hanging.
 *
 * Sessions: the first call creates the session with --session-id, later calls
 * continue it with --resume. Sessions live under the CLI's projects folder for
 * os.tmpdir() (the spawn cwd), which stays the same between calls.
 *
 * @param model  Model alias ('sonnet', 'opus', 'haiku', 'fable') or full name.
 *               Omit or pass 'default' to use Claude Code's default model.
 */
export async function runClaudePrompt(
  prompt: string,
  sessionId?: string,
  model?: string,
  allowedUrls?: string[],
  resume?: boolean,
): Promise<{ ok: true; response: string; tokenUsage?: TokenUsage; responseMeta?: ResponseMeta } | { ok: false; error: string }> {
  if (prompt.length > PROMPT_SIZE_LIMIT) {
    return { ok: false, error: `Prompt exceeds ${PROMPT_SIZE_LIMIT} character limit.` }
  }

  const args: string[] = [
    '-p',
    '--output-format', 'json',
    '--restricted',
    '--tools', 'WebFetch',
    '--strict-mcp-config',
    '--disable-slash-commands',
  ]
  if (sessionId) {
    args.push(resume ? '--resume' : '--session-id', sessionId)
  } else {
    args.push('--no-session-persistence')
  }
  if (model && model !== 'default' && model !== 'auto') {
    args.push('--model', model)
  }

  let effectivePrompt = prompt
  const domains = Array.from(new Set((allowedUrls ?? []).map(toDomain).filter((d): d is string => !!d)))
  if (domains.length > 0) {
    args.push('--allowedTools', ...domains.map((d) => `WebFetch(domain:${d})`))
    effectivePrompt += toolPolicyNote(domains)
  }

  const result = await runCommand('claude', args, CLAUDE_TIMEOUT_MS, { NO_COLOR: '1', TERM: 'dumb' }, effectivePrompt)
  const json = parseJsonResult(result.stdout)

  if (!json && UNKNOWN_OPTION_PATTERN.test(`${result.stderr}\n${result.stdout}`)) {
    return { ok: false, error: CLAUDE_OUTDATED_MESSAGE }
  }

  if (!json || json.is_error || typeof json.result !== 'string' || !json.result.trim()) {
    const detail =
      (json?.result && json.result.trim()) ||
      result.stderr.trim() ||
      result.stdout.trim() ||
      `claude did not return a response (exit code ${result.exitCode})`
    return { ok: false, error: detail.slice(0, 2000) }
  }

  const content = json.result.trim()

  let tokenUsage: TokenUsage | undefined
  if (json.usage) {
    const cacheRead = json.usage.cache_read_input_tokens ?? 0
    const input = (json.usage.input_tokens ?? 0) + (json.usage.cache_creation_input_tokens ?? 0) + cacheRead
    const output = json.usage.output_tokens ?? 0
    tokenUsage = { input, output, cached: cacheRead, total: input + output }
  }

  const responseMeta: ResponseMeta = {}
  const modelId = primaryModel(json.modelUsage)
  if (modelId) {
    responseMeta.modelId = modelId
    responseMeta.modelLabel = modelLabelFromId(modelId)
  }
  if (typeof json.duration_ms === 'number') {
    responseMeta.elapsedSeconds = Math.round(json.duration_ms / 100) / 10
  }

  return {
    ok: true,
    response: tokenUsage ? content + TOKEN_LINE_MARKER + formatTokenUsage(tokenUsage) : content,
    tokenUsage,
    ...(Object.keys(responseMeta).length > 0 ? { responseMeta } : {}),
  }
}
