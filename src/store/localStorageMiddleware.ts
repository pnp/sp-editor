import { Middleware } from 'redux';
import { Constants as proxyConstants, IProxyState, ProxyActions } from './proxy/types';
import { Constants as searchConstants, ISearchState, SearchActions } from './search/types';

const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);

  // List of actions that modify the proxies
  const proxyActions = [
    proxyConstants.PX_ADD_ITEM,
    proxyConstants.PX_UPDATE_ITEM,
    proxyConstants.PX_REMOVE_ITEM,
  ];

  // List of actions that modify the search queries
  const searchActions = [
    searchConstants.S_SAVE_QUERY,
    searchConstants.S_DELETE_QUERY,
  ];

  if (isProxyAction(action) && proxyActions.includes(action.type)) {
    const state: IProxyState = store.getState().proxy;
    window.localStorage.setItem('proxies', JSON.stringify(state.proxies));
  }

  if (isSearchAction(action) && searchActions.includes(action.type)) {
    const state: ISearchState = store.getState().search;
    window.localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory));
  }

  return result;
};

// Type guard to check if action is a ProxyAction
function isProxyAction(action: unknown): action is ProxyActions {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof (action as ProxyActions).type === 'string'
  );
}

// Type guard to check if action is a SearchAction
function isSearchAction(action: unknown): action is SearchActions {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof (action as SearchActions).type === 'string'
  );
}

export default localStorageMiddleware;