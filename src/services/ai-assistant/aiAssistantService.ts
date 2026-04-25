import { IAiMessage } from '../../store/ai-assistant/types'

export interface ISendChatMessageArgs {
  messages: IAiMessage[]
  pageContext?: string
  apiKey: string
  contextData?: Record<string, any>
}

export interface ISendChatMessageResult {
  reply: string
  query?: any // For /ai/search responses - can be ISearchQuery object or string
  explanation?: string // For /ai/search responses
  tokensRemaining?: number
  tokensUsed?: number
  tier?: string
}

const MAX_HISTORY_MESSAGES = 8
const MAX_HISTORY_MESSAGE_LENGTH = 1000

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

  const backendUrl =
    (process.env.REACT_APP_AI_BACKEND_URL || 'http://localhost:5221').replace(/\/+$/, '')

  // Determine which endpoint to use based on pageContext
  let endpoint = '/ai/chat'
  const conversationHistory = buildConversationHistory(messages)
  let requestBody: any = {
    message: userText,
    conversationHistory,
  }

  if (pageContext === 'search') {
    endpoint = '/ai/search'
    requestBody = {
      prompt: userText,
      conversationHistory,
      currentQuery: contextData?.searchQuery || '',
      searchResults: contextData?.searchResults || [],
    }
  }

  console.log(`[aiAssistantService] Sending message to ${backendUrl}${endpoint}`)
  console.log('[aiAssistantService] Page context:', pageContext)
  console.log('[aiAssistantService] Message:', userText)
  console.log('[aiAssistantService] API Key:', apiKey.substring(0, 10) + '...')

  try {
    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(requestBody),
    })

    console.log('[aiAssistantService] Response status:', response.status)

    if (response.status === 402) {
      throw new Error('No tokens available. Please purchase more tokens.')
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('[aiAssistantService] Error response:', errorData)
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('[aiAssistantService] Response data:', data)

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
