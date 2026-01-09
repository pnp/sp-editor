import { action } from "typesafe-actions";
import { Constants, IRefinementItem, ISearchHistory, ISearchItem, SearchResult, ICrawlEntry, ICrawlLogFilter } from "./types";
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

// Crawl Log Actions
export function setCrawlLogLoading(loading: boolean) {
  return action(Constants.S_CRAWL_SET_LOADING, { loading });
}

export function setCrawlLogEntries(entries: ICrawlEntry[]) {
  return action(Constants.S_CRAWL_SET_ENTRIES, { entries });
}

export function setCrawlLogFilter(filter: ICrawlLogFilter) {
  return action(Constants.S_CRAWL_SET_FILTER, { filter });
}

export function setCrawlLogPanelOpen(panelOpen: boolean) {
  return action(Constants.S_CRAWL_SET_PANEL_OPEN, { panelOpen });
}

export function setCrawlLogSelectedEntry(entry: ICrawlEntry | null) {
  return action(Constants.S_CRAWL_SET_SELECTED_ENTRY, { entry });
}

export function clearCrawlLogEntries() {
  return action(Constants.S_CRAWL_CLEAR_ENTRIES);
}

export function incrementCrawlLogFetchCount() {
  return action(Constants.S_CRAWL_INCREMENT_FETCH_COUNT);
}