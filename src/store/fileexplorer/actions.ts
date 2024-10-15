import { action } from 'typesafe-actions'
import { Constants, IFile } from './types'

export function setAllFiles(items: IFile[]) {
  return action(Constants.FE_GET_ITEMS, {
    items,
  })
}

export function addItemsToChildren(id: string, items: IFile[]) {
  return action(Constants.FE_ADD_ITEMS_TO_CHILDREN, {
    id,
    items
  })
}

export function updateLoading(id: string) {
  return action(Constants.FE_UPDATE_LOADING, {
    id,
  })
}

export function updateToggle(id: string) {
  return action(Constants.FE_UPDATE_TOGGLE, {
    id,
  })
}

export function setSelectedFile(file: IFile | undefined) {
  return action(Constants.FE_SET_SELECTED_FILE, {
    file,
  })
}

export function setSelectedFileContent(content: string) {
  return action(Constants.FE_SET_SELECTED_FILE_CONTENT, {
    content,
  })
}
