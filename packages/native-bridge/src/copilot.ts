import { spawn } from 'child_process'
import os from 'os'
import path from 'path'
import { PROMPT_SIZE_LIMIT } from './protocol'

/** Timeout for a single copilot call (ms). */
const COPILOT_TIMEOUT_MS = 180_000  // 3 minutes — first messages with large system prompts can take longer

/** Timeout for fast health-check spawns (copilot --version, gh auth token). */
const CHECK_TIMEOUT_MS = 5_000

// ANSI escape code pattern
const ANSI_PATTERN = /\x1B\[[0-9;]*[A-Za-z]|\x1B\][^\x07]*\x07|\x1B[()][AB0-9]/g

// Stats footer that copilot CLI appends to every non-interactive response.
// Two known variants (both handled):
//   New: "\n\nChanges    +0 -0\nRequests   1 Premium (5s)\nTokens     ↑ 23.9k (21.0k cached) • ↓ 50 (7 reasoning)"
//   Old: "\n\nChanges    +0 -0\nRequests   1 Premium (5s)\nTokens     ↑ 20.9k • ↓ 1.2k = 22.1k (↑ cached: 18.0k)"
// We search for the LAST occurrence since fetched web content may contain "Changes +0 -0" in git diff examples.

interface TokenUsage {
  input: number
  output: number
  cached: number
  total: number
}

/** Unique marker appended to response content so the UI can render token stats
 *  without relying on a separate Redux field surviving the full message chain. */
export const TOKEN_LINE_MARKER = '\n\n%%SP_TOKENS%%'

function parseTokenNum(s: string): number {
  const n = parseFloat(s)
  if (isNaN(n)) return 0
  return s.toLowerCase().endsWith('k') ? Math.round(n * 1000) : Math.round(n)
}

function formatTokenUsage(t: TokenUsage): string {
  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
  let line = `↑${fmt(t.input)} in · ↓${fmt(t.output)} out`
  if (t.cached > 0) line += ` · ~${fmt(t.cached)} cached`
  return line
}

/** Strips the CLI stats footer from text and extracts token usage if present.
 *  Returns { content } = text before the footer (plain, no marker embedded).
 *  Callers that need the TOKEN_LINE_MARKER append it themselves.
 */
function parseFooter(text: string): { content: string; tokenUsage?: TokenUsage } {
  // Find the LAST occurrence of the footer start — fetched web content may
  // contain "Changes +0 -0" in git diff examples, so we must not split there.
  const re = /\n+Changes\s+\+\d+\s+-\d+/g
  let lastMatch: RegExpExecArray | null = null
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    lastMatch = m
  }
  if (!lastMatch) {
    return { content: text.trim() }
  }
  const content = text.slice(0, lastMatch.index).trim()
  const footer = text.slice(lastMatch.index)
  // Handle two footer variants:
  //   New: Tokens     ↑ 23.9k (21.0k cached) • ↓ 50 (7 reasoning)
  //   Old: Tokens     ↑ 20.9k • ↓ 1.2k = 22.1k (↑ cached: 18.0k)
  const tokMatch = footer.match(/Tokens\s+\u2191\s*([\d.]+k?)(?:\s*\(([\d.]+k?)\s*cached\))?\s*[\u2022\u00b7\-]?\s*\u2193\s*([\d.]+k?)(?:\s*=\s*([\d.]+k?))?(?:[^(]*\(\u2191\s*cached:\s*([\d.]+k?)\))?/)
  if (!tokMatch) {
    return { content }
  }
  const input = parseTokenNum(tokMatch[1] ?? '0')
  const output = parseTokenNum(tokMatch[3] ?? '0')
  const total = tokMatch[4] ? parseTokenNum(tokMatch[4]) : input + output
  // Group 2 = new "inline" cached format; group 5 = old end-of-line cached format
  const cached = tokMatch[2] ? parseTokenNum(tokMatch[2]) : (tokMatch[5] ? parseTokenNum(tokMatch[5]) : 0)
  const tokenUsage: TokenUsage = { input, output, cached, total }
  return { content, tokenUsage }
}

function stripAnsi(text: string): string {
  return text.replace(ANSI_PATTERN, '').trim()
}

/**
 * Builds an environment that augments PATH with common binary locations that
 * Chrome's restricted launch environment omits (Homebrew, nvm, etc.).
 */
function buildEnv(extra?: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const extraPaths = [
    '/opt/homebrew/bin',
    '/opt/homebrew/sbin',
    '/usr/local/bin',
    '/usr/local/sbin',
    '/usr/bin',
    '/bin',
    // Include the directory of the current node executable so that globally
    // installed npm binaries (e.g. @github/copilot) are always findable even
    // when Chrome launches the host with a stripped-down PATH.
    path.dirname(process.execPath),
  ]
  const current = process.env.PATH ?? ''
  const parts = current.split(':').filter(Boolean)
  for (const p of extraPaths.reverse()) {
    if (!parts.includes(p)) parts.unshift(p)
  }
  return { ...process.env, PATH: parts.join(':'), ...extra }
}

/**
 * Runs a command and returns { exitCode, stdout, stderr }.
 * Never uses a shell — args are passed as an array to prevent injection.
 */
function runCommand(
  cmd: string,
  args: string[],
  timeoutMs: number,
  env?: NodeJS.ProcessEnv,
): Promise<{ exitCode: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args, {
      shell: false,
      cwd: os.tmpdir(),
      env: buildEnv(env),
      timeout: timeoutMs,
    })

    let stdout = ''
    let stderr = ''

    proc.stdout.on('data', (chunk: Buffer) => { stdout += chunk.toString() })
    proc.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString() })

    proc.on('close', (code) => {
      resolve({ exitCode: code ?? 1, stdout, stderr })
    })

    proc.on('error', () => {
      resolve({ exitCode: 1, stdout, stderr })
    })
  })
}

/** Returns true if the standalone `copilot` CLI is available in PATH. */
export async function isCopilotCliInstalled(): Promise<boolean> {
  const result = await runCommand('copilot', ['--version'], CHECK_TIMEOUT_MS)
  return result.exitCode === 0
}

/**
 * Returns true if the Copilot CLI has a stored authentication token.
 *
 * Detection strategy (in order):
 *  1. macOS keychain — `security find-generic-password -s copilot-cli`
 *  2. Token file — `~/.copilot/token` (copilot fallback when no keychain)
 */
export async function isCopilotAuthenticated(): Promise<boolean> {
  // 1. macOS Keychain
  const keychainResult = await runCommand(
    'security',
    ['find-generic-password', '-s', 'copilot-cli'],
    CHECK_TIMEOUT_MS,
  )
  if (keychainResult.exitCode === 0) return true

  // 2. Plain-text token file (copilot fallback on Linux / headless macOS)
  const tokenFile = path.join(os.homedir(), '.copilot', 'token')
  try {
    const fs = await import('fs')
    return fs.existsSync(tokenFile)
  } catch {
    return false
  }
}

/**
 * Sends a prompt to the standalone `copilot` CLI and returns the plain-text response.
 *
 * Security notes:
 *  - The prompt is passed as a discrete argv element, never through a shell.
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
): Promise<{ ok: true; response: string; tokenUsage?: TokenUsage } | { ok: false; error: string }> {
  if (prompt.length > PROMPT_SIZE_LIMIT) {
    return { ok: false, error: `Prompt exceeds ${PROMPT_SIZE_LIMIT} character limit.` }
  }

  const env: NodeJS.ProcessEnv = {
    NO_COLOR: '1',
    TERM: 'dumb',
    // Prevent gh from launching a browser / interactive flow
    GH_PROMPT_DISABLED: '1',
  }

  const args: string[] = []
  if (sessionId) {
    args.push('--session-id', sessionId)
  }
  if (model && model !== 'auto') {
    args.push('--model', model)
  }
  if (allowedUrls && allowedUrls.length > 0) {
    for (const url of allowedUrls) {
      args.push(`--allow-url=${url}`)
    }
  }
  args.push('-p', prompt)

  const result = await runCommand('copilot', args, COPILOT_TIMEOUT_MS, env)

  if (result.exitCode !== 0) {
    // Try to recover a response from stdout even on non-zero exit —
    // copilot sometimes exits with code 1 on warnings while still producing output.
    const recoveredContent = stripAnsi(result.stdout).trim()
    if (recoveredContent) {
      const recStderr = (result.stderr || '').replace(ANSI_PATTERN, '')
      const recFooter = parseFooter(recStderr || recoveredContent)
      const recFinal = recFooter.tokenUsage
        ? recoveredContent + TOKEN_LINE_MARKER + formatTokenUsage(recFooter.tokenUsage)
        : recoveredContent
      return { ok: true, response: recFinal, tokenUsage: recFooter.tokenUsage }
    }
    // No recoverable content — report a clean error without leaking the raw footer.
    const rawErr = parseFooter(stripAnsi(result.stderr || result.stdout || '')).content.trim()
    const errText = rawErr || 'copilot did not return a response (exit code ' + result.exitCode + ')'
    return { ok: false, error: errText }
  }

  // When stdout is a pipe (non-TTY) copilot writes the stats footer to stderr.
  // Use stdout for the response content; parse stderr for token usage.
  // Note: do NOT trim stderr — parseFooter needs the leading \n before "Changes".
  const stdoutContent = stripAnsi(result.stdout).trim()
  if (!stdoutContent) {
    return { ok: false, error: 'copilot returned an empty response' }
  }

  const stderrClean = (result.stderr || '').replace(ANSI_PATTERN, '')
  const footerParsed = parseFooter(stderrClean || stdoutContent)
  const tokenUsage = footerParsed.tokenUsage

  const finalContent = tokenUsage
    ? stdoutContent + TOKEN_LINE_MARKER + formatTokenUsage(tokenUsage)
    : stdoutContent
  return { ok: true, response: finalContent, tokenUsage }
}
