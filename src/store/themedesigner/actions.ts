import { IColor } from '@fluentui/react/lib/Color';
import { ITheme } from '@fluentui/react/lib/Styling';
import { action } from 'typesafe-actions';
import { Constants } from './types';

export function setPrimaryColor(primaryColor: IColor) {
  return action(Constants.SET_PRIMARY_COLOR, { primaryColor });
}

export function setTextColor(textColor: IColor) {
  return action(Constants.SET_TEXT_COLOR, { textColor });
}

export function setBackgroundColor(backgroundColor: IColor) {
  return action(Constants.SET_BACKGROUND_COLOR, { backgroundColor });
}

export function setThemeDesignerTheme(theme: ITheme | undefined) {
  return action(Constants.SET_THEME, { theme });
}

export function setAllColors(colors: {
  primaryColor: IColor;
  textColor: IColor;
  backgroundColor: IColor;
}) {
  return action(Constants.SET_ALL_COLORS, colors);
}

export function resetThemeDesignerState() {
  return action(Constants.RESET_STATE);
}
