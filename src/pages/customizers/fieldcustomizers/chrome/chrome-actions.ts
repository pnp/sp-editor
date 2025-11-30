import { Dispatch } from 'redux'
import {
  setLoading,
  setLists,
  setListsWithCustomizers,
  setAllFieldsForList,
  setError,
} from '../actions'
import { IFieldInfo, IListInfo, IListWithFieldCustomizers } from '../types'

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'

// Helper to filter fields with valid customizers (runs in extension context)
function filterFieldsWithCustomizers(fields: IFieldInfo[]): IFieldInfo[] {
  return fields.filter(
    (f) =>
      f.ClientSideComponentId &&
      f.ClientSideComponentId !== EMPTY_GUID &&
      f.ClientSideComponentId !== null
  )
}

// Get all lists - self-contained function for page context
const getAllLists = (extPath: string) => {
  type libTypes = [any, any, any]

  const moduleLoader = (extPath: string) => {
    return new Promise<libTypes>((resolve) => {
      const resolveWithContext = <T>(modules: T, resolve: (value: T) => void) => {
        if (!(window as any)._spPageContextInfo && (window as any).moduleLoaderPromise) {
          ;(window as any).moduleLoaderPromise.then((e: any) => {
            ;(window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext
            resolve(modules)
          })
        } else {
          resolve(modules)
        }
      }

      if ((window as any).SystemJS) {
        Promise.all<libTypes>([
          (window as any).SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js'),
        ]).then((modules) => {
          resolveWithContext(modules, resolve)
        })
      } else {
        const s = document.createElement('script')
        s.src = extPath + 'bundles/system.js'
        ;(document.head || document.documentElement).appendChild(s)
        s.onload = () =>
          Promise.all<libTypes>([
            (window as any).SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
            (window as any).SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
            (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js'),
          ]).then((modules) => {
            resolveWithContext(modules, resolve)
          })
      }
    })
  }

  return moduleLoader(extPath).then((modules) => {
    const pnpsp = modules[0]
    const pnpqueryable = modules[2]

    const sp = pnpsp
      .spfi()
      .using((instance: any) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse()
        )
        instance.on.pre.prepend(async (url: string, init: any, result: any) => {
          url = (window as any)._spPageContextInfo?.webAbsoluteUrl
            ? new URL(
                url,
                (window as any)._spPageContextInfo.webAbsoluteUrl.endsWith('/')
                  ? (window as any)._spPageContextInfo.webAbsoluteUrl
                  : (window as any)._spPageContextInfo.webAbsoluteUrl + '/'
              ).toString()
            : url
          return [url, init, result]
        })
        return instance
      })
      .using(
        pnpqueryable.InjectHeaders({
          Accept: 'application/json; odata=verbose',
          'Cache-Control': 'no-cache',
          'X-ClientService-ClientTag': 'SPEDITOR',
        })
      )

    return sp.web.lists
      .filter('Hidden eq false')
      .select('Id', 'Title')
      .orderBy('Title')()
      .then((lists: any) => ({
        success: true,
        result: lists,
        errorMessage: '',
        source: 'chrome-sp-editor',
      }))
      .catch((error: any) => ({
        success: false,
        result: null,
        errorMessage: error.message,
        source: 'chrome-sp-editor',
      }))
  })
}

// Get fields with customizers for a specific list
const getListFieldsWithCustomizers = (extPath: string, listId: string) => {
  type libTypes = [any, any, any]

  const moduleLoader = (extPath: string) => {
    return new Promise<libTypes>((resolve) => {
      const resolveWithContext = <T>(modules: T, resolve: (value: T) => void) => {
        if (!(window as any)._spPageContextInfo && (window as any).moduleLoaderPromise) {
          ;(window as any).moduleLoaderPromise.then((e: any) => {
            ;(window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext
            resolve(modules)
          })
        } else {
          resolve(modules)
        }
      }

      if ((window as any).SystemJS) {
        Promise.all<libTypes>([
          (window as any).SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js'),
        ]).then((modules) => {
          resolveWithContext(modules, resolve)
        })
      } else {
        const s = document.createElement('script')
        s.src = extPath + 'bundles/system.js'
        ;(document.head || document.documentElement).appendChild(s)
        s.onload = () =>
          Promise.all<libTypes>([
            (window as any).SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
            (window as any).SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
            (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js'),
          ]).then((modules) => {
            resolveWithContext(modules, resolve)
          })
      }
    })
  }

  return moduleLoader(extPath).then((modules) => {
    const pnpsp = modules[0]
    const pnpqueryable = modules[2]

    const sp = pnpsp
      .spfi()
      .using((instance: any) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse()
        )
        instance.on.pre.prepend(async (url: string, init: any, result: any) => {
          url = (window as any)._spPageContextInfo?.webAbsoluteUrl
            ? new URL(
                url,
                (window as any)._spPageContextInfo.webAbsoluteUrl.endsWith('/')
                  ? (window as any)._spPageContextInfo.webAbsoluteUrl
                  : (window as any)._spPageContextInfo.webAbsoluteUrl + '/'
              ).toString()
            : url
          return [url, init, result]
        })
        return instance
      })
      .using(
        pnpqueryable.InjectHeaders({
          Accept: 'application/json; odata=verbose',
          'Cache-Control': 'no-cache',
          'X-ClientService-ClientTag': 'SPEDITOR',
        })
      )

    return sp.web.lists
      .getById(listId)
      .fields.filter('Hidden eq false')
      .select(
        'Id',
        'InternalName',
        'Title',
        'TypeAsString',
        'ClientSideComponentId',
        'ClientSideComponentProperties'
      )
      .orderBy('Title')()
      .then((fields: any) => ({
        success: true,
        result: fields,
        errorMessage: '',
        source: 'chrome-sp-editor',
      }))
      .catch((error: any) => ({
        success: false,
        result: null,
        errorMessage: error.message,
        source: 'chrome-sp-editor',
      }))
  })
}

// Update list field customizer - self-contained function for page context
const updateListField = (
  extPath: string,
  listId: string,
  fieldId: string,
  componentId: string | null,
  componentProperties: string | null
) => {
  type libTypes = [any, any, any]

  const moduleLoader = (extPath: string) => {
    return new Promise<libTypes>((resolve) => {
      const resolveWithContext = <T>(modules: T, resolve: (value: T) => void) => {
        if (!(window as any)._spPageContextInfo && (window as any).moduleLoaderPromise) {
          ;(window as any).moduleLoaderPromise.then((e: any) => {
            ;(window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext
            resolve(modules)
          })
        } else {
          resolve(modules)
        }
      }

      if ((window as any).SystemJS) {
        Promise.all<libTypes>([
          (window as any).SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
          (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js'),
        ]).then((modules) => {
          resolveWithContext(modules, resolve)
        })
      } else {
        const s = document.createElement('script')
        s.src = extPath + 'bundles/system.js'
        ;(document.head || document.documentElement).appendChild(s)
        s.onload = () =>
          Promise.all<libTypes>([
            (window as any).SystemJS.import(extPath + 'bundles/sp.es5.umd.bundle.js'),
            (window as any).SystemJS.import(extPath + 'bundles/logging.es5.umd.bundle.js'),
            (window as any).SystemJS.import(extPath + 'bundles/queryable.es5.umd.bundle.js'),
          ]).then((modules) => {
            resolveWithContext(modules, resolve)
          })
      }
    })
  }

  // Use empty GUID instead of null to clear the customizer
  const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'
  const finalComponentId = componentId || EMPTY_GUID
  const finalComponentProperties = componentProperties || ''

  return moduleLoader(extPath).then((modules) => {
    const pnpsp = modules[0]
    const pnpqueryable = modules[2]

    let digest = ''

    const sp = pnpsp
      .spfi()
      .using((instance: any) => {
        instance.using(
          pnpsp.DefaultHeaders(),
          pnpsp.DefaultInit(),
          pnpqueryable.BrowserFetchWithRetry(),
          pnpqueryable.DefaultParse()
        )
        instance.on.pre.prepend(async (url: string, init: any, result: any) => {
          url = (window as any)._spPageContextInfo?.webAbsoluteUrl
            ? new URL(
                url,
                (window as any)._spPageContextInfo.webAbsoluteUrl.endsWith('/')
                  ? (window as any)._spPageContextInfo.webAbsoluteUrl
                  : (window as any)._spPageContextInfo.webAbsoluteUrl + '/'
              ).toString()
            : url

          if (['POST', 'PATCH', 'PUT', 'DELETE', 'MERGE'].includes(init.method ?? '')) {
            if (!digest) {
              const modifiedUrl = url.toString().replace(/_api.*|_vti_.*/g, '')
              const response = await fetch(`${modifiedUrl}_api/contextinfo`, {
                method: 'POST',
                headers: {
                  accept: 'application/json;odata=verbose',
                  'content-type': 'application/json;odata=verbose',
                },
              })
              const data = await response.json()
              digest = data.d.GetContextWebInformation.FormDigestValue
            }
            init.headers = {
              'X-RequestDigest': digest,
              ...init.headers,
            }
          }

          return [url, init, result]
        })
        return instance
      })
      .using(
        pnpqueryable.InjectHeaders({
          Accept: 'application/json; odata=verbose',
          'Cache-Control': 'no-cache',
          'X-ClientService-ClientTag': 'SPEDITOR',
        })
      )

    return sp.web.lists
      .getById(listId)
      .fields.getById(fieldId)
      .update({
        ClientSideComponentId: finalComponentId,
        ClientSideComponentProperties: finalComponentProperties,
      })
      .then(() => ({
        success: true,
        result: null,
        errorMessage: '',
        source: 'chrome-sp-editor',
      }))
      .catch((error: any) => ({
        success: false,
        result: null,
        errorMessage: error.message,
        source: 'chrome-sp-editor',
      }))
  })
}

// Exported chrome action functions
export const loadLists = async (dispatch: Dispatch, tabId: number) => {
  try {
    const extPath = chrome.runtime.getURL('/')

    const results = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: getAllLists,
      args: [extPath],
    })

    const response = results?.[0]?.result
    if (response?.success) {
      dispatch(setLists(response.result || []))
    } else {
      console.error('Failed to load lists:', response?.errorMessage)
    }
  } catch (err) {
    console.error('Failed to load lists:', err)
  }
}

export const loadAllFieldCustomizers = async (dispatch: Dispatch, tabId: number) => {
  dispatch(setLoading(true))
  dispatch(setError(null))

  try {
    const extPath = chrome.runtime.getURL('/')

    // First get all lists
    const listsResult = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: getAllLists,
      args: [extPath],
    })

    const listsResponse = listsResult?.[0]?.result
    if (!listsResponse?.success) {
      dispatch(setError(listsResponse?.errorMessage || 'Failed to load lists'))
      dispatch(setLoading(false))
      return
    }

    const lists: IListInfo[] = listsResponse.result || []
    dispatch(setLists(lists))

    // Now get fields for each list and filter for customizers
    const listsWithCustomizers: IListWithFieldCustomizers[] = []

    for (const list of lists) {
      const fieldsResult = await chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        func: getListFieldsWithCustomizers,
        args: [extPath, list.Id],
      })

      const fieldsResponse = fieldsResult?.[0]?.result
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
  } catch (err) {
    console.error('Failed to load field customizers:', err)
    dispatch(setError(err instanceof Error ? err.message : 'Failed to load field customizers'))
  } finally {
    dispatch(setLoading(false))
  }
}

export const loadFieldsForList = async (dispatch: Dispatch, tabId: number, listId: string) => {
  try {
    const extPath = chrome.runtime.getURL('/')

    const result = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: getListFieldsWithCustomizers,
      args: [extPath, listId],
    })

    const response = result?.[0]?.result
    if (response?.success) {
      dispatch(setAllFieldsForList(response.result || []))
    } else {
      console.error('Failed to load fields for list:', response?.errorMessage)
    }
  } catch (err) {
    console.error('Failed to load fields for list:', err)
  }
}

export const saveListFieldCustomizer = async (
  tabId: number,
  listId: string,
  fieldId: string,
  componentId: string | null,
  componentProperties: string | null
) => {
  const extPath = chrome.runtime.getURL('/')

  const result = await chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    func: updateListField,
    args: [extPath, listId, fieldId, componentId, componentProperties],
  })

  const response = result?.[0]?.result
  if (!response?.success) {
    throw new Error(response?.errorMessage || 'Failed to update field')
  }
}