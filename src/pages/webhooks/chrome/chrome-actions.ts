import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/webhooks/actions'
import { INewWebHook, IWebHook, IWebHookLists, WebHooksActions } from '../../../store/webhooks/types'
import { exescript } from '../../../utilities/chromecommon'
import { createGroupData, getPnpjsPath, getSystemjsPath, spDelay } from '../../../utilities/utilities'
import { createWebHook } from './createwebhooks'
import { deleteWebHook } from './deletewebhooks'
import { getWebHooks } from './getwebhooks'
import { updateSubscription } from './updatesubscription'

export async function getAllWebHooks(dispatch: Dispatch<WebHooksActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));
  // add listener to receive the results from inspectedPage
  chrome.runtime.onMessage.addListener(function getAllWebHooksCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }

    switch (message.function) {
      case getWebHooks.name:
        if (message.success) {
          /* on success */
          const webhooks: IWebHook[] = message.result.webhooks
          const webhooklists: IWebHookLists[] = message.result.lists

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
            message: message.errorMessage,
            color: MessageBarColors.danger,
          }))
        }
        // remove listener
        chrome.runtime.onMessage.removeListener(getAllWebHooksCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${getWebHooks}`
  script += ` ${exescript.name}(${getWebHooks.name});`
  chrome.devtools.inspectedWindow.eval(script)
}

export async function addWebHook(dispatch: Dispatch<WebHooksActions | HomeActions>, payload: INewWebHook) {
  // show loading spinner
  dispatch(rootActions.setLoading(true))
  // close panel
  dispatch(actions.setNewPanel(false));
  // add listener to receive the results from inspected page
  chrome.runtime.onMessage.addListener(async function addWebHookCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }

    switch (message.function) {
      case createWebHook.name:
        if (message.success) {
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
            message: message.errorMessage,
            color: MessageBarColors.danger,
          }))
        }
        // remove listener
        chrome.runtime.onMessage.removeListener(addWebHookCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${createWebHook}`
  script += ` ${exescript.name}(${createWebHook.name}, '${payload.ListId}', '${payload.HookUrl}', '${payload.ClientState}', '${payload.expirationDate}');`
  chrome.devtools.inspectedWindow.eval(script)
}

export async function removeWebHook(dispatch: Dispatch<WebHooksActions | HomeActions>, payload: IWebHook) {
  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true))
  // show loading spinner
  dispatch(rootActions.setLoading(true));
  // add listener to receive the results from inspected page
  chrome.runtime.onMessage.addListener(async function removeWebHookCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }

    switch (message.function) {
      case deleteWebHook.name:
        if (message.success) {
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
            message: message.errorMessage,
            color: MessageBarColors.danger,
          }))
        }
        // remove listener
        chrome.runtime.onMessage.removeListener(removeWebHookCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${deleteWebHook}`
  script += ` ${exescript.name}(${deleteWebHook.name}, '${payload.listId}', '${payload.id}');`
  chrome.devtools.inspectedWindow.eval(script)
}

export async function updateWebHook(dispatch: Dispatch<WebHooksActions | HomeActions>, payload: IWebHook) {
  // show loading spinner
  dispatch(rootActions.setLoading(true))
  // close panel
  dispatch(actions.setConfirmEditDialog(true))
  dispatch(actions.setEditPanel(false));
    // add listener to receive the results from inspected page
  chrome.runtime.onMessage.addListener(async function updateWebHookCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }

    switch (message.function) {
      case updateSubscription.name:
        if (message.success) {
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
            message: message.errorMessage,
            color: MessageBarColors.danger,
          }))
        }
        // remove listener
        chrome.runtime.onMessage.removeListener(updateWebHookCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${updateSubscription}`
  script += ` ${exescript.name}(${updateSubscription.name}, '${payload.listId}', '${payload.notificationUrl}', '${payload.clientState}', '${payload.expirationDateTime}', '${payload.id}');`
  chrome.devtools.inspectedWindow.eval(script)
}
