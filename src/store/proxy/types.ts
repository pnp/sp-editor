import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type ProxyActions = ActionType<typeof actions>

export interface IProxy {
  [key: string]: any
  methods: string[]
  failRate: number
  url: string
  status: number
  statusText: string
  responseHeaders: HeadersInit
  responseBody: BodyInit | null
  enabled?: boolean
}

export interface IProxyState {
  proxies: IProxy[],
  loading: boolean,
  enabled: boolean,
  selectedItems: IProxy[],
  editpanel: boolean,
}

export enum Constants {
  PX_ADD_ITEM = 'PX_ADD_ITEM',
  PX_UPDATE_ITEM = 'PX_UPDATE_ITEM',
  PX_REMOVE_ITEMS = 'PX_REMOVE_ITEM"',
  PX_SET_ENABLED = 'PX_SET_ENABLED',
  PX_SET_EDITPANEL = 'PX_SET_EDITPANEL',
}
