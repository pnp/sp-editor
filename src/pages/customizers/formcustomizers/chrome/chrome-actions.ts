import { Dispatch } from 'redux'
import {
  setLists,
  setListsWithCustomizers,
  setError,
  setAllContentTypesForList,
  setAvailableCustomizers,
} from '../../../../store/formcustomizers/actions'
import { setLoading } from '../../../../store/home/actions'
import { IListInfo, IContentTypeInfo, IListWithFormCustomizers, IFormCustomizerInfo } from '../../../../store/formcustomizers/types'
import { getAllLists } from './get-all-lists'
import { getListContentTypes } from './get-list-content-types'
import { getContentTypesWithCustomizers } from './get-content-types-with-customizers'
import { updateFormCustomizer } from './update-form-customizer'
import { getAvailableCustomizers, IAppCatalogFormCustomizer } from './get-available-customizers'

// Re-export types
export type { IAppCatalogFormCustomizer }

// Load all form customizers across all lists
export async function loadAllFormCustomizers(dispatch: Dispatch, tabId: number) {
  dispatch(setLoading(true))
  dispatch(setError(null))

  chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL('')],
    func: getAllLists,
  }).then(async (injectionResults) => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        const lists: IListInfo[] = res.result || []
        dispatch(setLists(lists))

        // Now get content types with customizers for each list
        const listsWithCustomizers: IListWithFormCustomizers[] = []

        for (const list of lists) {
          const formsResult = await chrome.scripting.executeScript({
            target: { tabId },
            world: 'MAIN',
            args: [chrome.runtime.getURL(''), list.Id, list.Title],
            func: getContentTypesWithCustomizers,
          })

          const formsResponse = formsResult?.[0]?.result as any
          if (formsResponse?.success) {
            const forms: IFormCustomizerInfo[] = formsResponse.result || []

            if (forms.length > 0) {
              listsWithCustomizers.push({
                list,
                forms,
              })
            }
          }
        }

        dispatch(setListsWithCustomizers(listsWithCustomizers))
        dispatch(setLoading(false))
      } else {
        dispatch(setError(res.errorMessage))
        dispatch(setLoading(false))
      }
    }
  })
}

// Load content types for a specific list
export async function loadContentTypesForList(dispatch: Dispatch, tabId: number, listId: string) {
  chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL(''), listId],
    func: getListContentTypes,
  }).then((injectionResults) => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        dispatch(setAllContentTypesForList(res.result || []))
      } else {
        console.error('Failed to load content types for list:', res.errorMessage)
      }
    }
  })
}

// Load available form customizers from app catalog
export async function loadAvailableFormCustomizers(dispatch: Dispatch, tabId: number) {
  chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL('')],
    func: getAvailableCustomizers,
  }).then((injectionResults) => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        dispatch(setAvailableCustomizers(res.result || []))
      } else {
        console.error('Failed to load available customizers:', res.errorMessage)
      }
    }
  })
}

// Save form customizer
export async function saveFormCustomizer(
  tabId: number,
  listId: string,
  contentTypeId: string,
  formTypes: { New?: boolean; Edit?: boolean; Display?: boolean },
  componentId: string | null,
  componentProperties: string | null
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL(''), listId, contentTypeId, formTypes, componentId, componentProperties],
      func: updateFormCustomizer,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve()
        } else {
          reject(new Error(res.errorMessage || 'Failed to update form customizer'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}