export const getSiteScripts = (includeOOTB: boolean = false) => {
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
      const storeParam = includeOOTB ? '?store=1' : ''

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

          return fetch(
            siteUrl +
              '/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteScripts' + storeParam,
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'X-RequestDigest': digest,
                Accept: 'application/json; odata=verbose',
                'Content-Type': 'application/json',
                'X-ClientService-ClientTag': 'SPEDITOR',
              },
            }
          )
            .then((res) => res.json())
            .then(async (data) => {
              const scripts = data.d?.GetSiteScripts?.results || data.d?.results || data.value || []

              // For each script, get the full content/metadata
              const scriptsWithContent = await Promise.all(
                scripts.map(async (script: any) => {
                  try {
                    const metadataRes = await fetch(
                      siteUrl +
                        '/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteScriptMetadata' + storeParam,
                      {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                          'X-RequestDigest': digest,
                          Accept: 'application/json; odata=verbose',
                          'Content-Type': 'application/json',
                          'X-ClientService-ClientTag': 'SPEDITOR',
                        },
                        body: JSON.stringify({ id: script.Id }),
                      }
                    )
                    const metadata = await metadataRes.json()
                    const scriptData = metadata.d?.GetSiteScriptMetadata || metadata.d || metadata

                    return {
                      Id: script.Id,
                      Title: script.Title,
                      Description: scriptData.Description || script.Description || '',
                      Content: scriptData.Content || '{}',
                      Version: scriptData.Version || script.Version || 1,
                      IsOOTB: includeOOTB,
                    }
                  } catch {
                    return {
                      Id: script.Id,
                      Title: script.Title,
                      Description: script.Description || '',
                      Content: '{}',
                      Version: 1,
                      IsOOTB: includeOOTB,
                    }
                  }
                })
              )

              return {
                success: true,
                result: scriptsWithContent,
                errorMessage: '',
                source: 'chrome-sp-editor',
              }
            })
        })
    })
    .catch((error: any) => ({
      success: false,
      result: [],
      errorMessage: error.message,
      source: 'chrome-sp-editor',
    }))
}
