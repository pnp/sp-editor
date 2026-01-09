import { Dispatch } from 'redux';
import * as actions from '../../../store/search/actions';
import * as rootActions from '../../../store/home/actions';
import { MessageBarColors } from '../../../store/home/types';
import { ICrawlLogFilter } from '../../../store/search/types';
import { getCrawlLog as getCrawlLogFunc, ICrawlLogParams } from './getcrawllog';

export function fetchCrawlLog(dispatch: Dispatch, filter: ICrawlLogFilter) {
  dispatch(rootActions.setLoading(true));
  dispatch(actions.setCrawlLogLoading(true));
  dispatch(actions.setCrawlLogEntries([])); // Clear previous results
  dispatch(actions.incrementCrawlLogFetchCount()); // Signal to reset client-side filters

  // Ensure dates are properly converted - they may be strings after Redux serialization
  const startDate = filter.startDate instanceof Date ? filter.startDate : new Date(filter.startDate);
  const endDate = filter.endDate instanceof Date ? filter.endDate : new Date(filter.endDate);

  const params: ICrawlLogParams = {
    logLevel: filter.logLevel,
    contentSource: filter.contentSource,
    rowLimit: filter.rowLimit,
    filter: filter.filter,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [params, chrome.runtime.getURL('')],
      func: getCrawlLogFunc,
    })
    .then((injectionResults) => {
      const res = injectionResults[0]?.result as any;
      
      if (res?.success === false) {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage || 'Failed to fetch crawl log entries',
          color: MessageBarColors.danger,
        }));
        dispatch(actions.setCrawlLogEntries([]));
      } else if (res?.entries) {
        dispatch(actions.setCrawlLogEntries(res.entries));
        if (res.entries.length === 0) {
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: 'No crawl log entries found matching your filter criteria',
            color: MessageBarColors.warning,
          }));
        } else {
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: `Found ${res.entries.length} crawl log entries`,
            color: MessageBarColors.success,
          }));
        }
      }
      
      dispatch(actions.setCrawlLogLoading(false));
      dispatch(rootActions.setLoading(false));
    })
    .catch((error) => {
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: error.message || 'Failed to fetch crawl log. Make sure you have access to the crawl log via the SharePoint search admin center.',
        color: MessageBarColors.danger,
      }));
      dispatch(actions.setCrawlLogLoading(false));
      dispatch(rootActions.setLoading(false));
    });
}
