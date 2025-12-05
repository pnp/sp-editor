export interface IAppCatalogFormCustomizer {
  id: string
  alias: string
  solutionName: string
  catalogSource: 'site' | 'tenant'
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

    // Helper function to parse extensions from ComponentManifests list items
    const parseFormCustomizers = (items: any[], source: 'site' | 'tenant'): IAppCatalogFormCustomizer[] => {
      return items
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
              catalogSource: source,
            }
          } catch {
            return null
          }
        })
        .filter((x: any) => x && x.extensionType === 'FormCustomizer')
        .map((x: any) => ({
          id: x.id,
          alias: x.alias,
          solutionName: x.solutionName,
          catalogSource: x.catalogSource,
        }))
    }

    try {
      const allFormCustomizers: IAppCatalogFormCustomizer[] = []

      // 1. Check site-level app catalog first (ComponentManifests list at current site)
      try {
        const siteListInfo = await sp.web.lists
          .filter("EntityTypeName eq 'ComponentManifestsList'")
          .select('Title', 'Id')()

        if (siteListInfo.length > 0) {
          const siteListTitle = siteListInfo[0].Title
          const siteItems = await sp.web.lists
            .getByTitle(siteListTitle)
            .items.select('ClientComponentId', 'ClientComponentType', 'ClientComponentManifest', 'SolutionName')
            .filter("ClientComponentType eq 'Extension'")()

          const siteCustomizers = parseFormCustomizers(siteItems, 'site')
          allFormCustomizers.push(...siteCustomizers)
        }
      } catch {
        // Site app catalog doesn't exist or not accessible, continue to tenant
      }

      // 2. Check tenant app catalog
      try {
        const appCatalogWeb = await sp.getTenantAppCatalogWeb()

        const cmListInfo = await appCatalogWeb.lists
          .filter("EntityTypeName eq 'ComponentManifestsList'")
          .select('Title', 'Id')()

        if (cmListInfo.length > 0) {
          const cmListTitle = cmListInfo[0].Title
          const tenantItems = await appCatalogWeb.lists
            .getByTitle(cmListTitle)
            .items.select('ClientComponentId', 'ClientComponentType', 'ClientComponentManifest', 'SolutionName')
            .filter("ClientComponentType eq 'Extension'")()

          const tenantCustomizers = parseFormCustomizers(tenantItems, 'tenant')
          
          // Add all tenant customizers (show both site and tenant versions if same component exists)
          allFormCustomizers.push(...tenantCustomizers)
        }
      } catch {
        // Tenant app catalog doesn't exist or not accessible
      }

      return {
        success: true,
        result: allFormCustomizers,
        errorMessage: '',
        source: 'chrome-sp-editor',
      }
    } catch (error: any) {
      return {
        success: false,
        result: [] as IAppCatalogFormCustomizer[],
        errorMessage: error.message || 'Failed to load available customizers',
        source: 'chrome-sp-editor',
      }
    }
  })
}