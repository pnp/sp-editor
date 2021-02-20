import { initCode, initResult } from '../../pages/graphsdkconsole/components/utils'
import { Constants, GraphSDKConsoleActions, IGraphSDKConsoleState } from './types'

const init: IGraphSDKConsoleState = {
  code: initCode(),
  result: initResult(),
  definitions: [],
}

export function GraphSDKConsoleReducer(state: IGraphSDKConsoleState = init, action: GraphSDKConsoleActions): IGraphSDKConsoleState {
  switch (action.type) {
    case Constants.GC_SET_CODE:
      return { ...state, ...action.payload }
    case Constants.GC_SET_RESULT:
      return { ...state, ...action.payload }
    case Constants.GC_SET_DEFINITIONS:
      return { ...state, definitions: action.payload.definitions }
    default:
      return state
  }
}
