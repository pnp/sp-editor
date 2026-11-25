/**
 * Chrome Native Messaging host — stdin/stdout length-prefixed JSON loop.
 *
 * Chrome spawns this process directly. It sends messages as:
 *   [4 bytes little-endian length][UTF-8 JSON]
 * And expects responses in the same format.
 *
 * Security:
 *  - Only the browser extensions listed in the registered manifest can connect.
 *  - Only a hard-coded whitelist of message types is accepted.
 *  - Oversized payloads are rejected before any CLI is started.
 *  - The prompt is passed to the CLI via stdin, never on the command line.
 *  - Model and session id are validated against strict character sets, and the
 *    fetchable documentation URLs are a fixed list in the bridge. This matters on
 *    Windows, where the CLI is started through cmd.exe; on macOS/Linux no shell
 *    is used at all.
 *  - The CLIs get no shell, file or edit tools — only web fetch for the docs URLs.
 *  - Content (prompts / responses) is never written to any log.
 */

import fs from 'fs'
import path from 'path'
import { isClaudeAuthenticated, isClaudeCliInstalled, isClaudeCliSupported, runClaudePrompt } from './claude'
import { isCopilotAuthenticated, isCopilotCliInstalled, listCopilotModels, runCopilotPrompt } from './copilot'
import {
  AiCompleteRequest,
  BridgeResponse,
  CliProviderStatus,
  PROMPT_SIZE_LIMIT,
} from './protocol'

/** Version from the bridge's package.json (dist/host.js → ../package.json). */
function readBridgeVersion(): string | undefined {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'))
    return typeof pkg.version === 'string' ? pkg.version : undefined
  } catch {
    return undefined
  }
}

const BRIDGE_VERSION = readBridgeVersion()

// ── Input validation ─────────────────────────────────────────────────────────
// Values below end up on the CLI command line. On Windows the CLI is started
// through cmd.exe (npm installs .cmd launchers), so anything outside these
// strict character sets is rejected instead of being escaped.

/** Model ids/aliases: "gpt-6.2-sol", "claude-opus-4.8-fast", "sonnet". */
const MODEL_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,63}$/

/** Session ids: UUIDs (or the panel's fallback id), letters, digits and dashes only. */
const SESSION_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-]{7,63}$/

/**
 * The only documentation URLs the CLIs may fetch. Fixed in the bridge: URLs the
 * extension sends are kept only if they are on this list, so a message can
 * never widen what the AI is allowed to fetch.
 */
const ALLOWED_DOC_URLS = new Set(['https://learn.microsoft.com/*', 'https://pnp.github.io/*'])

async function copilotStatus(): Promise<CliProviderStatus> {
  if (!(await isCopilotCliInstalled())) return { installed: false, authenticated: false }
  const [authenticated, models] = await Promise.all([isCopilotAuthenticated(), listCopilotModels()])
  return { installed: true, authenticated, ...(models ? { models } : {}) }
}

async function claudeStatus(): Promise<CliProviderStatus> {
  if (!(await isClaudeCliInstalled())) return { installed: false, authenticated: false }
  if (!(await isClaudeCliSupported())) return { installed: true, authenticated: false, outdated: true }
  return { installed: true, authenticated: await isClaudeAuthenticated() }
}

// ── I/O helpers ──────────────────────────────────────────────────────────────

function sendMessage(obj: BridgeResponse): void {
  const json = JSON.stringify(obj)
  const encoded = Buffer.from(json, 'utf8')
  const lenBuf = Buffer.alloc(4)
  lenBuf.writeUInt32LE(encoded.length, 0)  // byte length, not char length
  process.stdout.write(lenBuf)
  process.stdout.write(encoded)
}

function errorResponse(error: string): BridgeResponse {
  return { ok: false, error }
}

// ── Message routing ──────────────────────────────────────────────────────────

async function handleMessage(raw: unknown): Promise<void> {
  if (!raw || typeof raw !== 'object') {
    sendMessage(errorResponse('invalid_message'))
    return
  }

  const msg = raw as Record<string, unknown>
  const type = msg['type']

  if (type === 'ping') {
    sendMessage({ ok: true })
    return
  }

  if (type === 'providers.status') {
    const [copilot, claude] = await Promise.all([copilotStatus(), claudeStatus()])
    sendMessage({
      ok: true,
      ...(BRIDGE_VERSION ? { bridgeVersion: BRIDGE_VERSION } : {}),
      providers: {
        'github-copilot': copilot,
        'claude-code': claude,
      },
    })
    return
  }

  if (type === 'ai.complete') {
    const req = msg as unknown as AiCompleteRequest

    if (req.provider !== 'github-copilot' && req.provider !== 'claude-code') {
      sendMessage(errorResponse(`unknown_provider: ${req.provider}`))
      return
    }

    const { prompt = '', sessionId, model, allowedUrls, resume } = req.payload ?? {}

    if (typeof prompt !== 'string') {
      sendMessage(errorResponse('payload_type_error'))
      return
    }

    if (prompt.length > PROMPT_SIZE_LIMIT) {
      sendMessage(errorResponse(`prompt_too_large: ${prompt.length} > ${PROMPT_SIZE_LIMIT}`))
      return
    }

    if (sessionId !== undefined && (typeof sessionId !== 'string' || !SESSION_ID_PATTERN.test(sessionId))) {
      sendMessage(errorResponse('invalid_session_id'))
      return
    }

    if (model !== undefined && (typeof model !== 'string' || !MODEL_PATTERN.test(model))) {
      sendMessage(errorResponse('invalid_model'))
      return
    }

    const safeSessionId = sessionId
    const safeModel = model
    const safeUrls = Array.isArray(allowedUrls)
      ? (allowedUrls as unknown[]).filter((u): u is string => typeof u === 'string' && ALLOWED_DOC_URLS.has(u))
      : undefined

    const result = req.provider === 'claude-code'
      ? await runClaudePrompt(prompt, safeSessionId, safeModel, safeUrls, resume === true)
      : await runCopilotPrompt(prompt, safeSessionId, safeModel, safeUrls)
    sendMessage(result.ok
      ? { ok: true, response: result.response, tokenUsage: result.tokenUsage, responseMeta: result.responseMeta }
      : errorResponse(result.error))
    return
  }

  // Unknown type — reject cleanly
  sendMessage(errorResponse(`unknown_type: ${String(type)}`))
}

// ── Main loop ────────────────────────────────────────────────────────────────

let buf = Buffer.alloc(0)

process.stdin.on('data', (chunk: Buffer) => {
  buf = Buffer.concat([buf, chunk])
  processBuffer()
})

process.stdin.on('end', () => {
  process.exit(0)
})

function processBuffer(): void {
  // Each message is preceded by a 4-byte little-endian uint32 length.
  while (buf.length >= 4) {
    const len = buf.readUInt32LE(0)

    // Sanity-check: refuse absurdly large messages before buffering them.
    if (len > PROMPT_SIZE_LIMIT + 512) {
      sendMessage(errorResponse('message_too_large'))
      process.exit(1)
    }

    if (buf.length < 4 + len) {
      // Incomplete — wait for more data.
      break
    }

    const msgBytes = buf.slice(4, 4 + len)
    buf = buf.slice(4 + len)

    let parsed: unknown
    try {
      parsed = JSON.parse(msgBytes.toString('utf8'))
    } catch {
      sendMessage(errorResponse('json_parse_error'))
      continue
    }

    handleMessage(parsed).catch(() => {
      sendMessage(errorResponse('internal_error'))
    })
  }
}
