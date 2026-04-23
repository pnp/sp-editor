export const addWebPartToPage = (
  webPartDataJson: string,
  targetZoneIndex: number,
  targetSectionIndex: number,
  targetSectionFactor: number
) => {

  // Must be inlined — chrome.scripting.executeScript only serializes this
  // one function, so any module-level helpers would be undefined in the page.

  const generateGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const getRequestDigest = (webUrl: string): Promise<string> => {
    return fetch(webUrl + '/_api/contextinfo', {
      method: 'POST',
      headers: { Accept: 'application/json;odata=verbose' },
      credentials: 'include',
    })
      .then(r => r.json())
      .then(data => data.d.GetContextWebInformation.FormDigestValue)
  }

  const errorResult = (msg: string) => ({
    success: false,
    result: null,
    errorMessage: msg,
    source: 'chrome-sp-editor',
  })

  const successResult = () => ({
    success: true,
    result: null,
    errorMessage: '',
    source: 'chrome-sp-editor',
  })

  const doSave = (pageCtx: any) => {
    const pageUrl = pageCtx.serverRequestPath as string
    const webUrl = pageCtx.webAbsoluteUrl as string

    // 1. Parse the web part data provided by the user
    let webPartData: any
    try {
      webPartData = JSON.parse(webPartDataJson)
    } catch {
      return Promise.resolve(
        errorResult('Invalid web part JSON. Please check the format.')
      )
    }

    // 2. Fetch current page data (including co-auth metadata)
    const apiUrl =
      webUrl +
      "/_api/sitepages/pages/GetByUrl('" +
      encodeURIComponent(pageUrl) +
      "')?$select=*,CanvasContent1,IsPageCheckedOutToCurrentUser"

    return fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json;odata=verbose',
        'Cache-Control': 'no-cache',
      },
      credentials: 'include',
    })
      .then((response: Response) => response.json())
      .then((data: any) => {
        if (data.error) {
          const errMsg =
            data.error.message && data.error.message.value
              ? data.error.message.value
              : 'Error fetching page data from SitePages API.'
          return errorResult(errMsg)
        }

        const pageId = data.d.Id
        const canvasContent: any[] = JSON.parse(data.d.CanvasContent1 || '[]')

        // 3. Build the new control
        const newInstanceId = generateGuid()

        // Inherit zoneId and emphasis from existing controls in the same zone
        const existingInZone = canvasContent.find(
          (c: any) => c.position && c.position.zoneIndex === targetZoneIndex
        )
        const zoneId =
          (existingInZone && existingInZone.position && existingInZone.position.zoneId) ||
          generateGuid()
        const emphasis = (existingInZone && existingInZone.emphasis) || undefined

        // Find max controlIndex in target zone/section
        const existingInTarget = canvasContent.filter(
          (c: any) =>
            c.position &&
            c.position.zoneIndex === targetZoneIndex &&
            c.position.sectionIndex === targetSectionIndex
        )
        const maxControlIndex = existingInTarget.reduce(
          (max: number, c: any) =>
            Math.max(max, (c.position && c.position.controlIndex) || 0),
          0
        )

        const isTextControl = webPartData.controlType === 4

        let newControl: any
        if (isTextControl) {
          // Text / RichText control
          newControl = {
            position: {
              layoutIndex: 1,
              zoneIndex: targetZoneIndex,
              zoneId: zoneId,
              sectionIndex: targetSectionIndex,
              sectionFactor: targetSectionFactor,
              controlIndex: maxControlIndex + 1,
            },
            id: newInstanceId,
            controlType: 4,
            isFromSectionTemplate: false,
            addedFromPersistedData: false,
            innerHTML: webPartData.innerHTML || '',
          }
        } else {
          // Web part control
          newControl = {
            position: {
              layoutIndex: 1,
              zoneIndex: targetZoneIndex,
              zoneId: zoneId,
              sectionIndex: targetSectionIndex,
              sectionFactor: targetSectionFactor,
              controlIndex: maxControlIndex + 1,
            },
            id: newInstanceId,
            controlType: 3,
            isFromSectionTemplate: false,
            addedFromPersistedData: true,
            webPartData: Object.assign({}, webPartData, {
              instanceId: newInstanceId,
            }),
            webPartId: webPartData.id || '',
          }
        }

        if (emphasis) {
          newControl.emphasis = emphasis
        }

        // 4. Insert before pageSettingsSlice (controlType 0) if present
        const pageSettingsIndex = canvasContent.findIndex(
          (c: any) => c.controlType === 0
        )
        if (pageSettingsIndex >= 0) {
          canvasContent.splice(pageSettingsIndex, 0, newControl)
        } else {
          canvasContent.push(newControl)
        }

        const newCanvasContent = JSON.stringify(canvasContent)

        // 5. Get request digest for POST operations
        return getRequestDigest(webUrl).then((digest: string) => {
          // Helper: extract error text from any SharePoint REST error payload
          // (handles both odata=verbose { message: { value } } and
          // odata=nometadata { message: string } shapes)
          const extractErrorMessage = (json: any, fallback: string) => {
            if (!json || !json.error) return null
            const m = json.error.message
            if (!m) return fallback
            if (typeof m === 'string') return m
            if (m.value) return m.value
            return fallback
          }

          // 6. Check out the page (required before savepage on modern pages).
          //    If this fails, surface the error — most commonly the page is
          //    checked out to another user.
          return fetch(
            webUrl + '/_api/sitepages/pages(' + pageId + ')/checkoutpage',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json;odata=verbose',
                'X-RequestDigest': digest,
              },
              credentials: 'include',
            }
          )
            .then((checkoutRes: Response) => {
              return checkoutRes
                .json()
                .catch(() => null)
                .then((checkoutJson: any) => {
                  if (!checkoutRes.ok || (checkoutJson && checkoutJson.error)) {
                    const msg = extractErrorMessage(
                      checkoutJson,
                      'Failed to check out the page. It may be checked out to another user.'
                    )
                    return { failed: true, msg: msg }
                  }
                  return { failed: false, msg: '' }
                })
            })
            .then((checkoutOutcome: any) => {
              if (checkoutOutcome.failed) {
                return errorResult(checkoutOutcome.msg)
              }

              // 7. savepage — finalizes the change
              return fetch(
                webUrl + '/_api/sitepages/pages(' + pageId + ')/savepage',
                {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json;odata=nometadata',
                    'Content-Type': 'application/json;odata=nometadata',
                    'X-RequestDigest': digest,
                    'If-Match': '*',
                  },
                  credentials: 'include',
                  body: JSON.stringify({
                    CanvasContent1: newCanvasContent,
                  }),
                }
              ).then((saveRes: Response) => {
                return saveRes
                  .json()
                  .catch(() => null)
                  .then((saveJson: any) => {
                    if (!saveRes.ok || (saveJson && saveJson.error)) {
                      const msg = extractErrorMessage(
                        saveJson,
                        'Failed to save page (HTTP ' + saveRes.status + ').'
                      )
                      return errorResult(msg)
                    }
                    return successResult()
                  })
              })
            })
        })
      })
      .catch((error: any) =>
        errorResult(
          error && error.message
            ? error.message
            : 'Unknown error occurred while adding web part.'
        )
      )
  }

  // Page context resolution — same pattern as getPageWebParts.ts
  if ((window as any)._spPageContextInfo) {
    return doSave((window as any)._spPageContextInfo)
  }

  if ((window as any).moduleLoaderPromise) {
    return (window as any).moduleLoaderPromise.then(function (e: any) {
      const pageCtx = e.context._pageContext._legacyPageContext
      ;(window as any)._spPageContextInfo = pageCtx
      return doSave(pageCtx)
    })
  }

  return Promise.resolve({
    success: false,
    result: null,
    errorMessage: 'Could not find page context on this page.',
    source: 'chrome-sp-editor',
  })
}
