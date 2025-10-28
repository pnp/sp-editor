import { Dispatch } from 'redux';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import * as actions from '../../../store/siteproperties/actions';
import { ISiteProperty, ISite, SitePropertiesActions } from '../../../store/siteproperties/types';
import { spDelay, executeScript } from '../../../utilities/utilities';
import { createSiteProperty } from './createsiteproperty';
import { getSiteProperties } from './getsiteproperties';
import { getSites } from './getsites';

export async function getAllSiteProperties(dispatch: Dispatch<SitePropertiesActions | HomeActions>, siteId: string) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('getSiteProperties', getSiteProperties, [siteId, chrome.runtime.getURL('')]);

    if (res && res.success) {
      /* on success */
      let siteProperties: ISiteProperty[] = res.result;

      // add site properties to state
      dispatch(actions.setAllSiteProperties(siteProperties));
      dispatch(rootActions.setLoading(false));
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: res?.errorMessage || 'Failed to get site properties',
          color: MessageBarColors.danger,
        })
      );
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to get site properties',
        color: MessageBarColors.danger,
      })
    );
  }
}

export async function addSiteProperty(
  dispatch: Dispatch<SitePropertiesActions | HomeActions>,
  payload: ISiteProperty,
  site: ISite,
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
    const res = await executeScript('createSiteProperty', createSiteProperty, [payload, site, chrome.runtime.getURL('')]);

    if (res && res.success) {
      /* on success */
      // add small delay just be sure SP can process previous requests
      await spDelay(500);
      // load all site properties
      getAllSiteProperties(dispatch, site.key);
      // set success message
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: !update ? 'Site Property added successfully!' : 'Site Property updated successfully!',
          color: MessageBarColors.success,
        })
      );
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: res?.errorMessage || 'Failed to save site property',
          color: MessageBarColors.danger,
        })
      );
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to save site property',
        color: MessageBarColors.danger,
      })
    );
  }
}

export async function getAllSites(
  dispatch: Dispatch<SitePropertiesActions | HomeActions>,
  queryText: string,
  selectedSite: string | undefined
) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('getSites', getSites, [queryText, chrome.runtime.getURL('')]);

    if (res && res.success) {
      /* on success */
      const sites: ISite[] = res.result;

      if (sites) {
        dispatch(actions.setAllSites(sites));
        dispatch(actions.setAllSiteProperties([]));
      } else {
        dispatch(actions.setSelectedSite(undefined));
        dispatch(actions.setAllSiteProperties([]));
        dispatch(actions.setAllSites([]));
      }

      dispatch(rootActions.setLoading(false));
      return res.result;
    } else {
      /* on error */
      dispatch(rootActions.setLoading(false));
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: res?.errorMessage || 'Failed to get sites',
          color: MessageBarColors.danger,
        })
      );
    }
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to get sites',
        color: MessageBarColors.danger,
      })
    );
  }
}
