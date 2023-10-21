import { action } from "typesafe-actions";
import { Constants, ISearchItem } from "./types";
import { IGroup } from "@fluentui/react";

export function setSearchResults(items: ISearchItem[], groups: IGroup[]) {
  return action(Constants.S_GET_ITEMS, {
    items,
    groups,
  });
}
