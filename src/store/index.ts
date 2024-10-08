import { combineReducers } from "redux";
import { fileExplorerReducer } from "./fileexplorer/reducers";
import { IFileExplorerState } from "./fileexplorer/types";
import { GraphSDKConsoleReducer } from "./graphsdkconsole/reducers";
import { IGraphSDKConsoleState } from "./graphsdkconsole/types";
import { homeReducer } from "./home/reducers";
import { IHomeState } from "./home/types";
import { listPropertiesReducer } from "./listproperties/reducers";
import { IListPropertiesState } from "./listproperties/types";
import { MGTConsoleReducer } from "./mgtconsole/reducers";
import { IMGTConsoleState } from "./mgtconsole/types";
import { pnpJSConsoleReducer } from "./pnpjsconsole/reducers";
import { IPnPjsConsoleState } from "./pnpjsconsole/types";
import { scriptLinksReducer } from "./scriptlinks/reducers";
import { IScriptLinksState } from "./scriptlinks/types";
import { spshootReducer } from "./spshoot/reducers";
import { ISPShootState } from "./spshoot/types";
import { webHooksReducer } from "./webhooks/reducers";
import { IWebHooksState } from "./webhooks/types";
import { webPropertiesReducer } from "./webproperties/reducers";
import { IWebPropertiesState } from "./webproperties/types";
import { searchReducer } from "./search/reducers";
import { ISearchState } from "./search/types";
import { configureStore } from "@reduxjs/toolkit";

export interface IRootState {
  home: IHomeState;
  scriptLinks: IScriptLinksState;
  pnpjsconsole: IPnPjsConsoleState;
  webProperties: IWebPropertiesState;
  webHooks: IWebHooksState;
  listProperties: IListPropertiesState;
  spshoot: ISPShootState;
  graphsdkconsole: IGraphSDKConsoleState;
  mgtconsole: IMGTConsoleState;
  fileexplorer: IFileExplorerState;
  search: ISearchState;
}

const rootReducer = combineReducers({
  home: homeReducer,
  scriptLinks: scriptLinksReducer,
  pnpjsconsole: pnpJSConsoleReducer,
  webProperties: webPropertiesReducer,
  webHooks: webHooksReducer,
  listProperties: listPropertiesReducer,
  spshoot: spshootReducer,
  graphsdkconsole: GraphSDKConsoleReducer,
  mgtconsole: MGTConsoleReducer,
  fileexplorer: fileExplorerReducer,
  search: searchReducer,
});

const store = configureStore({
  reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
