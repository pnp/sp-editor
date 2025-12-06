export const getSiteScriptFromList = (listUrl: string) => {
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

          // Build full list URL
          const fullListUrl = listUrl.startsWith('http') 
            ? listUrl 
            : webUrl + (listUrl.startsWith('/') ? listUrl : '/' + listUrl)

          return fetch(
            siteUrl +
              '/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteScriptFromList',
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'X-RequestDigest': digest,
                Accept: 'application/json;odata=nometadata',
                'Content-Type': 'application/json',
                'X-ClientService-ClientTag': 'SPEDITOR',
              },
              body: JSON.stringify({ listUrl: fullListUrl }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              // The API returns the script JSON as a string in the value property
              const scriptJson = data.value || data.d?.GetSiteScriptFromList || '{}'
              
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
                errorMessage: '',
                source: 'chrome-sp-editor',
              }
            })
            .catch((error) => {
              return {
                success: false,
                result: null,
                errorMessage: error.message || 'Failed to generate site script from list',
                source: 'chrome-sp-editor',
              }
            })
        })
    })
    .catch((error) => {
      return {
        success: false,
        result: null,
        errorMessage: error.message || 'Failed to get page context',
        source: 'chrome-sp-editor',
      }
    })
}
