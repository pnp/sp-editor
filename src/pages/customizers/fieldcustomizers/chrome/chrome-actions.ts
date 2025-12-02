import { Dispatch } from 'redux'
import {
  setLists,
  setListsWithCustomizers,
  setError,
  setAllFieldsForList,
} from '../../../../store/fieldcustomizers/actions'
import { setLoading } from '../../../../store/home/actions'
import { IListInfo, IFieldInfo, IListWithFieldCustomizers } from '../../../../store/fieldcustomizers/types'
import { getAllLists } from './get-all-lists'
import { getListFields } from './get-list-fields'
import { updateFieldCustomizer } from './update-field-customizer'
import { removeFieldCustomizer } from './remove-field-customizer'
import { getAvailableCustomizers, IAppCatalogFieldCustomizer } from './get-available-customizers'

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'

// Re-export types
export type { IAppCatalogFieldCustomizer }

// Helper to filter fields with valid customizers
function filterFieldsWithCustomizers(fields: IFieldInfo[]): IFieldInfo[] {
  return fields.filter(
    (f) =>
      f.ClientSideComponentId &&
      f.ClientSideComponentId !== EMPTY_GUID &&
      f.ClientSideComponentId !== null
  )
}

// Load all field customizers across all lists
export async function loadAllFieldCustomizers(dispatch: Dispatch, tabId: number) {
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

        // Now get fields for each list and filter for customizers
        const listsWithCustomizers: IListWithFieldCustomizers[] = []

        for (const list of lists) {
          const fieldsResult = await chrome.scripting.executeScript({
            target: { tabId },
            world: 'MAIN',
            args: [chrome.runtime.getURL(''), list.Id],
            func: getListFields,
          })

          const fieldsResponse = fieldsResult?.[0]?.result as any
          if (fieldsResponse?.success) {
            const allFields: IFieldInfo[] = fieldsResponse.result || []
            const customizedFields = filterFieldsWithCustomizers(allFields)

            if (customizedFields.length > 0) {
              listsWithCustomizers.push({
                list,
                fields: customizedFields,
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

// Load fields for a specific list
export async function loadFieldsForList(dispatch: Dispatch, tabId: number, listId: string) {
  chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL(''), listId],
    func: getListFields,
  }).then((injectionResults) => {
    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any
      if (res.success) {
        dispatch(setAllFieldsForList(res.result || []))
      } else {
        console.error('Failed to load fields for list:', res.errorMessage)
      }
    }
  })
}

// Save field customizer
export async function saveListFieldCustomizer(
  tabId: number,
  listId: string,
  fieldId: string,
  componentId: string | null,
  componentProperties: string | null
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL(''), listId, fieldId, componentId, componentProperties],
      func: updateFieldCustomizer,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve()
        } else {
          reject(new Error(res.errorMessage || 'Failed to update field'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}

// Delete/Remove field customizer
export async function deleteFieldCustomizer(
  tabId: number,
  listId: string,
  fieldId: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL(''), listId, fieldId],
      func: removeFieldCustomizer,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve()
        } else {
          reject(new Error(res.errorMessage || 'Failed to remove field customizer'))
        }
      } else {
        reject(new Error('No result from script execution'))
      }
    }).catch(reject)
  })
}

// Load available field customizers from app catalog
export async function loadFieldCustomizersFromAppCatalog(tabId: number): Promise<IAppCatalogFieldCustomizer[]> {
  return new Promise((resolve) => {
    chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      args: [chrome.runtime.getURL('')],
      func: getAvailableCustomizers,
    }).then((injectionResults) => {
      if (injectionResults[0].result) {
        const res = injectionResults[0].result as any
        if (res.success) {
          resolve(res.result || [])
        } else {
          console.error('Failed to load field customizers from app catalog:', res.errorMessage)
          resolve([])
        }
      } else {
        resolve([])
      }
    }).catch((err) => {
      console.error('Failed to load field customizers from app catalog:', err)
      resolve([])
    })
  })
}