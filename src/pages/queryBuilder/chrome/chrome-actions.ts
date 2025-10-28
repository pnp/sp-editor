import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import { shoot } from '../../spshooter/chrome/shoot'
import { QueryBuilderActions } from '../../../store/queryBuilder/types';
import * as actions from "../../../store/queryBuilder/actions";
import { executeScript } from '../../../utilities/script-injection';

export async function getLists(dispatch: Dispatch<QueryBuilderActions | HomeActions>, context: any) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('shoot', shoot, [{
      path: `${context && context.siteAbsoluteUrl ? context.siteAbsoluteUrl : ''}/_api/web/lists?$select=Title,Id`,
      method: "GET",
      headers: JSON.stringify({
        "accept": "application/json"
      }),
      body: ""
    }, chrome.runtime.getURL('')]);

    if (res && res.success === false) {
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res.errorMessage,
        color: MessageBarColors.danger,
      }));
    } else {
      dispatch(actions.setLists(res.value));
    }
    
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to get lists',
      color: MessageBarColors.danger,
    }));
  }
}

export async function selectQueryList(dispatch: Dispatch<QueryBuilderActions | HomeActions>, context: any, listId: string) {
  dispatch(rootActions.setLoading(true));
  dispatch(actions.setSelectedList(listId));

  try {
    const res = await executeScript('shoot', shoot, [{
      path: `${context && context.siteAbsoluteUrl ? context.siteAbsoluteUrl : ''}/_api/web/lists/getById(guid'${listId}')/fields?$select=InternalName,TypeAsString,Title,FieldTypeKind,LookupList,LookupField,Hidden,ReadOnlyField,IsDependentLookup`,
      method: "GET",
      headers: JSON.stringify({
        "accept": "application/json"
      }),
      body: ""
    }, chrome.runtime.getURL('')]);

    if (res && res.success === false) {
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: res.errorMessage,
        color: MessageBarColors.danger,
      }));
    } else {
      dispatch(actions.setListFields(res.value));
    }
    
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to get list fields',
      color: MessageBarColors.danger,
    }));
  }
}

export async function getContextInfo(dispatch: Dispatch<QueryBuilderActions | HomeActions>) {
  dispatch(rootActions.setLoading(true));

  try {
    const getContextFunc = () => {
      return (window as any)._spPageContextInfo || ((window as any).moduleLoaderPromise ? (window as any).moduleLoaderPromise.then((e: any) => {
        return (window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext;
      }) : null);
    };

    const res = await executeScript('getContextInfo', getContextFunc, []);

    if (res) {
      dispatch(actions.setContext(res));
    } else {
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'Could not get context info!',
        color: MessageBarColors.danger,
      }));
    }
    
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error instanceof Error ? error.message : 'Failed to get context info',
      color: MessageBarColors.danger,
    }));
  }
}
