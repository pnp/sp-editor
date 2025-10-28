import {
  ActionButton,
  CheckboxVisibility,
  DetailsList,
  DetailsListLayoutMode,
  GroupHeader,
  IColumn,
  IDetailsList,
  IGroup,
  IGroupHeaderProps,
  IScrollablePaneStyles,
  IStackItemStyles,
  IStackStyles,
  Pivot,
  PivotItem,
  ScrollablePane,
  SelectionMode,
  Stack,
  Sticky,
  StickyPositionType,
} from '@fluentui/react';
import { Text } from '@fluentui/react';
import * as rootActions from '../../../store/home/actions';

import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import SearchQueryForm from './searchqueryform';
import { useEffect, useRef, useState } from 'react';
import { setSearchResults } from '../../../store/search/actions';
import { MessageBarColors } from '../../../store/home/types';
import { executeScript } from '../../../utilities/utilities';

const SearchResults = () => {
  const {
    items,
    groups: rootGroups,
    searchResults,
    searchQuery,
    refinemenItems,
    refinemenGroups,
  } = useSelector((state: IRootState) => state.search);
  const [groups, setGroups] = useState(rootGroups);

  useEffect(() => {
    setGroups(rootGroups);
  }, [rootGroups]);

  const dispatch = useDispatch();
  const { isDark } = useSelector((state: IRootState) => state.home);

  const root = useRef<IDetailsList>(null);
  const root2 = useRef<IDetailsList>(null);

  const copyToClipboard = (value: string, message: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: message,
        color: MessageBarColors.success,
      })
    );
  };

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
      key: 'copyproperty',
      name: '',
      minWidth: 16,
      maxWidth: 16,
      isPadded: true,
      isResizable: false,
      onRender: (item) => (
        <ActionButton
          iconProps={{
            iconName: 'Copy',
            style: { width: '16px', height: '16px' },
            title: 'Copy property to clipboard',
          }}
          onClick={() => copyToClipboard(item.property, 'Property copied to clipboard')}
          styles={{
            root: {
              marginLeft: 'auto',
              backgroundColor: 'transparent',
              height: '6px',
              verticalAlign: 'middle',
              minWidth: 'auto',
            },
          }}
        ></ActionButton>
      ),
    },
    {
      key: 'value',
      name: 'Value',
      fieldName: 'value',
      minWidth: 100,
      isMultiline: true,
    },
    {
      key: 'copyvalue',
      name: '',
      minWidth: 16,
      maxWidth: 16,
      isPadded: true,
      isResizable: false,
      onRender: (item) => (
        <ActionButton
          iconProps={{ iconName: 'Copy', style: { width: '16px', height: '16px' }, title: 'Copy value to clipboard' }}
          onClick={() => copyToClipboard(item.value, 'Value copied to clipboard')}
          styles={{
            root: {
              marginLeft: 'auto',
              backgroundColor: 'transparent',
              height: '6px',
              verticalAlign: 'middle',
              minWidth: 'auto',
            },
          }}
        ></ActionButton>
      ),
    },
  ]);

  const [refinementColumns] = useState<IColumn[]>([
    {
      key: 'row',
      name: 'Row',
      fieldName: 'row',
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: 'refinementName',
      name: 'Refinement Name',
      fieldName: 'refinementName',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'refinementValue',
      name: 'Refinement Value',
      fieldName: 'refinementValue',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'refinementToken',
      name: 'Refinement Token',
      fieldName: 'refinementToken',
      minWidth: 100,
      isMultiline: true,
      isResizable: true,
    },
    {
      key: 'refinementCount',
      name: 'Count',
      fieldName: 'refinementCount',
      minWidth: 60,
      maxWidth: 80,
      isResizable: true,
    },
    {
      key: 'copyToken',
      name: '',
      minWidth: 16,
      maxWidth: 16,
      isPadded: true,
      isResizable: false,
      onRender: (item) => (
        <ActionButton
          iconProps={{
            iconName: 'Copy',
            style: { width: '16px', height: '16px' },
            title: 'Copy refinement token to clipboard',
          }}
          onClick={() => copyToClipboard(item.refinementToken, 'Refinement token copied to clipboard')}
          styles={{
            root: {
              marginLeft: 'auto',
              backgroundColor: 'transparent',
              height: '6px',
              verticalAlign: 'middle',
              minWidth: 'auto',
            },
          }}
        />
      ),
    },
  ]);

  const renderHeader = (headerProps: any, defaultRender: any) => {
    return (
      <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={false}>
        {searchResults && (
          <div style={{ width: '100%', height: '100%', backgroundColor: isDark ? 'black' : 'white' }}>
            <Stack>
              <Text variant={'medium'}>
                {`Results, ${searchResults.TotalRows} hits in ${searchResults.ElapsedTime}ms. Total rows with duplicates ${searchResults.TotalRowsIncludingDuplicates}`}
              </Text>
              {(searchResults?.RawSearchResults as any)?.RelevantResults?.Properties?.results[1]?.Value !== '0' && (
                <Text variant={'medium'}>
                  {`QueryModification: ${
                    (searchResults.RawSearchResults as any)?.RelevantResults?.Properties?.results[1]?.Value
                  }`}
                </Text>
              )}{' '}
            </Stack>
          </div>
        )}
        {defaultRender(headerProps)}
      </Sticky>
    );
  };

  const queryEditorStackStyles: IStackItemStyles = {
    root: {
      width: 310,
    },
  };

  const nonShrinkingStackItemStyles: IStackItemStyles = {
    root: {},
  };

  const stackStyles: IStackStyles = {
    root: {
      width: `100%`,
    },
  };

  const scrollablePaneStyles: IScrollablePaneStyles = {
    root: {
      marginTop: 50,
      marginRight: 20,
      marginLeft: 310,
    },
    stickyAbove: undefined,
    stickyBelow: undefined,
    stickyBelowItems: undefined,
    contentContainer: undefined,
  };

  const onToggleCollapse = (group?: IGroup) => {
    if (!group) return;

    const newGroups = groups.map((g) => {
      if (g.key === group.key) {
        return { ...g, isCollapsed: !g.isCollapsed };
      }
      return g;
    });

    setGroups(newGroups);
  };

  const handleLoadAllProperties = async (groupKey: string) => {
    dispatch(rootActions.setLoading(true));

    try {
      const res = await executeScript('allprops', () => {}, [
        groupKey,
        searchQuery.SourceId,
        chrome.runtime.getURL(''),
      ]);

      if (res && res.PrimarySearchResults) {
        // Extract the properties from the search results and sort them alphabetically
        const temp = res.PrimarySearchResults.flatMap((item: any) =>
          Object.entries(item).map(([property, value]) => ({
            DocId: item.DocId,
            property,
            value,
          }))
        ).sort((a: any, b: any) => {
          return a.property.toLowerCase().localeCompare(b.property.toLowerCase());
        });

        // Find the highest key value in the existing items and add 1 to get the next key value
        const highestKey = items.reduce((maxKey, item) => Math.max(maxKey, parseInt(item.key)), 0) + 1;

        // Add row and key properties to the search results and create a new array
        const tempWithProps = temp.map((item: any, index: any) => ({
          row: index + 1,
          key: highestKey + index,
          ...item,
        }));

        // Remove the existing items with the same DocId as the current group and add the new items
        const newItems = items.filter((item) => item.DocId !== groupKey);
        const newItems2 = newItems.concat(tempWithProps);

        // Update the groups with the new start index, count, and collapsed state
        const newGroups = groups.map((group) => ({
          ...group,
          startIndex: newItems2.findIndex((item) => item.DocId === group.key),
          count: newItems2.filter((item) => item.DocId === group.key).length,
          isCollapsed: group.key === groupKey ? false : group.isCollapsed,
        }));

        // Update the search results and stop the loading spinner
        dispatch(setSearchResults(newItems2, newGroups, [], [], searchResults));
      } else {
        dispatch(
          rootActions.setAppMessage({
            showMessage: true,
            message: 'Failed to load all properties',
            color: MessageBarColors.danger,
          })
        );
      }
      
      dispatch(rootActions.setLoading(false));
    } catch (error) {
      dispatch(rootActions.setLoading(false));
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: error instanceof Error ? error.message : 'Failed to load all properties',
          color: MessageBarColors.danger,
        })
      );
    }
  };

  return (
    <Stack enableScopedSelectors horizontal styles={stackStyles}>
      <Stack.Item disableShrink styles={queryEditorStackStyles}>
        <SearchQueryForm />
      </Stack.Item>
      <Stack.Item grow disableShrink styles={nonShrinkingStackItemStyles}>
        <Pivot>
          <PivotItem headerText="Search Results">
            <div style={{ position: 'relative', height: 'calc(100vh - 150px)' }}>
              <ScrollablePane>
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
                                <Text
                                  onClick={() => onToggleCollapse(props?.group!)}
                                  variant={'large'}
                                >{`${props?.group?.name} (${props?.group?.count})`}</Text>
                                <div
                                  style={{ flexGrow: 1, height: '100%' }}
                                  onClick={() => onToggleCollapse(props?.group!)}
                                ></div>
                                <ActionButton
                                  iconProps={{ iconName: 'OpenInNewTab' }}
                                  title={'open in new tab'}
                                  style={{
                                    marginLeft: 'auto',
                                    backgroundColor: 'transparent',
                                  }}
                                  onClick={() => {
                                    const properties = props as any;
                                    const link = properties.selection._items.find(
                                      (o: any) => o.DocId === props?.group?.key && o.property === 'OriginalPath'
                                    ).value;
                                    chrome.tabs.create({ url: link });
                                  }}
                                />
                                <ActionButton
                                  iconProps={{ iconName: 'AllApps' }}
                                  title={'Load all properties'}
                                  style={{
                                    backgroundColor: 'transparent',
                                  }}
                                  onClick={() => {
                                    handleLoadAllProperties(props?.group?.key as string);
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
            </div>
          </PivotItem>
          <PivotItem headerText="Refinement Results">
            <div style={{ position: 'relative', height: 'calc(100vh - 150px)' }}>
              <ScrollablePane>
                <DetailsList
                  isHeaderVisible={true}
                  onShouldVirtualize={() => false}
                  layoutMode={DetailsListLayoutMode.justified}
                  checkboxVisibility={CheckboxVisibility.hidden}
                  selectionMode={SelectionMode.single}
                  componentRef={root2}
                  styles={{
                    root: {
                      width: '100%',
                    },
                  }}
                  items={refinemenItems}
                  groups={refinemenGroups}
                  columns={refinementColumns}
                  onRenderDetailsHeader={renderHeader}
                />
              </ScrollablePane>
            </div>
          </PivotItem>
        </Pivot>
      </Stack.Item>
    </Stack>
  );
};

export default SearchResults;
