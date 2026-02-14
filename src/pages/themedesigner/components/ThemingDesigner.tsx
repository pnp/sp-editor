import * as React from 'react';
import { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AccessibilityChecker } from './AccessibilityChecker';
import {
  BaseSlots,
  FabricSlots,
  ThemeGenerator,
  IThemeRules,
  themeRulesStandardCreator,
} from '@fluentui/react/lib/ThemeGenerator';
import { createTheme } from '@fluentui/react/lib/Styling';
import { ThemeSlots } from './ThemeSlots';
import { IColor, isDark, getColorFromString } from '@fluentui/react/lib/Color';
import { IconButton, DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { mergeStyles } from '@fluentui/merge-styles';
import { Samples } from './Samples/index';
import { Stack, IStackProps } from '@fluentui/react/lib/Stack';
import { ThemeDesignerColorPicker } from './ThemeDesignerColorPicker';
import { Text, ThemeProvider } from '@fluentui/react';
import { MainPanelWidth } from '../shared/MainPanelStyles';
import { IRootState } from '../../../store';
import {
  setPrimaryColor,
  setTextColor,
  setBackgroundColor,
  setThemeDesignerTheme,
} from '../../../store/themedesigner/actions';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { previewThemeOnPage, clearThemePreview, loadTenantThemes, loadCurrentThemeFromPage, saveTheme, deleteTheme, applyThemeToPage, ITenantTheme } from '../chrome/chrome-actions';
import * as rootActions from '../../../store/home/actions';
import { MessageBarColors } from '../../../store/home/types';

// Official SharePoint themes from Microsoft documentation
// https://learn.microsoft.com/en-us/sharepoint/dev/declarative-customization/site-theming/sharepoint-site-theming-json-schema
const MICROSOFT_THEMES: ITenantTheme[] = [
  {
    name: 'Blue',
    palette: {
      themePrimary: '#1267b5',
      themeLighterAlt: '#f3f8fc',
      themeLighter: '#d0e2f3',
      themeLight: '#aacae9',
      themeTertiary: '#619cd3',
      themeSecondary: '#2875be',
      themeDarkAlt: '#105ca3',
      themeDark: '#0e4e8a',
      themeDarker: '#0a3965',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
      primaryBackground: '#ffffff',
      primaryText: '#323130',
      bodyBackground: '#ffffff',
      bodyText: '#323130',
      disabledBackground: '#f4f4f4',
      disabledText: '#c8c8c8',
      error: '#a80000',
      accent: '#1267b5',
    },
  },
  {
    name: 'Orange',
    palette: {
      themePrimary: '#a74411',
      themeLighterAlt: '#fbf5f2',
      themeLighter: '#f1dace',
      themeLight: '#e4bba7',
      themeTertiary: '#c9815d',
      themeSecondary: '#b05325',
      themeDarkAlt: '#953c0f',
      themeDark: '#7e320d',
      themeDarker: '#5d2509',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
      primaryBackground: '#ffffff',
      primaryText: '#323130',
      bodyBackground: '#ffffff',
      bodyText: '#323130',
      disabledBackground: '#f4f4f4',
      disabledText: '#c8c8c8',
      error: '#a80000',
      accent: '#a74411',
    },
  },
  {
    name: 'Red',
    isInverted: false,
    palette: {
      themePrimary: '#ad3a39',
      themeLighterAlt: '#fcf5f5',
      themeLighter: '#f2d8d8',
      themeLight: '#e7b9b8',
      themeTertiary: '#ce7d7b',
      themeSecondary: '#b74d4b',
      themeDarkAlt: '#9c3533',
      themeDark: '#842d2b',
      themeDarker: '#612120',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
      primaryBackground: '#ffffff',
      primaryText: '#323130',
      bodyBackground: '#ffffff',
      bodyText: '#323130',
      disabledBackground: '#f4f4f4',
      disabledText: '#c8c8c8',
      error: '#a80000',
      accent: '#ad3a39',
    },
  },
  {
    name: 'Purple',
    isInverted: false,
    palette: {
      themePrimary: '#72559b',
      themeLighterAlt: '#f8f7fb',
      themeLighter: '#e5deef',
      themeLight: '#cfc3e1',
      themeTertiary: '#a58fc3',
      themeSecondary: '#8165a7',
      themeDarkAlt: '#674d8c',
      themeDark: '#574176',
      themeDarker: '#403057',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
      primaryBackground: '#ffffff',
      primaryText: '#323130',
      bodyBackground: '#ffffff',
      bodyText: '#323130',
      disabledBackground: '#f4f4f4',
      disabledText: '#c8c8c8',
      error: '#a80000',
      accent: '#72559b',
    },
  },
  {
    name: 'Green',
    palette: {
      themePrimary: '#437509',
      themeLighterAlt: '#f5f9f0',
      themeLighter: '#d9e9c7',
      themeLight: '#bad69b',
      themeTertiary: '#80ac4d',
      themeSecondary: '#538619',
      themeDarkAlt: '#3c6a08',
      themeDark: '#335907',
      themeDarker: '#254205',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
      primaryBackground: '#ffffff',
      primaryText: '#323130',
      bodyBackground: '#ffffff',
      bodyText: '#323130',
      disabledBackground: '#f4f4f4',
      disabledText: '#c8c8c8',
      error: '#a80000',
      accent: '#437509',
    },
  },
  {
    name: 'Gray',
    palette: {
      themePrimary: '#69797e',
      themeLighterAlt: '#f8f9f9',
      themeLighter: '#e6e9ea',
      themeLight: '#d0d6d9',
      themeTertiary: '#a5adb2',
      themeSecondary: '#7f8c91',
      themeDarkAlt: '#5f6e72',
      themeDark: '#505d60',
      themeDarker: '#3b4447',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#c2c2c2',
      neutralSecondary: '#858585',
      neutralPrimaryAlt: '#4b4b4b',
      neutralPrimary: '#333333',
      neutralDark: '#272727',
      black: '#1d1d1d',
      white: '#ffffff',
      primaryBackground: '#ffffff',
      primaryText: '#333333',
      bodyBackground: '#ffffff',
      bodyText: '#333333',
      disabledBackground: '#f4f4f4',
      disabledText: '#c8c8c8',
      error: '#a80000',
      accent: '#69797e',
    },
  },
  {
    name: 'Teal',
    palette: {
      themePrimary: '#03787c',
      themeLighterAlt: '#f0f9fa',
      themeLighter: '#c5e9ea',
      themeLight: '#98d6d8',
      themeTertiary: '#49aeb1',
      themeSecondary: '#13898d',
      themeDarkAlt: '#026d70',
      themeDark: '#025c5f',
      themeDarker: '#014446',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
      primaryBackground: '#ffffff',
      primaryText: '#323130',
      bodyBackground: '#ffffff',
      bodyText: '#323130',
      disabledBackground: '#f4f4f4',
      disabledText: '#c8c8c8',
      error: '#a80000',
      accent: '#03787c',
    },
  },
  {
    name: 'Dark Yellow (Inverted)',
    palette: {
      themePrimary: '#ffb900',
      themeLighterAlt: '#3d2c00',
      themeLighter: '#453300',
      themeLight: '#5c4400',
      themeTertiary: '#b88f00',
      themeSecondary: '#e5a800',
      themeDarkAlt: '#ffbf12',
      themeDark: '#ffc931',
      themeDarker: '#ffd761',
      neutralLighterAlt: '#3c3c3c',
      neutralLighter: '#444444',
      neutralLight: '#515151',
      neutralQuaternaryAlt: '#595959',
      neutralQuaternary: '#5f5f5f',
      neutralTertiaryAlt: '#7a7a7a',
      neutralTertiary: '#c8c8c8',
      neutralSecondary: '#d0d0d0',
      neutralPrimaryAlt: '#dadada',
      neutralPrimary: '#ffffff',
      neutralDark: '#f4f4f4',
      black: '#f8f8f8',
      white: '#323232',
      primaryBackground: '#323232',
      primaryText: '#ffffff',
      bodyBackground: '#323232',
      bodyText: '#ffffff',
      disabledBackground: '#444444',
      disabledText: '#7a7a7a',
      error: '#ff5f5f',
      accent: '#ffb900',
    },
  },
  {
    name: 'Dark Blue (Inverted)',
    palette: {
      themePrimary: '#3a96dd',
      themeLighterAlt: '#021824',
      themeLighter: '#07385a',
      themeLight: '#0e5c96',
      themeTertiary: '#1b96d3',
      themeSecondary: '#218fd6',
      themeDarkAlt: '#4c9fdf',
      themeDark: '#68afe4',
      themeDarker: '#91c6ec',
      neutralLighterAlt: '#3c3c3c',
      neutralLighter: '#444444',
      neutralLight: '#515151',
      neutralQuaternaryAlt: '#595959',
      neutralQuaternary: '#5f5f5f',
      neutralTertiaryAlt: '#7a7a7a',
      neutralTertiary: '#c8c8c8',
      neutralSecondary: '#d0d0d0',
      neutralPrimaryAlt: '#dadada',
      neutralPrimary: '#ffffff',
      neutralDark: '#f4f4f4',
      black: '#f8f8f8',
      white: '#323232',
      primaryBackground: '#323232',
      primaryText: '#ffffff',
      bodyBackground: '#323232',
      bodyText: '#ffffff',
      disabledBackground: '#444444',
      disabledText: '#7a7a7a',
      error: '#ff5f5f',
      accent: '#3a96dd',
    },
  },
  {
    name: 'Periwinkle',
    palette: {
      themePrimary: '#5b5d9b',
      themeLighterAlt: '#f7f7fb',
      themeLighter: '#dfe0ef',
      themeLight: '#c5c6e1',
      themeTertiary: '#9395c3',
      themeSecondary: '#6b6da7',
      themeDarkAlt: '#53558c',
      themeDark: '#464776',
      themeDarker: '#333557',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
      primaryBackground: '#ffffff',
      primaryText: '#323130',
      bodyBackground: '#ffffff',
      bodyText: '#323130',
      disabledBackground: '#f4f4f4',
      disabledText: '#c8c8c8',
      error: '#a80000',
      accent: '#5b5d9b',
    },
  },
  {
    name: 'Cobalt',
    palette: {
      themePrimary: '#355dcd',
      themeLighterAlt: '#f5f7fd',
      themeLighter: '#dae1f7',
      themeLight: '#bac9f0',
      themeTertiary: '#7d97e0',
      themeSecondary: '#496ed2',
      themeDarkAlt: '#3054b8',
      themeDark: '#28479b',
      themeDarker: '#1e3472',
      neutralLighterAlt: '#f8f8f8',
      neutralLighter: '#f4f4f4',
      neutralLight: '#eaeaea',
      neutralQuaternaryAlt: '#dadada',
      neutralQuaternary: '#d0d0d0',
      neutralTertiaryAlt: '#c8c8c8',
      neutralTertiary: '#a19f9d',
      neutralSecondary: '#605e5c',
      neutralPrimaryAlt: '#3b3a39',
      neutralPrimary: '#323130',
      neutralDark: '#201f1e',
      black: '#000000',
      white: '#ffffff',
      primaryBackground: '#ffffff',
      primaryText: '#323130',
      bodyBackground: '#ffffff',
      bodyText: '#323130',
      disabledBackground: '#f4f4f4',
      disabledText: '#c8c8c8',
      error: '#a80000',
      accent: '#355dcd',
    },
  },
  {
    name: 'Dark Teal (Inverted)',
    palette: {
      themePrimary: '#51aeb2',
      themeLighterAlt: '#030707',
      themeLighter: '#0d1c1d',
      themeLight: '#193536',
      themeTertiary: '#31696b',
      themeSecondary: '#489a9d',
      themeDarkAlt: '#60b7ba',
      themeDark: '#74c2c5',
      themeDarker: '#94d2d4',
      neutralLighterAlt: '#323232',
      neutralLighter: '#3a3a3a',
      neutralLight: '#484848',
      neutralQuaternaryAlt: '#505050',
      neutralQuaternary: '#575757',
      neutralTertiaryAlt: '#747474',
      neutralTertiary: '#c8c8c8',
      neutralSecondary: '#d0d0d0',
      neutralPrimaryAlt: '#dadada',
      neutralPrimary: '#ffffff',
      neutralDark: '#f4f4f4',
      black: '#f8f8f8',
      white: '#292929',
      primaryBackground: '#292929',
      primaryText: '#ffffff',
      bodyBackground: '#292929',
      bodyText: '#ffffff',
      disabledBackground: '#3a3a3a',
      disabledText: '#747474',
      error: '#ff5f5f',
      accent: '#51aeb2',
    },
  },
  {
    name: 'Dark Blue',
    palette: {
      themePrimary: '#529ff1',
      themeLighterAlt: '#03060a',
      themeLighter: '#0d1a27',
      themeLight: '#193049',
      themeTertiary: '#316091',
      themeSecondary: '#488cd5',
      themeDarkAlt: '#63a9f4',
      themeDark: '#7ab6f5',
      themeDarker: '#9cc9f8',
      neutralLighterAlt: '#323232',
      neutralLighter: '#3a3a3a',
      neutralLight: '#484848',
      neutralQuaternaryAlt: '#505050',
      neutralQuaternary: '#575757',
      neutralTertiaryAlt: '#747474',
      neutralTertiary: '#c8c8c8',
      neutralSecondary: '#d0d0d0',
      neutralPrimaryAlt: '#dadada',
      neutralPrimary: '#ffffff',
      neutralDark: '#f4f4f4',
      black: '#f8f8f8',
      white: '#292929',
      primaryBackground: '#292929',
      primaryText: '#ffffff',
      bodyBackground: '#292929',
      bodyText: '#ffffff',
      disabledBackground: '#3a3a3a',
      disabledText: '#747474',
      error: '#ff5f5f',
      accent: '#529ff1',
    },
  },
];

// Styles for export panel
const textAreaClassName = mergeStyles({
  height: 350,
  width: '100%',
  marginRight: 28,
  backgroundColor: 'white',
  color: '#333',
  fontFamily: 'monospace',
  fontSize: 12,
  padding: 8,
  border: '1px solid #ccc',
});

const Page = (props: IStackProps) => (
  <Stack
    tokens={{ childrenGap: 10 }}
    className={mergeStyles({
      height: '100vh',
      overflow: 'hidden',
      selectors: {
        ':global(body)': {
          padding: 0,
          margin: 0,
        },
      },
    })}
    {...props}
  />
);

const Content = (props: IStackProps) => (
  <Stack horizontal tokens={{ childrenGap: 10 }} className={mergeStyles({ overflow: 'hidden' })} {...props} />
);

const Sidebar = (props: IStackProps) => (
  <Stack
    disableShrink
    tokens={{ childrenGap: 20 }}
    grow={0}
    className={mergeStyles({
      borderRight: '1px solid #ddd',
      paddingRight: '1rem',
    })}
    {...props}
  />
);

const Main = (props: IStackProps) => (
  <Stack
    grow={1}
    disableShrink
    className={mergeStyles({
      minWidth: MainPanelWidth,
      overflow: 'scroll',
    })}
    {...props}
  />
);

export const ThemingDesigner: React.FC = () => {
  const dispatch = useDispatch();

  // Get state from Redux (colors and theme only - themeRules has circular references)
  const primaryColor = useSelector((state: IRootState) => state.themeDesigner.primaryColor);
  const textColor = useSelector((state: IRootState) => state.themeDesigner.textColor);
  const backgroundColor = useSelector((state: IRootState) => state.themeDesigner.backgroundColor);
  const theme = useSelector((state: IRootState) => state.themeDesigner.theme);
  
  // Keep themeRules as local ref - it has circular references that break Redux serialization
  const themeRulesRef = useRef<IThemeRules | null>(null);
  // Keep track of current palette for preview - needed because ThemeGenerator regenerates colors from base slots
  const currentPaletteRef = useRef<{ [key: string]: string } | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Panel state for export
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [jsonTheme, setJsonTheme] = useState('');
  const [powershellTheme, setPowershellTheme] = useState('');
  const [themeAsCode, setThemeAsCode] = useState('');

  // Tenant themes state
  const [tenantThemes, setTenantThemes] = useState<ITenantTheme[]>([]);

  // Current theme tracking for save/update/delete
  const [currentThemeName, setCurrentThemeName] = useState<string | null>(null);
  const [currentThemeType, setCurrentThemeType] = useState<'microsoft' | 'tenant' | 'custom' | 'none'>('none');
  const [isThemeActive, setIsThemeActive] = useState(false); // true when user has selected or created a theme

  // Dialog states
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [isSaveConfirmDialogOpen, setIsSaveConfirmDialogOpen] = useState(false);
  const [saveThemeName, setSaveThemeName] = useState('');
  const [isSaveAsMode, setIsSaveAsMode] = useState(false); // true = Save As (new), false = Update
  const [livePreviewEnabled, setLivePreviewEnabled] = useState(true); // Auto-preview on color change

  // Refs for debounce timeouts
  const colorChangeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fabricPaletteColorChangeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clipboard helper - uses execCommand for Chrome extension compatibility
  const copyToClipboard = useCallback((value: string, message: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    dispatch(
      rootActions.setAppMessage({
        showMessage: true,
        message: message,
        color: MessageBarColors.success,
      })
    );
  }, [dispatch]);

  // Initialize themeRules on mount
  useEffect(() => {
    if (!themeRulesRef.current) {
      const rules = themeRulesStandardCreator();
      const isInverted = isDark(backgroundColor);
      ThemeGenerator.insureSlots(rules, isInverted);
      ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.primaryColor]], primaryColor, isInverted, true, true);
      ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.foregroundColor]], textColor, isInverted, true, true);
      ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.backgroundColor]], backgroundColor, isInverted, true, true);
      
      themeRulesRef.current = rules;
      
      const themeAsJson: { [key: string]: string } = ThemeGenerator.getThemeAsJson(rules);
      // Store the initial palette
      currentPaletteRef.current = themeAsJson;
      const finalTheme = createTheme({
        palette: themeAsJson,
        isInverted: isDark(rules[BaseSlots[BaseSlots.backgroundColor]].color!),
      });
      dispatch(setThemeDesignerTheme(finalTheme));
      setIsInitialized(true);
    }
  }, [primaryColor, textColor, backgroundColor, dispatch]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (colorChangeTimeoutRef.current) {
        clearTimeout(colorChangeTimeoutRef.current);
      }
      if (fabricPaletteColorChangeTimeoutRef.current) {
        clearTimeout(fabricPaletteColorChangeTimeoutRef.current);
      }
    };
  }, []);

  // Load tenant themes on mount
  useEffect(() => {
    loadTenantThemes(dispatch, (themes) => {
      setTenantThemes(themes);
    });
  }, [dispatch]);

  // Auto-load current page theme on mount
  useEffect(() => {
    if (isInitialized) {
      // Load the current theme from the page
      loadCurrentThemeFromPage(dispatch, (loadedPalette) => {
        // Apply the loaded theme to the designer
        const palette = loadedPalette;
        
        // Track as custom (we don't know if it's from tenant gallery)
        setCurrentThemeName('Current Page Theme');
        setCurrentThemeType('custom');
        setIsThemeActive(true);
        
        // Get the base colors from the palette
        const newPrimaryColor = getColorFromString(palette.themePrimary || '#0078d4')!;
        const newTextColor = getColorFromString(palette.neutralPrimary || '#323130')!;
        const newBackgroundColor = getColorFromString(palette.white || '#ffffff')!;
        
        // Update Redux state for color pickers
        dispatch(setPrimaryColor(newPrimaryColor));
        dispatch(setTextColor(newTextColor));
        dispatch(setBackgroundColor(newBackgroundColor));
        
        // Re-initialize themeRules with the new colors
        const rules = themeRulesStandardCreator();
        const isInverted = isDark(newBackgroundColor);
        ThemeGenerator.insureSlots(rules, isInverted);
        
        ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.primaryColor]], newPrimaryColor, isInverted, true, true);
        ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.foregroundColor]], newTextColor, isInverted, true, true);
        ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.backgroundColor]], newBackgroundColor, isInverted, true, true);
        
        themeRulesRef.current = rules;
        currentPaletteRef.current = { ...palette };
        
        const finalTheme = createTheme({
          palette: palette,
          isInverted: isInverted,
        });
        dispatch(setThemeDesignerTheme(finalTheme));
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]); // Only run once after initialization

  // Apply a theme from the dropdown
  const applyTheme = useCallback((selectedTheme: ITenantTheme, themeType: 'microsoft' | 'tenant' | 'custom' = 'custom') => {
    const palette = selectedTheme.palette;
    
    // Track the current theme
    setCurrentThemeName(selectedTheme.name);
    setCurrentThemeType(themeType);
    setIsThemeActive(true);
    
    // Get the base colors from the palette
    const newPrimaryColor = getColorFromString(palette.themePrimary || '#0078d4')!;
    const newTextColor = getColorFromString(palette.neutralPrimary || '#323130')!;
    const newBackgroundColor = getColorFromString(palette.white || '#ffffff')!;
    
    // Update Redux state for color pickers
    dispatch(setPrimaryColor(newPrimaryColor));
    dispatch(setTextColor(newTextColor));
    dispatch(setBackgroundColor(newBackgroundColor));
    
    // Re-initialize themeRules with the new colors
    const rules = themeRulesStandardCreator();
    const isInverted = isDark(newBackgroundColor);
    ThemeGenerator.insureSlots(rules, isInverted);
    
    // Set slots with propagation (true, true) so derived colors are updated
    ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.primaryColor]], newPrimaryColor, isInverted, true, true);
    ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.foregroundColor]], newTextColor, isInverted, true, true);
    ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.backgroundColor]], newBackgroundColor, isInverted, true, true);
    
    themeRulesRef.current = rules;
    
    // Store the full palette for preview - this is the key fix!
    // We store the selected theme's palette, not the regenerated one
    currentPaletteRef.current = { ...palette };
    
    // Use the full palette from the selected theme (includes all extra slots like error, accent, etc.)
    // This ensures the theme matches exactly what's defined in SharePoint documentation
    const finalTheme = createTheme({
      palette: palette,
      isInverted: isInverted,
    });
    dispatch(setThemeDesignerTheme(finalTheme));
    
    // Auto-preview on page (if enabled)
    if (livePreviewEnabled) {
      previewThemeOnPage(dispatch, palette);
    }
  }, [dispatch, livePreviewEnabled]);

  // Handle fabric palette color change (from ThemeSlots)
  const onFabricPaletteColorChange = useCallback(
    (newColor: IColor | undefined, fabricSlot: FabricSlots) => {
      if (fabricPaletteColorChangeTimeoutRef.current) {
        clearTimeout(fabricPaletteColorChangeTimeoutRef.current);
      }
      const themeRules = themeRulesRef.current;
      if (!themeRules || !newColor) {
        return;
      }

      fabricPaletteColorChangeTimeoutRef.current = setTimeout(() => {
        const currentIsDark = isDark(themeRules[FabricSlots[fabricSlot]].color!);
        ThemeGenerator.setSlot(themeRules[FabricSlots[fabricSlot]], newColor, currentIsDark, true, true);
        if (currentIsDark !== isDark(themeRules[FabricSlots[fabricSlot]].color!)) {
          ThemeGenerator.insureSlots(themeRules, currentIsDark);
        }
        // Generate new theme
        const themeAsJson: { [key: string]: string } = ThemeGenerator.getThemeAsJson(themeRules);
        
        // Update currentPaletteRef so preview uses the latest colors
        currentPaletteRef.current = themeAsJson;
        
        const finalTheme = createTheme({
          palette: themeAsJson,
          isInverted: isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!),
        });
        dispatch(setThemeDesignerTheme(finalTheme));
        
        // Auto-preview on page (if enabled)
        if (livePreviewEnabled) {
          previewThemeOnPage(dispatch, themeAsJson);
        }
      }, 300);
    },
    [dispatch, livePreviewEnabled]
  );

  // Generic color change handler
  const onColorChange = useCallback(
    (baseSlot: BaseSlots, newColor: IColor | undefined) => {
      if (colorChangeTimeoutRef.current) {
        clearTimeout(colorChangeTimeoutRef.current);
      }
      const themeRules = themeRulesRef.current;
      if (!newColor || !themeRules) {
        return;
      }

      // Immediately update the color in Redux for responsive UI
      if (baseSlot === BaseSlots.primaryColor) {
        dispatch(setPrimaryColor(newColor));
      } else if (baseSlot === BaseSlots.foregroundColor) {
        dispatch(setTextColor(newColor));
      } else if (baseSlot === BaseSlots.backgroundColor) {
        dispatch(setBackgroundColor(newColor));
      }

      // Debounce the theme generation
      colorChangeTimeoutRef.current = setTimeout(() => {
        const currentIsDark = isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!);
        ThemeGenerator.setSlot(themeRules[BaseSlots[baseSlot]], newColor, currentIsDark, true, true);
        if (currentIsDark !== isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!)) {
          ThemeGenerator.insureSlots(themeRules, currentIsDark);
        }
        // Generate new theme
        const themeAsJson: { [key: string]: string } = ThemeGenerator.getThemeAsJson(themeRules);
        
        // Update currentPaletteRef so preview uses the latest colors
        currentPaletteRef.current = themeAsJson;
        
        const finalTheme = createTheme({
          palette: themeAsJson,
          isInverted: isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!),
        });
        dispatch(setThemeDesignerTheme(finalTheme));
        
        // Auto-preview on page (if enabled)
        if (livePreviewEnabled) {
          previewThemeOnPage(dispatch, themeAsJson);
        }
      }, 300);
    },
    [dispatch, livePreviewEnabled]
  );

  // Color picker change handlers
  const onPrimaryColorPickerChange = useCallback(
    (newColor: IColor | undefined) => {
      onColorChange(BaseSlots.primaryColor, newColor);
    },
    [onColorChange]
  );

  const onTextColorPickerChange = useCallback(
    (newColor: IColor | undefined) => {
      onColorChange(BaseSlots.foregroundColor, newColor);
    },
    [onColorChange]
  );

  const onBkgColorPickerChange = useCallback(
    (newColor: IColor | undefined) => {
      onColorChange(BaseSlots.backgroundColor, newColor);
    },
    [onColorChange]
  );

  // Export theme functionality
  const exportTheme = useCallback(() => {
    const themeRules = themeRulesRef.current;
    if (!themeRules) return;

    // Strip out the unnecessary shade slots from the final output theme
    const abridgedTheme: IThemeRules = {};
    for (const ruleName in themeRules) {
      if (Object.hasOwn(themeRules, ruleName)) {
        if (
          !ruleName.includes('ColorShade') &&
          ruleName !== 'primaryColor' &&
          ruleName !== 'backgroundColor' &&
          ruleName !== 'foregroundColor' &&
          !ruleName.includes('body')
        ) {
          abridgedTheme[ruleName] = themeRules[ruleName];
        }
      }
    }

    setJsonTheme(JSON.stringify(ThemeGenerator.getThemeAsJson(abridgedTheme), undefined, 2));
    setPowershellTheme(ThemeGenerator.getThemeForPowerShell(abridgedTheme));
    setThemeAsCode(ThemeGenerator.getThemeAsCodeWithCreateTheme(abridgedTheme));
    setIsPanelOpen(true);
  }, []);

  // Preview theme on SharePoint page
  const handlePreviewOnPage = useCallback(() => {
    // Use the stored palette if available (from selected theme or color changes)
    // Fall back to generating from themeRules if not
    let themeAsJson: { [key: string]: string };
    
    if (currentPaletteRef.current) {
      themeAsJson = currentPaletteRef.current;
    } else {
      const themeRules = themeRulesRef.current;
      if (!themeRules) return;
      themeAsJson = ThemeGenerator.getThemeAsJson(themeRules);
    }
    
    previewThemeOnPage(dispatch, themeAsJson);
  }, [dispatch]);

  // Restore original theme on page and reload into editor
  const handleRestoreOriginal = useCallback(() => {
    // Clear the preview on the page
    clearThemePreview(dispatch);
    
    // Reload the original page theme into the editor
    loadCurrentThemeFromPage(dispatch, (loadedPalette) => {
      const palette = loadedPalette;
      
      setCurrentThemeName('Current Page Theme');
      setCurrentThemeType('custom');
      
      const newPrimaryColor = getColorFromString(palette.themePrimary || '#0078d4')!;
      const newTextColor = getColorFromString(palette.neutralPrimary || '#323130')!;
      const newBackgroundColor = getColorFromString(palette.white || '#ffffff')!;
      
      dispatch(setPrimaryColor(newPrimaryColor));
      dispatch(setTextColor(newTextColor));
      dispatch(setBackgroundColor(newBackgroundColor));
      
      const rules = themeRulesStandardCreator();
      const isInverted = isDark(newBackgroundColor);
      ThemeGenerator.insureSlots(rules, isInverted);
      
      ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.primaryColor]], newPrimaryColor, isInverted, true, true);
      ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.foregroundColor]], newTextColor, isInverted, true, true);
      ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.backgroundColor]], newBackgroundColor, isInverted, true, true);
      
      themeRulesRef.current = rules;
      currentPaletteRef.current = { ...palette };
      
      const finalTheme = createTheme({
        palette: palette,
        isInverted: isInverted,
      });
      dispatch(setThemeDesignerTheme(finalTheme));
    });
  }, [dispatch]);

  // Refresh tenant themes list
  const refreshTenantThemes = useCallback(() => {
    loadTenantThemes(dispatch, (themes) => {
      setTenantThemes(themes);
    });
  }, [dispatch]);

  // New theme - reset to default
  const handleNewTheme = useCallback(() => {
    setCurrentThemeName(null); // No name = unsaved new theme
    setCurrentThemeType('custom');
    setIsThemeActive(true);
    
    // Reset to default blue theme
    const defaultPrimaryColor = getColorFromString('#0078d4')!;
    const defaultTextColor = getColorFromString('#323130')!;
    const defaultBackgroundColor = getColorFromString('#ffffff')!;
    
    dispatch(setPrimaryColor(defaultPrimaryColor));
    dispatch(setTextColor(defaultTextColor));
    dispatch(setBackgroundColor(defaultBackgroundColor));
    
    // Re-initialize themeRules
    const rules = themeRulesStandardCreator();
    ThemeGenerator.insureSlots(rules, false);
    ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.primaryColor]], defaultPrimaryColor, false, true, true);
    ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.foregroundColor]], defaultTextColor, false, true, true);
    ThemeGenerator.setSlot(rules[BaseSlots[BaseSlots.backgroundColor]], defaultBackgroundColor, false, true, true);
    
    themeRulesRef.current = rules;
    
    const themeAsJson = ThemeGenerator.getThemeAsJson(rules);
    currentPaletteRef.current = themeAsJson;
    
    const finalTheme = createTheme({ palette: themeAsJson, isInverted: false });
    dispatch(setThemeDesignerTheme(finalTheme));
    previewThemeOnPage(dispatch, themeAsJson);
  }, [dispatch]);

  // Open Save As dialog (for new theme or clone)
  const handleSaveAs = useCallback(() => {
    setSaveThemeName(currentThemeName ? currentThemeName + ' Copy' : 'My Theme');
    setIsSaveAsMode(true);
    setIsSaveDialogOpen(true);
  }, [currentThemeName]);

  // Clone current theme - keeps colors but goes to "new unsaved" state
  const handleClone = useCallback(() => {
    // Keep current colors, just reset the name/type
    setCurrentThemeName(null);
    setCurrentThemeType('custom');
    // isThemeActive stays true - we cloned into an unsaved theme
  }, []);

  // Save/Update current tenant theme
  const handleSave = useCallback(() => {
    if (currentThemeType === 'tenant' && currentThemeName) {
      // Show confirmation dialog before updating
      setIsSaveConfirmDialogOpen(true);
    } else {
      // Need to save as new - open dialog
      handleSaveAs();
    }
  }, [currentThemeName, currentThemeType, handleSaveAs]);

  // Confirm save update (for existing tenant themes)
  const handleSaveConfirm = useCallback(() => {
    if (currentThemeName && currentPaletteRef.current) {
      saveTheme(dispatch, currentThemeName, currentPaletteRef.current, true, () => {
        refreshTenantThemes();
        setIsSaveConfirmDialogOpen(false);
      });
    }
  }, [dispatch, currentThemeName, refreshTenantThemes]);

  // Confirm save dialog (for new themes)
  const handleSaveDialogConfirm = useCallback(() => {
    if (!saveThemeName.trim()) return;
    
    const palette = currentPaletteRef.current;
    if (palette) {
      // Check if theme name already exists in tenant themes
      const existingTheme = tenantThemes.find(t => t.name.toLowerCase() === saveThemeName.trim().toLowerCase());
      const isUpdate = existingTheme !== undefined && !isSaveAsMode;
      
      saveTheme(dispatch, saveThemeName.trim(), palette, isUpdate, () => {
        refreshTenantThemes();
        setCurrentThemeName(saveThemeName.trim());
        setCurrentThemeType('tenant');
        setIsSaveDialogOpen(false);
      });
    }
  }, [dispatch, saveThemeName, tenantThemes, isSaveAsMode, refreshTenantThemes]);

  // Open delete confirmation dialog
  const handleDeleteClick = useCallback(() => {
    if (currentThemeType === 'tenant' && currentThemeName) {
      setIsDeleteDialogOpen(true);
    }
  }, [currentThemeName, currentThemeType]);

  // Confirm delete
  const handleDeleteConfirm = useCallback(() => {
    if (currentThemeName) {
      deleteTheme(dispatch, currentThemeName, () => {
        refreshTenantThemes();
        setCurrentThemeName(null);
        setCurrentThemeType('custom');
        setIsDeleteDialogOpen(false);
      });
    }
  }, [dispatch, currentThemeName, refreshTenantThemes]);

  // Open apply confirmation dialog
  const handleApplyClick = useCallback(() => {
    setIsApplyDialogOpen(true);
  }, []);

  // Confirm apply theme to site
  const handleApplyConfirm = useCallback(() => {
    if (currentPaletteRef.current) {
      // Use current theme name, or a default if not set
      const themeName = currentThemeName || 'Custom Theme';
      applyThemeToPage(dispatch, themeName, currentPaletteRef.current, () => {
        setIsApplyDialogOpen(false);
      });
    } else {
      console.warn('[SP Editor] Cannot apply - missing palette');
    }
  }, [dispatch, currentThemeName]);

  // CommandBar items
  const commandBarItems: ICommandBarItemProps[] = useMemo(
    () => [
      {
        key: 'loadTheme',
        text: 'Load Theme',
        iconProps: { iconName: 'Color' },
        subMenuProps: {
          items: [
            {
              key: 'msThemesHeader',
              text: 'Microsoft Themes',
              itemType: 2, // Header (ContextualMenuItemType.Header)
            },
            ...MICROSOFT_THEMES.map((t) => ({
              key: `ms-${t.name}`,
              text: t.name,
              onClick: () => applyTheme(t, 'microsoft'),
            })),
            {
              key: 'divider1',
              itemType: 1, // Divider (ContextualMenuItemType.Divider)
            },
            {
              key: 'tenantThemesHeader',
              text: 'Tenant Themes',
              itemType: 2, // Header (ContextualMenuItemType.Header)
            },
            ...(tenantThemes.length > 0
              ? tenantThemes.map((t) => ({
                  key: `tenant-${t.name}`,
                  text: t.name,
                  onClick: () => applyTheme(t, 'tenant'),
                }))
              : [{ key: 'noTenantThemes', text: '(No tenant themes found)', disabled: true }]),
          ],
        },
      },
      {
        key: 'restoreOriginal',
        text: 'Restore Original',
        iconProps: { iconName: 'Refresh' },
        onClick: handleRestoreOriginal,
      },
     /* {
        key: 'dividerTheme',
        itemType: 2, // Divider
      },*/

      // Hidden for now - tenant-level operations
      // {
      //   key: 'newTheme',
      //   text: 'New',
      //   iconProps: { iconName: 'Add' },
      //   onClick: handleNewTheme,
      // },
      // {
      //   key: 'cloneTheme',
      //   text: 'Clone',
      //   iconProps: { iconName: 'Copy' },
      //   onClick: handleClone,
      //   disabled: !isThemeActive,
      // },
      // {
      //   key: 'saveTheme',
      //   text: 'Save',
      //   iconProps: { iconName: 'Save' },
      //   onClick: handleSave,
      //   disabled: !isThemeActive || currentThemeType === 'microsoft',
      // },
      // {
      //   key: 'saveAsTheme',
      //   text: 'Save As',
      //   iconProps: { iconName: 'SaveAs' },
      //   onClick: handleSaveAs,
      //   disabled: !isThemeActive,
      // },
      // {
      //   key: 'deleteTheme',
      //   text: 'Delete',
      //   iconProps: { iconName: 'Delete' },
      //   onClick: handleDeleteClick,
      //   disabled: currentThemeType !== 'tenant',
      // },
    ],
    [handleRestoreOriginal, applyTheme, tenantThemes, handleApplyClick]
  );

  // CommandBar far items (right side)
  const commandBarFarItems: ICommandBarItemProps[] = useMemo(
    () => [
      {
        key: 'previewOnPage',
        text: 'Preview theme',
        iconProps: { iconName: 'View' },
        onClick: handlePreviewOnPage,
        disabled: livePreviewEnabled,
      },
      {
        key: 'livePreview',
        onRender: () => (
          <Toggle
            //label="Live Preview"
            checked={livePreviewEnabled}
            onChange={(_, checked) => setLivePreviewEnabled(checked ?? true)}
            onText="Auto"
            offText="Off "
            inlineLabel
            styles={{ root: { marginRight: 16, marginBottom: 0 } }}
          />
        ),
      },
      {
        key: 'applyTheme',
        text: 'Apply to Site',
        iconProps: { iconName: 'CheckMark' },
        onClick: handleApplyClick,
      },
      {
        key: 'export',
        text: 'Export theme',
        iconProps: { iconName: 'Download' },
        onClick: exportTheme,
      },
    ],
    [exportTheme, livePreviewEnabled, handlePreviewOnPage],
  );

  // Panel footer
  const onRenderFooterContent = useCallback(
    () => (
      <Stack horizontal tokens={{ childrenGap: 8 }}>
        <DefaultButton
          text="Copy JSON"
          iconProps={{ iconName: 'Copy' }}
          onClick={() => copyToClipboard(jsonTheme, 'JSON theme copied to clipboard')}
        />
        <DefaultButton
          text="Copy PowerShell"
          iconProps={{ iconName: 'Copy' }}
          onClick={() => copyToClipboard(powershellTheme, 'PowerShell theme copied to clipboard')}
        />
        <DefaultButton
          text="Copy Code"
          iconProps={{ iconName: 'Copy' }}
          onClick={() => copyToClipboard(themeAsCode, 'Code theme copied to clipboard')}
        />
      </Stack>
    ),
    [jsonTheme, powershellTheme, themeAsCode, copyToClipboard]
  );

  // Show loading while theme is being initialized
  if (!isInitialized || !theme) {
    return (
      <Page>
        <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: '100%' } }}>
          <Text>Loading Live Theme Designer...</Text>
        </Stack>
      </Page>
    );
  }

  // Get current themeRules for rendering
  const themeRules = themeRulesRef.current!;

  return (
    <Page>
      {/* Header with CommandBar */}
      <CommandBar
        items={commandBarItems}
        farItems={commandBarFarItems}
        styles={{
          root: {
            paddingLeft: 8,
          },
        }}
      />

      <Content>
        <Sidebar>
          <Text variant={'xLarge'} styles={{ root: { fontWeight: 600, marginLeft: 20 } }}>
            <IconButton
              disabled={false}
              checked={false}
              iconProps={{ iconName: 'Color', styles: { root: { fontSize: '20px', marginRight: 12 } } }}
              title="Colors"
              ariaLabel="Colors"
            />
            Color
          </Text>
          {/* the three base slots, prominently displayed at the top of the page */}
          <ThemeDesignerColorPicker
            color={primaryColor}
            onColorChange={onPrimaryColorPickerChange}
            label={'Primary color'}
          />
          <ThemeDesignerColorPicker
            color={textColor}
            onColorChange={onTextColorPickerChange}
            label={'Text color'}
          />
          <ThemeDesignerColorPicker
            color={backgroundColor}
            onColorChange={onBkgColorPickerChange}
            label={'Background color'}
          />
        </Sidebar>
        <Main>
          <Text variant={'xLarge'} styles={{ root: { fontWeight: 600, marginBottom: 16 } }}>
            Live Theme Designer
          </Text>
          <ThemeProvider theme={theme}>
            <Samples backgroundColor={backgroundColor.str} textColor={textColor.str} />
          </ThemeProvider>
          <AccessibilityChecker theme={theme} themeRules={themeRules} />
          <ThemeSlots
            theme={theme}
            themeRules={themeRules}
            onFabricPaletteColorChange={onFabricPaletteColorChange}
          />
        </Main>
      </Content>

      {/* Export Panel */}
      <Panel
        isOpen={isPanelOpen}
        type={PanelType.medium}
        onDismiss={() => setIsPanelOpen(false)}
        headerText="Export theme"
        closeButtonAriaLabel="Close"
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom={true}
        isLightDismiss={true}
      >
        <Text>
          This code block creates the theme you have configured using the createTheme utility function.
          Calling loadTheme with this theme will automatically apply the configured theming to any Fabric controls
          used within the same app.
        </Text>
        <Pivot styles={{ root: { marginTop: 16 } }}>
          <PivotItem headerText="Code">
            <textarea
              className={textAreaClassName}
              readOnly={true}
              spellCheck={false}
              value={themeAsCode}
            />
          </PivotItem>
          <PivotItem headerText="JSON">
            <textarea
              className={textAreaClassName}
              readOnly={true}
              spellCheck={false}
              value={jsonTheme}
            />
          </PivotItem>
          <PivotItem headerText="PowerShell">
            <textarea
              className={textAreaClassName}
              readOnly={true}
              spellCheck={false}
              value={powershellTheme}
            />
          </PivotItem>
        </Pivot>
      </Panel>

      {/* Save Theme Dialog */}
      <Dialog
        hidden={!isSaveDialogOpen}
        onDismiss={() => setIsSaveDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: isSaveAsMode ? 'Save Theme As' : 'Save Theme',
          subText: 'Enter a name for the theme',
        }}
        modalProps={{ isBlocking: true }}
      >
        <TextField
          label="Theme Name"
          value={saveThemeName}
          onChange={(_, newValue) => setSaveThemeName(newValue || '')}
          placeholder="Enter theme name"
          autoFocus
        />
        <DialogFooter>
          <PrimaryButton onClick={handleSaveDialogConfirm} text="Save" disabled={!saveThemeName.trim()} />
          <DefaultButton onClick={() => setIsSaveDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        hidden={!isDeleteDialogOpen}
        onDismiss={() => setIsDeleteDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Delete Theme',
          subText: `Are you sure you want to delete "${currentThemeName}"? This action cannot be undone.`,
        }}
        modalProps={{ isBlocking: true }}
      >
        <DialogFooter>
          <PrimaryButton onClick={handleDeleteConfirm} text="Delete" styles={{ root: { backgroundColor: '#a80000' } }} />
          <DefaultButton onClick={() => setIsDeleteDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>

      {/* Apply Theme Confirmation Dialog */}
      <Dialog
        hidden={!isApplyDialogOpen}
        onDismiss={() => setIsApplyDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Apply Theme to Site',
          subText: 'Apply the current theme colors to this site? This will change how the site looks for all users.',
        }}
        modalProps={{ isBlocking: true }}
      >
        <DialogFooter>
          <PrimaryButton onClick={handleApplyConfirm} text="Apply" />
          <DefaultButton onClick={() => setIsApplyDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>

      {/* Save Update Confirmation Dialog */}
      <Dialog
        hidden={!isSaveConfirmDialogOpen}
        onDismiss={() => setIsSaveConfirmDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Update Theme',
          subText: `Update "${currentThemeName}" with the current colors? This will overwrite the existing theme.`,
        }}
        modalProps={{ isBlocking: true }}
      >
        <DialogFooter>
          <PrimaryButton onClick={handleSaveConfirm} text="Update" />
          <DefaultButton onClick={() => setIsSaveConfirmDialogOpen(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </Page>
  );
};
