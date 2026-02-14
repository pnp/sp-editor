/**
 * Gets available tenant themes from SharePoint
 */
export function getTenantThemes(extPath: string) {
  return moduleLoader().then(function() {
    var win = window as any;
    
    // Get the web URL
    var webUrl = '';
    if (win._spPageContextInfo && win._spPageContextInfo.webAbsoluteUrl) {
      webUrl = win._spPageContextInfo.webAbsoluteUrl;
    } else if (win.g_spfxData && win.g_spfxData.spPageContextInfo && win.g_spfxData.spPageContextInfo.webAbsoluteUrl) {
      webUrl = win.g_spfxData.spPageContextInfo.webAbsoluteUrl;
    } else {
      webUrl = window.location.origin + window.location.pathname.split('/').slice(0, 3).join('/');
    }
    
    // Fetch the tenant theming options
    return fetch(webUrl + '/_api/thememanager/GetTenantThemingOptions', {
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
      var result = data.d && data.d.GetTenantThemingOptions ? data.d.GetTenantThemingOptions : (data.d || data);
      var themePreviews = result.themePreviews && result.themePreviews.results ? result.themePreviews.results : [];
      
      return {
        success: true,
        result: {
          themes: themePreviews,
          hideDefaultThemes: result.hideDefaultThemes || false,
        },
        errorMessage: '',
        source: 'chrome-sp-editor',
      };
    })
    .catch(function(error) {
      console.error('[SP Editor] Error getting tenant themes:', error);
      return {
        success: false,
        result: { themes: [], hideDefaultThemes: false },
        errorMessage: error.message || 'Failed to get tenant themes',
        source: 'chrome-sp-editor',
      };
    });
  });

  function moduleLoader() {
    return new Promise<void>(function(resolve) {
      var win = window as any;
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
