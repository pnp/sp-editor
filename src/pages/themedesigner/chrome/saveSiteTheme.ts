/**
 * Saves a theme to a SharePoint site using the brand center API
 */
export function saveSiteTheme(themeName: string, themePalette: { [key: string]: string }, isInverted: boolean) {
  
  // Helper function to convert hex color to RGBA object
  function hexToRgba(hex: any): { R: number; G: number; B: number; A: number } {
    // If already an RGBA object, return it
    if (hex && typeof hex === 'object' && 'R' in hex) {
      return hex;
    }
    // If not a string, return black as fallback
    if (typeof hex !== 'string') {
      console.warn('[SP Editor] Invalid color value:', hex);
      return { R: 0, G: 0, B: 0, A: 255 };
    }
    // Remove # if present
    var cleanHex = hex.replace('#', '');
    // Handle shorthand hex (e.g., #fff)
    if (cleanHex.length === 3) {
      cleanHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
    }
    var r = parseInt(cleanHex.substring(0, 2), 16);
    var g = parseInt(cleanHex.substring(2, 4), 16);
    var b = parseInt(cleanHex.substring(4, 6), 16);
    return { R: r, G: g, B: b, A: 255 };
  }

  // Convert palette from hex to RGBA format
  function convertPaletteToRgba(hexPalette: { [key: string]: string }): { [key: string]: { R: number; G: number; B: number; A: number } } {
    var rgbaPalette: { [key: string]: { R: number; G: number; B: number; A: number } } = {};
    for (var key in hexPalette) {
      if (Object.prototype.hasOwnProperty.call(hexPalette, key)) {
        rgbaPalette[key] = hexToRgba(hexPalette[key]);
      }
    }
    return rgbaPalette;
  }

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
    
    console.log('[SP Editor] Saving site theme:', themeName, 'to:', webUrl);
    
    // Get request digest for POST
    return getRequestDigest(webUrl).then(function(digest) {
      console.log('[SP Editor] Got digest, converting palette...');
      
      // Convert palette to RGBA format
      var rgbaPalette = convertPaletteToRgba(themePalette);
      
      // Build the theme JSON matching OOTB format
      var themeJson = {
        backgroundImageUri: '',
        palette: rgbaPalette,
        cacheToken: '',
        isDefault: false,
        isInverted: isInverted,
        version: '2.0.0',
        displayMode: isInverted ? 'dark' : 'light',
        themeSchemaVersion: '2.0.0',
      };
      
      var body = {
        themeData: {
          name: themeName,
          themeJson: JSON.stringify(themeJson),
          isVisible: true,
          source: 1,
        },
      };
      
      console.log('[SP Editor] Calling AddSiteTheme API...');
      
      return fetch(webUrl + '/_api/brandcenter/AddSiteTheme', {
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
        console.log('[SP Editor] AddSiteTheme response status:', response.status);
        if (!response.ok) {
          return response.text().then(function(text) {
            throw new Error('HTTP ' + response.status + ': ' + (text || response.statusText));
          });
        }
        return response.json();
      })
      .then(function(data) {
        console.log('[SP Editor] Theme saved successfully:', data);
        return {
          success: true,
          result: data,
          errorMessage: '',
          source: 'chrome-sp-editor',
        };
      });
    });
  }).catch(function(error) {
    console.error('[SP Editor] saveSiteTheme error:', error);
    return {
      success: false,
      result: null,
      errorMessage: error.message || 'Failed to save site theme',
      source: 'chrome-sp-editor',
    };
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
