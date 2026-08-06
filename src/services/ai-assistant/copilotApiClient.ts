// Copilot CLI model list — PAT / GitHub Models API has been removed.

export interface ModelOption {
  key: string
  text: string
}

/**
 * Model list for the Copilot CLI backend.
 * Keys are the identifiers passed to `copilot --model`.
 * 'auto' means no --model flag — copilot picks based on the task.
 */
// Model list as reported by Copilot CLI 1.0.78 (2026-08-06).
export const COPILOT_CLI_MODELS: ModelOption[] = [
  { key: 'auto',                    text: 'Auto (default)' },
  { key: 'claude-sonnet-5',         text: 'Claude Sonnet 5' },
  { key: 'claude-fable-5',          text: 'Claude Fable 5' },
  { key: 'claude-sonnet-4.6',       text: 'Claude Sonnet 4.6' },
  { key: 'claude-sonnet-4.5',       text: 'Claude Sonnet 4.5' },
  { key: 'claude-haiku-4.5',        text: 'Claude Haiku 4.5' },
  { key: 'claude-opus-5',           text: 'Claude Opus 5 (premium)' },
  { key: 'claude-opus-4.8',         text: 'Claude Opus 4.8 (premium)' },
  { key: 'claude-opus-4.8-fast',    text: 'Claude Opus 4.8 Fast (premium)' },
  { key: 'claude-opus-4.7',         text: 'Claude Opus 4.7 (premium)' },
  { key: 'claude-opus-4.6',         text: 'Claude Opus 4.6 (premium)' },
  { key: 'claude-opus-4.5',         text: 'Claude Opus 4.5 (premium)' },
  { key: 'gpt-5.6-sol',             text: 'GPT-5.6 Sol' },
  { key: 'gpt-5.6-terra',           text: 'GPT-5.6 Terra' },
  { key: 'gpt-5.6-luna',            text: 'GPT-5.6 Luna' },
  { key: 'gpt-5.5',                 text: 'GPT-5.5' },
  { key: 'gpt-5.4',                 text: 'GPT-5.4' },
  { key: 'gpt-5.3-codex',           text: 'GPT-5.3-Codex' },
  { key: 'gpt-5.4-mini',            text: 'GPT-5.4 mini' },
  { key: 'gpt-5-mini',              text: 'GPT-5 mini' },
  { key: 'mai-code-1-flash-picker', text: 'MAI-Code-1-Flash' },
  { key: 'gemini-3.1-pro-preview',  text: 'Gemini 3.1 Pro (preview)' },
  { key: 'gemini-3.6-flash',        text: 'Gemini 3.6 Flash' },
  { key: 'gemini-3.5-flash',        text: 'Gemini 3.5 Flash' },
  { key: 'grok-4.5',                text: 'Grok 4.5' },
  { key: 'kimi-k2.7-code',          text: 'Kimi K2.7 Code' },
]

export const DEFAULT_CLI_MODEL = 'auto'
