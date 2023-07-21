import { Constants, FileExplorerActions, IFileExplorerState } from './types'

const init: IFileExplorerState = {
  name: '',
  children: [],
}

export function fileExplorerReducer(state: IFileExplorerState = init, action: FileExplorerActions): IFileExplorerState {
  switch (action.type) {
    case Constants.FE_GET_ITEMS:
      return { ...state, ...action.payload.items }
      // create a new object chich updates any children by the parents id
      
    case Constants.FE_GET_CHILDREN:
      return { ...state, ...action.payload.items }
    default:
      return state
  }
}
