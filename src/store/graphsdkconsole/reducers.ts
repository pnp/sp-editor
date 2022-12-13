import { initCode, initResult } from '../../pages/graphsdkconsole/components/utils'
import { Constants, GraphSDKConsoleActions, IGraphSDKConsoleState } from './types'

const init: IGraphSDKConsoleState = {
  code: initCode(),
  result: initResult(),
  definitions: [],
  editpanel: false,
  scopes: [],
  authData: undefined,
  spuoser: undefined
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
    default:
      return state
  }
}
