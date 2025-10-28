import { Dispatch } from 'redux';
import * as actions from '../../../store/fileexplorer/actions';
import { FileExplorerActions, IFile } from '../../../store/fileexplorer/types';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import { executeScript } from '../../../utilities/script-injection';
import { getFiles } from './getfiles';
import { getFileContent } from './getFileContent';
import { updateFile } from './updateFile';
import { createFolder } from './createFolder';
import { deleteFolder } from './deleteFolder';
import { createFile } from './createFile';
import { deleteFile } from './deleteFile';

export async function getAllFiles(dispatch: Dispatch<FileExplorerActions | HomeActions>, id: string = '', webId: string = '', type: string = '', relativeUrl: string = '') {
  if (id) {
    dispatch(actions.updateLoading(id));
  }

  try {
    const res = await executeScript('getFiles', getFiles, [chrome.runtime.getURL(''), webId, type, relativeUrl]);

    if (res && res.success === false) {
      dispatch(
        rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage,
          color: MessageBarColors.danger,
        })
      );
      dispatch(actions.setAllFiles([]));
    } else {
      // here, convert res to IFile[]
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
      } else {
        const root = sortedFiles[0];
        dispatch(actions.setSelectedFolder(sortedFiles[0]));
        dispatch(actions.setAllFiles(sortedFiles));
        getAllFiles(dispatch, root.id, root.webId, root.type, root.ServerRelativeUrl);
      }
    }
    
    // hide loading component
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to get files',
        color: MessageBarColors.danger,
      })
    );
  }
}

export async function getFile(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile) {
  dispatch(rootActions.setLoading(true));
  dispatch(actions.setSelectedFile(undefined));

  try {
    const res = await executeScript('getFileContent', getFileContent, [chrome.runtime.getURL(''), file.ServerRelativeUrl, file.webId]);

    if (res && res.success === false) {
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
    
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to get file',
        color: MessageBarColors.danger,
      })
    );
  }
}

export async function updateFileContent(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile, content: string) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('updateFile', updateFile, [chrome.runtime.getURL(''), file.ServerRelativeUrl, file.webId, content]);

    if (res && res.success === false) {
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
    
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to update file',
        color: MessageBarColors.danger,
      })
    );
  }
}

export async function addFolder(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile, name: string) {
  dispatch(rootActions.setLoading(true));
  
  const sanitizedServerRelativeUrl = file.ServerRelativeUrl
    ? file.ServerRelativeUrl.replace(/\/+$/, '')
    : file.name === 'root'
    ? '/'
    : file.name.replace(/\/+$/, '');
  const fullUrl = sanitizedServerRelativeUrl + '/' + name;

  try {
    const res = await executeScript('createFolder', createFolder, [chrome.runtime.getURL(''), fullUrl, file.webId]);

    if (res && res.success === false) {
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
    
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to add folder',
        color: MessageBarColors.danger,
      })
    );
  }
}

export async function removeFolder(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('deleteFolder', deleteFolder, [chrome.runtime.getURL(''), file.ServerRelativeUrl, file.webId]);

    if (res && res.success === false) {
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
      
      if (file.parentFile) {
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
    
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to delete folder',
        color: MessageBarColors.danger,
      })
    );
  }
}

export async function addFile(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile, name: string) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('createFile', createFile, [chrome.runtime.getURL(''), file.ServerRelativeUrl, file.webId, name]);

    if (res && res.success === false) {
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
    
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to add file',
        color: MessageBarColors.danger,
      })
    );
  }
}

export async function removeFile(dispatch: Dispatch<FileExplorerActions | HomeActions>, file: IFile, selectedFolder: IFile) {
  dispatch(rootActions.setLoading(true));

  try {
    const res = await executeScript('deleteFile', deleteFile, [chrome.runtime.getURL(''), file.ServerRelativeUrl, file.webId]);

    if (res && res.success === false) {
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
    
    dispatch(rootActions.setLoading(false));
  } catch (error) {
    dispatch(rootActions.setLoading(false));
    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: error instanceof Error ? error.message : 'Failed to delete file',
        color: MessageBarColors.danger,
      })
    );
  }
}