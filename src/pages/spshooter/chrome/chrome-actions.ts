import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/spshoot/actions'
import { ISPShootPayload, SPShootActions } from '../../../store/spshoot/types'
import { shoot } from './shoot'

export async function runRestCall(dispatch: Dispatch<SPShootActions | HomeActions>, payload: ISPShootPayload) {

  dispatch(rootActions.setLoading(true));

  chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      world: 'MAIN',
      args: [payload, chrome.runtime.getURL('')],
      func: shoot,
    }).then(injectionResults => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result
        if (res.success === false) {
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: res.errorMessage,
            color: MessageBarColors.danger,
          }))
        }
        dispatch(actions.setResults(res))
        dispatch(rootActions.setLoading(false))
      }
    });
  });

}

export async function getContextInfo(dispatch: Dispatch<SPShootActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));

  chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      world: 'MAIN',
      func: () => {
        return (window as any)._spPageContextInfo || ((window as any).moduleLoaderPromise ? (window as any).moduleLoaderPromise.then((e: any) => {
          return (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
        }) : null);
      }
    }).then(injectionResults => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result
        dispatch(actions.setContext(res))
        dispatch(rootActions.setLoading(false))
      } else {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'Could not get context info!',
          color: MessageBarColors.danger,
        }))
      }
      dispatch(rootActions.setLoading(false))
    });
  });

}
