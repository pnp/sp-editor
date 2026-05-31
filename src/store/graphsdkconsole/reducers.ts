import { initCode, initResult } from '../../pages/graphsdkconsole/components/utils'
import { Constants, GraphSDKConsoleActions, IGraphSDKConsoleState } from './types'

const MAX_CONSOLE_ENTRIES = 500

const init: IGraphSDKConsoleState = {
  code: initCode(),
  result: initResult(),
  definitions: [],
  editpanel: false,
  scopes: [],
  authData: undefined,
  spuoser: undefined,
  consoleOutput: [],
}

export function GraphSDKConsoleReducer(state: IGraphSDKConsoleState = init, action: GraphSDKConsoleActions): IGraphSDKConsoleState {
  switch (action.type) {
    case Constants.GC_SET_CODE:
      return { ...state, ...action.payload }
    case Constants.GC_SET_RESULT:
      return { ...state, ...action.payload }
    case Constants.GC_SET_DEFINITIONS:
      return { ...state, definitions: action.payload.definitions }
    case Constants.GC_SET_EDITPANEL:
      return { ...state, ...action.payload }
    case Constants.GC_SET_SCOPES:
      return { ...state, scopes: action.payload.scopes }
    case Constants.GC_SET_AUTHDATA:
      return { ...state, authData: action.payload.authData }
    case Constants.GC_SET_USER:
      return { ...state, spuoser: action.payload.spuoser }
    case Constants.GC_APPEND_CONSOLE: {
      const next = state.consoleOutput.concat(action.payload.entry)
      if (next.length > MAX_CONSOLE_ENTRIES) {
        next.splice(0, next.length - MAX_CONSOLE_ENTRIES)
      }
      return { ...state, consoleOutput: next }
    }
    case Constants.GC_CLEAR_CONSOLE:
      return { ...state, consoleOutput: [] }
    default:
      return state
  }
}
