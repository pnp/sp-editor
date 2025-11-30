import { Dispatch } from 'redux'
import {
  setLists,
  setListsWithCustomizers,
  setLoading,
  setError,
} from '../actions'
import { IListInfo, IFormCustomizerInfo, IListWithFormCustomizers } from '../types'

const EMPTY_GUID = '00000000-0000-0000-0000-000000000000'

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

// Get form customizers for a specific list via content types
const getListFormCustomizers = (extPath: string, listId: string) => {
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

    // Get content types with form customizer properties
    return sp.web.lists
      .getById(listId)
      .contentTypes.select(
        'StringId',
        'Name',
        'NewFormClientSideComponentId',
        'NewFormClientSideComponentProperties',
        'EditFormClientSideComponentId',
        'EditFormClientSideComponentProperties',
        'DisplayFormClientSideComponentId',
        'DisplayFormClientSideComponentProperties'
      )()
      .then((contentTypes: any) => ({
        success: true,
        result: contentTypes,
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

// Update content type form customizer - self-contained function for page context
const updateContentTypeFormCustomizer = (
  extPath: string,
  listId: string,
  contentTypeId: string,
  formType: 'New' | 'Edit' | 'Display',
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

  // Build the update object based on form type
  const updateObj: any = {}
  if (formType === 'New') {
    updateObj.NewFormClientSideComponentId = finalComponentId
    updateObj.NewFormClientSideComponentProperties = finalComponentProperties
  } else if (formType === 'Edit') {
    updateObj.EditFormClientSideComponentId = finalComponentId
    updateObj.EditFormClientSideComponentProperties = finalComponentProperties
  } else if (formType === 'Display') {
    updateObj.DisplayFormClientSideComponentId = finalComponentId
    updateObj.DisplayFormClientSideComponentProperties = finalComponentProperties
  }

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
      .contentTypes.getById(contentTypeId)
      .update(updateObj)
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

// Get content types for a list (for the add panel)
const getListContentTypes = (extPath: string, listId: string) => {
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
      .contentTypes.filter('Hidden eq false')
      .select('StringId', 'Name')()
      .then((contentTypes: any) => ({
        success: true,
        result: contentTypes,
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

// Helper to check if a form has a customizer
function hasFormCustomizer(componentId: string | null): boolean {
  return !!componentId && componentId !== EMPTY_GUID
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

export const loadContentTypesForList = async (tabId: number, listId: string) => {
  try {
    const extPath = chrome.runtime.getURL('/')

    const result = await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: getListContentTypes,
      args: [extPath, listId],
    })

    const response = result?.[0]?.result
    if (response?.success) {
      return response.result || []
    } else {
      console.error('Failed to load content types:', response?.errorMessage)
      return []
    }
  } catch (err) {
    console.error('Failed to load content types:', err)
    return []
  }
}

export const loadAllFormCustomizers = async (dispatch: Dispatch, tabId: number) => {
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

    // Now get form customizers for each list via content types
    const listsWithCustomizers: IListWithFormCustomizers[] = []

    for (const list of lists) {
      const formResult = await chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        func: getListFormCustomizers,
        args: [extPath, list.Id],
      })

      const formResponse = formResult?.[0]?.result
      if (formResponse?.success) {
        const contentTypes = formResponse.result || []
        const forms: IFormCustomizerInfo[] = []

        // Check each content type for form customizers
        for (const ct of contentTypes) {
          if (hasFormCustomizer(ct.NewFormClientSideComponentId)) {
            forms.push({
              listId: list.Id,
              listTitle: list.Title,
              contentTypeId: ct.StringId,
              contentTypeName: ct.Name,
              formType: 'New',
              ClientSideComponentId: ct.NewFormClientSideComponentId,
              ClientSideComponentProperties: ct.NewFormClientSideComponentProperties,
            })
          }
          if (hasFormCustomizer(ct.EditFormClientSideComponentId)) {
            forms.push({
              listId: list.Id,
              listTitle: list.Title,
              contentTypeId: ct.StringId,
              contentTypeName: ct.Name,
              formType: 'Edit',
              ClientSideComponentId: ct.EditFormClientSideComponentId,
              ClientSideComponentProperties: ct.EditFormClientSideComponentProperties,
            })
          }
          if (hasFormCustomizer(ct.DisplayFormClientSideComponentId)) {
            forms.push({
              listId: list.Id,
              listTitle: list.Title,
              contentTypeId: ct.StringId,
              contentTypeName: ct.Name,
              formType: 'Display',
              ClientSideComponentId: ct.DisplayFormClientSideComponentId,
              ClientSideComponentProperties: ct.DisplayFormClientSideComponentProperties,
            })
          }
        }

        if (forms.length > 0) {
          listsWithCustomizers.push({
            list,
            forms,
          })
        }
      }
    }

    dispatch(setListsWithCustomizers(listsWithCustomizers))
  } catch (err) {
    console.error('Failed to load form customizers:', err)
    dispatch(setError(err instanceof Error ? err.message : 'Failed to load form customizers'))
  } finally {
    dispatch(setLoading(false))
  }
}

export const saveFormCustomizer = async (
  tabId: number,
  listId: string,
  contentTypeId: string,
  formType: 'New' | 'Edit' | 'Display',
  componentId: string | null,
  componentProperties: string | null
) => {
  const extPath = chrome.runtime.getURL('/')

  const result = await chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    func: updateContentTypeFormCustomizer,
    args: [extPath, listId, contentTypeId, formType, componentId, componentProperties],
  })

  const response = result?.[0]?.result
  if (!response?.success) {
    throw new Error(response?.errorMessage || 'Failed to update form customizer')
  }
}