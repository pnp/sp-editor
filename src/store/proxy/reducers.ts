import { Constants, IProxy, IProxyState, ProxyActions } from './types'

const defaultProxy: IProxy = {
  methods: ['GET'],
  failRate: 0.9,
  url: '/_api/',
  status: 429,
  statusText: 'Too many requests',
  responseHeaders: {
    'Content-Type': 'application/json',
    'Retry-After': '2', // Tell the client to wait 2 seconds
  },
  responseBody: JSON.stringify({
    error: {
      code: '-2147024860, Microsoft.SharePoint.SPQueryThrottledException',
      message: {
        lang: 'en-US',
        value: 'The attempted operation is prohibited because it exceeds the list view threshold enforced by the administrator.',
      },
    },
  }),
};

const init: IProxyState = {
  proxies: [defaultProxy],
  loading: false,
  enabled: false,
  selectedItems: [],
  editpanel: false,
}

export function proxyReducer(state: IProxyState = init, action: ProxyActions): IProxyState {
  switch (action.type) {
    case Constants.PX_SET_ENABLED:
      return { ...state, ...action.payload }
    case Constants.PX_SET_EDITPANEL:
      return { ...state, ...action.payload }
      case Constants.PX_UPDATE_ITEM:
        return {
          ...state,
          proxies: state.proxies.map((proxy, index) =>
            index === 0 ? { ...proxy, ...action.payload.selectedItem } : proxy
          ),
        }
    default:
      return state
  }
}
