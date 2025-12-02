export const getContentTypesWithCustomizers = (extPath: string, listId: string, listTitle: string) => {
  type libTypes = [any, any, any]

  const extractGuid = (value: string | null): string | null => {
    if (!value) return null

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
      return null
    }

    if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value)) {
      return value
    }

    return null
  }

  const extractProps = (value: string | null, formType: string): string | null => {
    if (!value) return null

    if (value.includes('<FormUrls') || value.startsWith('<')) {
      const regex = new RegExp(
        `<${formType}ComponentProperties>([^<]*)</${formType}ComponentProperties>`,
        'i'
      )
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
              ClientSideComponentProperties:
                extractProps(ct.NewFormClientSideComponentProperties, 'New') ||
                ct.NewFormClientSideComponentProperties,
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
              ClientSideComponentProperties:
                extractProps(ct.EditFormClientSideComponentProperties, 'Edit') ||
                ct.EditFormClientSideComponentProperties,
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
              ClientSideComponentProperties:
                extractProps(ct.DisplayFormClientSideComponentProperties, 'Display') ||
                ct.DisplayFormClientSideComponentProperties,
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