import { Dispatch } from 'redux';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import { IProxy, ProxyActions } from '../../../store/proxy/types';
import { addProxyScript } from './addproxy';

let listenerAdded = false; // Flag to check if listener is added
let listener: (tabId: number, changeInfo: any, tab: any) => void; // Listener reference

export async function addProxy(dispatch: Dispatch<ProxyActions | HomeActions>, payload: IProxy[], update?: boolean) {
  if (payload.length > 0 && !listenerAdded) {
    listener = (tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.active) {
        executeScript(dispatch, payload, update);
      }
    };
    chrome.tabs.onUpdated.addListener(listener);
    listenerAdded = true; // Set the flag to true after adding the listener
  } else if (payload.length === 0 && listenerAdded) {
    chrome.tabs.onUpdated.removeListener(listener);
    listenerAdded = false; // Reset the flag after removing the listener
  }

  executeScript(dispatch, payload, update);
}

function executeScript(dispatch: Dispatch<ProxyActions | HomeActions>, payload: IProxy[], update?: boolean) {
  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload, update],
    func: addProxyScript,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any;
      if (res.success) {
        dispatch(
          rootActions.setAppMessage({
            showMessage: true,
            message: payload.length > 0 ? 'Proxy Enabled!' : 'Proxy Disabled!',
            color: payload.length > 0 ? MessageBarColors.success : MessageBarColors.warning,
          })
        );
      } else {
        dispatch(rootActions.setLoading(false));
        dispatch(
          rootActions.setAppMessage({
            showMessage: true,
            message: res.errorMessage,
            color: MessageBarColors.danger,
          })
        );
      }
    }
  });
}