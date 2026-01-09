import { Constants, ISearchState, SearchActions, LogLevel, ContentSource } from "./types";

const getDefaultStartDate = (): Date => {
  return new Date(2000, 0, 1); // January 1, 2000
};

const getDefaultEndDate = (): Date => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
};

const init: ISearchState = {
  items: [],
  groups: [],
  loading: false,
  searchQuery: {
    Querytext: "contentclass:STS_*",
    QueryTemplate: "({searchterms})",
    RowLimit: 10,
    StartRow: 0,
    ClientType: "ContentSearchRegular",
    EnableNicknames: false,
    TrimDuplicates: false,
    SelectProperties: [],
    SortList: [],
    SourceId: "8413cd39-2156-4e00-b54d-11efd9abdb89",
  },
  optionsPanel: false,
  searchHistory: [],
  refinemenItems: [],
  refinemenGroups: [],
  // Crawl Log initial state
  crawlLogEntries: [],
  crawlLogFilter: {
    logLevel: LogLevel.All,
    contentSource: ContentSource.Sites,
    rowLimit: 100,
    filter: "",
    startDate: getDefaultStartDate(),
    endDate: getDefaultEndDate(),
  },
  crawlLogPanelOpen: false,
  crawlLogSelectedEntry: null,
  crawlLogLoading: false,
  crawlLogFetchCount: 0,
};

export function searchReducer(state: ISearchState = init, action: SearchActions): ISearchState {
  switch (action.type) {
    case Constants.S_GET_ITEMS:
      return {
        ...state,
        items: action.payload.items,
        groups: action.payload.groups,
        refinemenItems: action.payload.refinemenItems,
        refinemenGroups: action.payload.refinemenGroups,
        searchResults: action.payload.searchResults,
        };
    case Constants.S_SET_QUERY:
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
      };
    case Constants.S_SET_OPTIONSPANEL:
        return { ...state, ...action.payload }
    case Constants.S_SAVE_QUERY:
      return {
        ...state,
        searchHistory: [...state.searchHistory, action.payload.searchQuery],
      };
    case Constants.S_DELETE_QUERY:
      return {
        ...state,
        searchHistory: state.searchHistory.filter((_, index) => index !== action.payload.index),
      };
    case Constants.s_SET_ALL_QUERIES:
      return {
        ...state,
        searchHistory: action.payload.searchHistory,
      };
    // Crawl Log cases
    case Constants.S_CRAWL_SET_LOADING:
      return { ...state, crawlLogLoading: action.payload.loading };
    case Constants.S_CRAWL_SET_ENTRIES:
      return { ...state, crawlLogEntries: action.payload.entries };
    case Constants.S_CRAWL_SET_FILTER:
      return { ...state, crawlLogFilter: action.payload.filter };
    case Constants.S_CRAWL_SET_PANEL_OPEN:
      return { ...state, crawlLogPanelOpen: action.payload.panelOpen };
    case Constants.S_CRAWL_SET_SELECTED_ENTRY:
      return { ...state, crawlLogSelectedEntry: action.payload.entry };
    case Constants.S_CRAWL_CLEAR_ENTRIES:
      return { ...state, crawlLogEntries: [] };
    case Constants.S_CRAWL_INCREMENT_FETCH_COUNT:
      return { ...state, crawlLogFetchCount: state.crawlLogFetchCount + 1 };
    default:
      return state;
  }
}
