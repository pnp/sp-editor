import { IAiMessage } from '../../store/ai-assistant/types'

// TODO: wire to real backend once endpoint contract is shared.
// For now this is a mock service that simulates an OpenAI-style chat
// completion call with a short artificial delay.
//
// The expected real signature will likely look something like:
//   POST {AI_BACKEND_URL}/chat
//     body: { messages, pageContext }
//     headers: { Authorization: 'Bearer <token>' }
//     response: { reply: string }
//
// Replace the body of `sendChatMessage` below when ready.

export interface ISendChatMessageArgs {
  messages: IAiMessage[]
  pageContext?: string
}

export interface ISendChatMessageResult {
  reply: string
}

const MOCK_DELAY_MS = 700

export function sendChatMessage(
  args: ISendChatMessageArgs
): Promise<ISendChatMessageResult> {
  // eslint-disable-next-line no-console
  console.log('[aiAssistantService] (mock) sendChatMessage', args)

  const lastUserMessage = [...args.messages]
    .reverse()
    .find((m) => m.role === 'user')

  const userText = lastUserMessage ? lastUserMessage.content.trim() : ''
  const pageHint = args.pageContext ? ` (on **${args.pageContext}** page)` : ''

  const reply =
    `**Mock AI reply**${pageHint}\n\n` +
    `You said:\n> ${userText || '(nothing)'}\n\n` +
    '_This is a placeholder response. Wire `sendChatMessage` in ' +
    '`src/services/ai-assistant/aiAssistantService.ts` to your real backend ' +
    'when ready._'

  return new Promise((resolve) => {
    setTimeout(() => resolve({ reply }), MOCK_DELAY_MS)
  })
}
