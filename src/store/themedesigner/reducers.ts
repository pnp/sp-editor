import { getColorFromString } from '@fluentui/react/lib/Color';
import { Constants, IThemeDesignerState, ThemeDesignerActions } from './types';

// Initial state - themeRules is NOT stored here due to circular references
// It's kept as local state in the ThemingDesigner component
const init: IThemeDesignerState = {
  primaryColor: getColorFromString('#0078d4')!,
  textColor: getColorFromString('#323130')!,
  backgroundColor: getColorFromString('#ffffff')!,
  theme: undefined,
};

export function themeDesignerReducer(
  state: IThemeDesignerState = init,
  action: ThemeDesignerActions
): IThemeDesignerState {
  switch (action.type) {
    case Constants.SET_PRIMARY_COLOR:
      return { ...state, primaryColor: action.payload.primaryColor };
    case Constants.SET_TEXT_COLOR:
      return { ...state, textColor: action.payload.textColor };
    case Constants.SET_BACKGROUND_COLOR:
      return { ...state, backgroundColor: action.payload.backgroundColor };
    case Constants.SET_THEME:
      return { ...state, theme: action.payload.theme };
    case Constants.SET_ALL_COLORS:
      return {
        ...state,
        primaryColor: action.payload.primaryColor,
        textColor: action.payload.textColor,
        backgroundColor: action.payload.backgroundColor,
      };
    case Constants.RESET_STATE:
      return init;
    default:
      return state;
  }
}
