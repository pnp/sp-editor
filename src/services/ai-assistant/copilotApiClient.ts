// Copilot CLI model defaults. The model list itself is read from the installed
// Copilot CLI by the native bridge (see models.ts) — it is not hardcoded here.

export interface ModelOption {
  key: string
  text: string
}

/** 'auto' means no --model flag — copilot picks the model. Always available. */
export const DEFAULT_CLI_MODEL = 'auto'
