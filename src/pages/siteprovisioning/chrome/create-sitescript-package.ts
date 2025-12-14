export interface ICreateSiteScriptPackageInfo {
  title: string
  description: string
  content: string // Base64 encoded ZIP content
}

export const createSiteScriptPackage = (info: ICreateSiteScriptPackageInfo) => {
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

  // Convert base64 to Uint8Array for binary upload
  const base64ToUint8Array = (base64: string): Uint8Array => {
    const binaryString = atob(base64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes
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

          // Convert base64 content to binary
          const binaryContent = base64ToUint8Array(info.content)

          // Build the URL with query parameters for title and description
          const params = new URLSearchParams({
            title: `'${info.title}'`,
            description: `'${info.description}'`,
          })

          return fetch(
            siteUrl +
              `/_api/Microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.CreateSiteScriptPackage?${params.toString()}`,
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'X-RequestDigest': digest,
                Accept: 'application/json;odata=nometadata',
                'Content-Type': 'application/octet-stream',
                'X-ClientService-ClientTag': 'SPEDITOR',
                'binaryStringRequestBody': 'true',
              },
              body: binaryContent.buffer as ArrayBuffer,
            }
          )
            .then((res) => res.json().then((data) => ({ status: res.status, data })))
            .then(({ status, data }) => {
              // Check for error response
              if (status >= 400 || data.error) {
                const errorMsg = data.error?.message?.value || data.error?.message || 'Failed to create site script package'
                return {
                  success: false,
                  result: null,
                  errorMessage: errorMsg,
                  source: 'chrome-sp-editor',
                }
              }
              return {
                success: true,
                result: data,
                errorMessage: '',
                source: 'chrome-sp-editor',
              }
            })
        })
    })
    .catch((error: any) => ({
      success: false,
      result: null,
      errorMessage: error.message,
      source: 'chrome-sp-editor',
    }))
}
