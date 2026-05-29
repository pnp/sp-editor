// Resolves the AI backend base URL.
//
// The URL must be supplied via the REACT_APP_AI_BACKEND_URL environment
// variable. CRA reads env files in this order:
//   - .env.development   (used by `npm start`)
//   - .env.production    (used by `npm run build`)
//   - .env               (shared defaults; intentionally NOT used for the URL)
//
// If the variable is missing, we throw at first use so misconfiguration is
// loud and obvious instead of silently pointing at the wrong host.

const raw = process.env.REACT_APP_AI_BACKEND_URL?.trim()

if (!raw) {
  // eslint-disable-next-line no-console
  console.error(
    '[SP Editor] REACT_APP_AI_BACKEND_URL is not set. ' +
      'Configure it in .env.development (local dev) or .env.production (release build).',
  )
}

export const AI_BACKEND_URL: string = (raw || '').replace(/\/+$/, '')

export function requireBackendUrl(): string {
  if (!AI_BACKEND_URL) {
    throw new Error(
      'AI backend URL is not configured. Set REACT_APP_AI_BACKEND_URL in your env file.',
    )
  }
  return AI_BACKEND_URL
}
