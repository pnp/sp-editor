import {
  ActionButton,
  CommandBar,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  Dropdown,
  IStackStyles,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import { runsearch } from "../chrome/runsearch";
import { setSearchResults } from "../../../store/search/actions";
import * as rootActions from "../../../store/home/actions";

const SearchCommands = () => {
  const dispatch = useDispatch();

  const { searchQuery } = useSelector((state: IRootState) => state.search);

  return (
    <CommandBar
      items={[
        {
          key: "Search",
          onRender: () => (
            <PrimaryButton
              text="Search"
              allowDisabledFocus
              styles={{ root: { marginTop: 6, marginRight: 6 } }}
              onClick={() => {
                dispatch(rootActions.setLoading(true));
                chrome.scripting
                  .executeScript({
                    target: { tabId: chrome.devtools.inspectedWindow.tabId },
                    world: "MAIN",
                    args: [searchQuery, chrome.runtime.getURL("")],
                    func: runsearch,
                  })
                  .then((injectionResults) => {
                    if (injectionResults[0].result) {
                      const res = injectionResults[0].result as any;
                      var items = [];
                      var groups = [];
                      var uniqueKey = 0;
                      var startIndex = 0;
                      res.PrimarySearchResults.forEach(function (item) {
                        var temp = [];
                        for (var name in item) {
                          temp.push({
                            DocId: item["DocId"],
                            property: name,
                            value: item[name],
                          });
                        }
                        temp.sort((a, b) =>
                          a.property.toLowerCase() > b.property.toLowerCase()
                            ? 1
                            : b.property.toLowerCase() >
                              a.property.toLowerCase()
                            ? -1
                            : 0
                        ); // Sort the temp array by the property property alphabetically

                        for (var i = 0; i < temp.length; i++) {
                          items.push({
                            row: i + 1,
                            key: uniqueKey++,
                            property: temp[i].property,
                            value: temp[i].value,
                            DocId: temp[i].DocId,
                          }); // Push each item from temp to items and add unique key
                        }

                        groups.push({
                          key: item["DocId"],
                          name: item.Title,
                          startIndex: startIndex,
                          count: Object.keys(item).length,
                          level: 0,
                          isCollapsed: true,
                        });
                        startIndex = startIndex + Object.keys(item).length; // Increase the start index by the number of properties in the item
                      });

                      dispatch(setSearchResults(items, groups));
                      dispatch(rootActions.setLoading(false));
                    } else {
                      console.log("Injection failed: ", injectionResults);
                      dispatch(rootActions.setLoading(false));
                    }
                  });
              }}
            />
          ),
        },
        {
          key: "Options",
          text: "Query Options",
          iconProps: { iconName: "MultiSelect" },
          split: true,
        },
        {
          key: "Payload",
          text: "Show Payload",
          iconProps: { iconName: "Code" },
        },
      ]}
      farItems={[
        {
          key: "SearchPage",
          text: "Search Current Page",
          iconProps: { iconName: "SearchAndApps" },
        },
        {
          key: "IndexWeb",
          text: "Reindex Current Web",
          iconProps: { iconName: "SiteScan" },
        },
      ]}
    />
  );
};

export default SearchCommands;
