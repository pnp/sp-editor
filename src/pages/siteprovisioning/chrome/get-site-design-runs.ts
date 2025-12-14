export interface ISiteDesignRun {
  ID: string // Run ID - used for GetSiteDesignRunStatus
  SiteDesignID: string
  SiteDesignTitle: string
  SiteDesignVersion: number
  SiteID: string
  WebID: string
  StartTime: string
}

export const getSiteDesignRuns = () => {
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

          // API is GetSiteDesignRun (singular) with empty body
          return fetch(
            siteUrl +
              '/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteDesignRun',
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
              const runs = data.d?.GetSiteDesignRun?.results || data.d?.results || data.value || []

              const mappedRuns: ISiteDesignRun[] = runs.map((run: any) => ({
                ID: run.ID || '',
                SiteDesignID: run.SiteDesignID || '',
                SiteDesignTitle: run.SiteDesignTitle || '',
                SiteDesignVersion: run.SiteDesignVersion || 0,
                SiteID: run.SiteID || '',
                WebID: run.WebID || '',
                StartTime: run.StartTime || '',
              }))

              return {
                success: true,
                result: mappedRuns,
                webUrl: webUrl,
              }
            })
        })
    })
    .catch((err) => ({
      success: false,
      errorMessage: err.message || 'Failed to get site design runs',
      result: [],
    }))
}
