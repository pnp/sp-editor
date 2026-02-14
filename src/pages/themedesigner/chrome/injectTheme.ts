/**
 * Injects a theme into SharePoint using the native __loadTheme mechanism.
 */
export function injectTheme(themeJson: { [key: string]: string }) {
  try {
    const win = window as any;

    console.log('[SP Editor injectTheme] Received themeJson:', themeJson);
    console.log('[SP Editor injectTheme] themePrimary:', themeJson.themePrimary);

    // Store original theme for restoration
    if (!win.__spEditorOriginalTheme__ && win.__themeState__?.theme) {
      win.__spEditorOriginalTheme__ = { ...win.__themeState__.theme };
    }

    // Merge with original to preserve any missing slots
    const originalTheme = win.__spEditorOriginalTheme__ || win.__themeState__?.theme || {};
    const palette = { ...originalTheme, ...themeJson };

    console.log('[SP Editor injectTheme] Final palette themePrimary:', palette.themePrimary);

    // Use SharePoint's native __loadTheme
    if (win.__loadTheme) {
      console.log('[SP Editor injectTheme] Calling __loadTheme');
      win.__loadTheme({
        palette,
        semanticColors: {},
        effects: {},
        fonts: {}
      });
      console.log('[SP Editor injectTheme] __loadTheme called successfully');
    } else {
      console.log('[SP Editor injectTheme] __loadTheme not found!');
    }

    return { success: true, result: null, errorMessage: '', source: 'chrome-sp-editor' };
  } catch (error: any) {
    console.error('[SP Editor injectTheme] Error:', error);
    return { success: false, result: null, errorMessage: error.message, source: 'chrome-sp-editor' };
  }
}

/**
 * Restores the original theme.
 */
export function removeThemePreview() {
  try {
    const win = window as any;

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
  } catch (error: any) {
    return { success: false, result: null, errorMessage: error.message, source: 'chrome-sp-editor' };
  }
}
