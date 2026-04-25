import { action } from 'typesafe-actions'
import { IDefinitions } from '../home/types'
import { Constants, IPnPjsConsoleEntry } from './types'

export function setCode(code: string) {
  return action(Constants.PC_SET_CODE, {
    code,
  })
}

export function setDefinitions(definitions: IDefinitions[]) {
  return action(Constants.PC_SET_DEFINITIONS, {
    definitions,
  })
}

export function appendConsoleOutput(entry: IPnPjsConsoleEntry) {
  return action(Constants.PC_APPEND_CONSOLE, { entry })
}

export function clearConsoleOutput() {
  return action(Constants.PC_CLEAR_CONSOLE)
}
