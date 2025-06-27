/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { PropertyValueMap, TemplateResult } from 'lit';
import { MgtTemplatedTaskComponent } from '@microsoft/mgt-element';
import '../../styles/style-helper';
export declare const registerMgtPickerComponent: () => void;
/**
 * Web component that allows a single entity pick from a generic endpoint from Graph. Is a thin wrapper over mgt-get.
 * Does not load any state itself, only received state from mgt-get via events.
 *
 * @fires {CustomEvent<any>} selectionChanged - Fired when an option is clicked/selected
 * @export
 * @class MgtPicker
 * @extends {MgtTemplatedTaskComponent}
 *
 * @fires {CustomEvent<undefined>} updated - Fired when the component is updated
 *
 * @cssprop --picker-background-color - {Color} Picker component background color
 * @cssprop --picker-list-max-height - {String} max height for options list. Default value is 380px.
 */
export declare class MgtPicker extends MgtTemplatedTaskComponent {
    protected get strings(): {
        comboboxPlaceholder: string;
    };
    static get styles(): import("lit").CSSResult[];
    /**
     * The resource to get
     *
     * @type {string}
     * @memberof MgtPicker
     */
    resource: string;
    /**
     * Api version to use for request
     *
     * @type {string}
     * @memberof MgtPicker
     */
    version: string;
    /**
     * Maximum number of pages to get for the resource
     * default = 3
     * if <= 0, all pages will be fetched
     *
     * @type {number}
     * @memberof MgtPicker
     */
    maxPages: number;
    /**
     * A placeholder for the picker
     *
     * @type {string}
     * @memberof MgtPicker
     */
    placeholder: string;
    /**
     * Key to be rendered in the picker
     *
     * @type {string}
     * @memberof MgtPicker
     */
    keyName: string;
    /**
     * Entity to be rendered in the picker
     *
     * @type {string}
     * @memberof MgtPicker
     */
    entityType: string;
    /**
     * The scopes to request
     *
     * @type {string[]}
     * @memberof MgtPicker
     */
    scopes: string[];
    /**
     * Enables cache on the response from the specified resource
     * default = false
     *
     * @type {boolean}
     * @memberof MgtPicker
     */
    cacheEnabled: boolean;
    /**
     * Invalidation period of the cache for the responses in milliseconds
     *
     * @type {number}
     * @memberof MgtPicker
     */
    cacheInvalidationPeriod: number;
    /**
     * Sets the currently selected value for the picker
     * Must be present as an option in the supplied data returned from the the underlying graph query
     *
     * @type {string}
     * @memberof MgtPicker
     */
    selectedValue: string;
    private response;
    constructor();
    /**
     * Refresh the data
     *
     * @param {boolean} [hardRefresh=false]
     * if false (default), the component will only update if the data changed
     * if true, the data will be first cleared and reloaded completely
     * @memberof MgtPicker
     */
    refresh(hardRefresh?: boolean): void;
    /**
     * Clears the state of the component
     *
     * @protected
     * @memberof MgtPicker
     */
    protected clearState(): void;
    renderLoading: () => TemplateResult;
    /**
     * Invoked on each update to perform rendering the picker. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    renderContent: () => TemplateResult;
    /**
     * Render picker.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPicker
     */
    protected renderPicker(): TemplateResult;
    private getNestedPropertyValue;
    /**
     * Renders mgt-get which does a GET request to the resource.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPicker
     */
    protected renderGet(): TemplateResult;
    /**
     * When the component is first updated wire up the event listeners.
     * @param changedProperties a map of changed properties with old values
     */
    protected firstUpdated(changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>): void;
    private handleDataChange;
    private handleClick;
    /**
     * Handles getting the fluent option item in the dropdown and fires a custom
     * event with it when you press Enter or Backspace keys.
     *
     * @param {KeyboardEvent} e
     */
    private readonly handleComboboxKeydown;
}
//# sourceMappingURL=mgt-picker.d.ts.map