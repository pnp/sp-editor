export const updateFormCustomizer = (
  extPath: string,
  listId: string,
  contentTypeId: string,
  formTypes: { New?: boolean; Edit?: boolean; Display?: boolean },
  componentId: string | null,
  componentProperties: string | null
) => {
  type libTypes = [any, any, any]

  const extractGuid = (value: string | null): string => {
    if (!value) return ''

    if (value.includes('<FormUrls') || value.startsWith('<')) {
      const componentIdMatch = value.match(
        /<(?:New|Edit|Display)ComponentId>([^<]+)<\/(?:New|Edit|Display)ComponentId>/i
      )
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

  const extractProps = (value: string | null, formType: string): string => {
    if (!value) return ''

    if (value.includes('<FormUrls') || value.startsWith('<')) {
      const regex = new RegExp(
        `<${formType}ComponentProperties>([^<]*)</${formType}ComponentProperties>`,
        'i'
      )
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
        instance.on.pre.prepend((url: string, init: any, result: any) => {
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
              const contextUrl = url.toString().replace(/_api.*|_vti_.*/g, '')
              return fetch(contextUrl + '_api/contextinfo', {
                method: 'POST',
                headers: {
                  accept: 'application/json;odata=verbose',
                  'content-type': 'application/json;odata=verbose',
                },
              })
              .then(function(response) { return response.json() })
              .then(function(data) {
                digest = data.d.GetContextWebInformation.FormDigestValue
                init.headers = Object.assign({}, { 'X-RequestDigest': digest }, init.headers)
                return [url, init, result]
              })
            } else {
              init.headers = Object.assign({}, { 'X-RequestDigest': digest }, init.headers)
              return Promise.resolve([url, init, result])
            }
          }

          return Promise.resolve([url, init, result])
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

    // Build update props with all 6 properties
    const updateProps: Record<string, string> = {
      NewFormClientSideComponentId: extractGuid(currentCt.NewFormClientSideComponentId),
      NewFormClientSideComponentProperties: extractProps(currentCt.NewFormClientSideComponentProperties, 'New'),
      EditFormClientSideComponentId: extractGuid(currentCt.EditFormClientSideComponentId),
      EditFormClientSideComponentProperties: extractProps(currentCt.EditFormClientSideComponentProperties, 'Edit'),
      DisplayFormClientSideComponentId: extractGuid(currentCt.DisplayFormClientSideComponentId),
      DisplayFormClientSideComponentProperties: extractProps(currentCt.DisplayFormClientSideComponentProperties, 'Display'),
    }

    // Update only the selected form types with new values
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