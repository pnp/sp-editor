import { Dispatch } from 'redux'
import * as rootActions from '../../../store/home/actions'
import { HomeActions, MessageBarColors } from '../../../store/home/types'
import * as actions from '../../../store/pagewebparts/actions'
import { IPageWebPart, PageWebPartsActions } from '../../../store/pagewebparts/types'
import { getPageWebParts } from './getPageWebParts'
import { addWebPartToPage } from './addWebPartToPage'

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

export async function addWebPart(
  dispatch: Dispatch<PageWebPartsActions | HomeActions>,
  webPartDataJson: string,
  zoneIndex: number,
  sectionIndex: number,
  sectionFactor: number
) {
  dispatch(rootActions.setLoading(true))

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [webPartDataJson, zoneIndex, sectionIndex, sectionFactor],
    func: addWebPartToPage,
  }).then(async injectionResults => {
    if (injectionResults[0]?.result) {
      const res = injectionResults[0].result as any

      if (res.success) {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'Web part added successfully!',
          color: MessageBarColors.success,
        }))
        // Wait for SP to process, then refresh the list
        await new Promise(resolve => setTimeout(resolve, 1500))
        getAllPageWebParts(dispatch)
      } else {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage || 'Failed to add web part.',
          color: MessageBarColors.danger,
        }))
      }
    } else {
      dispatch(rootActions.setAppMessage({
        showMessage: true,
        message: 'No response from page script. Make sure you are on a SharePoint modern page.',
        color: MessageBarColors.danger,
      }))
    }
    dispatch(rootActions.setLoading(false))
  })
}
