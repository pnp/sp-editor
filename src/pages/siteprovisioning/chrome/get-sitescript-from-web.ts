export interface IGetSiteScriptFromWebInfo {
  includeBranding: boolean
  includedLists: string[] // Array of list URLs to include
  includeRegionalSettings: boolean
  includeSiteExternalSharingCapability: boolean
  includeTheme: boolean
  includeLinksToExportedItems: boolean
}

export const getSiteScriptFromWeb = (options: IGetSiteScriptFromWebInfo) => {
  // Handle modern pages where _spPageContextInfo may not be immediately available
  const getPageContext = (): Promise<any> => {
    if ((window as any)._spPageContextInfo) {
      return Promise.resolve((window as any)._spPageContextInfo)
    }
    if ((window as any).moduleLoaderPromise) {
      return (window as any).moduleLoaderPromise.then((e: any) => {
        ;(window as any)._spPageContextInfo = e.context._pageContext._legacyPageContext
        return (window as any)._spPageContextInfo
      })
    }
    return Promise.resolve(null)
  }

  return getPageContext()
    .then((pageContext) => {
      const siteUrl = pageContext?.siteAbsoluteUrl || ''
      const webUrl = pageContext?.webAbsoluteUrl || ''

      return fetch(siteUrl + '/_api/contextinfo', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json; odata=verbose',
          'Content-Type': 'application/json',
          'X-ClientService-ClientTag': 'SPEDITOR',
        },
      })
        .then((res) => res.json())
        .then((contextInfo) => {
          const digest = contextInfo.d.GetContextWebInformation.FormDigestValue

          // Build the request body matching the API format
          // webUrl at root level, info contains the options
          const requestBody: any = {
            webUrl: webUrl,
            info: {} as any,
          }

          // Only include options that are enabled (at least one must be provided)
          if (options.includeBranding) {
            requestBody.info.IncludeBranding = true
          }
          if (options.includedLists && options.includedLists.length > 0) {
            requestBody.info.IncludedLists = options.includedLists
          }
          if (options.includeRegionalSettings) {
            requestBody.info.IncludeRegionalSettings = true
          }
          if (options.includeSiteExternalSharingCapability) {
            requestBody.info.IncludeSiteExternalSharingCapability = true
          }
          if (options.includeTheme) {
            requestBody.info.IncludeTheme = true
          }
          if (options.includeLinksToExportedItems) {
            requestBody.info.IncludeLinksToExportedItems = true
          }

          return fetch(
            siteUrl +
              '/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteScriptFromWeb',
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'X-RequestDigest': digest,
                Accept: 'application/json;odata=nometadata',
                'Content-Type': 'application/json',
                'X-ClientService-ClientTag': 'SPEDITOR',
              },
              body: JSON.stringify(requestBody),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              // The API returns the script JSON as a string in the value property
              const scriptJson = data.value || data.JSON || '{}'

              // Try to parse and re-stringify for pretty formatting
              let formattedJson = scriptJson
              try {
                const parsed = JSON.parse(scriptJson)
                formattedJson = JSON.stringify(parsed, null, 2)
              } catch {
                // Keep as-is if parsing fails
              }

              return {
                success: true,
                result: formattedJson,
                webUrl: webUrl,
                errorMessage: '',
                source: 'chrome-sp-editor',
              }
            })
            .catch((error) => {
              return {
                success: false,
                result: null,
                webUrl: webUrl,
                errorMessage: error.message || 'Failed to generate site script from web',
                source: 'chrome-sp-editor',
              }
            })
        })
    })
    .catch((error) => {
      return {
        success: false,
        result: null,
        webUrl: '',
        errorMessage: error.message || 'Failed to get page context',
        source: 'chrome-sp-editor',
      }
    })
}
