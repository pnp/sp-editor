/**
 * Gets the current theme from the SharePoint page
 */
export function getCurrentTheme() {
  return moduleLoader().then(function() {
    var win = window as any;
    
    // Try to get theme from __themeState__
    if (win.__themeState__ && win.__themeState__.theme) {
      return {
        success: true,
        result: {
          theme: win.__themeState__.theme,
          source: '__themeState__',
        },
        errorMessage: '',
        source: 'chrome-sp-editor',
      };
    }

    // Try to get from window.Fabric?.theme
    if (win.Fabric && win.Fabric.theme) {
      return {
        success: true,
        result: {
          theme: win.Fabric.theme,
          source: 'Fabric.theme',
        },
        errorMessage: '',
        source: 'chrome-sp-editor',
      };
    }

    // Try to extract from CSS variables on root
    var rootStyles = getComputedStyle(document.documentElement);
    var themeColors: { [key: string]: string } = {};
    var colorNames = [
      'themePrimary', 'themeLighterAlt', 'themeLighter', 'themeLight',
      'themeTertiary', 'themeSecondary', 'themeDarkAlt', 'themeDark', 'themeDarker',
      'neutralLighterAlt', 'neutralLighter', 'neutralLight', 'neutralQuaternaryAlt',
      'neutralQuaternary', 'neutralTertiaryAlt', 'neutralTertiary', 'neutralSecondary',
      'neutralSecondaryAlt', 'neutralPrimaryAlt', 'neutralPrimary', 'neutralDark',
      'black', 'white', 'primaryBackground', 'primaryText',
      'bodyBackground', 'bodyText', 'disabledBackground', 'disabledText',
      'error', 'errorBackground', 'blockingBackground', 'warningBackground',
      'warningHighlight', 'successBackground',
    ];
    
    var foundAny = false;
    for (var i = 0; i < colorNames.length; i++) {
      var name = colorNames[i];
      var value = rootStyles.getPropertyValue('--' + name).trim();
      if (value) {
        themeColors[name] = value;
        foundAny = true;
      }
    }

    if (foundAny) {
      return {
        success: true,
        result: {
          theme: themeColors,
          source: 'cssVariables',
        },
        errorMessage: '',
        source: 'chrome-sp-editor',
      };
    }

    // Try spPageContextInfo for theme info
    var ctx = win._spPageContextInfo || (win.g_spfxData && win.g_spfxData.spPageContextInfo);
    if (ctx) {
      if (ctx.themeCacheToken) {
        return {
          success: true,
          result: {
            theme: null,
            themeCacheToken: ctx.themeCacheToken,
            themedCssFolderUrl: ctx.themedCssFolderUrl,
            source: 'spPageContextInfo',
            message: 'Theme cache token found. Use __themeState__ for actual colors.',
          },
          errorMessage: '',
          source: 'chrome-sp-editor',
        };
      }
    }

    return {
      success: false,
      result: null,
      errorMessage: 'Could not find theme information on this page',
      source: 'chrome-sp-editor',
    };
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
