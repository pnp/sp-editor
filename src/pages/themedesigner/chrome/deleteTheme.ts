/**
 * Deletes a tenant theme from SharePoint
 */
export function deleteTenantTheme(themeName: string) {
  console.log('[SP Editor] deleteTenantTheme called:', themeName);
  
  return moduleLoader().then(function() {
    const win = window as any;
    
    // Get the web URL
    let webUrl = '';
    if (win._spPageContextInfo && win._spPageContextInfo.webAbsoluteUrl) {
      webUrl = win._spPageContextInfo.webAbsoluteUrl;
    } else if (win.g_spfxData && win.g_spfxData.spPageContextInfo && win.g_spfxData.spPageContextInfo.webAbsoluteUrl) {
      webUrl = win.g_spfxData.spPageContextInfo.webAbsoluteUrl;
    } else {
      webUrl = window.location.origin + window.location.pathname.split('/').slice(0, 3).join('/');
    }
    
    // Get request digest for POST
    return getRequestDigest(webUrl).then(function(digest) {
      const body = {
        name: themeName,
      };
      
      console.log('[SP Editor] Calling DeleteTenantTheme with body:', body);
      
      return fetch(webUrl + '/_api/thememanager/DeleteTenantTheme', {
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
          'X-RequestDigest': digest,
        },
        body: JSON.stringify(body),
        credentials: 'include',
      })
      .then(function(response) {
        if (!response.ok) {
          return response.text().then(function(text) {
            console.error('[SP Editor] Delete theme error response:', text);
            throw new Error('HTTP ' + response.status + ': ' + (text || response.statusText));
          });
        }
        return response.json();
      })
      .then(function(data) {
        console.log('[SP Editor] DeleteTenantTheme response:', data);
        return {
          success: true,
          result: data,
          errorMessage: '',
          source: 'chrome-sp-editor',
        };
      })
      .catch(function(error) {
        console.error('[SP Editor] Error deleting theme:', error);
        return {
          success: false,
          result: null,
          errorMessage: error.message || 'Failed to delete theme',
          source: 'chrome-sp-editor',
        };
      });
    });
  });

  function getRequestDigest(webUrl: string): Promise<string> {
    return fetch(webUrl + '/_api/contextinfo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json;odata=verbose',
      },
      credentials: 'include',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return data.d.GetContextWebInformation.FormDigestValue;
    });
  }

  function moduleLoader() {
    return new Promise<void>(function(resolve) {
      const win = window as any;
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
