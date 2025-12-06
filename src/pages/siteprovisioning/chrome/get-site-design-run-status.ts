export interface ISiteDesignRunAction {
  ActionIndex: number
  ActionKey: string
  ActionTitle: string
  LastModified: string
  OrdinalIndex: string
  OutcomeCode: number // 0 = Success, other = Failure
  OutcomeText: string
  SiteScriptID: string
  SiteScriptIndex: number
  SiteScriptTitle: string
}

export const getSiteDesignRunStatus = (runId: string, webUrl: string) => {
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
              '/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteDesignRunStatus',
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'X-RequestDigest': digest,
                Accept: 'application/json; odata=verbose',
                'Content-Type': 'application/json',
                'X-ClientService-ClientTag': 'SPEDITOR',
              },
              body: JSON.stringify({
                runId: runId,
              }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              const actions = data.d?.GetSiteDesignRunStatus?.results || data.d?.results || data.value || []

              const mappedActions: ISiteDesignRunAction[] = actions.map((action: any) => ({
                ActionIndex: action.ActionIndex || 0,
                ActionKey: action.ActionKey || '',
                ActionTitle: action.ActionTitle || '',
                LastModified: action.LastModified || '',
                OrdinalIndex: action.OrdinalIndex || '',
                OutcomeCode: action.OutcomeCode ?? 0,
                OutcomeText: action.OutcomeText || '',
                SiteScriptID: action.SiteScriptID || action.SiteScriptId || '',
                SiteScriptIndex: action.SiteScriptIndex || 0,
                SiteScriptTitle: action.SiteScriptTitle || '',
              }))

              return {
                success: true,
                result: mappedActions,
              }
            })
        })
    })
    .catch((err) => ({
      success: false,
      errorMessage: err.message || 'Failed to get site design run status',
      result: [],
    }))
}
