export const getPageWebParts = (_extPath: string) => {

  // Must be inlined — chrome.scripting.executeScript only serializes this
  // one function, so any module-level helpers would be undefined in the page.
  const parseCanvasWebParts = (canvasContent: string) => {
    let canvas: any[];
    try {
      canvas = JSON.parse(canvasContent);
    } catch (error_) {
      void error_;
      return null;
    }

    const webParts: any[] = [];

    // CanvasContent1 is a flat array — each item with controlType 3 is a web part
    for (const control of canvas) {
      if (control.controlType === 3 && control.webPartData) {
        const wpData = control.webPartData;
        const pos = control.position ? control.position : {};
        webParts.push({
          id: control.id ? control.id : '',
          webPartId: wpData.id ? wpData.id : '',
          title: wpData.title ? wpData.title : '',
          properties: JSON.stringify(
            wpData.properties ? wpData.properties : {},
            null,
            2
          ),
          zoneIndex: pos.zoneIndex ? pos.zoneIndex : 0,
          sectionIndex: pos.sectionIndex ? pos.sectionIndex : 0,
          controlIndex: pos.controlIndex ? pos.controlIndex : 0,
          sectionFactor: pos.sectionFactor ? pos.sectionFactor : 0,
        });
      }
    }

    return webParts;
  };

  const doFetch = (pageCtx: any) => {
    const pageUrl = pageCtx.serverRequestPath as string;
    const webUrl = pageCtx.webAbsoluteUrl as string;

    const apiUrl =
      webUrl +
      "/_api/sitepages/pages/GetByUrl('" +
      encodeURIComponent(pageUrl) +
      "')?$select=CanvasContent1";

    return fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json;odata=verbose',
        'Cache-Control': 'no-cache',
        'X-ClientService-ClientTag': 'SPEDITOR',
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data: any) {
        if (data.error) {
          const errMsg =
            data.error.message && data.error.message.value
              ? data.error.message.value
              : 'Error fetching page data from SitePages API.';
          return {
            success: false,
            result: null,
            errorMessage: errMsg,
            source: 'chrome-sp-editor',
          };
        }

        const canvasContent =
          data.d && data.d.CanvasContent1 ? data.d.CanvasContent1 : null;

        if (!canvasContent) {
          return {
            success: false,
            result: null,
            errorMessage:
              'No canvas content found. This may not be a modern SharePoint page, or it has no web parts.',
            source: 'chrome-sp-editor',
          };
        }

        const webParts = parseCanvasWebParts(canvasContent);

        if (webParts === null) {
          return {
            success: false,
            result: null,
            errorMessage: 'Failed to parse page canvas content.',
            source: 'chrome-sp-editor',
          };
        }

        return webParts;
      })
      .catch(function (error: any) {
        return {
          success: false,
          result: null,
          errorMessage:
            error && error.message ? error.message : 'Unknown error occurred.',
          source: 'chrome-sp-editor',
        };
      });
  };

  // On classic pages _spPageContextInfo is directly on window.
  // On modern pages it lives inside moduleLoaderPromise — same pattern
  // used by other chrome scripts in this project (e.g. getWebProperties.ts).
  if ((window as any)._spPageContextInfo) {
    return doFetch((window as any)._spPageContextInfo);
  }

  if ((window as any).moduleLoaderPromise) {
    return (window as any).moduleLoaderPromise.then(function (e: any) {
      const pageCtx = e.context._pageContext._legacyPageContext;
      (window as any)._spPageContextInfo = pageCtx;
      return doFetch(pageCtx);
    });
  }

  return Promise.resolve({
    success: false,
    result: null,
    errorMessage: 'Could not find page context on this page.',
    source: 'chrome-sp-editor',
  });
};
