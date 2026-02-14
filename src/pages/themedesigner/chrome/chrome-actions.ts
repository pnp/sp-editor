import { Dispatch } from 'redux';
import * as rootActions from '../../../store/home/actions';
import { HomeActions, MessageBarColors } from '../../../store/home/types';
import { injectTheme, removeThemePreview } from './injectTheme';
import { getCurrentTheme } from './getTheme';
import { getTenantThemes } from './getTenantThemes';
import { saveTenantTheme } from './saveTheme';
import { deleteTenantTheme } from './deleteTheme';
import { applyThemeToSite } from './applyTheme';

export interface ITenantTheme {
  name: string;
  palette: { [key: string]: string };
  isInverted?: boolean;
  displayMode?: 'light' | 'dark';
  themeSchemaVersion?: string;
}

export function loadTenantThemes(
  dispatch: Dispatch<HomeActions>,
  onThemesLoaded: (themes: ITenantTheme[]) => void
) {
  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [chrome.runtime.getURL('')],
    func: getTenantThemes,
  }).then(function(injectionResults) {
    dispatch(rootActions.setLoading(false));

    if (injectionResults[0].result) {
      var res = injectionResults[0].result as any;
      if (res.success && res.result && res.result.themes) {
        // Transform the theme previews to our format (themeJson is a string)
        var themes: ITenantTheme[] = res.result.themes.map(function(t: any) {
          var palette = {};
          if (t.themeJson) {
            try {
              var parsed = JSON.parse(t.themeJson);
              palette = parsed.palette || parsed;
            } catch (e) {
              console.error('[SP Editor] Failed to parse themeJson:', e);
            }
          } else if (t.palette) {
            palette = t.palette;
          }
          return {
            name: t.name,
            palette: palette,
          };
        });
        onThemesLoaded(themes);
      } else {
        onThemesLoaded([]);
      }
    }
  }).catch(function(error) {
    console.error('[SP Editor] getTenantThemes error:', error);
    dispatch(rootActions.setLoading(false));
    onThemesLoaded([]);
  });
}

export function loadCurrentThemeFromPage(
  dispatch: Dispatch<HomeActions>,
  onThemeLoaded: (theme: { [key: string]: string }) => void
) {
  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [],
    func: getCurrentTheme,
  }).then(function(injectionResults) {
    dispatch(rootActions.setLoading(false));

    if (injectionResults[0].result) {
      var res = injectionResults[0].result as any;
      if (res.success && res.result && res.result.theme) {
        onThemeLoaded(res.result.theme);
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'Theme loaded from ' + res.result.source,
          color: MessageBarColors.success,
        }));
      } else if (res.success && res.result && res.result.message) {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.result.message,
          color: MessageBarColors.warning,
        }));
      } else {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage || 'Could not load theme from page',
          color: MessageBarColors.danger,
        }));
      }
    }
  }).catch(function(error) {
    console.error('[SP Editor] getCurrentTheme error:', error);
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error.message || 'Failed to load theme from page',
      color: MessageBarColors.danger,
    }));
  });
}

export function previewThemeOnPage(
  dispatch: Dispatch<HomeActions>,
  themeJson: { [key: string]: string }
) {
  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [themeJson],
    func: injectTheme,
  }).then(function(injectionResults) {
    dispatch(rootActions.setLoading(false));
    
    if (injectionResults[0].result) {
      var res = injectionResults[0].result as any;
      if (res.success) {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'Theme preview applied to page!',
          color: MessageBarColors.success,
        }));
      } else {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage,
          color: MessageBarColors.danger,
        }));
      }
    }
  }).catch(function(error) {
    console.error('[SP Editor] executeScript error:', error);
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error.message || 'Failed to inject theme',
      color: MessageBarColors.danger,
    }));
  });
}

export function clearThemePreview(dispatch: Dispatch<HomeActions>) {
  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [],
    func: removeThemePreview,
  }).then(function(injectionResults) {
    if (injectionResults[0].result) {
      var res = injectionResults[0].result as any;
      if (res.success) {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'Theme preview removed',
          color: MessageBarColors.success,
        }));
      }
    }
  }).catch(function(error) {
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error.message || 'Failed to remove theme preview',
      color: MessageBarColors.danger,
    }));
  });
}

export function saveTheme(
  dispatch: Dispatch<HomeActions>,
  themeName: string,
  themePalette: { [key: string]: string },
  isUpdate: boolean,
  onSuccess: () => void
) {
  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [themeName, themePalette, isUpdate],
    func: saveTenantTheme,
  }).then(function(injectionResults) {
    dispatch(rootActions.setLoading(false));

    if (injectionResults[0].result) {
      var res = injectionResults[0].result as any;
      if (res.success) {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: isUpdate ? 'Theme updated successfully!' : 'Theme saved successfully!',
          color: MessageBarColors.success,
        }));
        onSuccess();
      } else {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage || 'Failed to save theme',
          color: MessageBarColors.danger,
        }));
      }
    }
  }).catch(function(error) {
    console.error('[SP Editor] saveTheme error:', error);
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error.message || 'Failed to save theme',
      color: MessageBarColors.danger,
    }));
  });
}

export function deleteTheme(
  dispatch: Dispatch<HomeActions>,
  themeName: string,
  onSuccess: () => void
) {
  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [themeName],
    func: deleteTenantTheme,
  }).then(function(injectionResults) {
    dispatch(rootActions.setLoading(false));

    if (injectionResults[0].result) {
      var res = injectionResults[0].result as any;
      if (res.success) {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'Theme deleted successfully!',
          color: MessageBarColors.success,
        }));
        onSuccess();
      } else {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage || 'Failed to delete theme',
          color: MessageBarColors.danger,
        }));
      }
    }
  }).catch(function(error) {
    console.error('[SP Editor] deleteTheme error:', error);
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error.message || 'Failed to delete theme',
      color: MessageBarColors.danger,
    }));
  });
}

export function applyThemeToPage(
  dispatch: Dispatch<HomeActions>,
  themeName: string,
  themePalette: { [key: string]: string },
  onSuccess: () => void
) {
  dispatch(rootActions.setLoading(true));

  chrome.scripting.executeScript({
    target: { tabId: chrome.devtools.inspectedWindow.tabId },
    world: 'MAIN',
    args: [themeName, themePalette],
    func: applyThemeToSite,
  }).then(function(injectionResults) {
    dispatch(rootActions.setLoading(false));

    if (injectionResults[0].result) {
      const res = injectionResults[0].result as any;
      if (res.success) {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: 'Theme applied to site! Refresh to see changes.',
          color: MessageBarColors.success,
        }));
        onSuccess();
      } else {
        dispatch(rootActions.setAppMessage({
          showMessage: true,
          message: res.errorMessage || 'Failed to apply theme',
          color: MessageBarColors.danger,
        }));
      }
    }
  }).catch(function(error) {
    console.error('[SP Editor] applyThemeToPage error:', error);
    dispatch(rootActions.setLoading(false));
    dispatch(rootActions.setAppMessage({
      showMessage: true,
      message: error.message || 'Failed to apply theme',
      color: MessageBarColors.danger,
    }));
  });
}
