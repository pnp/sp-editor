import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/webproperties/actions'
import { IWebProperty, WebPropertiesActions } from '../../../store/webproperties/types'
import { spDelay, executeScript } from '../../../utilities/utilities'
import { createWebProperty } from './createwebproperty'
import { deleteWebProperties } from './deletewebproperties'
import { getWebProperties } from './getwebproperties'

export async function getAllWebProperties(dispatch: Dispatch<WebPropertiesActions | HomeActions>) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('getWebProperties', getWebProperties, [chrome.runtime.getURL('')]);
    
    if (res && res.success === false) {
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res.errorMessage,
        color: MessageBarColors.danger,
      }));
      dispatch(actions.setAllWebProperties([]));
    } else {
      /* on success */
      let webProperties: IWebProperty[] = res;

      const vti_indexedpropertykeys = webProperties.find((obj) => {
        return obj.key === 'vti_indexedpropertykeys';
      });

      // find indexed properties
      if (vti_indexedpropertykeys && vti_indexedpropertykeys.value && vti_indexedpropertykeys.value.indexOf('|') > -1) {
        webProperties = webProperties.map((property) => {
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

      // add webproperties to state
      dispatch(actions.setAllWebProperties(webProperties));
    }
    
    // hide loading component
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to get web properties',
      color: MessageBarColors.danger,
    }));
  }
}

export async function addWebProperty(dispatch: Dispatch<WebPropertiesActions | HomeActions>, payload: IWebProperty, update: boolean) {
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
    const res = await executeScript('createWebProperty', createWebProperty, [payload, chrome.runtime.getURL('')]);
    
    if (res && res.success) {
      /* on success */
      // add small delay just be sure SP can process previous requests
      await spDelay(500);
      // load all webproperties
      getAllWebProperties(dispatch);
      // set success message
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: !update ? 'Web Property added successfully!' : 'Web Property updated successfully!',
        color: MessageBarColors.success,
      }));
    } else {
      /* on error */
      // hide loading
      dispatch(rootActions.setLoading(false));
      // show error message
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res?.errorMessage || 'Failed to save web property',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to save web property',
      color: MessageBarColors.danger,
    }));
  }
}

export async function removeWebProperties(dispatch: Dispatch<WebPropertiesActions | HomeActions>, payload: IWebProperty[]) {
  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true));
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('deleteWebProperties', deleteWebProperties, [payload, chrome.runtime.getURL('')]);
    
    if (res && res.success) {
      /* on success */
      // add small delay just be sure SP can process previous requests
      await spDelay(500);
      // load all webproperties
      getAllWebProperties(dispatch);
      // set success message
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'Web properties removed successfully!',
        color: MessageBarColors.success,
      }));
    } else {
      /* on error */
      // hide loading
      dispatch(rootActions.setLoading(false));
      // set error message
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res?.errorMessage || 'Failed to remove web properties',
        color: MessageBarColors.danger,
      }));
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to remove web properties',
      color: MessageBarColors.danger,
    }));
  }
}
