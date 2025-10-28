import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/spshoot/actions'
import { ISPShootPayload, SPShootActions } from '../../../store/spshoot/types'
import { executeScript } from '../../../utilities/script-injection'
import { shoot } from './shoot'

export async function runRestCall(dispatch: Dispatch<SPShootActions | HomeActions>, payload: ISPShootPayload) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('shoot', shoot, [payload, chrome.runtime.getURL('')]);
    
    if (res && res.success === false) {
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res.errorMessage,
        color: MessageBarColors.danger,
      }));
    }
    
    dispatch(actions.setResults(res));
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to execute REST call',
      color: MessageBarColors.danger,
    }));
  }
}

export async function getContextInfo(dispatch: Dispatch<SPShootActions | HomeActions>) {
  dispatch(rootActions.setLoading(true));

  try {
    const getContextFunc = () => {
      return (window as any)._spPageContextInfo || ((window as any).moduleLoaderPromise ? (window as any).moduleLoaderPromise.then((e: any) => {
        return (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
      }) : null);
    };

    const res = await executeScript('getContextInfo', getContextFunc, []);
    
    if (res) {
      dispatch(actions.setContext(res));
    } else {
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'Could not get context info!',
        color: MessageBarColors.danger,
      }));
    }
    
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to get context info',
      color: MessageBarColors.danger,
    }));
  }
}
