export const getSiteDesigns = (includeOOTB: boolean = false) => {
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
              '/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteDesigns' + storeParam,
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
            .then((data) => {
              const designs = data.d?.GetSiteDesigns?.results || data.d?.results || data.value || []

              const mappedDesigns = designs.map((design: any) => ({
                Id: design.Id,
                Title: design.Title,
                Description: design.Description || '',
                WebTemplate: design.WebTemplate || '64',
                SiteScriptIds: design.SiteScriptIds?.results || design.SiteScriptIds || [],
                IsDefault: design.IsDefault || false,
                PreviewImageUrl: design.PreviewImageUrl || '',
                PreviewImageAltText: design.PreviewImageAltText || '',
                Version: design.Version || 1,
                IsOOTB: includeOOTB,
              }))

              return {
                success: true,
                result: mappedDesigns,
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
