import { CommandBar, PrimaryButton } from '@fluentui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../store';
import { runsearch } from '../chrome/runsearch';
import { setOptionsPanel, setSearchResults } from '../../../store/search/actions';
import * as rootActions from '../../../store/home/actions';
import { MessageBarColors } from '../../../store/home/types';
import { currentpageallprops } from '../chrome/currentpageallprops';
import { reindexweb } from '../chrome/reindexweb';

const SearchCommands = () => {
  const dispatch = useDispatch();

  const { searchQuery, optionsPanel } = useSelector((state: IRootState) => state.search);

  const indexWebOnClick = () => {
    dispatch(rootActions.setLoading(true));
    chrome.scripting
      .executeScript({
        target: { tabId: chrome.devtools.inspectedWindow.tabId },
        world: 'MAIN',
        args: [chrome.runtime.getURL('')],
        func: reindexweb,
      })
      .then((injectionResults) => {
        if (injectionResults[0].result) {
          const res = injectionResults[0].result as any;
          if (res.errorMessage) {
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
        }
      });
  };

  return (
    <CommandBar
      items={[
        {
          key: 'Search',
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
                    world: 'MAIN',
                    args: [searchQuery, chrome.runtime.getURL('')],
                    func: runsearch,
                  })
                  .then((injectionResults) => handleInjectionResults(injectionResults, dispatch));
              }}
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
      ]}
      farItems={[
        {
          key: 'SearchPage',
          text: 'Search Current Page',
          iconProps: { iconName: 'SearchAndApps' },
          onClick: () => {
            dispatch(rootActions.setLoading(true));
            chrome.scripting
              .executeScript({
                target: { tabId: chrome.devtools.inspectedWindow.tabId },
                world: 'MAIN',
                args: [chrome.runtime.getURL('')],
                func: currentpageallprops,
              })
              .then((injectionResults) => handleInjectionResults(injectionResults, dispatch));
          },
        },
        {
          key: 'IndexWeb',
          text: 'Reindex Current Web',
          iconProps: { iconName: 'SiteScan' },
          onClick: () => indexWebOnClick(),
        },
      ]}
    />
  );

  function handleInjectionResults(injectionResults: any, dispatch: Function) {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any;
      if (res.errorMessage) {
        dispatch(
          rootActions.setAppMessage({
            showMessage: true,
            message: res.errorMessage,
            color: MessageBarColors.danger,
          })
        );
        dispatch(setSearchResults([], [], undefined));
      } else {
        var items: any[] = [];
        var groups: any[] = [];
        var uniqueKey = 0;
        var startIndex = 0;
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

        dispatch(setSearchResults(items, groups, res));
      }
    } else {
      console.log('Injection failed: ', injectionResults);
    }
    dispatch(rootActions.setLoading(false));
  }
};

export default SearchCommands;
