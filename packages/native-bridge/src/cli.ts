// Shared helpers for spawning AI CLIs (Copilot CLI, Claude Code) from the bridge.
import { spawn } from 'child_process'
import os from 'os'
import path from 'path'

export interface TokenUsage {
  input: number
  output: number
  cached: number
  total: number
}

export interface ResponseMeta {
  aiCredits?: number
  elapsedSeconds?: number
  modelLabel?: string
  modelId?: string
}

/** Unique marker appended to response content so the UI can render token stats
 *  without relying on a separate Redux field surviving the full message chain. */
export const TOKEN_LINE_MARKER = '\n\n%%SP_TOKENS%%'

export function formatTokenUsage(t: TokenUsage): string {
  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
  let line = `↑${fmt(t.input)} in · ↓${fmt(t.output)} out`
  if (t.cached > 0) line += ` · ~${fmt(t.cached)} cached`
  return line
}

/**
 * Builds an environment that augments PATH with common binary locations that
 * Chrome's restricted launch environment omits (Homebrew, nvm, npm global, etc.).
 */
export function buildEnv(extra?: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const isWindows = os.platform() === 'win32'
  const pathSep = isWindows ? ';' : ':'

  const unixPaths = [
    '/opt/homebrew/bin',
    '/opt/homebrew/sbin',
    '/usr/local/bin',
    '/usr/local/sbin',
    '/usr/bin',
    '/bin',
    // Claude Code native installer locations.
    path.join(os.homedir(), '.local', 'bin'),
    path.join(os.homedir(), '.claude', 'local'),
  ]

  // Windows: npm global installs land in %APPDATA%\npm or the Node.js install dir.
  const windowsPaths = [
    process.env.APPDATA ? path.join(process.env.APPDATA, 'npm') : '',
    process.env.ProgramFiles ? path.join(process.env.ProgramFiles, 'nodejs') : '',
    process.env['ProgramFiles(x86)'] ? path.join(process.env['ProgramFiles(x86)'], 'nodejs') : '',
    // Claude Code native installer location.
    path.join(os.homedir(), '.local', 'bin'),
  ].filter(Boolean)

  const extraPaths = [
    ...(isWindows ? windowsPaths : unixPaths),
    // Always include the directory of the current node executable — globally
    // installed npm binaries live alongside it regardless of platform.
    path.dirname(process.execPath),
  ]

  const current = process.env.PATH ?? (isWindows ? process.env.Path ?? '' : '')
  const parts = current.split(pathSep).filter(Boolean)
  for (const p of extraPaths.reverse()) {
    if (p && !parts.includes(p)) parts.unshift(p)
  }
  return { ...process.env, PATH: parts.join(pathSep), ...extra }
}

/**
 * Runs a command and returns { exitCode, stdout, stderr }.
 * Never uses a shell — args are passed as an array to prevent injection.
 * On Windows, npm global binaries are .cmd wrappers; shell: true is required
 * to execute them, but we keep args as a discrete array to prevent injection.
 */
export function runCommand(
  cmd: string,
  args: string[],
  timeoutMs: number,
  env?: NodeJS.ProcessEnv,
  stdinData?: string,
): Promise<{ exitCode: number; stdout: string; stderr: string }> {
  const isWindows = os.platform() === 'win32'
  return new Promise((resolve) => {
    // With shell: true Node joins argv with spaces, so arguments that contain
    // spaces or cmd.exe metacharacters (e.g. "WebFetch(domain:x)") are quoted.
    const finalArgs = isWindows
      ? args.map((a) => (/[\s()&|<>^]/.test(a) ? `"${a.replace(/"/g, '')}"` : a))
      : args
    const proc = spawn(cmd, finalArgs, {
      // Windows npm binaries are .cmd files and require shell: true to execute.
      // On Unix we keep shell: false for security. Args are always a discrete
      // array (never interpolated) so injection is not possible either way.
      shell: isWindows,
      cwd: os.tmpdir(),
      env: buildEnv(env),
      timeout: timeoutMs,
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    let stdout = ''
    let stderr = ''

    proc.stdout!.on('data', (chunk: Buffer) => { stdout += chunk.toString() })
    proc.stderr!.on('data', (chunk: Buffer) => { stderr += chunk.toString() })

    proc.on('close', (code) => {
      resolve({ exitCode: code ?? 1, stdout, stderr })
    })

    proc.on('error', () => {
      resolve({ exitCode: 1, stdout, stderr })
    })

    if (proc.stdin) {
      if (stdinData !== undefined) {
        proc.stdin.write(stdinData)
      }
      proc.stdin.end()
    }
  })
}
