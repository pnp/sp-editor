import { Constants, FileExplorerActions, IFile, IFileExplorerState } from './types';

const init: IFileExplorerState = {
  files: [],
  loading: false,
  selectedFile: undefined,
  selectedFolder: undefined,
  webServerRelativeUrl: '',
};

const updatePropertyById = (nodes: IFile[], id: string, property: keyof IFile): IFile[] => {
  return nodes.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        [property]: !node[property],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updatePropertyById(node.children, id, property),
      };
    }
    return node;
  });
};

const findParentFolderById = (nodes: IFile[], fileId: string, parent: IFile | null = null): IFile | null => {
  for (const node of nodes) {
    if (node.id === fileId) {
      return parent;
    }
    if (node.children) {
      const result = findParentFolderById(node.children, fileId, node);
      if (result) {
        return result;
      }
    }
  }
  return null;
};

export function fileExplorerReducer(state: IFileExplorerState = init, action: FileExplorerActions): IFileExplorerState {
  switch (action.type) {
    case Constants.FE_GET_ITEMS:
      return { ...state, files: action.payload.items };

    case Constants.FE_ADD_ITEMS_TO_CHILDREN:
      const { id, items } = action.payload;

      const addItemsToChildren = (nodes: IFile[]): IFile[] =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              children: items,
            };
          }
          return {
            ...node,
            children: node.children ? addItemsToChildren(node.children) : node.children,
          };
        });

      return {
        ...state,
        files: addItemsToChildren(state.files),
      };

    case Constants.FE_UPDATE_LOADING:
      return {
        ...state,
        files: updatePropertyById(state.files, action.payload.id, 'loading'),
      };

    case Constants.FE_UPDATE_TOGGLE:
      return {
        ...state,
        files: updatePropertyById(state.files, action.payload.id, 'toggled'),
      };

    case Constants.FE_SET_SELECTED_FILE:
      return {
        ...state,
        selectedFile: action.payload.file,
      };

    case Constants.FE_SET_SELECTED_FOLDER:
      const selectedFolder = action.payload.folder;

      if (!selectedFolder) {
        return state; // If selectedFolder is undefined, return the current state
      }

      const parentFile = findParentFolderById(state.files, selectedFolder.id);

      return {
        ...state,
        selectedFolder: {
          ...selectedFolder,
          parentFile: parentFile || undefined, // Add parentFile only if it exists
        },
      };

    case Constants.FE_SET_SELECTED_FILE_CONTENT:
      return {
        ...state,
        selectedFile: {
          ...state.selectedFile!,
          content: action.payload.content,
          loadedContent: action.payload.loadedContent || state.selectedFile!.loadedContent,
        },
      };

    case Constants.FE_SET_SITESERVER_RELATIVE_URL:
      return {
        ...state,
        webServerRelativeUrl: action.payload.webServerRelativeUrl,
      };

    default:
      return state;
  }
}