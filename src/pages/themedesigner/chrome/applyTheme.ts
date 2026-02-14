/**
 * Applies a theme to the current SharePoint site
 */
export function applyThemeToSite(themeName: string, themePalette: { [key: string]: string }) {
  // Helper function to convert hex to RGBA - must be inside for injection
  function hexToRgba(hex: string): { R: number; G: number; B: number; A: number } {
    hex = hex.replace(/^#/, '');
    var r = Number.parseInt(hex.substring(0, 2), 16);
    var g = Number.parseInt(hex.substring(2, 4), 16);
    var b = Number.parseInt(hex.substring(4, 6), 16);
    return { R: r, G: g, B: b, A: 255 };
  }

  // Helper function to convert palette - must be inside for injection
  function convertPaletteToRgba(palette: { [key: string]: string }): { [key: string]: { R: number; G: number; B: number; A: number } } {
    var result: { [key: string]: { R: number; G: number; B: number; A: number } } = {};
    for (var key in palette) {
      if (palette[key] && palette[key].startsWith('#')) {
        result[key] = hexToRgba(palette[key]);
      }
    }
    return result;
  }
  
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
    
    // Get request digest for POST
    return getRequestDigest(webUrl).then(function(digest) {
      // Convert hex palette to RGBA format that SharePoint expects
      var rgbaPalette = convertPaletteToRgba(themePalette);
      
      var themeJson = JSON.stringify({
        backgroundImageUri: '',
        palette: rgbaPalette,
        cacheToken: '',
        isDefault: true,
        version: '',
      });
      
      var body = {
        name: themeName,
        themeJson: themeJson,
      };
      
      return fetch(webUrl + '/_api/thememanager/ApplyTheme', {
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
            console.error('[SP Editor] Apply theme error response:', text);
            throw new Error('HTTP ' + response.status + ': ' + (text || response.statusText));
          });
        }
        return response.json();
      })
      .then(function(data) {
        return {
          success: true,
          result: data,
          errorMessage: '',
          source: 'chrome-sp-editor',
        };
      })
      .catch(function(error) {
        console.error('[SP Editor] Error applying theme:', error);
        return {
          success: false,
          result: null,
          errorMessage: error.message || 'Failed to apply theme',
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
      var win = globalThis as any;
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
