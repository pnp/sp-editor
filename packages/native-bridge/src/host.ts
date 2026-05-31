/**
 * Chrome Native Messaging host — stdin/stdout length-prefixed JSON loop.
 *
 * Chrome spawns this process directly. It sends messages as:
 *   [4 bytes little-endian length][UTF-8 JSON]
 * And expects responses in the same format.
 *
 * Security:
 *  - Only a hard-coded whitelist of message types is accepted.
 *  - Oversized payloads are rejected before any I/O with gh.
 *  - No shell evaluation; copilot is spawned via argv array only.
 *  - Content (prompts / responses) is never written to any log.
 */

import { isCopilotAuthenticated, isCopilotCliInstalled, runCopilotPrompt } from './copilot'
import {
  AiCompleteRequest,
  BridgeRequest,
  BridgeResponse,
  PROMPT_SIZE_LIMIT,
} from './protocol'

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
    const installed = await isCopilotCliInstalled()
    const authenticated = installed ? await isCopilotAuthenticated() : false
    sendMessage({
      ok: true,
      providers: {
        'github-copilot': { installed, authenticated },
      },
    })
    return
  }

  if (type === 'ai.complete') {
    const req = msg as unknown as AiCompleteRequest

    if (req.provider !== 'github-copilot') {
      sendMessage(errorResponse(`unknown_provider: ${req.provider}`))
      return
    }

    const { prompt = '', sessionId, model, allowedUrls } = req.payload ?? {}

    if (typeof prompt !== 'string') {
      sendMessage(errorResponse('payload_type_error'))
      return
    }

    if (prompt.length > PROMPT_SIZE_LIMIT) {
      sendMessage(errorResponse(`prompt_too_large: ${prompt.length} > ${PROMPT_SIZE_LIMIT}`))
      return
    }

    const result = await runCopilotPrompt(
      prompt,
      typeof sessionId === 'string' ? sessionId : undefined,
      typeof model === 'string' ? model : undefined,
      Array.isArray(allowedUrls) ? (allowedUrls as string[]).filter(u => typeof u === 'string') : undefined,
    )
    sendMessage(result.ok
      ? { ok: true, response: result.response, tokenUsage: result.tokenUsage }
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
