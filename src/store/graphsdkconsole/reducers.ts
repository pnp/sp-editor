import { initCode } from '../../pages/graphsdkconsole/components/utils'
import { Constants, IGraphSDKConsoleState, GraphSDKConsoleActions } from './types'

const init: IGraphSDKConsoleState = {
  code: initCode(),
  definitions: [],
}

export function GraphSDKConsoleReducer(state: IGraphSDKConsoleState = init, action: GraphSDKConsoleActions): IGraphSDKConsoleState {
  switch (action.type) {
    case Constants.GC_SET_CODE:
      return { ...state, ...action.payload }
    case Constants.GC_SET_DEFINITIONS:
      return { ...state, definitions: action.payload.definitions }
    default:
      return state
  }
}
