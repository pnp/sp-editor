import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { IGroup } from "@fluentui/react";
import { ISearchQuery } from "@pnp/sp/search/types";

export type SearchActions = ActionType<typeof actions>;

export interface ISearchItem {
  key: string;
  property: string;
  value: string;
  DocId: string;
}

export interface IRefinementItem {
  key: number;
  refinementName: string;
  refinementValue: string;
  refinementCount: string;
  refinementToken: string;
  refinerName: string;
  row: number;
}

export interface SearchResult {
  ElapsedTime: number;
  PrimarySearchResults: any[];
  RawSearchResults: any[];
  RowCount: number;
  TotalRows: number;
  TotalRowsIncludingDuplicates: number;
}

export interface ISearchHistory extends ISearchQuery {
  queryName: string;
}

// Crawl Log Types
export enum LogLevel {
  All = -1,
  Success = 0,
  Warning = 1,
  Error = 2,
}

export enum ContentSource {
  Sites = "Sites",
  UserProfiles = "UserProfiles",
}

export interface ICrawlEntry {
  ItemId: number;
  ContentSourceId: number;
  Url: string;
  CrawlTime: Date | string;
  ItemTime?: Date | string;
  LogLevel: LogLevel;
  Status: string;
  IsDeleted?: boolean;
  NoIndex?: boolean;
  ErrorCode?: number;
  ChildrenCount?: number;
  DatabaseName?: string;
  SiteId?: string;
  WebId?: string;
  ParentDocId?: number;
  AccessData?: string;
  RawData?: Record<string, unknown>;
}

export interface ICrawlLogFilter {
  logLevel: LogLevel;
  contentSource: ContentSource;
  rowLimit: number;
  filter: string;
  startDate: Date;
  endDate: Date;
}

export interface ISearchState {
  items: ISearchItem[];
  groups: IGroup[];
  refinemenItems: IRefinementItem[];
  refinemenGroups: IGroup[];
  searchQuery: ISearchQuery;
  searchResults?: SearchResult;
  loading: boolean;
  optionsPanel: boolean;
  searchHistory: ISearchHistory[];
  // Crawl Log State
  crawlLogEntries: ICrawlEntry[];
  crawlLogFilter: ICrawlLogFilter;
  crawlLogPanelOpen: boolean;
  crawlLogSelectedEntry: ICrawlEntry | null;
  crawlLogLoading: boolean;
  crawlLogFetchCount: number;
}


export enum Constants {
  S_GET_ITEMS = "S_GET_ITEMS",
  S_SET_QUERY = "S_SET_QUERY",
  S_SAVE_QUERY = "S_SAVE_QUERY",
  S_DELETE_QUERY = "S_DELETE_QUERY",
  S_SET_OPTIONSPANEL = "S_SET_OPTIONSPANEL",
  s_SET_ALL_QUERIES = "S_SET_ALL_QUERIES",
  // Crawl Log Constants
  S_CRAWL_SET_LOADING = "S_CRAWL_SET_LOADING",
  S_CRAWL_SET_ENTRIES = "S_CRAWL_SET_ENTRIES",
  S_CRAWL_SET_FILTER = "S_CRAWL_SET_FILTER",
  S_CRAWL_SET_PANEL_OPEN = "S_CRAWL_SET_PANEL_OPEN",
  S_CRAWL_SET_SELECTED_ENTRY = "S_CRAWL_SET_SELECTED_ENTRY",
  S_CRAWL_CLEAR_ENTRIES = "S_CRAWL_CLEAR_ENTRIES",
  S_CRAWL_INCREMENT_FETCH_COUNT = "S_CRAWL_INCREMENT_FETCH_COUNT",
}
