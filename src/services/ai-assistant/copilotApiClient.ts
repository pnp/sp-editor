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
export const COPILOT_CLI_MODELS: ModelOption[] = [
  { key: 'auto',               text: 'Auto (default)' },
  { key: 'gpt-5.5',            text: 'GPT-5.5 (premium)' },
  { key: 'gpt-5.4',            text: 'GPT-5.4' },
  { key: 'gpt-5.3-codex',      text: 'GPT-5.3-Codex' },
  { key: 'gpt-5.2-codex',      text: 'GPT-5.2-Codex' },
  { key: 'gpt-5.2',            text: 'GPT-5.2' },
  { key: 'gpt-5.4-mini',       text: 'GPT-5.4 mini' },
  { key: 'gpt-5-mini',         text: 'GPT-5 mini' },
  { key: 'gpt-4.1',            text: 'GPT-4.1' },
  { key: 'claude-opus-4.8',    text: 'Claude Opus 4.8 (premium)' },
  { key: 'claude-opus-4.7',    text: 'Claude Opus 4.7 (premium)' },
  { key: 'claude-sonnet-4.6',  text: 'Claude Sonnet 4.6' },
  { key: 'claude-sonnet-4.5',  text: 'Claude Sonnet 4.5' },
  { key: 'claude-haiku-4.5',   text: 'Claude Haiku 4.5' },
]

export const DEFAULT_CLI_MODEL = 'auto'
