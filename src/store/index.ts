import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { fileExplorerReducer } from './fileexplorer/reducers';
import { IFileExplorerState } from './fileexplorer/types';
import { GraphSDKConsoleReducer } from './graphsdkconsole/reducers';
import { IGraphSDKConsoleState } from './graphsdkconsole/types';
import { homeReducer } from './home/reducers';
import { IHomeState } from './home/types';
import { listPropertiesReducer } from './listproperties/reducers';
import { IListPropertiesState } from './listproperties/types';
import { sitePropertiesReducer } from './siteproperties/reducers';
import { ISitePropertiesState } from './siteproperties/types';
import { MGTConsoleReducer } from './mgtconsole/reducers';
import { IMGTConsoleState } from './mgtconsole/types';
import { pnpJSConsoleReducer } from './pnpjsconsole/reducers';
import { IPnPjsConsoleState } from './pnpjsconsole/types';
import { scriptLinksReducer } from './scriptlinks/reducers';
import { IScriptLinksState } from './scriptlinks/types';
import { spshootReducer } from './spshoot/reducers';
import { ISPShootState } from './spshoot/types';
import { webHooksReducer } from './webhooks/reducers';
import { IWebHooksState } from './webhooks/types';
import { webPropertiesReducer } from './webproperties/reducers';
import { IWebPropertiesState } from './webproperties/types';
import { tenantPropertiesReducer } from './tenantproperties/reducers';
import { ITenantPropertiesState } from './tenantproperties/types';
import { searchReducer } from './search/reducers';
import { ISearchState } from './search/types';
//import { loadInitialState } from "./loadInitialState";
//import chromeStorageSync from "./middleware/chromeStorageSync";
import { proxyReducer } from './proxy/reducers';
import { IProxyState } from './proxy/types';
import localStorageMiddleware from './localStorageMiddleware';
import { IQueryBuilderState } from './queryBuilder/types';
import { queryBuilderReducer } from './queryBuilder/reducers'

export interface IRootState {
  home: IHomeState;
  scriptLinks: IScriptLinksState;
  pnpjsconsole: IPnPjsConsoleState;
  webProperties: IWebPropertiesState;
  webHooks: IWebHooksState;
  tenantProperties: ITenantPropertiesState;
  listProperties: IListPropertiesState;
  siteProperties: ISitePropertiesState;
  spshoot: ISPShootState;
  graphsdkconsole: IGraphSDKConsoleState;
  mgtconsole: IMGTConsoleState;
  fileexplorer: IFileExplorerState;
  search: ISearchState;
  proxy: IProxyState;
  queryBuilder: IQueryBuilderState;
}

const rootReducer = combineReducers({
  home: homeReducer,
  scriptLinks: scriptLinksReducer,
  pnpjsconsole: pnpJSConsoleReducer,
  webProperties: webPropertiesReducer,
  webHooks: webHooksReducer,
  tenantProperties: tenantPropertiesReducer,
  listProperties: listPropertiesReducer,
  siteProperties: sitePropertiesReducer,
  spshoot: spshootReducer,
  graphsdkconsole: GraphSDKConsoleReducer,
  mgtconsole: MGTConsoleReducer,
  fileexplorer: fileExplorerReducer,
  search: searchReducer,
  proxy: proxyReducer,
  queryBuilder: queryBuilderReducer
});

const initializeStore = async () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(localStorageMiddleware),
  });

  return store;
};

export default initializeStore;
