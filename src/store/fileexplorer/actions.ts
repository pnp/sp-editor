import { action } from 'typesafe-actions'
import { Constants, IFile } from './types'

export function setAllFiles(items: IFile[]) {
  return action(Constants.FE_GET_ITEMS, {
    items,
  })
}
