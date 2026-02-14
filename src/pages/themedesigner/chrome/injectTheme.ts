/**
 * Injects a theme into SharePoint using the native __loadTheme mechanism.
 */
export function injectTheme(themeJson: { [key: string]: string }) {
  try {
    var win = window as any;

    // Store original theme for restoration
    var themeState = win.__themeState__ && win.__themeState__.theme ? win.__themeState__.theme : null;
    if (!win.__spEditorOriginalTheme__ && themeState) {
      win.__spEditorOriginalTheme__ = Object.assign({}, themeState);
    }

    // Merge with original to preserve any missing slots
    var originalTheme = win.__spEditorOriginalTheme__ || themeState || {};
    var palette = Object.assign({}, originalTheme, themeJson);

    // Use SharePoint's native __loadTheme
    if (win.__loadTheme) {
      win.__loadTheme({
        palette: palette,
        semanticColors: {},
        effects: {},
        fonts: {}
      });
    }

    return { success: true, result: null, errorMessage: '', source: 'chrome-sp-editor' };
  } catch (error) {
    var err = error as any;
    console.error('[SP Editor injectTheme] Error:', err);
    return { success: false, result: null, errorMessage: err.message, source: 'chrome-sp-editor' };
  }
}

/**
 * Restores the original theme.
 */
export function removeThemePreview() {
  try {
    var win = window as any;

    if (win.__spEditorOriginalTheme__ && win.__loadTheme) {
      win.__loadTheme({
        palette: win.__spEditorOriginalTheme__,
        semanticColors: {},
        effects: {},
        fonts: {}
      });
      delete win.__spEditorOriginalTheme__;
    }

    return { success: true, result: null, errorMessage: '', source: 'chrome-sp-editor' };
  } catch (error) {
    var err = error as any;
    return { success: false, result: null, errorMessage: err.message, source: 'chrome-sp-editor' };
  }
}
