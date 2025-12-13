export const getLists = () => {
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
      const webUrl = pageContext?.webAbsoluteUrl || ''
      const webServerRelativeUrl = pageContext?.webServerRelativeUrl || ''

      return fetch(webUrl + '/_api/web/lists?$select=Title,Id,BaseTemplate,Hidden,RootFolder/ServerRelativeUrl&$expand=RootFolder&$filter=Hidden eq false&$orderby=Title', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json;odata=nometadata',
          'Content-Type': 'application/json',
          'X-ClientService-ClientTag': 'SPEDITOR',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const lists = data.value || []
          return {
            success: true,
            result: lists.map((list: any) => {
              // Get site-relative URL by removing the web's server-relative URL
              const serverRelativeUrl = list.RootFolder?.ServerRelativeUrl || ''
              const siteRelativeUrl = serverRelativeUrl.replace(webServerRelativeUrl, '').replace(/^\//, '')
              return {
                Id: list.Id,
                Title: list.Title,
                BaseTemplate: list.BaseTemplate,
                Url: siteRelativeUrl,
              }
            }),
            errorMessage: '',
            source: 'chrome-sp-editor',
          }
        })
        .catch((error) => {
          return {
            success: false,
            result: null,
            errorMessage: error.message || 'Failed to get lists',
            source: 'chrome-sp-editor',
          }
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
