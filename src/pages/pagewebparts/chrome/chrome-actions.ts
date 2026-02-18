import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/pagewebparts/actions'
import { IPageWebPart, PageWebPartsActions } from '../../../store/pagewebparts/types'
import { getPageWebParts } from './getPageWebParts'

export async function getAllPageWebParts(dispatch: Dispatch<PageWebPartsActions | HomeActions>) {

  dispatch(rootActions.setLoading(true))

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL('')],
    func: getPageWebParts,
  }).then(injectionResults => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any

      if (res.success === false) {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }))
        dispatch(actions.setAllPageWebParts([]))
      } else {
        const webParts: IPageWebPart[] = res
        dispatch(actions.setAllPageWebParts(webParts))
      }
    }
    dispatch(rootActions.setLoading(false))
  })
}
