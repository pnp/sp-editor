import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/scriptlinks/actions'
import { INewScriptLink, IScriptLink, ScriptLinksActions } from '../../../store/scriptlinks/types'
import { spDelay } from '../../../utilities/utilities'

// Helper function to send messages to background script
async function sendToBackground(funcName: string, args: any[]): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log('Sending message to background:', funcName);
    
    chrome.runtime.sendMessage(
      {
        type: 'INJECT_SCRIPT',
        tabId: chrome.devtools.inspectedWindow.tabId,
        funcName: funcName,
        args: args,
      },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error('Chrome runtime error:', chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
          return;
        }
        
        console.log('Received response from background:', response);
        
        if (response.success) {
          resolve(response.data);
        } else {
          reject(new Error(response.error || 'Unknown error'));
        }
      }
    );
  });
}

export async function getAllScriptLinks(dispatch: Dispatch<ScriptLinksActions | HomeActions>) {
  dispatch(rootActions.setLoading(true));

  try {
    const result = await sendToBackground('getCustomActions', [chrome.runtime.getURL('')]);
    
    if (result && result.success) {
      /* on success */
      const scriptLinks: IScriptLink[] = result.result.map((uca: IScriptLink) => {
        if (uca.Location === 'ClientSideExtension.ApplicationCustomizer') {
          uca.Url = uca.Title;
        } else if (uca && uca.ScriptBlock && uca.ScriptBlock.toLocaleLowerCase().indexOf('href="') > -1) {
          let url = uca.ScriptBlock.substring(uca.ScriptBlock.toLocaleLowerCase().indexOf('href="'));
          url = url.substring(url.indexOf('"') + 1);
          url = url.substring(0, url.indexOf('"'));
          uca.Url = url;
        } else {
          uca.Url = uca.ScriptSrc;
        }
        uca.ScopeName =
          uca.Scope === 2 ? 'Site Collection' : uca.Scope === 3 && uca.Location === 'ClientSideExtension.ApplicationCustomizer' ? 'Application Customizer' : 'Current Web';
        return uca;
      });
      
      dispatch(actions.setAllScriptLinks(scriptLinks));
      dispatch(rootActions.setLoading(false));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: result?.errorMessage || 'Failed to get script links',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to get script links',
      color: MessageBarColors.danger,
    }));
  }
}

export async function addScriptLink(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: INewScriptLink) {
  dispatch(rootActions.setLoading(true));
  dispatch(actions.setNewPanel(false));

  try {
    const result = await sendToBackground('createCustomAction', [payload, chrome.runtime.getURL('')]);
    
    if (result && result.success) {
      /* on success */
      await spDelay(500);
      getAllScriptLinks(dispatch);
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'ScriptLink added successfully!',
        color: MessageBarColors.success,
      }));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: result?.errorMessage || 'Failed to add script link',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to add script link',
      color: MessageBarColors.danger,
    }));
  }
}

export async function updateScriptLink(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: IScriptLink) {
  dispatch(actions.setConfirmEditDialog(true));
  dispatch(rootActions.setLoading(true));
  dispatch(actions.setEditPanel(false));

  try {
    const result = await sendToBackground('updateCustomAction', [payload, chrome.runtime.getURL('')]);
    
    if (result && result.success) {
      /* on success */
      await spDelay(500);
      getAllScriptLinks(dispatch);
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'ScriptLink updated successfully!',
        color: MessageBarColors.success,
      }));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: result?.errorMessage || 'Failed to update script link',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to update script link',
      color: MessageBarColors.danger,
    }));
  }
}

export async function deleteScriptLinks(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: IScriptLink[]) {
  dispatch(actions.setConfirmRemoveDialog(true));
  dispatch(rootActions.setLoading(true));

  try {
    const result = await sendToBackground('deleteCustomActions', [payload, chrome.runtime.getURL('')]);
    
    if (result && result.success) {
      /* on success */
      await spDelay(500);
      getAllScriptLinks(dispatch);
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'ScriptLinks removed successfully!',
        color: MessageBarColors.success,
      }));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: result?.errorMessage || 'Failed to delete script links',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to delete script links',
      color: MessageBarColors.danger,
    }));
  }
}

export async function cacheScriptLinks(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: IScriptLink[]) {
  dispatch(actions.setConfirmCacheDialog(true));
  dispatch(rootActions.setLoading(true));

  try {
    const result = await sendToBackground('updateCacheCustomAction', [payload, chrome.runtime.getURL('')]);
    
    if (result && result.success) {
      /* on success */
      await spDelay(500);
      getAllScriptLinks(dispatch);
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'Cache refreshed successfully!',
        color: MessageBarColors.success,
      }));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: result?.errorMessage || 'Failed to refresh cache',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to refresh cache',
      color: MessageBarColors.danger,
    }));
  }
}

export async function installApp(dispatch: Dispatch<ScriptLinksActions | HomeActions>) {
  dispatch(rootActions.setLoading(true));

  try {
    const result = await sendToBackground('addAndInstallApp', [
      chrome.runtime.getURL('bundles/sp-scriptlinks.sppkg'),
      chrome.runtime.getURL('')
    ]);
    
    if (result && result.success) {
      /* on success */
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: result.result,
        color: MessageBarColors.success,
      }));
      dispatch(rootActions.setLoading(false));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: result?.errorMessage || 'Failed to install app',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to install app',
      color: MessageBarColors.danger,
    }));
  }
}

export async function unInstallApp(dispatch: Dispatch<ScriptLinksActions | HomeActions>) {
  dispatch(rootActions.setLoading(true));

  try {
    const result = await sendToBackground('unInstallAppFromWeb', [chrome.runtime.getURL('')]);
    
    if (result && result.success) {
      /* on success */
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: result.result,
        color: MessageBarColors.success,
      }));
      dispatch(rootActions.setLoading(false));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: result?.errorMessage || 'Failed to uninstall app',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to uninstall app',
      color: MessageBarColors.danger,
    }));
  }
}