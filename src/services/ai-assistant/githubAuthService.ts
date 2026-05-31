/**
 * GitHub Personal Access Token (fine-grained) storage and validation.
 *
 * The GitHub Models API requires a fine-grained PAT with `models:read` permission.
 * Classic OAuth tokens and OAuth App tokens do NOT support this scope.
 *
 * Users create a token at:
 *   https://github.com/settings/tokens?type=beta
 *   -> "New fine-grained personal access token"
 *   -> Repository access: Public repositories (read-only) or None
 *   -> Permissions -> Account permissions -> Models: Read
 *
 * Token is stored in chrome.storage.local (extension-scoped, per-user).
 */

const GITHUB_USER_URL = 'https://api.github.com/user'
const GITHUB_MODELS_TEST_URL = 'https://models.github.ai/inference/chat/completions'

const STORAGE_KEY_PAT = 'ai_github_pat'
const STORAGE_KEY_GITHUB_LOGIN = 'ai_github_login'

// --- Storage helpers ---------------------------------------------------------

async function storageGet(key: string): Promise<string | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key] ?? null)
    })
  })
}

async function storageSet(key: string, value: string): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, resolve)
  })
}

async function storageRemove(keys: string[]): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.remove(keys, resolve)
  })
}

// --- PAT management ----------------------------------------------------------

/** Returns the stored PAT, or null if not set. */
export async function getPat(): Promise<string | null> {
  return storageGet(STORAGE_KEY_PAT)
}

/**
 * Saves the PAT and validates it by:
 *  1. Calling the GitHub user endpoint (confirms it is a valid GitHub token).
 *  2. Making a minimal inference call (confirms models:read permission).
 *
 * @throws Error with a user-facing message if the token is invalid or
 *         lacks the required `models:read` permission.
 * @returns The GitHub login name of the authenticated user.
 */
export async function saveAndValidatePat(token: string): Promise<string> {
  const trimmed = token.trim()
  if (!trimmed) throw new Error('Token cannot be empty.')

  // 1. Verify the token is a valid GitHub token
  const userRes = await fetch(GITHUB_USER_URL, {
    headers: {
      Authorization: `Bearer ${trimmed}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (userRes.status === 401) throw new Error('Invalid token — GitHub rejected it.')
  if (!userRes.ok) throw new Error(`GitHub API error: ${userRes.status}`)

  const user = await userRes.json()
  const login: string = user.login ?? 'unknown'

  // 2. Verify the token has models:read by making a minimal inference call
  const modelsRes = await fetch(GITHUB_MODELS_TEST_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${trimmed}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4.1-nano',
      messages: [{ role: 'user', content: 'hi' }],
      max_tokens: 1,
    }),
  })

  if (modelsRes.status === 401 || modelsRes.status === 403) {
    throw new Error(
      "Token is valid but lacks the 'models:read' permission. " +
        'Create a fine-grained PAT with Models -> Read access at github.com/settings/tokens?type=beta',
    )
  }

  // Other 4xx = also a failure
  if (modelsRes.status >= 400 && modelsRes.status < 500) {
    throw new Error(`Models API rejected the token (HTTP ${modelsRes.status}).`)
  }

  // 5xx = server error; we still accept the token (API may be temporarily down)
  await Promise.all([
    storageSet(STORAGE_KEY_PAT, trimmed),
    storageSet(STORAGE_KEY_GITHUB_LOGIN, login),
  ])

  return login
}

/** Returns true if a PAT is currently stored. */
export async function isSignedIn(): Promise<boolean> {
  const token = await storageGet(STORAGE_KEY_PAT)
  return token !== null
}

/** Returns the cached GitHub login name, or null. */
export async function getGithubLogin(): Promise<string | null> {
  return storageGet(STORAGE_KEY_GITHUB_LOGIN)
}

/** Clears the stored PAT and login. */
export async function signOut(): Promise<void> {
  await storageRemove([STORAGE_KEY_PAT, STORAGE_KEY_GITHUB_LOGIN])
}
