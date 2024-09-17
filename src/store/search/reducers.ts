import { Constants, ISearchState, SearchActions } from "./types";

const init: ISearchState = {
  items: [],
  groups: [],
  loading: false,
  searchQuery: {
    Querytext: "contentclass:STS_Web",
    RowLimit: 10,
    StartRow: 0,
    ClientType: "ContentSearchRegular",
    EnableNicknames: false,
    TrimDuplicates: true,
    SelectProperties: [],
    SortList: [],
  },
  optionsPanel: false,
};

export function searchReducer(state: ISearchState = init, action: SearchActions): ISearchState {
  switch (action.type) {
    case Constants.S_GET_ITEMS:
      return {
        ...state,
        items: action.payload.items,
        groups: action.payload.groups,
        searchResults: action.payload.searchResults,
      };
    case Constants.S_SET_QUERY:
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
      };
    case Constants.S_SET_OPTIONSPANEL:
        return { ...state, ...action.payload }
    default:
      return state;
  }
}
