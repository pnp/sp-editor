import { Constants, IProxy, IProxyState, ProxyActions } from './types';

const defaultProxy: IProxy[] = [{
  id: '1',
  methods: ['ALL'],
  failRate: 0.9,
  url: '/_api/',
  status: '429',
  statusText: 'Too many requests',
  responseHeaders: {
    'Content-Type': 'application/json',
    'Retry-After': '2', // Tell the client to wait 2 seconds
  },
  responseBody: {
    error: {
      code: '-2147024860, Microsoft.SharePoint.SPQueryThrottledException',
      message: {
        lang: 'en-US',
        value:
          'The attempted operation is prohibited because it exceeds the list view threshold enforced by the administrator.',
      },
    },
  },
  description: 'Default 429 proxy, please edit to suit your needs',
},
  {
    id: '2',
    methods: ['GET'],
    failRate: 1.0,
    url: 'https://graph.microsoft.com/v1.0/me',
    status: '200',
    statusText: 'OK',
    responseHeaders: {
      'Content-Type': 'application/json',
    },
    responseBody: {
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users/$entity",
      "businessPhones": [
        "+1 412 555 0109"
      ],
      "displayName": "Megan Bowen",
      "givenName": "Megan",
      "jobTitle": "Auditor",
      "mail": "MeganB@M365x214355.onmicrosoft.com",
      "mobilePhone": null,
      "officeLocation": "12/1110",
      "preferredLanguage": "en-US",
      "surname": "Bowen",
      "userPrincipalName": "MeganB@M365x214355.onmicrosoft.com",
      "id": "48d31887-5fad-4d73-a9f5-3c356e68a038"
    },
    description: 'Default 200 proxy, please edit to suit your needs',
  }
];


 const init: IProxyState = {
  proxies: defaultProxy,
  loading: false,
  enabled: false,
  selectedItem: undefined,
  editpanel: false,
};

export function proxyReducer(state: IProxyState = init, action: ProxyActions): IProxyState {
  switch (action.type) {
    case Constants.PX_SET_ENABLED:
      return { ...state, ...action.payload };
    case Constants.PX_SET_EDITPANEL:
      return { ...state, ...action.payload };
    case Constants.PX_UPDATE_ITEM:
      return {
        ...state,
        proxies: state.proxies.map((proxy) => {
          if (proxy.id === action.payload.item?.id) {
            return action.payload.item;
          }
          return proxy;
        }),
      };
    case Constants.PX_ADD_ITEM:
      return {
        ...state,
        proxies: [...state.proxies, action.payload.item],
      };
    case Constants.PX_REMOVE_ITEM:
      return {
        ...state,
        proxies: state.proxies.filter((proxy) => proxy.id !== action.payload.item?.id),
      };
    case Constants.PX_SET_SELECTED_ITEM:
      return { ...state, selectedItem: action.payload.selectedItem };
    default:
      return state;
  }
}
