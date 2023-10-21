import { Constants, ISearchState, SearchActions } from "./types";

const init: ISearchState = {
  items: [
    { key: "a", property: "a", value: "red" },
    { key: "b", property: "b", value: "red" },
    { key: "c", property: "c", value: "blue" },
    { key: "d", property: "d", value: "blue" },
    { key: "e", property: "e", value: "blue" },
  ],
  groups: [
    {
      key: "groupred0",
      name: "documents kekkonen",
      startIndex: 0,
      count: 2,
      level: 0,
      isCollapsed: true,
    },
    {
      key: "groupgreen2",
      name: "page 2",
      startIndex: 2,
      count: 0,
      level: 0,
      isCollapsed: true,
    },
    {
      key: "groupblue2",
      name: "Tomi Tavela",
      startIndex: 2,
      count: 3,
      level: 0,
      isCollapsed: true,
    },
  ],
  loading: false,
};

export function searchReducer(
  state: ISearchState = init,
  action: SearchActions
): ISearchState {
  switch (action.type) {
    case Constants.S_GET_ITEMS:
      return {
        ...state,
        items: action.payload.items,
        groups: action.payload.groups,
      };

    default:
      return state;
  }
}
