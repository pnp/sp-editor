import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/webhooks/actions'
import { INewWebHook, IWebHook, IWebHookLists, WebHooksActions } from '../../../store/webhooks/types'
import { createGroupData, spDelay, executeScript } from '../../../utilities/utilities'
import { createWebHook } from './createwebhooks'
import { deleteWebHook } from './deletewebhooks'
import { getWebHooks } from './getwebhooks'
import { updateSubscription } from './updatesubscription'

export async function getAllWebHooks(dispatch: Dispatch<WebHooksActions | HomeActions>) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('getWebHooks', getWebHooks, [chrome.runtime.getURL('')]);
    
    if (res && res.success) {
      /* on success */
      const webhooks: IWebHook[] = res.result.webhooks;
      const webhooklists: IWebHookLists[] = res.result.lists;

      // add webhooks to state
      dispatch(actions.setAllWebHooks(webhooks));
      dispatch(actions.setItemsGroups(createGroupData(webhooks, 'listTitle')));
      dispatch(actions.setAllWebHookLists(webhooklists));
      
      dispatch(rootActions.setLoading(false));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res?.errorMessage || 'Failed to get webhooks',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to get webhooks',
      color: MessageBarColors.danger,
    }));
  }
}

export async function addWebHook(dispatch: Dispatch<WebHooksActions | HomeActions>, payload: INewWebHook) {
  // show loading spinner
  dispatch(rootActions.setLoading(true));
  // close panel
  dispatch(actions.setNewPanel(false));

  try {
    const res = await executeScript('createWebHook', createWebHook, [payload, chrome.runtime.getURL('')]);
    
    if (res && res.success) {
      /* on success */
      // add small delay just be sure SP can process previous requests
      await spDelay(500);
      // load all webhooks again
      getAllWebHooks(dispatch);
      // set success message
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'WebHook added successfully!',
        color: MessageBarColors.success,
      }));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res?.errorMessage || 'Failed to add webhook',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to add webhook',
      color: MessageBarColors.danger,
    }));
  }
}

export async function removeWebHook(dispatch: Dispatch<WebHooksActions | HomeActions>, payload: IWebHook) {
  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true));
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('deleteWebHook', deleteWebHook, [payload, chrome.runtime.getURL('')]);
    
    if (res && res.success) {
      /* on success */
      // add small delay just be sure SP can process previous requests
      await spDelay(500);
      // load all webhooks again
      getAllWebHooks(dispatch);
      // set success message
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'WebHook removed successfully!',
        color: MessageBarColors.success,
      }));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res?.errorMessage || 'Failed to remove webhook',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to remove webhook',
      color: MessageBarColors.danger,
    }));
  }
}

export async function updateWebHook(dispatch: Dispatch<WebHooksActions | HomeActions>, payload: IWebHook) {
  // show loading spinner
  dispatch(rootActions.setLoading(true));
  // close panel
  dispatch(actions.setConfirmEditDialog(true));
  dispatch(actions.setEditPanel(false));

  try {
    const res = await executeScript('updateSubscription', updateSubscription, [payload, chrome.runtime.getURL('')]);
    
    if (res && res.success) {
      /* on success */
      // add small delay just be sure SP can process previous requests
      await spDelay(500);
      // load all webhooks again
      getAllWebHooks(dispatch);
      // set success message
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'WebHook updated successfully!',
        color: MessageBarColors.success,
      }));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res?.errorMessage || 'Failed to update webhook',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to update webhook',
      color: MessageBarColors.danger,
    }));
  }
}
