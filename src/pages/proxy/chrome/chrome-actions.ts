import { Dispatch } from 'redux';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import { IProxy, ProxyActions } from '../../../store/proxy/types';
import { executeScript } from '../../../utilities/script-injection';
import { addProxyScript } from './addproxy';

let listener: (tabId: number, changeInfo: any, tab: any) => void; // Listener reference

export async function addProxy(dispatch: Dispatch<ProxyActions | HomeActions>, enabled: boolean, payload: IProxy[], update?: boolean) {
  if (enabled) {
    chrome.tabs.onUpdated.removeListener(listener);
    listener = (tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.active) {
        executeProxyScript(dispatch, enabled, payload, false);
      }
    };
    chrome.tabs.onUpdated.addListener(listener);
  } else {
    chrome.tabs.onUpdated.removeListener(listener);
  }

  executeProxyScript(dispatch, enabled, payload, update);
}

async function executeProxyScript(dispatch: Dispatch<ProxyActions | HomeActions>, enabled: boolean, payload: IProxy[], update?: boolean) {
  try {
    const res = await executeScript('addProxyScript', addProxyScript, [payload, enabled, update]);
    
    if (res && res.success) {
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
          message: res?.errorMessage || 'Failed to execute proxy script',
          color: MessageBarColors.danger,
        })
      );
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to execute proxy script',
        color: MessageBarColors.danger,
      })
    );
  }
}