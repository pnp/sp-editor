import { Constants, FileExplorerActions, IFile, IFileExplorerState } from './types';

const init: IFileExplorerState = {
  files: [],
  loading: false,
  selectedFile: undefined,
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

    case Constants.FE_SET_SELECTED_FILE_CONTENT:
      return {
        ...state,
        selectedFile: {
          ...state.selectedFile!,
          content: action.payload.content,
        },
      };

    default:
      return state;
  }
}