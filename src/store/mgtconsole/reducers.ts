import { initCode } from '../../pages/mgtconsole/components/utils'
import { Constants, IMGTConsoleState, MGTConsoleActions } from './types'

const init: IMGTConsoleState = {
  code: initCode(),
  transpiled: '',
  result: '',
  definitions: [],
}

export function MGTConsoleReducer(state: IMGTConsoleState = init, action: MGTConsoleActions): IMGTConsoleState {
  switch (action.type) {
    case Constants.MGT_SET_CODE:
      return { ...state, ...action.payload }
    case Constants.MGT_SET_TRANSPILED:
        return { ...state, ...action.payload }
    case Constants.MGT_SET_RESULT:
      return { ...state, ...action.payload }
    case Constants.MGT_SET_DEFINITIONS:
      return { ...state, definitions: action.payload.definitions }
    default:
      return state
  }
}
