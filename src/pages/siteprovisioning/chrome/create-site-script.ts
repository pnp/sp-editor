export const createSiteScript = (title: string, description: string, content: string) => {
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
              '/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.CreateSiteScript(Title=@title,Description=@description)?@title=\'' +
              encodeURIComponent(title) +
              '\'&@description=\'' +
              encodeURIComponent(description) +
              '\'',
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'X-RequestDigest': digest,
                Accept: 'application/json; odata=verbose',
                'Content-Type': 'application/json',
                'X-ClientService-ClientTag': 'SPEDITOR',
              },
              body: content,
            }
          )
            .then((res) => res.json())
            .then((data) => ({
              success: true,
              result: data.d || data,
              errorMessage: '',
              source: 'chrome-sp-editor',
            }))
        })
    })
    .catch((error: any) => ({
      success: false,
      result: null,
      errorMessage: error.message,
      source: 'chrome-sp-editor',
    }))
}
