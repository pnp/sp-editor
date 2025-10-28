import { ActionButton, CommandBar, DefaultButton, Dialog, DialogFooter, DialogType, Panel, PanelType, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { deleteSearchQuery, saveSearchQuery, setAllQueries, setOptionsPanel, setSearchQuery, setSearchResults } from '../../../store/search/actions';
import * as rootActions from '../../../store/home/actions';
import { MessageBarColors } from '../../../store/home/types';
import { useEffect, useState } from 'react';
import { ISearchHistory } from '../../../store/search/types';
import { replaceDateTokens } from './searchqueryform';
import { executeScript } from '../../../utilities/utilities';

const SearchCommands = () => {
  const dispatch = useDispatch();

  const { searchQuery, optionsPanel, searchHistory } = useSelector((state: IRootState) => state.search);
  const [showSaveQueryDialog, setShowSaveQueryDialog] = useState(false);
  const [showSearchHistoryPanel, setShowSearchHistoryPanel] = useState(false);
  const [queryName, setQueryName] = useState('');

  useEffect(() => {
    const storedQueries = localStorage.getItem('searchHistory');
    if (storedQueries) {
      const parsedQueries = JSON.parse(storedQueries);
      dispatch(setAllQueries(parsedQueries));
    }
  }, []);

  const indexWebOnClick = async () => {
    dispatch(rootActions.setLoading(true));
    
    try {
      const res = await executeScript('reindexweb', () => {}, [chrome.runtime.getURL('')]);
      
      if (res?.errorMessage) {
        dispatch(
          rootActions.setAppMessage({
            showMessage: true,
            message: res.errorMessage,
            color: MessageBarColors.danger,
          })
        );
      } else {
        dispatch(
          rootActions.setAppMessage({
            showMessage: true,
            message: 'Reindexing complete',
            color: MessageBarColors.success,
          })
        );
      }
      
      dispatch(rootActions.setLoading(false));
    } catch (error) {
      dispatch(rootActions.setLoading(false));
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: error instanceof Error ? error.message : 'Failed to reindex web',
          color: MessageBarColors.danger,
        })
      );
    }
  };

  const handleSearch = async () => {
    dispatch(rootActions.setLoading(true));

    const modifiedQuery = { ...searchQuery };
    modifiedQuery.Querytext = replaceDateTokens(searchQuery.Querytext ?? '');
    modifiedQuery.QueryTemplate = replaceDateTokens(searchQuery.QueryTemplate ?? '');

    try {
      const res = await executeScript('runsearch', () => {}, [modifiedQuery, chrome.runtime.getURL('')]);
      handleSearchResults(res);
    } catch (error) {
      dispatch(rootActions.setLoading(false));
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: error instanceof Error ? error.message : 'Search failed',
          color: MessageBarColors.danger,
        })
      );
    }
  };

  const handleCurrentPageSearch = async () => {
    dispatch(rootActions.setLoading(true));
    
    try {
      const res = await executeScript('currentpageallprops', () => {}, [chrome.runtime.getURL('')]);
      handleSearchResults(res);
    } catch (error) {
      dispatch(rootActions.setLoading(false));
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: error instanceof Error ? error.message : 'Failed to search current page',
          color: MessageBarColors.danger,
        })
      );
    }
  };

  const handleSearchResults = (res: any) => {
    if (res?.errorMessage) {
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage,
          color: MessageBarColors.danger,
        })
      );
      dispatch(setSearchResults([], [], [], [], undefined));
    } else {
      let items: any[] = [];
      let groups: any[] = [];
      let uniqueKey = 0;
      let startIndex = 0;

      // Map refiners
      let refinersItems: any[] = [];
      let refinersGroups: any[] = [];
      let refinersUniqueKey = 0;
      let refinersStartIndex = 0;

      if (res.Refiners && res.Refiners.Refiners && res.Refiners.Refiners.results) {
        res.Refiners.Refiners.results.forEach((refiner: any) => {
          if (refiner.Entries && refiner.Entries.results) {
            // Create a group for each refiner
            refinersGroups.push({
              key: refiner.Name || `refiner-${refinersStartIndex}`,
              name: refiner.Name || "Unknown Refiner",
              startIndex: refinersStartIndex,
              count: refiner.Entries.results.length,
              level: 0,
              isCollapsed: true,
            });

            // Map each entry in the refiner
            const refinementItems = refiner.Entries.results.map((entry: any, index: number) => ({
              key: refinersUniqueKey++,
              refinementName: entry.RefinementName || "",
              refinementValue: entry.RefinementValue || "",
              refinementCount: entry.RefinementCount || "0",
              refinementToken: entry.RefinementToken || "",
              refinerName: refiner.Name || "Unknown Refiner",
              row: index + 1
            }));

            refinersItems = [...refinersItems, ...refinementItems];
            refinersStartIndex += refiner.Entries.results.length;
          }
        });
      }

      if (res.PrimarySearchResults && Array.isArray(res.PrimarySearchResults)) {
        res.PrimarySearchResults.forEach((item: any) => {
          const temp = Object.keys(item)
            .map((name) => ({
              DocId: item.DocId,
              property: name,
              value: item[name],
            }))
            .sort((a, b) => a.property.toLowerCase().localeCompare(b.property.toLowerCase()));

          const newItems = temp.map((tempItem, i) => ({
            row: i + 1,
            key: uniqueKey++,
            property: tempItem.property,
            value: tempItem.value,
            DocId: tempItem.DocId,
          }));

          items = [...items, ...newItems];

          groups.push({
            key: item.DocId,
            name: item.Title,
            startIndex: startIndex,
            count: Object.keys(item).length,
            level: 0,
            isCollapsed: true,
          });

          startIndex += Object.keys(item).length;
        });
      }

      dispatch(setSearchResults(items, groups, refinersItems, refinersGroups, res));
    }

    dispatch(rootActions.setLoading(false));
  };

  return (
    <>
      <CommandBar
        items={[
          {
            key: 'Search',
            onRender: () => (
              <PrimaryButton
                text="Search"
                allowDisabledFocus
                styles={{ root: { marginTop: 6, marginRight: 6 } }}
                onClick={() => { handleSearch(); }}
              />
            ),
          },
          {
            key: 'Options',
            text: 'Options',
            iconProps: { iconName: 'CheckList' },
            onClick: () => {
              dispatch(setOptionsPanel(!optionsPanel));
            },
          },
          {
            key: 'Save',
            text: 'Save query',
            iconProps: { iconName: 'Save' },
            onClick: () => {
              setShowSaveQueryDialog(true);
            },
          },
          {
            key: 'Load',
            text: 'View queries',
            iconProps: { iconName: 'OfflineStorage' },
            onClick: () => {
              setShowSearchHistoryPanel(true);
            },
          },
        ]}
        farItems={[
          {
            key: 'SearchPage',
            text: 'Search Current Page',
            iconProps: { iconName: 'SearchAndApps' },
            onClick: () => { handleCurrentPageSearch(); },
          },
          {
            key: 'IndexWeb',
            text: 'Reindex Current Web',
            iconProps: { iconName: 'SiteScan' },
            onClick: () => { indexWebOnClick(); },
          },
        ]}
      />
      <Dialog
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Save query',
          closeButtonAriaLabel: 'Close',
        }}
        onDismiss={() => {
          setShowSaveQueryDialog(false);
          setQueryName('');
        }}
        hidden={!showSaveQueryDialog}
      >
        <TextField label="Query name" value={queryName} onChange={(e, newValue) => setQueryName(newValue ?? '')} />
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              const newSearchHistory: ISearchHistory = {
                ...searchQuery,
                queryName: queryName,
              };
              dispatch(saveSearchQuery(newSearchHistory));
              setShowSaveQueryDialog(false);
              setQueryName('');
            }}
            text="Save"
            disabled={!queryName}
          />
          <DefaultButton
            onClick={() => {
              setShowSaveQueryDialog(false);
              setQueryName('');
            }}
            text="Cancel"
          />
        </DialogFooter>
      </Dialog>
      <Panel
        isOpen={showSearchHistoryPanel}
        onDismiss={() => setShowSearchHistoryPanel(false)}
        type={PanelType.smallFixedFar}
        headerText="Saved Search Queries"
        closeButtonAriaLabel="Close"
        isLightDismiss={true}
        styles={{ content: { paddingLeft: 0, paddingRight: 0 } }}
      >
        <Stack>
          {searchHistory.map((query: ISearchHistory, index) => (
            <Stack horizontal key={index} styles={{ root: { width: '100%' } }}>
              <Stack.Item align="start" grow>
                <ActionButton
                  iconProps={{ iconName: 'SearchBookmark' }}
                  onClick={() => {
                    const { queryName, ...searchQueryWithoutName } = query;
                    dispatch(setSearchQuery(searchQueryWithoutName));
                    setShowSearchHistoryPanel(false);
                  }}
                  text={query.queryName}
                  styles={{ root: { display: 'inline-block', width: '100%', textAlign: 'start' } }}
                />
              </Stack.Item>
              <Stack.Item align="end">
                <ActionButton
                  iconProps={{ iconName: 'Delete' }}
                  onClick={() => {
                    dispatch(deleteSearchQuery(index));
                  }}
                />
              </Stack.Item>
            </Stack>
          ))}
        </Stack>
      </Panel>
    </>
  );
};

export default SearchCommands;