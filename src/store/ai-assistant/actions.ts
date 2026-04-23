import { action } from 'typesafe-actions'
import { Constants, IAiMessage } from './types'

export function setAiPanelOpen(isOpen: boolean) {
  return action(Constants.AI_SET_OPEN, { isOpen })
}

export function addAiMessage(message: IAiMessage) {
  return action(Constants.AI_ADD_MESSAGE, { message })
}

export function updateAiMessage(id: string, content: string, isStreaming?: boolean) {
  return action(Constants.AI_UPDATE_MESSAGE, { id, content, isStreaming })
}

export function clearAiMessages() {
  return action(Constants.AI_CLEAR_MESSAGES)
}

export function setAiSending(isSending: boolean) {
  return action(Constants.AI_SET_SENDING, { isSending })
}

export function setAiError(error: string | null) {
  return action(Constants.AI_SET_ERROR, { error })
}
