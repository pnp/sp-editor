import { ActionType } from "typesafe-actions";
import * as actions from "./actions";
import { IGroup } from "@fluentui/react";

export type SearchActions = ActionType<typeof actions>;

export interface ISearchItem {
  key: string;
  property: string;
  value: string;
}

export interface ISearchState {
  items: ISearchItem[];
  groups: IGroup[];
  loading: boolean;
}

export enum Constants {
  S_GET_ITEMS = "S_GET_ITEMS",
}
