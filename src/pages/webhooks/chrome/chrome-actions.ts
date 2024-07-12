import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/webhooks/actions'
import { INewWebHook, IWebHook, IWebHookLists, WebHooksActions } from '../../../store/webhooks/types'
import { createGroupData, spDelay } from '../../../utilities/utilities'
import { createWebHook } from './createwebhooks'
import { deleteWebHook } from './deletewebhooks'
import { getWebHooks } from './getwebhooks'
import { updateSubscription } from './updatesubscription'

export async function getAllWebHooks(dispatch: Dispatch<WebHooksActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL('')],
    func: getWebHooks,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        const webhooks: IWebHook[] = res.result.webhooks
        const webhooklists: IWebHookLists[] = res.result.lists

        // add webproperties to state
        dispatch(actions.setAllWebHooks(webhooks))
        dispatch(actions.setItemsGroups(createGroupData(webhooks, 'listTitle')))

        dispatch(actions.setAllWebHookLists(webhooklists))
        // hide loading component
        dispatch(rootActions.setLoading(false))
      } else {
        /* on error */
        // hide loading component
        dispatch(rootActions.setLoading(false))
        // show error message
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
      }
    }
  });

}

export async function addWebHook(dispatch: Dispatch<WebHooksActions | HomeActions>, payload: INewWebHook) {
  // show loading spinner
  dispatch(rootActions.setLoading(true))
  // close panel
  dispatch(actions.setNewPanel(false));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload, chrome.runtime.getURL('')],
    func: createWebHook,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        // add small delay just be sure SP can process previous requests
        await spDelay(500)
        // load all webhooks again
        getAllWebHooks(dispatch)
        // set success message
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'WebHook added succesfully!',
          color: MessageBarColors.success,
        }))
      } else {
        /* on error */
        // hide loading
        dispatch(rootActions.setLoading(false))
        // show error message
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
      }
    }
  });

}

export async function removeWebHook(dispatch: Dispatch<WebHooksActions | HomeActions>, payload: IWebHook) {
  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true))
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload, chrome.runtime.getURL('')],
    func: deleteWebHook,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any

      if (res.success) {
        /* on success */
        // add small delay just be sure SP can process previous requests
        await spDelay(500)
        // load all webhooks again
        getAllWebHooks(dispatch)
        // set success message
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'WebHook removed succesfully!',
          color: MessageBarColors.success,
        }))
      } else {
        /* on error */
        // hide loading
        dispatch(rootActions.setLoading(false))
        // show error message
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
      }
    }
  });

}

export async function updateWebHook(dispatch: Dispatch<WebHooksActions | HomeActions>, payload: IWebHook) {
  // show loading spinner
  dispatch(rootActions.setLoading(true))
  // close panel
  dispatch(actions.setConfirmEditDialog(true))
  dispatch(actions.setEditPanel(false));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload, chrome.runtime.getURL('')],
    func: updateSubscription,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        // add small delay just be sure SP can process previous requests
        await spDelay(500)
        // load all webhooks again
        getAllWebHooks(dispatch)
        // set success message
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'WebHook updated succesfully!',
          color: MessageBarColors.success,
        }))
      } else {
        /* on error */
        // hide loading
        dispatch(rootActions.setLoading(false))
        // show error message
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
      }
    }
  });

}
