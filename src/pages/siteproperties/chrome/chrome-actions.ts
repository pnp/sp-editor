import { Dispatch } from 'redux';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import * as actions from '../../../store/siteproperties/actions';
import { ISiteProperty, ISitePropertyList, SitePropertiesActions } from '../../../store/siteproperties/types';
import { spDelay } from '../../../utilities/utilities';
import { createSiteProperty } from './createsiteproperty';
import { deleteSiteProperty } from './deletesiteproperty';
import { getSiteProperties } from './getsiteproperties';
import { getSites } from './getsites';

export async function getAllSiteProperties(dispatch: Dispatch<SitePropertiesActions | HomeActions>, siteId: string) {
  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [siteId, chrome.runtime.getURL('')],
      func: getSiteProperties,
    })
    .then(async (injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success) {
          /* on success */
          let siteProperties: ISiteProperty[] = res.result;

          const vti_indexedpropertykeys = siteProperties.find((obj) => {
            return obj.key === 'vti_indexedpropertykeys';
          });

          // find indexed properties
          if (
            vti_indexedpropertykeys &&
            vti_indexedpropertykeys.value &&
            vti_indexedpropertykeys.value.indexOf('|') > -1
          ) {
            siteProperties = siteProperties.map((property) => {
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

          // add webproperties to state
          dispatch(actions.setAllSiteProperties(siteProperties));
          // hide loading component
          dispatch(rootActions.setLoading(false));
        } else {
          /* on error */
          // hide loading component
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

export async function addSiteProperty(
  dispatch: Dispatch<SitePropertiesActions | HomeActions>,
  payload: ISiteProperty,
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
      func: createSiteProperty,
    })
    .then(async (injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success) {
          /* on success */
          // add small delay just be sure SP can process previous requests
          await spDelay(500);
          // load all scriptlinks
          getAllSiteProperties(dispatch, payload.siteId);
          // set success message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: !update ? 'Site Property added succesfully!' : 'Site Property updated succesfully!',
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

export async function getAllSites(
  dispatch: Dispatch<SitePropertiesActions | HomeActions>,
  selectedSite: string | undefined
) {
  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL('')],
      func: getSites,
    })
    .then(async (injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success) {
          /* on success */
          const sites: ISitePropertyList[] = res.result;
          if (sites) {
            const check = sites.find((site) => site.key === selectedSite);
            // if the selected site does not exist,
            // propably inspected page have changed to another site
            if (!check) {
              dispatch(actions.setSelectedSite(''));
              dispatch(actions.setAllSiteProperties([]));
            }
            // add webproperties to state
            dispatch(actions.setAllSites(sites));
          } else {
            dispatch(actions.setSelectedSite(''));
            dispatch(actions.setAllSiteProperties([]));
            dispatch(actions.setAllSites([]));
          }
          // hide loading component
          dispatch(rootActions.setLoading(false));
        } else {
          /* on error */
          // hide loading component
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

export async function removeSiteProperties(
  dispatch: Dispatch<SitePropertiesActions | HomeActions>,
  payload: ISiteProperty[]
) {
  // hide confirm dialog
  dispatch(actions.setConfirmRemoveDialog(true));
  // show loading spinner
  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [payload[0], chrome.runtime.getURL('')],
      func: deleteSiteProperty,
    })
    .then(async (injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any;
        if (res.success) {
          /* on success */
          // add small delay just be sure SP can process previous requests
          await spDelay(500);
          // load all scriptlinks
          getAllSiteProperties(dispatch, payload[0].siteId);
          // set success message
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: 'Site property removed succesfully!',
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
