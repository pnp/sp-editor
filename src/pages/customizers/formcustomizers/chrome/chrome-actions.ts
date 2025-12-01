import { Dispatch } from 'redux'
import {
  setLists,
  setListsWithCustomizers,
  setAllContentTypesForList,
} from '../../../../store/formcustomizers/actions'
import {
  IListInfo,
  IContentTypeInfo,
  IListWithFormCustomizers,
  IFormCustomizerInfo,
} from '../../../../store/formcustomizers/types'

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
        result: lists.map((list: any) => ({
          Id: list.Id,
          Title: list.Title,
        })),
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

// Get content types with form customizers for a specific list
const getListContentTypesWithCustomizers = (extPath: string, listId: string, listTitle: string) => {
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
      .then((cts: any) => {
        const formsList: IFormCustomizerInfo[] = []

        cts.forEach((ct: any) => {
          if (ct.NewFormClientSideComponentId) {
            formsList.push({
              listId,
              listTitle,
              contentTypeId: ct.StringId,
              contentTypeName: ct.Name,
              formType: 'New',
              ClientSideComponentId: ct.NewFormClientSideComponentId,
              ClientSideComponentProperties: ct.NewFormClientSideComponentProperties,
            })
          }
          if (ct.EditFormClientSideComponentId) {
            formsList.push({
              listId,
              listTitle,
              contentTypeId: ct.StringId,
              contentTypeName: ct.Name,
              formType: 'Edit',
              ClientSideComponentId: ct.EditFormClientSideComponentId,
              ClientSideComponentProperties: ct.EditFormClientSideComponentProperties,
            })
          }
          if (ct.DisplayFormClientSideComponentId) {
            formsList.push({
              listId,
              listTitle,
              contentTypeId: ct.StringId,
              contentTypeName: ct.Name,
              formType: 'Display',
              ClientSideComponentId: ct.DisplayFormClientSideComponentId,
              ClientSideComponentProperties: ct.DisplayFormClientSideComponentProperties,
            })
          }
        })

        return {
          success: true,
          result: formsList,
          errorMessage: '',
          source: 'chrome-sp-editor',
        }
      })
      .catch((error: any) => ({
        success: false,
        result: null,
        errorMessage: error.message,
        source: 'chrome-sp-editor',
      }))
  })
}

// Get all content types for a list (for add panel)
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
      .contentTypes.select('StringId', 'Name')()
      .then((cts: any) => ({
        success: true,
        result: cts.map((ct: any) => ({
          StringId: ct.StringId,
          Name: ct.Name,
        })),
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

// Update form customizer - now supports multiple form types in one call
const updateFormCustomizer = (
  extPath: string,
  listId: string,
  contentTypeId: string,
  formTypes: { New?: boolean; Edit?: boolean; Display?: boolean },
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

  // For form customizers, use empty string to remove (not empty GUID like field customizers)
  const finalComponentId = componentId || ''
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

    // Build update props for all selected form types in one call
    const updateProps: Record<string, string> = {}

    if (formTypes.New) {
      updateProps['NewFormClientSideComponentId'] = finalComponentId
      updateProps['NewFormClientSideComponentProperties'] = finalComponentProperties
    }

    if (formTypes.Edit) {
      updateProps['EditFormClientSideComponentId'] = finalComponentId
      updateProps['EditFormClientSideComponentProperties'] = finalComponentProperties
    }

    if (formTypes.Display) {
      updateProps['DisplayFormClientSideComponentId'] = finalComponentId
      updateProps['DisplayFormClientSideComponentProperties'] = finalComponentProperties
    }

    return sp.web.lists
      .getById(listId)
      .contentTypes.getById(contentTypeId)
      .update(updateProps)
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
export const loadAllFormCustomizers = async (dispatch: Dispatch, tabId: number) => {
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
      console.error('Failed to load lists:', listsResponse?.errorMessage)
      return
    }

    const lists: IListInfo[] = listsResponse.result || []
    dispatch(setLists(lists))

    // Now get form customizers for each list
    const listsWithCustomizers: IListWithFormCustomizers[] = []

    for (const list of lists) {
      const formsResult = await chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        func: getListContentTypesWithCustomizers,
        args: [extPath, list.Id, list.Title],
      })

      const formsResponse = formsResult?.[0]?.result
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
  } catch (err) {
    console.error('Failed to load form customizers:', err)
  }
}

export const loadContentTypesForList = async (
  tabId: number,
  listId: string
): Promise<IContentTypeInfo[]> => {
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
    }
    return []
  } catch (err) {
    console.error('Failed to load content types:', err)
    return []
  }
}

export const saveFormCustomizer = async (
  tabId: number,
  listId: string,
  contentTypeId: string,
  formTypes: { New?: boolean; Edit?: boolean; Display?: boolean },
  componentId: string | null,
  componentProperties: string | null
): Promise<void> => {
  const extPath = chrome.runtime.getURL('/')

  const result = await chrome.scripting.executeScript({
    target: { tabId },
    world: 'MAIN',
    func: updateFormCustomizer,
    args: [extPath, listId, contentTypeId, formTypes, componentId, componentProperties],
  })

  const response = result?.[0]?.result
  if (!response?.success) {
    throw new Error(response?.errorMessage || 'Failed to update form customizer')
  }
}