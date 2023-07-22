/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * Available predefined themes
 */
type Theme = 'light' | 'dark' | 'default' | 'contrast';
/**
 * Helper function to apply fluent ui theme to an element
 *
 * @export
 * @param {Theme} theme - theme name, if an unknown theme is provided, the light theme will be applied
 * @param {HTMLElement} [element=document.body]
 */
export declare const applyTheme: (theme: Theme, element?: HTMLElement) => void;
export {};
//# sourceMappingURL=theme-manager.d.ts.map