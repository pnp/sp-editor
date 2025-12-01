import { Dispatch } from 'redux'
import {
  setLists,
  setListsWithCustomizers,
} from '../../../../store/formcustomizers/actions'
import {
  IListInfo,
  IContentTypeInfo,
  IListWithFormCustomizers,
  IFormCustomizerInfo,
} from '../../../../store/formcustomizers/types'

// Helper function to extract GUID from potential XML value
const extractGuidFromValue = (value: string | null): string | null => {
  if (!value) return null
  
  // Check if value is XML (starts with < or contains FormUrls)
  if (value.includes('<FormUrls') || value.startsWith('<')) {
    // Try to extract ComponentId from XML
    const componentIdMatch = value.match(/<(?:New|Edit|Display)ComponentId>([^<]+)<\/(?:New|Edit|Display)ComponentId>/i)
    if (componentIdMatch && componentIdMatch[1]) {
      const extracted = componentIdMatch[1].trim()
      // Validate it's a GUID
      if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(extracted)) {
        return extracted
      }
    }
    return null
  }
  
  // Check if it's already a valid GUID
  if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value)) {
    return value
  }
  
  return null
}

// Helper function to extract properties from potential XML value
const extractPropertiesFromValue = (value: string | null): string | null => {
  if (!value) return null
  
  // Check if value is XML
  if (value.includes('<FormUrls') || value.startsWith('<')) {
    // Try to extract ComponentProperties from XML
    const propsMatch = value.match(/<(?:New|Edit|Display)ComponentProperties>([^<]*)<\/(?:New|Edit|Display)ComponentProperties>/i)
    if (propsMatch && propsMatch[1]) {
      return propsMatch[1].trim() || null
    }
    return null
  }
  
  return value
}

// Helper to clean value before saving - ensure it's a pure GUID or empty
const cleanGuidForSave = (value: string | null): string => {
  if (!value) return ''
  
  const extracted = extractGuidFromValue(value)
  return extracted || ''
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

  // Helper function to extract GUID from potential XML value (duplicated for page context)
  const extractGuid = (value: string | null): string | null => {
    if (!value) return null
    
    if (value.includes('<FormUrls') || value.startsWith('<')) {
      const componentIdMatch = value.match(/<(?:New|Edit|Display)ComponentId>([^<]+)<\/(?:New|Edit|Display)ComponentId>/i)
      if (componentIdMatch && componentIdMatch[1]) {
        const extracted = componentIdMatch[1].trim()
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(extracted)) {
          return extracted
        }
      }
      return null
    }
    
    if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value)) {
      return value
    }
    
    return null
  }

  // Helper function to extract properties from potential XML value (duplicated for page context)
  const extractProps = (value: string | null, formType: string): string | null => {
    if (!value) return null
    
    if (value.includes('<FormUrls') || value.startsWith('<')) {
      const regex = new RegExp(`<${formType}ComponentProperties>([^<]*)</${formType}ComponentProperties>`, 'i')
      const propsMatch = value.match(regex)
      if (propsMatch && propsMatch[1]) {
        return propsMatch[1].trim() || null
      }
      return null
    }
    
    return value
  }

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
        const formsList: any[] = []

        cts.forEach((ct: any) => {
          // Extract and clean the GUID values (handle XML format)
          const newFormId = extractGuid(ct.NewFormClientSideComponentId)
          const editFormId = extractGuid(ct.EditFormClientSideComponentId)
          const displayFormId = extractGuid(ct.DisplayFormClientSideComponentId)

          if (newFormId) {
            formsList.push({
              listId,
              listTitle,
              contentTypeId: ct.StringId,
              contentTypeName: ct.Name,
              formType: 'New',
              ClientSideComponentId: newFormId,
              ClientSideComponentProperties: extractProps(ct.NewFormClientSideComponentProperties, 'New') || ct.NewFormClientSideComponentProperties,
            })
          }
          if (editFormId) {
            formsList.push({
              listId,
              listTitle,
              contentTypeId: ct.StringId,
              contentTypeName: ct.Name,
              formType: 'Edit',
              ClientSideComponentId: editFormId,
              ClientSideComponentProperties: extractProps(ct.EditFormClientSideComponentProperties, 'Edit') || ct.EditFormClientSideComponentProperties,
            })
          }
          if (displayFormId) {
            formsList.push({
              listId,
              listTitle,
              contentTypeId: ct.StringId,
              contentTypeName: ct.Name,
              formType: 'Display',
              ClientSideComponentId: displayFormId,
              ClientSideComponentProperties: extractProps(ct.DisplayFormClientSideComponentProperties, 'Display') || ct.DisplayFormClientSideComponentProperties,
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

// Update form customizer - fetches current values first, then updates all 6 properties
const updateFormCustomizer = (
  extPath: string,
  listId: string,
  contentTypeId: string,
  formTypes: { New?: boolean; Edit?: boolean; Display?: boolean },
  componentId: string | null,
  componentProperties: string | null
) => {
  type libTypes = [any, any, any]

  // Helper function to extract GUID from potential XML value (duplicated for page context)
  const extractGuid = (value: string | null): string => {
    if (!value) return ''
    
    if (value.includes('<FormUrls') || value.startsWith('<')) {
      const componentIdMatch = value.match(/<(?:New|Edit|Display)ComponentId>([^<]+)<\/(?:New|Edit|Display)ComponentId>/i)
      if (componentIdMatch && componentIdMatch[1]) {
        const extracted = componentIdMatch[1].trim()
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(extracted)) {
          return extracted
        }
      }
      return ''
    }
    
    if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value)) {
      return value
    }
    
    return ''
  }

  // Helper function to extract properties from potential XML value (duplicated for page context)
  const extractProps = (value: string | null, formType: string): string => {
    if (!value) return ''
    
    if (value.includes('<FormUrls') || value.startsWith('<')) {
      const regex = new RegExp(`<${formType}ComponentProperties>([^<]*)</${formType}ComponentProperties>`, 'i')
      const propsMatch = value.match(regex)
      if (propsMatch && propsMatch[1]) {
        return propsMatch[1].trim()
      }
      return ''
    }
    
    return value
  }

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

  return moduleLoader(extPath).then(async (modules) => {
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

    try {
      // First, fetch the current values of all 6 form customizer properties
      const currentCt = await sp.web.lists
        .getById(listId)
        .contentTypes.getById(contentTypeId)
        .select(
          'NewFormClientSideComponentId',
          'NewFormClientSideComponentProperties',
          'EditFormClientSideComponentId',
          'EditFormClientSideComponentProperties',
          'DisplayFormClientSideComponentId',
          'DisplayFormClientSideComponentProperties'
        )()

      // Build update props with all 6 properties - extract clean values from potential XML
      const updateProps: Record<string, string> = {
        NewFormClientSideComponentId: extractGuid(currentCt.NewFormClientSideComponentId),
        NewFormClientSideComponentProperties: extractProps(currentCt.NewFormClientSideComponentProperties, 'New'),
        EditFormClientSideComponentId: extractGuid(currentCt.EditFormClientSideComponentId),
        EditFormClientSideComponentProperties: extractProps(currentCt.EditFormClientSideComponentProperties, 'Edit'),
        DisplayFormClientSideComponentId: extractGuid(currentCt.DisplayFormClientSideComponentId),
        DisplayFormClientSideComponentProperties: extractProps(currentCt.DisplayFormClientSideComponentProperties, 'Display'),
      }

      // Update only the selected form types with new values (clean GUID only)
      const cleanComponentId = componentId ? extractGuid(componentId) || componentId : ''

      if (formTypes.New) {
        updateProps['NewFormClientSideComponentId'] = cleanComponentId
        updateProps['NewFormClientSideComponentProperties'] = componentProperties || ''
      }

      if (formTypes.Edit) {
        updateProps['EditFormClientSideComponentId'] = cleanComponentId
        updateProps['EditFormClientSideComponentProperties'] = componentProperties || ''
      }

      if (formTypes.Display) {
        updateProps['DisplayFormClientSideComponentId'] = cleanComponentId
        updateProps['DisplayFormClientSideComponentProperties'] = componentProperties || ''
      }

      // Update content type with all 6 properties
      await sp.web.lists
        .getById(listId)
        .contentTypes.getById(contentTypeId)
        .update(updateProps)

      // After content type update, also update the web to persist changes
      // This is similar to PowerShell: $web.Update() after $contentType.Update($false)
      await sp.web.update({})

      return {
        success: true,
        result: null,
        errorMessage: '',
        source: 'chrome-sp-editor',
      }
    } catch (error: any) {
      return {
        success: false,
        result: null,
        errorMessage: error.message,
        source: 'chrome-sp-editor',
      }
    }
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