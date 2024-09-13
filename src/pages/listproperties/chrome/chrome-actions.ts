import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/listproperties/actions'
import { IListProperty, IListPropertyList, ListPropertiesActions } from '../../../store/listproperties/types'
import { spDelay } from '../../../utilities/utilities'
import { createListProperty } from './createlistproperty'
import { deleteListProperty } from './deletelistproperty'
import { getListProperties } from './getlistproperties'
import { getLists } from './getlists'

export async function getAllListProperties(dispatch: Dispatch<ListPropertiesActions | HomeActions>, listId: string) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [listId, chrome.runtime.getURL('')],
    func: getListProperties,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        let listProperties: IListProperty[] = res.result

        const vti_indexedpropertykeys = listProperties.find((obj) => {
          return obj.key === 'vti_indexedpropertykeys'
        })

        // find indexed properties
        if (vti_indexedpropertykeys && vti_indexedpropertykeys.value && vti_indexedpropertykeys.value.indexOf('|') > -1) {
          listProperties = listProperties.map((property) => {

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
        dispatch(actions.setAllListProperties(listProperties))
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

export async function addListProperty(dispatch: Dispatch<ListPropertiesActions | HomeActions>, payload: IListProperty, update: boolean) {

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
    func: createListProperty,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        // add small delay just be sure SP can process previous requests
        await spDelay(500)
        // load all scriptlinks
        getAllListProperties(dispatch, payload.listId)
        // set success message
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: !update ? 'List Property added succesfully!' : 'List Property updated succesfully!',
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

export async function getAllLists(dispatch: Dispatch<ListPropertiesActions | HomeActions>, selectedList: string | undefined) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL('')],
    func: getLists,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        const lists: IListPropertyList[] = res.result
        if (lists) {
          const check = lists.find(list => list.key === selectedList)
          // if the selected list does not exist,
          // propably inspected page have changed to another site
          if (!check) {
            dispatch(actions.setSelectedList(''))
            dispatch(actions.setAllListProperties([]))
          }
          // add webproperties to state
          dispatch(actions.setAllLists(lists))
        } else {
          dispatch(actions.setSelectedList(''))
          dispatch(actions.setAllListProperties([]))
          dispatch(actions.setAllLists([]))
        }
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

export async function removeListProperties(dispatch: Dispatch<ListPropertiesActions | HomeActions>, payload: IListProperty[]) {

  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true))
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [payload[0], chrome.runtime.getURL('')],
    func: deleteListProperty,
  }).then(async injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        /* on success */
        // add small delay just be sure SP can process previous requests
        await spDelay(500)
        // load all scriptlinks
        getAllListProperties(dispatch, payload[0].listId)
        // set success message
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'List property removed succesfully!',
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
