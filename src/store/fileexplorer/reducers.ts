import { Constants, FileExplorerActions, IFileExplorerState } from './types'

const init: IFileExplorerState = {
  files: [],
  loading: false,
}

export function fileExplorerReducer(state: IFileExplorerState = init, action: FileExplorerActions): IFileExplorerState {
  switch (action.type) {
    case Constants.FE_GET_ITEMS:
      return { ...state, files: action.payload.items }
    default:
      return state
  }
}
