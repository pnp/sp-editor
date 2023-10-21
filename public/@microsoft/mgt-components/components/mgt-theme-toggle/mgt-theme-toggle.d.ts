/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { TemplateResult } from 'lit';
import { MgtBaseComponent } from '@microsoft/mgt-element';
/**
 * Toggle to switch between light and dark mode
 * Will detect browser preference and set accordingly or dark mode can be forced
 *
 * @fires {CustomEvent<boolean>} darkmodechanged - Fired when dark mode is toggled by a user action
 *
 * @class MgtDarkToggle
 * @extends {MgtBaseComponent}
 */
export declare class MgtThemeToggle extends MgtBaseComponent {
    constructor();
    /**
     * Provides strings for localization
     *
     * @readonly
     * @protected
     * @memberof MgtDarkToggle
     */
    protected get strings(): {
        label: string;
        on: string;
        off: string;
    };
    /**
     * Controls whether dark mode is active
     *
     * @type {boolean}
     * @memberof MgtDarkToggle
     */
    darkModeActive: boolean;
    /**
     * Fires after a component is updated.
     * Allows a component to trigger side effects after updating.
     *
     * @param {Map<string, any>} changedProperties
     * @memberof MgtDarkToggle
     */
    updated(changedProperties: Map<string, unknown>): void;
    /**
     * renders the component
     *
     * @return {TemplateResult}
     * @memberof MgtDarkToggle
     */
    render(): TemplateResult;
    private readonly onSwitchChanged;
    private applyTheme;
}
//# sourceMappingURL=mgt-theme-toggle.d.ts.map