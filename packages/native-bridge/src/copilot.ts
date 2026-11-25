import { PROMPT_SIZE_LIMIT } from './protocol'
import { ResponseMeta, TOKEN_LINE_MARKER, TokenUsage, formatTokenUsage, runCommand } from './cli'

export { TOKEN_LINE_MARKER }

/** Timeout for a single copilot call (ms). */
const COPILOT_TIMEOUT_MS = 180_000  // 3 minutes — first messages with large system prompts can take longer

/** Timeout for fast health-check spawns (copilot --version, copilot login). */
const CHECK_TIMEOUT_MS = 5_000

// ANSI escape code pattern
const ANSI_PATTERN = /\x1B\[[0-9;]*[A-Za-z]|\x1B\][^\x07]*\x07|\x1B[()][AB0-9]/g

// Stats footer that copilot CLI appends to every non-interactive response.
// Two known variants (both handled):
//   New: "\n\nChanges    +0 -0\nRequests   1 Premium (5s)\nTokens     ↑ 23.9k (21.0k cached) • ↓ 50 (7 reasoning)"
//   Old: "\n\nChanges    +0 -0\nRequests   1 Premium (5s)\nTokens     ↑ 20.9k • ↓ 1.2k = 22.1k (↑ cached: 18.0k)"
// We search for the LAST occurrence since fetched web content may contain "Changes +0 -0" in git diff examples.

interface ExtractedModelMarker {
  content: string
  modelLabel?: string
  modelId?: string
}

function parseTokenNum(s: string): number {
  const n = parseFloat(s)
  if (isNaN(n)) return 0
  return s.toLowerCase().endsWith('k') ? Math.round(n * 1000) : Math.round(n)
}

function parseResponseMeta(text: string): ResponseMeta {
  const meta: ResponseMeta = {}

  const modelMatches = Array.from(
    text.matchAll(/^\*?\s*Powered by\s+(.+?)(?:\s+\(([^)]+)\))?\*?\s*$/gim)
  )
  const modelMatch = modelMatches.length > 0 ? modelMatches[modelMatches.length - 1] : null
  if (modelMatch) {
    const modelLabel = (modelMatch[1] ?? '').trim()
    const modelId = (modelMatch[2] ?? '').trim()
    if (modelLabel) meta.modelLabel = modelLabel
    if (modelId) meta.modelId = modelId
  }

  const creditsMatch = text.match(/^\s*AI Credits\s+([\d.]+)(?:\s+\((\d+(?:\.\d+)?)s\))?/im)
  if (creditsMatch) {
    const aiCredits = parseFloat(creditsMatch[1])
    if (!isNaN(aiCredits)) {
      meta.aiCredits = aiCredits
    }

    if (creditsMatch[2]) {
      const elapsedSeconds = parseFloat(creditsMatch[2])
      if (!isNaN(elapsedSeconds)) {
        meta.elapsedSeconds = elapsedSeconds
      }
    }
  }

  if (meta.elapsedSeconds === undefined) {
    const elapsedMatch = text.match(/^\s*(?:AI Credits|Requests)\s+.*\((\d+(?:\.\d+)?)s\)/im)
    if (elapsedMatch) {
      const elapsedSeconds = parseFloat(elapsedMatch[1])
      if (!isNaN(elapsedSeconds)) {
        meta.elapsedSeconds = elapsedSeconds
      }
    }
  }

  return meta
}

function extractCachedFromTokenDetails(details: string): number {
  const cachedMatch = details.match(/([\d.]+k?)\s*cached/i)
  if (!cachedMatch) return 0
  return parseTokenNum(cachedMatch[1])
}

function hasResponseMeta(meta: ResponseMeta): boolean {
  return !!(meta.modelLabel || meta.modelId || typeof meta.aiCredits === 'number' || typeof meta.elapsedSeconds === 'number')
}

function parseModelFromValue(value: string): { modelLabel?: string; modelId?: string } {
  const trimmed = value.trim()
  if (!trimmed) return {}

  const withId = trimmed.match(/^(.*?)\s*\(([^)]+)\)\s*$/)
  if (withId) {
    const modelLabel = withId[1].trim()
    const modelId = withId[2].trim()
    return {
      ...(modelLabel ? { modelLabel } : {}),
      ...(modelId ? { modelId } : {}),
    }
  }

  return { modelLabel: trimmed }
}

function extractModelMarker(content: string): ExtractedModelMarker {
  const markerMatch = content.match(/\n?\s*\[\[SP_MODEL:([^\]]+)\]\]\s*$/i)
  if (!markerMatch) {
    return { content }
  }

  const stripped = content.slice(0, markerMatch.index).trimEnd()
  return {
    content: stripped,
    ...parseModelFromValue(markerMatch[1] ?? ''),
  }
}

function mergeModelMeta(base: ResponseMeta | undefined, marker: ExtractedModelMarker): ResponseMeta | undefined {
  const merged: ResponseMeta = { ...(base ?? {}) }

  if (!merged.modelLabel && marker.modelLabel) {
    merged.modelLabel = marker.modelLabel
  }
  if (!merged.modelId && marker.modelId) {
    merged.modelId = marker.modelId
  }

  return hasResponseMeta(merged) ? merged : undefined
}

/** Strips the CLI stats footer from text and extracts token usage if present.
 *  Returns { content } = text before the footer (plain, no marker embedded).
 *  Callers that need the TOKEN_LINE_MARKER append it themselves.
 */
function parseFooter(text: string): { content: string; tokenUsage?: TokenUsage; responseMeta?: ResponseMeta } {
  const responseMeta = parseResponseMeta(text)

  // Find the LAST occurrence of the footer start — fetched web content may
  // contain "Changes +0 -0" in git diff examples, so we must not split there.
  const re = /\n+Changes\s+\+\d+\s+-\d+/g
  let lastMatch: RegExpExecArray | null = null
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    lastMatch = m
  }
  if (!lastMatch) {
    return {
      content: text.trim(),
      ...(hasResponseMeta(responseMeta) ? { responseMeta } : {}),
    }
  }
  const content = text
    .slice(0, lastMatch.index)
    .replace(/\n*\*?\s*Powered by\s+[^\n]*\*?\s*$/i, '')
    .trim()
  const footer = text.slice(lastMatch.index)
  // Handle two footer variants:
  //   New: Tokens     ↑ 23.9k (21.0k cached) • ↓ 50 (7 reasoning)
  //   Old: Tokens     ↑ 20.9k • ↓ 1.2k = 22.1k (↑ cached: 18.0k)
  const tokMatch = footer.match(/Tokens\s+\u2191\s*([\d.]+k?)(?:\s*\(([^)]*)\))?\s*[\u2022\u00b7\-]?\s*\u2193\s*([\d.]+k?)(?:\s*\(([^)]*)\))?(?:\s*=\s*([\d.]+k?))?(?:[^\n]*\(\u2191\s*cached:\s*([\d.]+k?)\))?/) 
  if (!tokMatch) {
    return {
      content,
      ...(hasResponseMeta(responseMeta) ? { responseMeta } : {}),
    }
  }
  const input = parseTokenNum(tokMatch[1] ?? '0')
  const output = parseTokenNum(tokMatch[3] ?? '0')
  const total = tokMatch[5] ? parseTokenNum(tokMatch[5]) : input + output
  // Cached can appear inline after input/output or in legacy "(↑ cached: ...)" tail.
  const cached =
    extractCachedFromTokenDetails(tokMatch[2] ?? '') ||
    extractCachedFromTokenDetails(tokMatch[4] ?? '') ||
    (tokMatch[6] ? parseTokenNum(tokMatch[6]) : 0)
  const tokenUsage: TokenUsage = { input, output, cached, total }
  return {
    content,
    tokenUsage,
    ...(hasResponseMeta(responseMeta) ? { responseMeta } : {}),
  }
}

function stripAnsi(text: string): string {
  return text.replace(ANSI_PATTERN, '').trim()
}

// Bullet notices the CLI prints about our own sandbox flags, e.g.
// "● Disabled tools: bash, create, ...\n  list_bash, ...". They are diagnostics,
// not answer content, and must not reach the chat panel.
const CLI_NOTICE_PATTERN = /^[●•]\s*(?:Disabled tools|Unknown tool name)\b/i

/** Drops sandbox notice blocks (the bullet line plus its indented continuations). */
function stripCliNotices(text: string): string {
  const out: string[] = []
  let skipping = false
  for (const line of text.split('\n')) {
    if (CLI_NOTICE_PATTERN.test(line.trim())) {
      skipping = true
      continue
    }
    // Continuation lines of a notice are indented; a non-indented line ends the block.
    if (skipping && /^\s+\S/.test(line)) continue
    skipping = false
    out.push(line)
  }
  return out.join('\n').trim()
}

/** Returns true if the standalone `copilot` CLI is available in PATH. */
export async function isCopilotCliInstalled(): Promise<boolean> {
  const result = await runCommand('copilot', ['--version'], CHECK_TIMEOUT_MS)
  return result.exitCode === 0
}

/** Timeout for `copilot help config` (local, no network). */
const MODELS_TIMEOUT_MS = 10_000

/**
 * Parses the model ids from `copilot help config` output. The `model` setting
 * lists every id the CLI accepts as `- "id"` lines, e.g.:
 *
 *   `model`: AI model to use for Copilot CLI ...
 *     - "claude-sonnet-5.5"
 *     - "gpt-6.2-sol"
 *
 *   `logLevel`: ...
 *
 * Returns undefined when the section is missing (older CLI or changed format),
 * so the extension can fall back to "Auto" instead of guessing.
 */
export function parseCopilotModels(text: string): string[] | undefined {
  const lines = text.replace(ANSI_PATTERN, '').split('\n')
  const start = lines.findIndex((l) => /^\s*`model`\s*:/.test(l))
  if (start === -1) return undefined
  const ids: string[] = []
  for (const line of lines.slice(start + 1)) {
    if (/^\s*`[^`]+`\s*:/.test(line)) break // next setting
    const m = /^\s*-\s*"([A-Za-z0-9][A-Za-z0-9._:-]*)"\s*$/.exec(line)
    if (m) ids.push(m[1])
  }
  return ids.length > 0 ? Array.from(new Set(ids)) : undefined
}

/** Model ids the installed Copilot CLI accepts, or undefined if they cannot be read. */
export async function listCopilotModels(): Promise<string[] | undefined> {
  const result = await runCommand('copilot', ['help', 'config'], MODELS_TIMEOUT_MS, { NO_COLOR: '1', TERM: 'dumb' })
  if (result.exitCode !== 0) return undefined
  return parseCopilotModels(result.stdout)
}

/** Timeout for the auth probe — needs one network round-trip to validate the token. */
const AUTH_CHECK_TIMEOUT_MS = 20_000

/**
 * Returns true if the Copilot CLI is authenticated.
 *
 * Functional probe instead of credential-store heuristics: `copilot login`
 * stores the token in the OS credential store (keychain / Credential Manager /
 * secret-service) and creates NO files, so checking ~/.copilot/*.db both
 * false-negatives (fresh login, no session run yet) and false-positives
 * (stale files after logout).
 *
 * A prompt with a bogus --model fails AFTER token validation but BEFORE any
 * LLM call — free and fast (newer CLIs do record an empty session for it):
 *   Authenticated     → 'Model "..." from --model flag is not available.'
 *   Not authenticated → an auth error suggesting `copilot login`
 */
export async function isCopilotAuthenticated(): Promise<boolean> {
  const result = await runCommand(
    'copilot',
    ['-p', 'ping', '--model', 'sp-editor-auth-probe'],
    AUTH_CHECK_TIMEOUT_MS,
  )
  const output = `${result.stdout}\n${result.stderr}`.replace(ANSI_PATTERN, '')
  // CLI <= 1.0.8x: 'Model "x" from --model flag is not available.'
  // CLI 1.0.114:  'Model "x" is not available.'
  if (/Model\s+"[^"]*"\s+(?:from --model flag\s+)?is not available/i.test(output)) return true
  // Token exists but validation failed due to network issues — treat as
  // authenticated so we don't tell an offline (or proxied) user to re-login.
  return /Authentication token found/i.test(output) && /network|fetch failed|request failed/i.test(output)
}

/**
 * The only tools the model may use. Everything else — bash, create, edit, view,
 * grep, glob, sql, session_store_sql, skill, task, *_agent — is withheld, so
 * prompt-injected page content cannot execute commands, touch the filesystem or
 * read local Copilot session history. `web_fetch` is kept for documentation
 * lookups and is itself constrained by the --allow-url list.
 */
const AVAILABLE_TOOLS = ['web_fetch']

/**
 * Tells the model that reading the pre-approved docs is permitted.
 * Without this, role-scoped system prompts ("you only generate PnPjs snippets")
 * make the model refuse to fetch anything as out of scope, even though
 * --allow-url permits it. Kept in the bridge so it always matches the
 * allowlist actually passed to the CLI.
 */
function toolPolicyNote(urls: string[]): string {
  return `\n\n---\nTOOL POLICY (SP Editor bridge): you may use the web_fetch tool on these pre-approved documentation URLs when you need to confirm current API details: ${urls.join(', ')}. Reading them is IN SCOPE for your role, and you should do so when unsure or when the user asks you to. No other tools or URLs are available.`
}

/**
 * Sends a prompt to the standalone `copilot` CLI and returns the plain-text response.
 *
 * Security notes:
 *  - The prompt is passed as a discrete argv element, never through a shell.
 *  - --available-tools withholds every tool except AVAILABLE_TOOLS.
 *  - --disable-builtin-mcps drops the GitHub MCP server (repo/issue/PR access).
 *  - --allow-all-tools is never passed, so nothing is auto-approved.
 *  - NO_COLOR=1 / TERM=dumb suppress ANSI / interactive output.
 *  - A 3-minute hard timeout (180 s) prevents the host from hanging.
 *  - Prompt size is validated by the host before this is called.
 *
 * @param prompt     The prompt text to send.
 * @param sessionId  Optional session UUID for conversation continuity across calls.
 * @param model      Optional model identifier (e.g. 'gpt-5.2', 'claude-sonnet-4-5').
 *                   Omit or pass 'auto' to let copilot choose the default model.
 */
export async function runCopilotPrompt(
  prompt: string,
  sessionId?: string,
  model?: string,
  allowedUrls?: string[],
): Promise<{ ok: true; response: string; tokenUsage?: TokenUsage; responseMeta?: ResponseMeta } | { ok: false; error: string }> {
  if (prompt.length > PROMPT_SIZE_LIMIT) {
    return { ok: false, error: `Prompt exceeds ${PROMPT_SIZE_LIMIT} character limit.` }
  }

  const env: NodeJS.ProcessEnv = {
    NO_COLOR: '1',
    TERM: 'dumb',
    // Prevent gh from launching a browser / interactive flow
    GH_PROMPT_DISABLED: '1',
  }

  const args: string[] = ['--disable-builtin-mcps']
  for (const tool of AVAILABLE_TOOLS) {
    args.push(`--available-tools=${tool}`)
  }
  if (sessionId) {
    args.push('--session-id', sessionId)
  }
  if (model && model !== 'auto') {
    args.push('--model', model)
  }
  let effectivePrompt = prompt
  if (allowedUrls && allowedUrls.length > 0) {
    for (const url of allowedUrls) {
      args.push(`--allow-url=${url}`)
    }
    effectivePrompt += toolPolicyNote(allowedUrls)
  }
  // Pass the prompt via stdin to avoid shell quoting issues on Windows where
  // shell: true does not reliably quote multi-word argv elements.

  const result = await runCommand('copilot', args, COPILOT_TIMEOUT_MS, env, effectivePrompt)

  if (result.exitCode !== 0) {
    // Try to recover a response from stdout even on non-zero exit —
    // copilot sometimes exits with code 1 on warnings while still producing output.
    const recoveredContentRaw = stripCliNotices(stripAnsi(result.stdout))
    if (recoveredContentRaw) {
      const marker = extractModelMarker(recoveredContentRaw)
      const recoveredContent = marker.content
      const recStderr = (result.stderr || '').replace(ANSI_PATTERN, '')
      const recCombined = [recoveredContent, recStderr].filter(Boolean).join('\n')
      const recFooter = parseFooter(recCombined)
      const recResponseMeta = mergeModelMeta(recFooter.responseMeta, marker)
      const recFinal = recFooter.tokenUsage
        ? recoveredContent + TOKEN_LINE_MARKER + formatTokenUsage(recFooter.tokenUsage)
        : recoveredContent
      return {
        ok: true,
        response: recFinal,
        tokenUsage: recFooter.tokenUsage,
        responseMeta: recResponseMeta,
      }
    }
    // No recoverable content — report a clean error without leaking the raw footer.
    const rawErr = parseFooter(stripAnsi(result.stderr || result.stdout || '')).content.trim()
    const errText = rawErr || 'copilot did not return a response (exit code ' + result.exitCode + ')'
    return { ok: false, error: errText }
  }

  // When stdout is a pipe (non-TTY) copilot writes the stats footer to stderr.
  // Use stdout for the response content; parse stderr for token usage.
  // Note: do NOT trim stderr — parseFooter needs the leading \n before "Changes".
  const stdoutContentRaw = stripCliNotices(stripAnsi(result.stdout))
  if (!stdoutContentRaw) {
    return { ok: false, error: 'copilot returned an empty response' }
  }

  const marker = extractModelMarker(stdoutContentRaw)
  const stdoutContent = marker.content

  const stderrClean = (result.stderr || '').replace(ANSI_PATTERN, '')
  const combinedStreams = [stdoutContent, stderrClean].filter(Boolean).join('\n')
  const footerParsed = parseFooter(combinedStreams)
  const tokenUsage = footerParsed.tokenUsage
  const responseMeta = mergeModelMeta(footerParsed.responseMeta, marker)

  const finalContent = tokenUsage
    ? stdoutContent + TOKEN_LINE_MARKER + formatTokenUsage(tokenUsage)
    : stdoutContent
  return {
    ok: true,
    response: finalContent,
    tokenUsage,
    responseMeta,
  }
}
