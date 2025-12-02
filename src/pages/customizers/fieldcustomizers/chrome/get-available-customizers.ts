export interface IAppCatalogFieldCustomizer {
  id: string
  alias: string
  solutionName: string
}

export const getAvailableCustomizers = (extPath: string) => {
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

  return moduleLoader(extPath).then(async (modules) => {
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

    try {
      // Get tenant app catalog web
      const appCatalogWeb = await sp.getTenantAppCatalogWeb()

      // Get the ComponentManifests list
      const cmListInfo = await appCatalogWeb.lists
        .filter("EntityTypeName eq 'ComponentManifestsList'")
        .select('Title', 'Id')()

      if (cmListInfo.length === 0) {
        return {
          success: true,
          result: [],
          errorMessage: '',
          source: 'chrome-sp-editor',
        }
      }

      const cmListTitle = cmListInfo[0].Title

      // Get all SPFx extensions
      const items = await appCatalogWeb.lists
        .getByTitle(cmListTitle)
        .items.select('ClientComponentId', 'ClientComponentType', 'ClientComponentManifest', 'SolutionName')
        .filter("ClientComponentType eq 'Extension'")()

      // Parse manifest + filter Field Customizers
      const fieldCustomizers = items
        .map((i: any) => {
          try {
            let manifestString = i.ClientComponentManifest
            if (manifestString && manifestString.includes('&quot;')) {
              manifestString = manifestString.replace(/&quot;/g, '"')
            }
            const manifest = JSON.parse(manifestString)
            return {
              id: i.ClientComponentId?.replace(/[{}]/g, ''),
              alias: manifest.alias || '',
              extensionType: manifest.extensionType || '',
              solutionName: i.SolutionName || '',
            }
          } catch {
            return null
          }
        })
        .filter((x: any) => x && x.extensionType === 'FieldCustomizer')
        .map((x: any) => ({
          id: x.id,
          alias: x.alias,
          solutionName: x.solutionName,
        }))

      return {
        success: true,
        result: fieldCustomizers,
        errorMessage: '',
        source: 'chrome-sp-editor',
      }
    } catch (error: any) {
      return {
        success: false,
        result: [],
        errorMessage: error.message,
        source: 'chrome-sp-editor',
      }
    }
  })
}