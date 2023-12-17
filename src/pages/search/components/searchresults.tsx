import {
  ActionButton,
  CheckboxVisibility,
  DetailsList,
  DetailsListLayoutMode,
  GroupHeader,
  IColumn,
  IDetailsList,
  IGroupHeaderProps,
  IScrollablePaneStyles,
  IStackItemStyles,
  IStackStyles,
  ScrollablePane,
  SelectionMode,
  Stack,
  Sticky,
  StickyPositionType,
} from '@fluentui/react';
import { Text } from '@fluentui/react';
import { allprops } from '../chrome/allprops';
import * as rootActions from '../../../store/home/actions';

import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import SearchQueryForm from './searchqueryform';
import { useRef, useState } from 'react';
import { setSearchResults } from '../../../store/search/actions';

const SearchResults = () => {
  const { items, groups, searchResults, searchQuery } = useSelector((state: IRootState) => state.search);
  const dispatch = useDispatch();

  const root = useRef<IDetailsList>(null);

  const [columns] = useState<IColumn[]>([
    {
      key: 'row',
      name: 'Row',
      fieldName: 'row',
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: 'property',
      name: 'Property',
      fieldName: 'property',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'value',
      name: 'Value',
      fieldName: 'value',
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
    },
  ]);

  // make columns sticky
  const renderHeader = (headerProps: any, defaultRender: any) => {
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={false}>
        {searchResults && (
          <Text
            variant={'medium'}
          >{`Results, ${searchResults.TotalRows} hits in ${searchResults.ElapsedTime}ms. Total rows with dublicates ${searchResults.TotalRowsIncludingDuplicates}`}</Text>
        )}
        {defaultRender(headerProps)}
      </Sticky>
    );
  };

  // Non-mutating styles definition
  const queryEditorStackStyles: IStackItemStyles = {
    root: {
      width: 500,
    },
  };

  // Non-mutating styles definition
  const previewStackStyles: IStackItemStyles = {
    root: {
      width: 400,
    },
  };

  const nonShrinkingStackItemStyles: IStackItemStyles = {
    root: {
      // width: "calc(100% - 600px)",
    },
  };

  // Mutating styles definition
  const stackStyles: IStackStyles = {
    root: {
      width: `100%`,
    },
  };

  const scrollablePaneStyles: IScrollablePaneStyles = {
    root: {
      marginTop: 50,
      marginRight: 410,
      marginLeft: 510,
    },
    stickyAbove: undefined,
    stickyBelow: undefined,
    stickyBelowItems: undefined,
    contentContainer: undefined,
  };

  return (
    <Stack enableScopedSelectors horizontal styles={stackStyles}>
      <Stack.Item disableShrink styles={queryEditorStackStyles}>
        <SearchQueryForm />
      </Stack.Item>
      <Stack.Item grow disableShrink styles={nonShrinkingStackItemStyles}>
        <ScrollablePane styles={scrollablePaneStyles}>
          {/* {searchResults && <Text variant={"medium"}>{`Search results (${searchResults.TotalRows} rows)`}</Text>} */}
          <DetailsList
            isHeaderVisible={true}
            onShouldVirtualize={() => false}
            layoutMode={DetailsListLayoutMode.justified}
            checkboxVisibility={CheckboxVisibility.hidden}
            selectionMode={SelectionMode.single}
            componentRef={root}
            styles={{
              root: {
                width: '100%',
              },
            }}
            items={items}
            groups={groups}
            columns={columns}
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            ariaLabelForSelectionColumn="Toggle selection"
            checkButtonAriaLabel="select row"
            checkButtonGroupAriaLabel="select section"
            onRenderDetailsHeader={renderHeader}
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
                          <Text variant={'large'}>{`${props?.group?.name} (${props?.group?.count})`}</Text>
                          <ActionButton
                            //hidden={props?.group?.isCollapsed}
                            iconProps={{ iconName: 'OpenInNewTab' }}
                            text={'open in new tab'}
                            style={{
                              marginLeft: 'auto',
                              backgroundColor: 'transparent',
                            }}
                            onClick={() => {
                              const properties = props as any;
                              const link = properties.selection._items.find(
                                (o) => o.DocId === props?.group?.key && o.property === 'OriginalPath'
                              ).value;
                              // let obj = props?.group?.data.find((o) => o.key === "OriginalPath");
                              chrome.tabs.create({ url: link });
                            }}
                          />
                          <ActionButton
                            //hidden={props?.group?.isCollapsed}
                            iconProps={{ iconName: 'AllApps' }}
                            text={'Load all properties'}
                            style={{
                              backgroundColor: 'transparent',
                            }}
                            onClick={() => {
                              dispatch(rootActions.setLoading(true));
                              chrome.scripting
                                .executeScript({
                                  target: {
                                    tabId: chrome.devtools.inspectedWindow.tabId,
                                  },
                                  world: 'MAIN',
                                  args: [props?.group?.key, null, chrome.runtime.getURL('')],
                                  func: allprops,
                                })
                                .then((injectionResults) => {
                                  if (injectionResults[0].result) {
                                    const res = injectionResults[0].result as any;

                                    // Extract the properties from the search results and sort them alphabetically
                                    const temp = res.PrimarySearchResults.flatMap((item) =>
                                      Object.entries(item).map(([property, value]) => ({
                                        DocId: item.DocId,
                                        property,
                                        value,
                                      }))
                                    ).sort((a, b) =>
                                      a.property.toLowerCase() > b.property.toLowerCase()
                                        ? 1
                                        : b.property.toLowerCase() > a.property.toLowerCase()
                                        ? -1
                                        : 0
                                    );

                                    // Find the highest key value in the existing items and add 1 to get the next key value
                                    const highestKey =
                                      items.reduce((maxKey, item) => Math.max(maxKey, parseInt(item.key)), 0) + 1;

                                    // Add row and key properties to the search results and create a new array
                                    const tempWithProps = temp.map((item, index) => ({
                                      row: index + 1,
                                      key: highestKey + index,
                                      ...item,
                                    }));

                                    // Remove the existing items with the same DocId as the current group and add the new items
                                    const newItems = items.filter((item) => item.DocId !== props?.group?.key);
                                    const newItems2 = newItems.concat(tempWithProps);

                                    // Update the groups with the new start index, count, and collapsed state
                                    const newGroups = groups.map((group) => ({
                                      ...group,
                                      startIndex: newItems2.findIndex((item) => item.DocId === group.key),
                                      count: newItems2.filter((item) => item.DocId === group.key).length,
                                      isCollapsed: group.key === props?.group?.key ? false : group.isCollapsed,
                                    }));

                                    // Update the search results and stop the loading spinner
                                    dispatch(setSearchResults(newItems2, newGroups, searchResults));
                                    dispatch(rootActions.setLoading(false));
                                  } else {
                                    console.log('Injection failed: ', injectionResults);
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
      </Stack.Item>
      <Stack.Item disableShrink styles={previewStackStyles}>
        <Text variant={'medium'}>Payload preview</Text>
        <pre spellCheck="false">{JSON.stringify(searchQuery, null, 2)}</pre>
      </Stack.Item>
    </Stack>
  );
};

export default SearchResults;
