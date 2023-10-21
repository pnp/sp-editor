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

const SearchCommands = () => {
  const dispatch = useDispatch();

  var payload = {
    Querytext: "contentclass:STS_Web",
    RowLimit: 50,
    StartRow: 0,
    ClientType: "ContentSearchRegular",
    EnableNicknames: false,
    TrimDuplicates: true,
    SelectProperties: ["Webid", "OriginalPath", "Title", "DocId"],
  };

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
                console.log("Search clicked");
                chrome.scripting
                  .executeScript({
                    target: { tabId: chrome.devtools.inspectedWindow.tabId },
                    world: "MAIN",
                    args: [payload, chrome.runtime.getURL("")],
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
                    } else {
                      console.log("Injection failed: ", injectionResults);
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
