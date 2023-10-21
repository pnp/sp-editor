import { action } from "typesafe-actions";
import { Constants, ISearchItem } from "./types";
import { IGroup } from "@fluentui/react";
import { ISearchQuery } from "@pnp/sp/search/types";

export function setSearchResults(items: ISearchItem[], groups: IGroup[]) {
  return action(Constants.S_GET_ITEMS, {
    items,
    groups,
  });
}

export function setSearchQuery(searchQuery: ISearchQuery) {
  return action(Constants.S_SET_QUERY, {
    searchQuery,
  });
}
