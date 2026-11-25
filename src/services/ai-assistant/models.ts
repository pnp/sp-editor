// Model registry for all AI providers reachable through the native bridge.
//
// - GitHub Copilot: the model ids come from the installed Copilot CLI (the bridge
//   reads them from `copilot help config`). When they are not available (old
//   bridge or CLI), only "Auto" is offered — no hardcoded list that goes stale.
// - Claude Code: family aliases ('sonnet', 'opus', ...) that Claude Code always
//   resolves to the newest model, so this short list does not go stale.

import { DEFAULT_CLI_MODEL, ModelOption } from './copilotApiClient'

export type AiProviderId = 'github-copilot' | 'claude-code'

/** Prefix that marks a model key as belonging to Claude Code. Copilot keys stay
 *  unprefixed so model selections saved before Claude Code support keep working. */
const CLAUDE_CODE_PREFIX = 'claude-code:'

/** Oldest bridge version that reports its version, the Copilot model list and
 *  outdated CLIs. Older bridges get an "update the bridge" notice. */
export const MIN_BRIDGE_VERSION = '1.3.0'

export const CLAUDE_CODE_MODELS: ModelOption[] = [
  { key: `${CLAUDE_CODE_PREFIX}default`, text: 'Default (Claude Code)' },
  { key: `${CLAUDE_CODE_PREFIX}fable`,   text: 'Claude Fable (latest)' },
  { key: `${CLAUDE_CODE_PREFIX}opus`,    text: 'Claude Opus (latest)' },
  { key: `${CLAUDE_CODE_PREFIX}sonnet`,  text: 'Claude Sonnet (latest)' },
  { key: `${CLAUDE_CODE_PREFIX}haiku`,   text: 'Claude Haiku (latest)' },
]

export interface AiProviderInfo {
  id: AiProviderId
  name: string
  defaultModel: string
}

export const AI_PROVIDERS: AiProviderInfo[] = [
  { id: 'github-copilot', name: 'GitHub Copilot', defaultModel: DEFAULT_CLI_MODEL },
  { id: 'claude-code',    name: 'Claude Code',    defaultModel: `${CLAUDE_CODE_PREFIX}default` },
]

const UPPERCASE_FAMILIES: Record<string, string> = { gpt: 'GPT', mai: 'MAI' }

const capitalize = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)

/**
 * Readable name for a Copilot CLI model id:
 *   claude-opus-4.8-fast → "Claude Opus 4.8 Fast", gpt-6.2-sol → "GPT-6.2 Sol",
 *   gpt-5.3-codex → "GPT-5.3 Codex", mai-code-1.1-flash → "MAI Code 1.1 Flash".
 */
export function copilotModelLabel(id: string): string {
  if (id === DEFAULT_CLI_MODEL) return 'Auto (default)'
  const [family, ...parts] = id.split('-')
  // Anthropic-style ids split versions with dashes ("claude-haiku-5-5" → 5.5)
  // and may end in a date stamp ("-20250929"), which is dropped.
  const rest: string[] = []
  for (const part of parts) {
    if (/^\d{8}$/.test(part)) continue
    const prev = rest[rest.length - 1]
    if (/^\d+$/.test(part) && prev !== undefined && /^\d+(\.\d+)*$/.test(prev)) {
      rest[rest.length - 1] = `${prev}.${part}`
    } else {
      rest.push(part)
    }
  }
  const familyLabel = UPPERCASE_FAMILIES[family.toLowerCase()] ?? capitalize(family)
  if (familyLabel === 'GPT' && rest.length > 0 && /^\d/.test(rest[0])) {
    return [`GPT-${rest[0]}`, ...rest.slice(1).map(capitalize)].join(' ')
  }
  return [familyLabel, ...rest.map(capitalize)].join(' ')
}

/** Copilot picker options: "Auto" plus the ids reported by the CLI (null = unknown). */
export function copilotModelOptions(copilotModels: string[] | null): ModelOption[] {
  const ids = (copilotModels ?? []).filter((id) => id !== DEFAULT_CLI_MODEL)
  return [
    { key: DEFAULT_CLI_MODEL, text: copilotModelLabel(DEFAULT_CLI_MODEL) },
    ...ids.map((id) => ({ key: id, text: copilotModelLabel(id) })),
  ]
}

export const getModelProvider = (modelKey: string): AiProviderId =>
  modelKey.startsWith(CLAUDE_CODE_PREFIX) ? 'claude-code' : 'github-copilot'

/** The identifier the provider's CLI expects (the key without the provider prefix). */
export const toCliModel = (modelKey: string): string =>
  modelKey.startsWith(CLAUDE_CODE_PREFIX) ? modelKey.slice(CLAUDE_CODE_PREFIX.length) : modelKey

/** True if the model can currently be selected for its provider. */
export function isModelAvailable(modelKey: string, copilotModels: string[] | null): boolean {
  if (getModelProvider(modelKey) === 'claude-code') {
    return CLAUDE_CODE_MODELS.some((m) => m.key === modelKey)
  }
  return modelKey === DEFAULT_CLI_MODEL || (copilotModels ?? []).includes(modelKey)
}

/** Display name for any model key (picker key or a model id reported by a CLI). */
export function modelDisplayName(model: string): string {
  const claude = CLAUDE_CODE_MODELS.find((m) => m.key.toLowerCase() === model.toLowerCase())
  if (claude) return claude.text.replace(/\s*\([^)]*\)\s*$/, '')
  // Model ids reported by the CLIs, e.g. "claude-sonnet-5.5" or "gpt-6.2-sol".
  if (model.includes('-') && /^[a-z][a-z0-9.-]*$/i.test(model)) return copilotModelLabel(model)
  return model
}

/** Compares dotted versions ("1.3.0"); returns true if a < b. */
export function isVersionLower(a: string, b: string): boolean {
  const pa = a.split('.').map((n) => Number.parseInt(n, 10) || 0)
  const pb = b.split('.').map((n) => Number.parseInt(n, 10) || 0)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const x = pa[i] ?? 0
    const y = pb[i] ?? 0
    if (x !== y) return x < y
  }
  return false
}

/** True when the bridge is missing version info (pre-1.3.0) or older than MIN_BRIDGE_VERSION. */
export const isBridgeOutdated = (bridgeVersion: string | null): boolean =>
  !bridgeVersion || isVersionLower(bridgeVersion, MIN_BRIDGE_VERSION)
