import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/listproperties/actions'
import { IListProperty, IListPropertyList, ListPropertiesActions } from '../../../store/listproperties/types'
import { spDelay, executeScript } from '../../../utilities/utilities'
import { createListProperty } from './createlistproperty'
import { deleteListProperty } from './deletelistproperty'
import { getListProperties } from './getlistproperties'
import { getLists } from './getlists'

export async function getAllListProperties(dispatch: Dispatch<ListPropertiesActions | HomeActions>, listId: string) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('getListProperties', getListProperties, [listId, chrome.runtime.getURL('')]);
    
    if (res && res.success) {
      /* on success */
      let listProperties: IListProperty[] = res.result;

      const vti_indexedpropertykeys = listProperties.find((obj) => {
        return obj.key === 'vti_indexedpropertykeys';
      });

      // find indexed properties
      if (vti_indexedpropertykeys && vti_indexedpropertykeys.value && vti_indexedpropertykeys.value.indexOf('|') > -1) {
        listProperties = listProperties.map((property) => {
          const bytes = [];
          for (let i = 0; i < property.key.length; ++i) {
            bytes.push(property.key.charCodeAt(i));
            bytes.push(0);
          }
          const b64encoded = window.btoa(String.fromCharCode.apply(null, bytes));
          property.indexed = vti_indexedpropertykeys.value.split('|').find(x => x === b64encoded) ? true : false;
          return property;
        });
      }

      // add list properties to state
      dispatch(actions.setAllListProperties(listProperties));
      dispatch(rootActions.setLoading(false));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res?.errorMessage || 'Failed to get list properties',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to get list properties',
      color: MessageBarColors.danger,
    }));
  }
}

export async function addListProperty(dispatch: Dispatch<ListPropertiesActions | HomeActions>, payload: IListProperty, update: boolean) {
  // show loading spinner
  dispatch(rootActions.setLoading(true));
  // close panel
  if (update) {
    dispatch(actions.setConfirmEditDialog(true));
    dispatch(actions.setEditPanel(false));
  } else {
    dispatch(actions.setNewPanel(false));
  }

  try {
    const res = await executeScript('createListProperty', createListProperty, [payload, chrome.runtime.getURL('')]);
    
    if (res && res.success) {
      /* on success */
      // add small delay just be sure SP can process previous requests
      await spDelay(500);
      // load all list properties
      getAllListProperties(dispatch, payload.listId);
      // set success message
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: !update ? 'List Property added successfully!' : 'List Property updated successfully!',
        color: MessageBarColors.success,
      }));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res?.errorMessage || 'Failed to save list property',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to save list property',
      color: MessageBarColors.danger,
    }));
  }
}

export async function getAllLists(dispatch: Dispatch<ListPropertiesActions | HomeActions>, selectedList: string | undefined) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('getLists', getLists, [chrome.runtime.getURL('')]);
    
    if (res && res.success) {
      /* on success */
      const lists: IListPropertyList[] = res.result;
      
      if (lists) {
        const check = lists.find(list => list.key === selectedList);
        // if the selected list does not exist,
        // probably inspected page have changed to another site
        if (!check) {
          dispatch(actions.setSelectedList(''));
          dispatch(actions.setAllListProperties([]));
        }
        // add lists to state
        dispatch(actions.setAllLists(lists));
      } else {
        dispatch(actions.setSelectedList(''));
        dispatch(actions.setAllListProperties([]));
        dispatch(actions.setAllLists([]));
      }
      
      dispatch(rootActions.setLoading(false));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res?.errorMessage || 'Failed to get lists',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to get lists',
      color: MessageBarColors.danger,
    }));
  }
}

export async function removeListProperties(dispatch: Dispatch<ListPropertiesActions | HomeActions>, payload: IListProperty[]) {
  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true));
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('deleteListProperty', deleteListProperty, [payload[0], chrome.runtime.getURL('')]);
    
    if (res && res.success) {
      /* on success */
      // add small delay just be sure SP can process previous requests
      await spDelay(500);
      // load all list properties
      getAllListProperties(dispatch, payload[0].listId);
      // set success message
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'List property removed successfully!',
        color: MessageBarColors.success,
      }));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res?.errorMessage || 'Failed to remove list property',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to remove list property',
      color: MessageBarColors.danger,
    }));
  }
}
