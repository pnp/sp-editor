import {
  ActionButton,
  CheckboxVisibility,
  DetailsList,
  DetailsListLayoutMode,
  GroupHeader,
  IColumn,
  IDetailsList,
  IGroupHeaderProps,
  ScrollablePane,
  SelectionMode,
  Stack,
} from "@fluentui/react";
import { Text } from "@fluentui/react";
import { allprops } from "../chrome/allprops";
import * as rootActions from "../../../store/home/actions";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../store";
import SearchQueryForm from "./searchqueryform";
import { useRef, useState } from "react";
import { setSearchResults } from "../../../store/search/actions";

const SearchResults = () => {
  const { items, groups } = useSelector((state: IRootState) => state.search);
  const dispatch = useDispatch();

  const root = useRef<IDetailsList>(null);

  const [columns] = useState<IColumn[]>([
    {
      key: "row",
      name: "Row",
      fieldName: "row",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: "property",
      name: "Property",
      fieldName: "property",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "value",
      name: "Value",
      fieldName: "value",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
    },
  ]);

  return (
    <Stack grow horizontal style={{ height: "100%" }}>
      <Stack style={{ width: "60%" }}>
        <SearchQueryForm />
      </Stack>
      <Stack
        style={{
          width: "40%",
          marginLeft: "10px",
          marginRight: "10px",
        }}
      >
        <ScrollablePane
          style={{
            marginLeft: "400px",
            marginTop: "50px",
            marginBottom: "25px",
          }}
        >
          <DetailsList
            isHeaderVisible={true}
            onShouldVirtualize={() => false}
            layoutMode={DetailsListLayoutMode.justified}
            checkboxVisibility={CheckboxVisibility.hidden}
            selectionMode={SelectionMode.single}
            componentRef={root}
            items={items}
            groups={groups}
            columns={columns}
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            ariaLabelForSelectionColumn="Toggle selection"
            checkButtonAriaLabel="select row"
            checkButtonGroupAriaLabel="select section"
            groupProps={{
              showEmptyGroups: true,
              isAllGroupsCollapsed: false,
              onRenderHeader: (props?: IGroupHeaderProps) => {
                return (
                  <GroupHeader
                    {...props}
                    onRenderTitle={() => {
                      return (
                        <>
                          <Text variant={"large"}>
                            {`${props?.group?.name} (${props?.group?.count})`}
                          </Text>
                          <ActionButton
                            hidden={props?.group?.isCollapsed}
                            iconProps={{ iconName: "AllApps" }}
                            text={"Load all properties"}
                            style={{
                              marginLeft: "auto",
                              backgroundColor: "transparent",
                            }}
                            onClick={() => {
                              dispatch(rootActions.setLoading(true));
                              chrome.scripting
                                .executeScript({
                                  target: {
                                    tabId:
                                      chrome.devtools.inspectedWindow.tabId,
                                  },
                                  world: "MAIN",
                                  args: [
                                    props?.group?.key,
                                    null,
                                    chrome.runtime.getURL(""),
                                  ],
                                  func: allprops,
                                })
                                .then((injectionResults) => {
                                  if (injectionResults[0].result) {
                                    const res = injectionResults[0]
                                      .result as any;

                                    // Extract the properties from the search results and sort them alphabetically
                                    const temp =
                                      res.PrimarySearchResults.flatMap((item) =>
                                        Object.entries(item).map(
                                          ([property, value]) => ({
                                            DocId: item.DocId,
                                            property,
                                            value,
                                          })
                                        )
                                      ).sort((a, b) =>
                                        a.property.toLowerCase() >
                                        b.property.toLowerCase()
                                          ? 1
                                          : b.property.toLowerCase() >
                                            a.property.toLowerCase()
                                          ? -1
                                          : 0
                                      );

                                    // Find the highest key value in the existing items and add 1 to get the next key value
                                    const highestKey =
                                      items.reduce(
                                        (maxKey, item) =>
                                          Math.max(maxKey, parseInt(item.key)),
                                        0
                                      ) + 1;

                                    // Add row and key properties to the search results and create a new array
                                    const tempWithProps = temp.map(
                                      (item, index) => ({
                                        row: index + 1,
                                        key: highestKey + index,
                                        ...item,
                                      })
                                    );

                                    // Remove the existing items with the same DocId as the current group and add the new items
                                    const newItems = items.filter(
                                      (item) => item.DocId !== props?.group?.key
                                    );
                                    const newItems2 =
                                      newItems.concat(tempWithProps);

                                    // Update the groups with the new start index, count, and collapsed state
                                    const newGroups = groups.map((group) => ({
                                      ...group,
                                      startIndex: newItems2.findIndex(
                                        (item) => item.DocId === group.key
                                      ),
                                      count: newItems2.filter(
                                        (item) => item.DocId === group.key
                                      ).length,
                                      isCollapsed:
                                        group.key === props?.group?.key
                                          ? false
                                          : group.isCollapsed,
                                    }));

                                    // Update the search results and stop the loading spinner
                                    dispatch(
                                      setSearchResults(newItems2, newGroups)
                                    );
                                    dispatch(rootActions.setLoading(false));
                                  } else {
                                    console.log(
                                      "Injection failed: ",
                                      injectionResults
                                    );
                                    dispatch(rootActions.setLoading(false));
                                  }
                                });
                            }}
                          />
                        </>
                      );
                    }}
                  />
                );
              },
            }}
          />
        </ScrollablePane>
      </Stack>
    </Stack>
  );
};

export default SearchResults;
