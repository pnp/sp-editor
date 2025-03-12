import { action } from "typesafe-actions";
import { Constants, IRefinementItem, ISearchHistory, ISearchItem, SearchResult } from "./types";
import { IGroup } from "@fluentui/react";
import { ISearchQuery } from "@pnp/sp/search/types";

export function setSearchResults(items: ISearchItem[], groups: IGroup[], refinemenItems: IRefinementItem[], refinemenGroups: IGroup[], searchResults?: SearchResult) {
  return action(Constants.S_GET_ITEMS, {
    items,
    groups,
    refinemenItems,
    refinemenGroups,
    searchResults,
  });
}

export function setSearchQuery(searchQuery: ISearchQuery) {
  return action(Constants.S_SET_QUERY, {
    searchQuery,
  });
}

export function setOptionsPanel(optionsPanel: boolean) {
  return action(Constants.S_SET_OPTIONSPANEL, {
    optionsPanel,
  });
}

export function saveSearchQuery(searchQuery: ISearchHistory) {
  return action(Constants.S_SAVE_QUERY, {
    searchQuery,
  });
}

export function deleteSearchQuery(index: number) {
  return action(Constants.S_DELETE_QUERY, {
    index,
  });
}
export function setAllQueries(searchHistory: ISearchHistory[]) {
  return action(Constants.s_SET_ALL_QUERIES, {
    searchHistory,
  });
}