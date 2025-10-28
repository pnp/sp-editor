import { Dispatch } from 'redux';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import * as actions from '../../../store/tenantproperties/actions';
import { ITenantProperty, TenantPropertiesActions } from '../../../store/tenantproperties/types';
import { spDelay, executeScript } from '../../../utilities/utilities';
import { createTenantProperty } from './createtenantproperty';
import { deleteTenantProperties } from './deletetenantproperties';
import { getTenantProperties } from './gettenantproperties';

export async function getAllTenantProperties(dispatch: Dispatch<TenantPropertiesActions | HomeActions>) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('getTenantProperties', getTenantProperties, [chrome.runtime.getURL('')]);

    if (res && res.success === false) {
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage,
          color: MessageBarColors.danger,
        })
      );
      dispatch(actions.setAllTenantProperties([]));
    } else {
      /* on success */
      let tenantProperties: ITenantProperty[] = res;

      const vti_indexedpropertykeys = tenantProperties.find((obj) => {
        return obj.key === 'vti_indexedpropertykeys';
      });

      // find indexed properties
      if (
        vti_indexedpropertykeys &&
        vti_indexedpropertykeys.value &&
        vti_indexedpropertykeys.value.indexOf('|') > -1
      ) {
        tenantProperties = tenantProperties.map((property) => {
          const bytes = [];
          for (let i = 0; i < property.key.length; ++i) {
            bytes.push(property.key.charCodeAt(i));
            bytes.push(0);
          }
          const b64encoded = window.btoa(String.fromCharCode.apply(null, bytes));
          return property;
        });
      }

      // add tenant properties to state
      dispatch(actions.setAllTenantProperties(tenantProperties));
    }

    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to get tenant properties',
        color: MessageBarColors.danger,
      })
    );
  }
}

export async function addTenantProperty(
  dispatch: Dispatch<TenantPropertiesActions | HomeActions>,
  payload: ITenantProperty,
  update: boolean
) {
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
    const res = await executeScript('createTenantProperty', createTenantProperty, [payload, chrome.runtime.getURL('')]);

    if (res && res.success) {
      /* on success */
      // add small delay just be sure SP can process previous requests
      await spDelay(500);
      // load all tenant properties
      getAllTenantProperties(dispatch);
      // set success message
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: !update ? 'Tenant Property added successfully!' : 'Tenant Property updated successfully!',
          color: MessageBarColors.success,
        })
      );
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: res?.errorMessage || 'Failed to save tenant property',
          color: MessageBarColors.danger,
        })
      );
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to save tenant property',
        color: MessageBarColors.danger,
      })
    );
  }
}

export async function removeTenantProperties(
  dispatch: Dispatch<TenantPropertiesActions | HomeActions>,
  payload: ITenantProperty[]
) {
  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true));
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('deleteTenantProperties', deleteTenantProperties, [payload, chrome.runtime.getURL('')]);

    if (res && res.success) {
      /* on success */
      // add small delay just be sure SP can process previous requests
      await spDelay(500);
      // load all tenant properties
      getAllTenantProperties(dispatch);
      // set success message
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: 'Tenant properties removed successfully!',
          color: MessageBarColors.success,
        })
      );
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: res?.errorMessage || 'Failed to remove tenant properties',
          color: MessageBarColors.danger,
        })
      );
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to remove tenant properties',
        color: MessageBarColors.danger,
      })
    );
  }
}
