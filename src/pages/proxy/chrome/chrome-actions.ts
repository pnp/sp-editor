import { Dispatch } from 'redux';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import { IProxy, ProxyActions } from '../../../store/proxy/types';
import { addProxyScript } from './addproxy';

let listener: (tabId: number, changeInfo: any, tab: any) => void; // Listener reference

export async function addProxy(dispatch: Dispatch<ProxyActions | HomeActions>, enabled: boolean, payload: IProxy[], update?: boolean) {
  if ((enabled)) {
    chrome.tabs.onUpdated.removeListener(listener);
    listener = (tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.active) {
        executeScript(dispatch, enabled, payload, false);
      }
    };
    chrome.tabs.onUpdated.addListener(listener);
  } else {
    chrome.tabs.onUpdated.removeListener(listener);
  }

  executeScript(dispatch, enabled, payload, update);
}

function executeScript(dispatch: Dispatch<ProxyActions | HomeActions>, enabled: boolean, payload: IProxy[], update?: boolean) {
  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload, enabled, update],
    func: addProxyScript,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any;
      if (res.success) {
        dispatch(
          rootActions.setAppMessage({
            showMessage: true,
            message: enabled ? update ? 'Proxy updated' : 'Proxy enabled' : 'Proxy disabled',
            color: enabled ? MessageBarColors.success : MessageBarColors.warning,
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