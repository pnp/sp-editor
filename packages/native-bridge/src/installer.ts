import fs from 'fs'
import path from 'path'
import os from 'os'
import { execSync } from 'child_process'
import { BRIDGE_NAME, DEFAULT_EXTENSION_IDS } from './protocol'

const MANIFEST_FILENAME = `${BRIDGE_NAME}.json`

interface ManifestJson {
  name: string
  description: string
  path: string
  type: 'stdio'
  allowed_origins: string[]
}

function buildManifest(hostExecutablePath: string): ManifestJson {
  return {
    name: BRIDGE_NAME,
    description: 'SP Editor native messaging bridge for GitHub Copilot CLI',
    path: hostExecutablePath,
    type: 'stdio',
    allowed_origins: DEFAULT_EXTENSION_IDS.map(id => `chrome-extension://${id}/`),
  }
}

/** Returns the absolute path to the compiled host.js in this package. */
function getHostJsPath(): string {
  // __dirname = packages/native-bridge/dist (after compilation)
  // or packages/native-bridge/src (when run directly with ts-node)
  const base = __dirname
  return path.resolve(base, 'host.js')
}

// ── Platform-specific manifest paths ────────────────────────────────────────

function getMacOSManifestPaths(): string[] {
  const home = os.homedir()
  return [
    path.join(home, 'Library', 'Application Support', 'Google', 'Chrome', 'NativeMessagingHosts'),
    path.join(home, 'Library', 'Application Support', 'Microsoft Edge', 'NativeMessagingHosts'),
    path.join(home, 'Library', 'Application Support', 'Chromium', 'NativeMessagingHosts'),
  ]
}

function getLinuxManifestPaths(): string[] {
  const home = os.homedir()
  return [
    path.join(home, '.config', 'google-chrome', 'NativeMessagingHosts'),
    path.join(home, '.config', 'google-chrome-beta', 'NativeMessagingHosts'),
    path.join(home, '.config', 'chromium', 'NativeMessagingHosts'),
    path.join(home, '.config', 'microsoft-edge', 'NativeMessagingHosts'),
    path.join(home, '.config', 'microsoft-edge-beta', 'NativeMessagingHosts'),
  ]
}

/** On Windows, native messaging is registered via the registry. */
function getWindowsRegistryKeys(): string[] {
  return [
    `HKCU\\Software\\Google\\Chrome\\NativeMessagingHosts\\${BRIDGE_NAME}`,
    `HKCU\\Software\\Microsoft\\Edge\\NativeMessagingHosts\\${BRIDGE_NAME}`,
  ]
}

/** Returns path to the bridge data directory (~/.sp-editor-bridge). */
function getBridgeDataDir(): string {
  if (process.platform === 'win32') {
    return path.join(os.homedir(), 'AppData', 'Roaming', 'sp-editor-bridge')
  }
  return path.join(os.homedir(), '.sp-editor-bridge')
}

// ── Install / Uninstall ──────────────────────────────────────────────────────

export interface InstallOptions {
  /** Override the extension ID (for dev / sideloaded builds). */
  extensionId?: string
  verbose?: boolean
}

export function install(opts: InstallOptions = {}): void {
  const { extensionId, verbose } = opts
  const log = verbose ? console.log : () => {}

  const hostJsPath = getHostJsPath()
  if (!fs.existsSync(hostJsPath)) {
    throw new Error(
      `Cannot find compiled host.js at ${hostJsPath}. Run 'npm run build' first.`,
    )
  }

  if (process.platform === 'win32') {
    installWindows(hostJsPath, extensionId, log)
  } else {
    installUnix(extensionId, log)
  }

  console.log(`\n✓ SP Editor native bridge installed successfully.`)
  console.log(`  Bridge: ${BRIDGE_NAME}`)
  if (extensionId) {
    console.log(`  Extension ID: ${extensionId}`)
  }
}

function installUnix(
  extensionId: string | undefined,
  log: (msg: string) => void,
): void {
  // Find the sp-editor-bridge-host.js path
  const hostBinPath = resolveHostBinPath()
  log(`Host JS: ${hostBinPath}`)

  // Chrome spawns native hosts with a minimal PATH (no nvm, homebrew, etc.).
  // We must resolve the absolute node executable now and write a sh wrapper
  // that invokes node directly, so the host can always be found.
  const nodeExec = resolveNodeExecutable()
  log(`Node: ${nodeExec}`)

  // Write wrapper to ~/.sp-editor-bridge/sp-editor-bridge-host.sh
  const dataDir = getBridgeDataDir()
  fs.mkdirSync(dataDir, { recursive: true })
  const wrapperPath = path.join(dataDir, 'sp-editor-bridge-host.sh')
  const wrapperContent = `#!/bin/sh\nexec "${nodeExec}" "${hostBinPath}" "$@"\n`
  fs.writeFileSync(wrapperPath, wrapperContent, 'utf8')
  fs.chmodSync(wrapperPath, 0o755)
  log(`  Wrote wrapper → ${wrapperPath}`)

  const manifest = buildManifest(wrapperPath)
  if (extensionId) {
    manifest.allowed_origins = [`chrome-extension://${extensionId}/`]
  }

  const manifestJson = JSON.stringify(manifest, null, 2)
  const manifestPaths =
    process.platform === 'darwin' ? getMacOSManifestPaths() : getLinuxManifestPaths()

  for (const dir of manifestPaths) {
    try {
      fs.mkdirSync(dir, { recursive: true })
      const dest = path.join(dir, MANIFEST_FILENAME)
      fs.writeFileSync(dest, manifestJson, 'utf8')
      log(`  Wrote manifest → ${dest}`)
    } catch (err) {
      log(`  Skipped ${dir}: ${(err as Error).message}`)
    }
  }
}

function resolveNodeExecutable(): string {
  // 1. Use the node that's running this installer — it's definitely available.
  if (process.execPath && fs.existsSync(process.execPath)) {
    return process.execPath
  }
  // 2. Fall back to searching common static paths
  const candidates = [
    '/opt/homebrew/bin/node',
    '/usr/local/bin/node',
    '/usr/bin/node',
  ]
  for (const p of candidates) {
    if (fs.existsSync(p)) return p
  }
  throw new Error('Cannot locate node executable. Make sure Node.js is installed.')
}

function installWindows(
  hostJsPath: string,
  extensionId: string | undefined,
  log: (msg: string) => void,
): void {
  const dataDir = getBridgeDataDir()
  fs.mkdirSync(dataDir, { recursive: true })

  // Write a .bat wrapper that calls node with our host script
  const batPath = path.join(dataDir, 'sp-editor-bridge-host.bat')
  const batContent = `@echo off\nnode "${hostJsPath}" %*\n`
  fs.writeFileSync(batPath, batContent, 'utf8')
  log(`  Wrote host wrapper → ${batPath}`)

  // Write the manifest JSON
  const manifest = buildManifest(batPath)
  if (extensionId) {
    manifest.allowed_origins = [`chrome-extension://${extensionId}/`]
  }

  const manifestPath = path.join(dataDir, MANIFEST_FILENAME)
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8')
  log(`  Wrote manifest → ${manifestPath}`)

  // Register in the Windows registry for Chrome and Edge
  for (const regKey of getWindowsRegistryKeys()) {
    try {
      execSync(`reg add "${regKey}" /ve /d "${manifestPath}" /f`, { stdio: 'pipe' })
      log(`  Registry → ${regKey}`)
    } catch (err) {
      log(`  Warning: could not write registry key ${regKey}: ${(err as Error).message}`)
    }
  }
}

export function uninstall(): void {
  if (process.platform === 'win32') {
    uninstallWindows()
  } else {
    uninstallUnix()
  }
  console.log('✓ SP Editor native bridge uninstalled.')
}

function uninstallUnix(): void {
  const dirs =
    process.platform === 'darwin' ? getMacOSManifestPaths() : getLinuxManifestPaths()
  for (const dir of dirs) {
    const f = path.join(dir, MANIFEST_FILENAME)
    if (fs.existsSync(f)) {
      fs.rmSync(f)
      console.log(`  Removed ${f}`)
    }
  }
}

function uninstallWindows(): void {
  const dataDir = getBridgeDataDir()

  // Remove registry keys
  for (const regKey of getWindowsRegistryKeys()) {
    try {
      execSync(`reg delete "${regKey}" /f`, { stdio: 'pipe' })
      console.log(`  Registry removed: ${regKey}`)
    } catch {
      // Key may not exist
    }
  }

  // Remove data dir
  if (fs.existsSync(dataDir)) {
    fs.rmSync(dataDir, { recursive: true })
    console.log(`  Removed ${dataDir}`)
  }
}

export function status(): void {
  console.log(`Bridge name: ${BRIDGE_NAME}`)
  if (process.platform === 'win32') {
    statusWindows()
  } else {
    statusUnix()
  }
}

function statusUnix(): void {
  const dirs =
    process.platform === 'darwin' ? getMacOSManifestPaths() : getLinuxManifestPaths()
  let found = false
  for (const dir of dirs) {
    const f = path.join(dir, MANIFEST_FILENAME)
    if (fs.existsSync(f)) {
      console.log(`  ✓ ${f}`)
      found = true
    } else {
      console.log(`  ✗ ${f}`)
    }
  }
  if (!found) {
    console.log('\nNot installed. Run: sp-editor-bridge install')
  }
}

function statusWindows(): void {
  const dataDir = getBridgeDataDir()
  const manifestPath = path.join(dataDir, MANIFEST_FILENAME)
  console.log(`  Manifest: ${fs.existsSync(manifestPath) ? '✓' : '✗'} ${manifestPath}`)

  for (const regKey of getWindowsRegistryKeys()) {
    try {
      execSync(`reg query "${regKey}"`, { stdio: 'pipe' })
      console.log(`  Registry: ✓ ${regKey}`)
    } catch {
      console.log(`  Registry: ✗ ${regKey}`)
    }
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Resolves the absolute path to `sp-editor-bridge-host.js`.
 * Works whether running from source (ts-node) or from compiled dist via npm bin.
 */
function resolveHostBinPath(): string {
  // process.argv[1] is the CLI script (sp-editor-bridge.js)
  // After compilation the layout is:
  //   packages/native-bridge/
  //     bin/sp-editor-bridge.js
  //     bin/sp-editor-bridge-host.js  ← what we want
  //     dist/*.js
  try {
    const realCli = fs.realpathSync(process.argv[1])
    const binDir = path.dirname(realCli)
    const hostPath = path.join(binDir, 'sp-editor-bridge-host.js')
    if (fs.existsSync(hostPath)) {
      return hostPath
    }
  } catch {
    // Fall through to fallback
  }

  // Fallback: try which/where
  try {
    const which = process.platform === 'win32' ? 'where' : 'which'
    const result = execSync(`${which} sp-editor-bridge-host`, { encoding: 'utf8' })
    const line = result.trim().split('\n')[0]
    if (line) return line.trim()
  } catch {
    // Ignore
  }

  throw new Error(
    'Cannot locate sp-editor-bridge-host. ' +
      'Make sure you installed the package globally: npm install -g @sp-editor/native-bridge',
  )
}
