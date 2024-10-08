import { Dispatch } from 'redux';
import * as actions from '../../../store/fileexplorer/actions';
import { FileExplorerActions, IFile } from '../../../store/fileexplorer/types';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import { getFiles } from './getfiles';
import { getFileContent } from './getFileContent';
import { updateFile } from './updateFile';

export async function getAllFiles(dispatch: Dispatch<FileExplorerActions | HomeActions>, id: string = '', webId: string = '', type: string = '', relativeUrl: string = '') {

  if (id) {
    dispatch(actions.updateLoading(id));
  }

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL(''), webId, type, relativeUrl],
      func: getFiles,
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
          dispatch(actions.setAllFiles([]));
        } else {
          // here, conver res to IFile[]
          const files: IFile[] = res as IFile[]
          const typeOrder = ['folder', 'web', 'file'];

          // Sort the files array
          const sortedFiles = files.sort((a, b) => {
            // First, sort by type
            const typeComparison = typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
            if (typeComparison !== 0) return typeComparison;
            // If types are the same, sort alphabetically by name
            return a.name.localeCompare(b.name);
          });   
          
          if (webId) {
            // add scriptlinks to state
            dispatch(actions.addItemsToChildren(id, sortedFiles));
            dispatch(actions.updateLoading(id));
            dispatch(actions.updateToggle(id));

            //dispatch(actions.updateLoading(id));
          } else {
            // add webproperties to state
            dispatch(actions.setAllFiles(sortedFiles));
          }
        }
        // hide loading component
        dispatch(rootActions.setLoading(false));
      }
    });
}

export async function getFile(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL(''), file.ServerRelativeUrl, file.webId],
      func: getFileContent,
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
          dispatch(actions.setSelectedFile(undefined));
          dispatch(actions.setSelectedFileContent(''));
        } else {
          dispatch(actions.setSelectedFile(file));
          dispatch(actions.setSelectedFileContent(res));
        }
        // hide loading component
        dispatch(rootActions.setLoading(false));
      }
    });
}

export async function updateFileContent(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile, content: string) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL(''), file.ServerRelativeUrl, file.webId, content],
      func: updateFile,
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
        } else {
          dispatch(
            rootActions.setAppMessage({
              showMessage: true,
              message: 'File updated successfully!',
              color: MessageBarColors.success,
            })
          );
        }
        // hide loading component
        dispatch(rootActions.setLoading(false));
      }
    });
}
