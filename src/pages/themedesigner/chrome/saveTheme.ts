/**
 * Adds or updates a tenant theme in SharePoint
 */
export function saveTenantTheme(themeName: string, themePalette: { [key: string]: string }, isUpdate: boolean) {
  console.log('[SP Editor] saveTenantTheme called:', themeName, isUpdate ? '(update)' : '(add)');
  
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
    
    // Get request digest for POST
    return getRequestDigest(webUrl).then(function(digest) {
      var endpoint = isUpdate ? 'UpdateTenantTheme' : 'AddTenantTheme';
      var body = {
        name: themeName,
        themeJson: JSON.stringify({
          palette: themePalette,
        }),
      };
      
      console.log('[SP Editor] Calling', endpoint, 'with body:', body);
      
      return fetch(webUrl + '/_api/thememanager/' + endpoint, {
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
            console.error('[SP Editor] Save theme error response:', text);
            throw new Error('HTTP ' + response.status + ': ' + (text || response.statusText));
          });
        }
        return response.json();
      })
      .then(function(data) {
        console.log('[SP Editor] ' + endpoint + ' response:', data);
        return {
          success: true,
          result: data,
          errorMessage: '',
          source: 'chrome-sp-editor',
        };
      })
      .catch(function(error) {
        console.error('[SP Editor] Error saving theme:', error);
        return {
          success: false,
          result: null,
          errorMessage: error.message || 'Failed to save theme',
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
      var win = window as any;
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
