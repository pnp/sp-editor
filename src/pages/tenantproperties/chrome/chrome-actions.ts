import { Dispatch } from 'redux';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import * as actions from '../../../store/tenantproperties/actions';
import { ITenantProperty, TenantPropertiesActions } from '../../../store/tenantproperties/types';
import { spDelay } from '../../../utilities/utilities';
import { createTenantProperty } from './createtenantproperty';
import { deleteTenantProperties } from './deletetenantproperties';
import { getTenantProperties } from './gettenantproperties';

export async function getAllTenantProperties(dispatch: Dispatch<TenantPropertiesActions | HomeActions>) {
  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL('')],
      func: getTenantProperties,
    })
    .then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success === false) {
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
              property.indexed = vti_indexedpropertykeys.value.split('|').find((x) => x === b64encoded) ? true : false;
              return property;
            });
          }

          // add tenantproperties to state
          dispatch(actions.setAllTenantProperties(tenantProperties));
        }
        // hide loading component
        dispatch(rootActions.setLoading(false));
      }
    });
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

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [payload, chrome.runtime.getURL('')],
      func: createTenantProperty,
    })
    .then(async (injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success) {
          /* on success */
          // add small delay just be sure SP can process previous requests
          await spDelay(500);
          // load all scriptlinks
          getAllTenantProperties(dispatch);
          // set success message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: !update ? 'Tenant Property added succesfully!' : 'Tenant Property updated succesfully!',
              color: MessageBarColors.success,
            })
          );
        } else {
          /* on error */
          // hide loading
          dispatch(rootActions.setLoading(false));
          // show error message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: res.errorMessage,
              color: MessageBarColors.danger,
            })
          );
        }
      }
    });
}

export async function removeTenantProperties(
  dispatch: Dispatch<TenantPropertiesActions | HomeActions>,
  payload: ITenantProperty[]
) {
  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true));
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [payload, chrome.runtime.getURL('')],
      func: deleteTenantProperties,
    })
    .then(async (injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success) {
          /* on success */
          // add small delay just be sure SP can process previous requests
          await spDelay(500);
          // load all scriptlinks
          getAllTenantProperties(dispatch);
          // set success message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: 'Tenant properties removed succesfully!',
              color: MessageBarColors.success,
            })
          );
        } else {
          /* on error */
          // hide loading
          dispatch(rootActions.setLoading(false));
          // set error message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: res.errorMessage,
              color: MessageBarColors.danger,
            })
          );
        }
      }
    });
}
