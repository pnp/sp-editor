import { IAiMessage } from '../../store/ai-assistant/types'
import { requireBackendUrl } from './backendUrl'

export interface ISendChatMessageArgs {
  messages: IAiMessage[]
  pageContext?: string
  apiKey: string
  contextData?: Record<string, any>
}

export interface ISendChatMessageResult {
  reply: string
  query?: any // For /ai/search responses - can be ISearchQuery object or string
  code?: string // For /ai/pnpjs responses
  explanation?: string // For /ai/search and /ai/pnpjs responses
  tokensRemaining?: number
  tokensUsed?: number
  tier?: string
}

// Conversation history is only used for the general /ai/chat endpoint.
// /ai/search and /ai/pnpjs already receive canonical state (currentQuery / code),
// so re-sending recent turns mostly just duplicates that state and burns tokens.
const MAX_HISTORY_MESSAGES = 4
const MAX_HISTORY_MESSAGE_LENGTH = 1000

// Per-call size ceilings. Must stay in sync with backend RequestSizeGuard.cs
// to avoid wasted round-trips. Slightly stricter on the client to leave room
// for any small additions made server-side.
export const MAX_PROMPT_CHARS = 2_000
export const MAX_CONTEXT_FIELD_CHARS = 10_000
export const MAX_TOTAL_REQUEST_CHARS = 20_000

function tooLarge(message: string): Error {
  return new Error(`Request too large: ${message}`)
}

function validateRequestSize(requestBody: Record<string, any>): void {
  const prompt = typeof requestBody.prompt === 'string' ? requestBody.prompt : ''
  if (prompt.length > MAX_PROMPT_CHARS) {
    throw tooLarge(
      `your prompt is ${prompt.length} characters; maximum is ${MAX_PROMPT_CHARS}.`,
    )
  }

  let total = prompt.length
  for (const [field, value] of Object.entries(requestBody)) {
    if (field === 'prompt' || value == null) continue
    const text = typeof value === 'string' ? value : JSON.stringify(value)
    if (text.length > MAX_CONTEXT_FIELD_CHARS) {
      throw tooLarge(
        `the "${field}" field is ${text.length} characters; maximum is ${MAX_CONTEXT_FIELD_CHARS}.`,
      )
    }
    total += text.length
  }

  if (total > MAX_TOTAL_REQUEST_CHARS) {
    throw tooLarge(
      `total request size is ${total} characters; maximum is ${MAX_TOTAL_REQUEST_CHARS}.`,
    )
  }
}

function buildConversationHistory(messages: IAiMessage[]) {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: (m.content || '').slice(0, MAX_HISTORY_MESSAGE_LENGTH),
    }))
}

/**
 * Send a chat message to the AI backend
 * @param args - Contains messages array, page context, and API key
 * @returns Promise with the AI response
 * @throws Error if the request fails
 */
export async function sendChatMessage(
  args: ISendChatMessageArgs
): Promise<ISendChatMessageResult> {
  const { messages, pageContext, apiKey, contextData } = args

  if (!apiKey) {
    throw new Error('API key is required for chat')
  }

  // Get the last user message
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === 'user')

  const userText = lastUserMessage ? lastUserMessage.content.trim() : ''

  if (!userText) {
    throw new Error('No user message to send')
  }

  const backendUrl = requireBackendUrl()

  // Determine which endpoint to use based on pageContext
  let endpoint = '/ai/chat'
  let requestBody: any = {
    message: userText,
    conversationHistory: buildConversationHistory(messages),
  }

  if (pageContext === 'search') {
    endpoint = '/ai/search'
    requestBody = {
      prompt: userText,
      currentQuery: contextData?.searchQuery || '',
      searchResults: contextData?.searchResults || [],
    }
  } else if (pageContext === 'pnpjsconsole') {
    endpoint = '/ai/pnpjs'
    requestBody = {
      prompt: userText,
      code: typeof contextData?.code === 'string' ? contextData.code : '',
    }
  }

  try {
    validateRequestSize(requestBody)

    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(requestBody),
    })

    if (response.status === 402) {
      throw new Error('No tokens available. Please purchase more tokens.')
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    // Map response shape depending on endpoint
    if (pageContext === 'search') {
      return {
        reply: data.explanation || data.query || '',
        query: data.query,
        explanation: data.explanation,
        tokensRemaining:
          typeof data.tokensRemaining === 'number' ? data.tokensRemaining : undefined,
        tokensUsed: typeof data.tokensUsed === 'number' ? data.tokensUsed : undefined,
        tier: typeof data.tier === 'string' ? data.tier : undefined,
      }
    }

    if (pageContext === 'pnpjsconsole') {
      return {
        reply: data.explanation || '',
        code: typeof data.code === 'string' ? data.code : undefined,
        explanation: data.explanation,
        tokensRemaining:
          typeof data.tokensRemaining === 'number' ? data.tokensRemaining : undefined,
        tokensUsed: typeof data.tokensUsed === 'number' ? data.tokensUsed : undefined,
        tier: typeof data.tier === 'string' ? data.tier : undefined,
      }
    }

    return {
      reply: data.response || '',
      tokensRemaining:
        typeof data.tokensRemaining === 'number' ? data.tokensRemaining : undefined,
      tokensUsed: typeof data.tokensUsed === 'number' ? data.tokensUsed : undefined,
      tier: typeof data.tier === 'string' ? data.tier : undefined,
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to send message'
    console.error('[aiAssistantService] Error:', msg)
    throw new Error(msg)
  }
}
