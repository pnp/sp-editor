import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/webproperties/actions'
import { IWebProperty, WebPropertiesActions } from '../../../store/webproperties/types'
import { spDelay } from '../../../utilities/utilities'
import { createWebProperty } from './createwebproperty'
import { deleteWebProperties } from './deletewebproperties'
import { getWebProperties } from './getwebproperties'

export async function getAllWebProperties(dispatch: Dispatch<WebPropertiesActions | HomeActions>) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL('')],
    func: getWebProperties,
  }).then(injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success === false) {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
        dispatch(actions.setAllWebProperties([]))

      } else {
          /* on success */
          let webProperties: IWebProperty[] = res

          const vti_indexedpropertykeys = webProperties.find((obj) => {
            return obj.key === 'vti_indexedpropertykeys'
          })

          // find indexed properties
          if (vti_indexedpropertykeys && vti_indexedpropertykeys.value && vti_indexedpropertykeys.value.indexOf('|') > -1) {
            webProperties = webProperties.map((property) => {

              const bytes = []
              for (let i = 0; i < property.key.length; ++i) {
                bytes.push(property.key.charCodeAt(i))
                bytes.push(0)
              }
              const b64encoded = window.btoa(String.fromCharCode.apply(null, bytes))
              property.indexed = vti_indexedpropertykeys.value.split('|').find(x => x === b64encoded) ? true : false
              return property
            })
          }

          // add webproperties to state
          dispatch(actions.setAllWebProperties(webProperties))
        }
          // hide loading component
          dispatch(rootActions.setLoading(false))
    }
  });

}

export async function addWebProperty(dispatch: Dispatch<WebPropertiesActions | HomeActions>, payload: IWebProperty, update: boolean) {

  // show loading spinner
  dispatch(rootActions.setLoading(true))
  // close panel
  if (update) {
    dispatch(actions.setConfirmEditDialog(true))
    dispatch(actions.setEditPanel(false))
  } else {
    dispatch(actions.setNewPanel(false))
  }

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload, chrome.runtime.getURL('')],
    func: createWebProperty,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        // add small delay just be sure SP can process previous requests
        await spDelay(500)
        // load all scriptlinks
        getAllWebProperties(dispatch)
        // set success message
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: !update ? 'Web Property added succesfully!' : 'Web Property updated succesfully!',
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

export async function removeWebProperties(dispatch: Dispatch<WebPropertiesActions | HomeActions>, payload: IWebProperty[]) {

  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true))
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload, chrome.runtime.getURL('')],
    func: deleteWebProperties,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        // add small delay just be sure SP can process previous requests
        await spDelay(500)
        // load all scriptlinks
        getAllWebProperties(dispatch)
        // set success message
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'Web properties removed succesfully!',
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
