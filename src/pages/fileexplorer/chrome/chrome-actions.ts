import { Dispatch } from 'redux';
import * as actions from '../../../store/fileexplorer/actions';
import { FileExplorerActions, IFile } from '../../../store/fileexplorer/types';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import { getFiles } from './getfiles';
import { getFileContent } from './getFileContent';
import { updateFile } from './updateFile';
import { createFolder } from './createFolder';
import { deleteFolder } from './deleteFolder';
import { createFile } from './createFile';
import { deleteFile } from './deleteFile';

export function getAllFiles(dispatch: Dispatch<FileExplorerActions | HomeActions>, id: string = '', webId: string = '', type: string = '', relativeUrl: string = '') {

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
          const files: IFile[] = res as IFile[];
          const typeOrder = ['folder', 'web', 'file'];

          // Sort the files array
          const sortedFiles = files.sort((a, b) => {
            // First, sort by type
            const typeComparison = typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
            if (typeComparison !== 0) return typeComparison;
            // If types are the same, sort alphabetically by name
            return a.name.localeCompare(b.name);
          });

          if (sortedFiles.length > 0) {
            dispatch(actions.setWebServerRelativeUrl(sortedFiles[0].webServerRelativeUrl));
          }
          if (webId) {
            // add scriptlinks to state
            dispatch(actions.addItemsToChildren(id, sortedFiles));
            dispatch(actions.updateLoading(id));
            dispatch(actions.updateToggle(id));

            //dispatch(actions.updateLoading(id));
          } else {
            const root = sortedFiles[0]
            dispatch(actions.setSelectedFolder(sortedFiles[0]));
            dispatch(actions.setAllFiles(sortedFiles));
            getAllFiles(dispatch, root.id, root.webId, root.type, root.ServerRelativeUrl);
          }
        }
        // hide loading component
        dispatch(rootActions.setLoading(false));
      }
    });
}

export function getFile(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile) {

  dispatch(rootActions.setLoading(true));
  dispatch(actions.setSelectedFile(undefined));

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
        } else {
          dispatch(actions.setSelectedFile(file));
          dispatch(actions.setSelectedFileContent(res, res));
        }
        // hide loading component
        dispatch(rootActions.setLoading(false));
      } else {
        // file content was empty
        const res = injectionResults[0].result as any;
        dispatch(actions.setSelectedFile(file));
        dispatch(actions.setSelectedFileContent(res, res));

        // hide loading component
        dispatch(rootActions.setLoading(false));
      }
    });
}

export function updateFileContent(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile, content: string) {

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

export function addFolder(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile, name: string) {

  dispatch(rootActions.setLoading(true));
  const sanitizedServerRelativeUrl = file.ServerRelativeUrl
    ? file.ServerRelativeUrl.replace(/\/+$/, '')
    : file.name === 'root'
    ? '/'
    : file.name.replace(/\/+$/, '');
  const fullUrl = sanitizedServerRelativeUrl + '/' + name;

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL(''), fullUrl, file.webId],
      func: createFolder,
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
              message: 'Folder added successfully!',
              color: MessageBarColors.success,
            })
          );
          if (file.id !== 'root') {
            dispatch(actions.updateToggle(file.id));
            getAllFiles(dispatch, file.id, file.webId, file.type, file.ServerRelativeUrl);
          } else {
            getAllFiles(dispatch);
          }

        }
        // hide loading component
        dispatch(rootActions.setLoading(false));
      }
    });
}

export function removeFolder(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile,) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL(''), file.ServerRelativeUrl, file.webId],
      func: deleteFolder,
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
              message: 'Folder deleted successfully!',
              color: MessageBarColors.success,
            })
          );
          if (file.parentFile/* && file.parentFile?.id !== 'root'*/) {
            dispatch(actions.updateToggle(file.parentFile.id));
            dispatch(actions.setSelectedFolder(file.parentFile));
            getAllFiles(
              dispatch,
              file.parentFile?.id,
              file.parentFile?.webId,
              file.parentFile?.type,
              file.parentFile?.ServerRelativeUrl
            );
          } else {
            getAllFiles(dispatch);
          }
        }
        // hide loading component
        dispatch(rootActions.setLoading(false));
      }
    });
}

export function addFile(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile, name: string) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL(''), file.ServerRelativeUrl, file.webId, name],
      func: createFile,
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
              message: 'File added successfully!',
              color: MessageBarColors.success,
            })
          );

          if (file.id !== 'root') {
            dispatch(actions.updateToggle(file.id));
            getAllFiles(dispatch, file.id, file.webId, file.type, file.ServerRelativeUrl);
          } else {
            getAllFiles(dispatch);
          }
          getFile(dispatch, res);

        }
        // hide loading component
        dispatch(rootActions.setLoading(false));
      }
    });
}

export function removeFile(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile, selectedFolder: IFile) {

  dispatch(rootActions.setLoading(true));

  chrome.scripting
    .executeScript({
      target: { tabId: chrome.devtools.inspectedWindow.tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL(''), file.ServerRelativeUrl, file.webId],
      func: deleteFile,
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
              message: 'File deleted successfully!',
              color: MessageBarColors.success,
            })
          );
          dispatch(actions.setSelectedFile(undefined));
          dispatch(actions.setSelectedFileContent('', ''));

          dispatch(actions.updateToggle(selectedFolder.id));
          dispatch(actions.setSelectedFolder(selectedFolder));

          getAllFiles(
            dispatch,
            selectedFolder.id,
            selectedFolder.webId,
            selectedFolder.type,
            selectedFolder.ServerRelativeUrl
          );
        }
        // hide loading component
        dispatch(rootActions.setLoading(false));
      }
    });
}