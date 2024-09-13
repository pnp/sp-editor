/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
export type ThemeToggleProps = {
    darkModeActive?: boolean;
    darkmodechanged?: (e: CustomEvent<boolean>) => void;
};
export declare const ThemeToggle: import("react").ForwardRefExoticComponent<ThemeToggleProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=theme-toggle.d.ts.map