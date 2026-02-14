import { IColor } from '@fluentui/react/lib/Color';
import { ITheme } from '@fluentui/react/lib/Styling';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type ThemeDesignerActions = ActionType<typeof actions>;

// Note: themeRules is NOT stored in Redux because it has circular references
// that cause serialization issues. It's kept as local state in the component.
export interface IThemeDesignerState {
  primaryColor: IColor;
  textColor: IColor;
  backgroundColor: IColor;
  theme: ITheme | undefined;
}

export enum Constants {
  SET_PRIMARY_COLOR = 'THEME_DESIGNER_SET_PRIMARY_COLOR',
  SET_TEXT_COLOR = 'THEME_DESIGNER_SET_TEXT_COLOR',
  SET_BACKGROUND_COLOR = 'THEME_DESIGNER_SET_BACKGROUND_COLOR',
  SET_THEME = 'THEME_DESIGNER_SET_THEME',
  SET_ALL_COLORS = 'THEME_DESIGNER_SET_ALL_COLORS',
  RESET_STATE = 'THEME_DESIGNER_RESET_STATE',
}
