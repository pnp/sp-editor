import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/scriptlinks/actions'
import { INewScriptLink, IScriptLink, ScriptLinksActions } from '../../../store/scriptlinks/types'
import { spDelay } from '../../../utilities/utilities'
import { addAndInstallApp } from './addandinstallapp'
import { createCustomAction } from './createscriptlink'
import { deleteCustomActions } from './deletescriptlinks'
import { getCustomActions } from './getscriptlinks'
import { unInstallAppFromWeb } from './uninstallappfromweb'
import { updateCustomAction } from './updatescriptlink'
import { updateCacheCustomAction } from './updatescriptlinkcache'

export async function getAllScriptLinks(dispatch: Dispatch<ScriptLinksActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL('')],
    func: getCustomActions,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        const scriptLinks: IScriptLink[] = res.result.map((uca: IScriptLink) => {
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
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
      }
    }
  });

}

export async function addScriptLink(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: INewScriptLink) {

  // show loading spinner
  dispatch(rootActions.setLoading(true))
  // close panel
  dispatch(actions.setNewPanel(false));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload, chrome.runtime.getURL('')],
    func: createCustomAction,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
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
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
      }
    }
  });

}

export async function updateScriptLink(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: IScriptLink) {

  // close confirm dialog
  dispatch(actions.setConfirmEditDialog(true))
  // show loading spinner
  dispatch(rootActions.setLoading(true))
  // close panel
  dispatch(actions.setEditPanel(false));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload, chrome.runtime.getURL('')],
    func: updateCustomAction,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
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
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
      }
    }
  });

}

export async function deleteScriptLinks(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: IScriptLink[]) {

  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true))
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload, chrome.runtime.getURL('')],
    func: deleteCustomActions,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
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
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
      }
    }
  });

}

export async function cacheScriptLinks(dispatch: Dispatch<ScriptLinksActions | HomeActions>, payload: IScriptLink[]) {

  // hide confirm dialog
  dispatch(actions.setConfirmCacheDialog(true))
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload, chrome.runtime.getURL('')],
    func: updateCacheCustomAction,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
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
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
      }
    }
  });

}

export async function installApp(dispatch: Dispatch<ScriptLinksActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL('bundles/sp-scriptlinks.sppkg'), chrome.runtime.getURL('')],
    func: addAndInstallApp,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.result,
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
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
      }
    }
  });

}

export async function unInstallApp(dispatch: Dispatch<ScriptLinksActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL('')],
    func: unInstallAppFromWeb,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.result,
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
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
      }
    }
  });

}
