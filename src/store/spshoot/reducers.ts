import { Constants, ISPShootState, SPShootActions } from './types'

const init: ISPShootState = {
  path: '_api/web/',
  method: 'GET',
  headers: '{"accept": "application/json; odata=nometadata","content-type": "application/json; odata=nometadata; charset=utf-8"}',
  body: '',
  results: '',
  showHeaders: false,
  showBody: false,
  context: null,
}

export function spshootReducer(state: ISPShootState = init, action: SPShootActions): ISPShootState {
  switch (action.type) {
    case Constants.SPS_SET_PATH:
      return { ...state, ...action.payload }
    case Constants.SPS_SET_METHOD:
      return { ...state, ...action.payload }
    case Constants.SPS_SET_HEADERS:
      return { ...state, ...action.payload }
    case Constants.SPS_SET_BODY:
      return { ...state, ...action.payload }
    case Constants.SPS_SET_RESULT:
      return { ...state, ...action.payload }
    case Constants.SPS_SET_SHOWHEADERS:
      return { ...state, ...action.payload }
    case Constants.SPS_SET_SHOWBODY:
      return { ...state, ...action.payload }
    case Constants.SPS_SET_CONTEXT:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
