import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/scriptlinks/actions'
import { INewScriptLink, IScriptLink, ScriptLinksActions } from '../../../store/scriptlinks/types'
import { exescript } from '../../../utilities/chromecommon'
import { getPnpjsPath, getSystemjsPath, spDelay } from '../../../utilities/utilities'
import { addAndInstallApp } from './addandinstallapp'
import { createCustomAction } from './createscriptlink'
import { deleteCustomActions } from './deletescriptlinks'
import { getCustomActions } from './getscriptlinks'
import { unInstallAppFromWeb } from './uninstallappfromweb'
import { updateCustomAction } from './updatescriptlink'
import { updateCacheCustomAction } from './updatescriptlinkcache'

export async function getAllScriptLinks(dispatch: Dispatch<ScriptLinksActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));
  // add listener to receive the results from inspectedPage
  chrome.runtime.onMessage.addListener(function getAllScriptLinksCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }

    switch (message.function) {
      case getCustomActions.name:
        if (message.success) {
          /* on success */
          const scriptLinks: IScriptLink[] = message.result.map((uca: IScriptLink) => {
            if (uca && uca.ScriptBlock && uca.ScriptBlock.toLocaleLowerCase().indexOf('href="') > -1) {
              let url = uca.ScriptBlock.substring(uca.ScriptBlock.toLocaleLowerCase().indexOf('href="'))
              url = url.substring(url.indexOf('"') + 1)
              url = url.substring(0, url.indexOf('"'))
              uca.Url = url
            } else {
              uca.Url = uca.ScriptSrc
            }
            uca.ScopeName = uca.Scope === 2 ? 'Site Collection' : 'Current Web'
            // TODO: what to do with other custom actions?
            return uca
          })
          // add scriptlinks to state
          dispatch(actions.setAllScriptLinks(scriptLinks))
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
        chrome.runtime.onMessage.removeListener(getAllScriptLinksCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${getCustomActions}`
  script += ` ${exescript.name}(${getCustomActions.name});`
  chrome.devtools.inspectedWindow.eval(script)
}

export async function addScriptLink(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: INewScriptLink) {

  // show loading spinner
  dispatch(rootActions.setLoading(true))
  // close panel
  dispatch(actions.setNewPanel(false));
  // add listener to receive the results from inspected page
  chrome.runtime.onMessage.addListener(async function addScriptLinkCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }

    switch (message.function) {
      case createCustomAction.name:
        if (message.success) {
          /* on success */
          // add small delay just be sure SP can process previous requests
          await spDelay(500)
          // load all scriptlinks
          getAllScriptLinks(dispatch)
          // set success message
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: 'ScriptLink added succesfully!',
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
        chrome.runtime.onMessage.removeListener(addScriptLinkCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${createCustomAction}`
  script += ` ${exescript.name}(${createCustomAction.name}, ${payload.Scope}, '${payload.Url}', ${payload.Sequence});`
  chrome.devtools.inspectedWindow.eval(script)
}

export async function updateScriptLink(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: IScriptLink) {

  // close confirm dialog
  dispatch(actions.setConfirmEditDialog(true))
  // show loading spinner
  dispatch(rootActions.setLoading(true))
  // close panel
  dispatch(actions.setEditPanel(false));
  // add listener to receive the results from inspected page
  chrome.runtime.onMessage.addListener(async function updateScriptLinkCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }
    switch (message.function) {
      case updateCustomAction.name:
        if (message.success) {
          /* on success */
          // add small delay just be sure SP can process previous requests
          await spDelay(500)
          // load all scriptlinks
          getAllScriptLinks(dispatch)
          // set success message
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: 'ScriptLink updated succesfully!',
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
        chrome.runtime.onMessage.removeListener(updateScriptLinkCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${updateCustomAction}`
  script += ` ${exescript.name}(${updateCustomAction.name}, ${payload.Scope}, '${payload.Url}', ${payload.Sequence}, '${payload.Id}');`
  chrome.devtools.inspectedWindow.eval(script)
}

export async function deleteScriptLinks(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: IScriptLink[]) {

  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true))
  // show loading spinner
  dispatch(rootActions.setLoading(true));
  // add listener to receive the results from inspected page
  chrome.runtime.onMessage.addListener(async function deleteScriptLinksCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }
    switch (message.function) {
      case deleteCustomActions.name:
        if (message.success) {
          /* on success */
          // add small delay just be sure SP can process previous requests
          await spDelay(500)
          // load all scriptlinks
          getAllScriptLinks(dispatch)
          // set success message
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: 'ScriptLinks removed succesfully!',
            color: MessageBarColors.success,
          }))
        } else {
          /* on error */
          // hide loading
          dispatch(rootActions.setLoading(false))
          // set error message
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: message.errorMessage,
            color: MessageBarColors.danger,
          }))
        }
        // remove listener
        chrome.runtime.onMessage.removeListener(deleteScriptLinksCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${deleteCustomActions}`
  script += ` ${exescript.name}(${deleteCustomActions.name}, '${encodeURIComponent(JSON.stringify(payload)).replace(/'/g, '%27')}');`
  chrome.devtools.inspectedWindow.eval(script)
}

export async function cacheScriptLinks(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: IScriptLink[]) {

  // hide confirm dialog
  dispatch(actions.setConfirmCacheDialog(true))
  // show loading spinner
  dispatch(rootActions.setLoading(true));
  // add listener to receive the results from inspected page
  chrome.runtime.onMessage.addListener(async function cacheScriptLinksCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }
    switch (message.function) {
      case updateCacheCustomAction.name:
        if (message.success) {
          /* on success */
          // add small delay just be sure SP can process previous requests
          await spDelay(500)
          // load all scriptlinks
          getAllScriptLinks(dispatch)
          // set success message
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: 'Cache refreshed succesfully!',
            color: MessageBarColors.success,
          }))
        } else {
          /* on error */
          // hide loading
          dispatch(rootActions.setLoading(false))
          // set error message
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: message.errorMessage,
            color: MessageBarColors.danger,
          }))
        }
        // remove listener
        chrome.runtime.onMessage.removeListener(cacheScriptLinksCallback)
        break
    }
  })

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${updateCacheCustomAction}`
  script += ` ${exescript.name}(${updateCacheCustomAction.name}, '${encodeURIComponent(JSON.stringify(payload)).replace(/'/g, '%27')}');`
  chrome.devtools.inspectedWindow.eval(script)
}

export async function installApp(dispatch: Dispatch<ScriptLinksActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));
  // add listener to receive the results from inspectedPage
  chrome.runtime.onMessage.addListener(function installAppCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }

    switch (message.function) {
      case addAndInstallApp.name:
        if (message.success) {
          /* on success */
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: message.result,
            color: MessageBarColors.success,
          }))
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
        chrome.runtime.onMessage.removeListener(installAppCallback)
        break
    }
  })
  const url = chrome.runtime.getURL('bundles/sp-scriptlinks.sppkg')

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${addAndInstallApp}`
  script += ` ${exescript.name}(${addAndInstallApp.name}, '${url}');`
  chrome.devtools.inspectedWindow.eval(script)

}

export async function unInstallApp(dispatch: Dispatch<ScriptLinksActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));
  // add listener to receive the results from inspectedPage
  chrome.runtime.onMessage.addListener(function unInstallAppCallback(message: any) {

    if (
      typeof message !== 'object' ||
      message === null ||
      message === undefined ||
      message.source === undefined
    ) {
      return
    }

    switch (message.function) {
      case unInstallAppFromWeb.name:
        if (message.success) {
          /* on success */
          dispatch(rootActions.setAppMessage({
            showMessage: true,
            message: message.result,
            color: MessageBarColors.success,
          }))
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
        chrome.runtime.onMessage.removeListener(unInstallAppCallback)
        break
    }
  })
  const url = chrome.runtime.getURL('bundles/sp-scriptlinks.sppkg')

  // execute script in inspectedWindow
  let script = `${getPnpjsPath()} ${getSystemjsPath()} ${exescript} ${unInstallAppFromWeb}`
  script += ` ${exescript.name}(${unInstallAppFromWeb.name}, '${url}');`
  chrome.devtools.inspectedWindow.eval(script)

}
