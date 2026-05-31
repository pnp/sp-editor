import { initCode } from '../../pages/pnpjsconsole/components/utils'
import { Constants, IPnPjsConsoleState, PnPjsConsoleActions } from './types'

const MAX_CONSOLE_ENTRIES = 500

const init: IPnPjsConsoleState = {
  code: initCode(),
  definitions: [],
  consoleOutput: [],
}

export function pnpJSConsoleReducer(state: IPnPjsConsoleState = init, action: PnPjsConsoleActions): IPnPjsConsoleState {
  switch (action.type) {
    case Constants.PC_SET_CODE:
      return { ...state, ...action.payload }
    case Constants.PC_SET_DEFINITIONS:
      return { ...state, definitions: action.payload.definitions }
    case Constants.PC_APPEND_CONSOLE: {
      const next = state.consoleOutput.concat(action.payload.entry)
      if (next.length > MAX_CONSOLE_ENTRIES) {
        next.splice(0, next.length - MAX_CONSOLE_ENTRIES)
      }
      return { ...state, consoleOutput: next }
    }
    case Constants.PC_CLEAR_CONSOLE:
      return { ...state, consoleOutput: [] }
    default:
      return state
  }
}
