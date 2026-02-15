/**
 * Gets site themes from SharePoint brandcenter API
 */
export function getSiteThemes(extPath: string) {
  return moduleLoader().then(function() {
    var win = globalThis as any;
    
    // Get the web URL
    var webUrl = '';
    if (win._spPageContextInfo && win._spPageContextInfo.webAbsoluteUrl) {
      webUrl = win._spPageContextInfo.webAbsoluteUrl;
    } else if (win.g_spfxData && win.g_spfxData.spPageContextInfo && win.g_spfxData.spPageContextInfo.webAbsoluteUrl) {
      webUrl = win.g_spfxData.spPageContextInfo.webAbsoluteUrl;
    } else {
      webUrl = globalThis.location.origin + globalThis.location.pathname.split('/').slice(0, 3).join('/');
    }
    
    // Fetch site themes from brandcenter API
    return fetch(webUrl + '/_api/brandcenter/GetSiteThemes', {
      method: 'GET',
      headers: {
        'Accept': 'application/json;odata=verbose',
      },
      credentials: 'include',
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status + ': ' + response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      // Response format (odata verbose): { "d": { "GetSiteThemes": { "themeData": { "results": [...] } } } }
      var themeData = [];
      if (data.d && data.d.GetSiteThemes && data.d.GetSiteThemes.themeData) {
        // OData verbose format
        themeData = data.d.GetSiteThemes.themeData.results || data.d.GetSiteThemes.themeData;
      } else if (data.themeData) {
        // Direct format (non-verbose)
        themeData = data.themeData.results || data.themeData;
      }
      
      return {
        success: true,
        result: {
          themes: themeData,
        },
        errorMessage: '',
        source: 'chrome-sp-editor',
      };
    })
    .catch(function(error) {
      return {
        success: false,
        result: { themes: [] },
        errorMessage: error.message || 'Failed to get site themes',
        source: 'chrome-sp-editor',
      };
    });
  });

  function moduleLoader() {
    return new Promise<void>(function(resolve) {
      var win = globalThis as any;
      // if we are in a modern page we need to get the _spPageContextInfo from the module loader
      if (!win._spPageContextInfo && win.moduleLoaderPromise) {
        win.moduleLoaderPromise.then(function(e: any) {
          win._spPageContextInfo = e.context._pageContext._legacyPageContext;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}
