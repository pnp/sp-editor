import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

export type ProxyActions = ActionType<typeof actions>

export interface IProxy {
  id: string
  methods: string[]
  failRate: number
  url: string
  status: string
  statusText: string
  responseHeaders: string
  responseBody: string
  enabled?: boolean
  description?: string
}

export interface IProxyState {
  proxies: IProxy[],
  loading: boolean,
  enabled: boolean,
  selectedItem: IProxy | undefined,
  editpanel: boolean,
}

export enum Constants {
  PX_SET_ALL_PROXIES = 'PX_SET_ALL_PROXIES',
  PX_SET_SELECTED_ITEM = 'PX_SET_SELECTED_ITEM',
  PX_UPDATE_ITEM = 'PX_UPDATE_ITEM',
  PX_ADD_ITEM = 'PX_ADD_ITEM',
  PX_REMOVE_ITEM = 'PX_REMOVE_ITEM"',
  PX_SET_ENABLED = 'PX_SET_ENABLED',
  PX_SET_EDITPANEL = 'PX_SET_EDITPANEL',
}
