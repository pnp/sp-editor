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
export interface ISearchState {
  items: ISearchItem[];
  groups: IGroup[];
  searchQuery: ISearchQuery;
  searchResults?: SearchResult;
  loading: boolean;
  optionsPanel: boolean;
  searchHistory: ISearchHistory[];
}


export enum Constants {
  S_GET_ITEMS = "S_GET_ITEMS",
  S_SET_QUERY = "S_SET_QUERY",
  S_SAVE_QUERY = "S_SAVE_QUERY",
  S_DELETE_QUERY = "S_DELETE_QUERY",
  S_SET_OPTIONSPANEL = "S_SET_OPTIONSPANEL",
  s_SET_ALL_QUERIES = "S_SET_ALL_QUERIES",
}
