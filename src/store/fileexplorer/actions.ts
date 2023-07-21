import { action } from 'typesafe-actions'
import { Constants, IFolder } from './types'

export function setAllFiles(items: IFolder) {
  return action(Constants.FE_GET_ITEMS, {
    items,
  })
}

export function setChildren(items: IFolder) {
  return action(Constants.FE_GET_CHILDREN, {
    items,
  })
}