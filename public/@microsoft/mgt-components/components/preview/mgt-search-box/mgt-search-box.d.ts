/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { CSSResult, TemplateResult } from 'lit';
import { MgtBaseComponent } from '@microsoft/mgt-element';
/**
 * **Preview component** Web component used to enter a search value to power search scenarios.
 * Component may change before general availability release.
 *
 * @fires {CustomEvent<string>} searchTermChanged - Fired when the search term is changed
 *
 * @class MgtSearchBox
 * @extends {MgtBaseComponent}
 */
export declare class MgtSearchBox extends MgtBaseComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * user the `css` tag function.
     */
    static get styles(): CSSResult[];
    /**
     * Provides strings for localization
     *
     * @readonly
     * @protected
     * @memberof MgtSearchBox
     */
    protected get strings(): {
        placeholder: string;
        title: string;
    };
    /**
     * The placeholder rendered in the search input (for example, `Select a user` or `Select a task list`).
     *
     * @type {string}
     * @memberof MgtSearchBox
     */
    placeholder: string;
    /**
     * Value of the search term
     *
     * @type {string}
     * @memberof MgtSearchBox
     */
    get searchTerm(): string;
    set searchTerm(value: string);
    /**
     * Debounce delay of the search input in milliseconds
     *
     * @type {number}
     * @memberof MgtSearchBox
     */
    debounceDelay: number;
    private _searchTerm;
    private debouncedSearchTermChanged;
    constructor();
    /**
     * Renders the component
     *
     * @return {TemplateResult}
     * @memberof MgtSearchBox
     */
    render(): TemplateResult;
    private readonly onInputChanged;
    /**
     * Fires and debounces the custom event to listeners
     */
    private fireSearchTermChanged;
}
//# sourceMappingURL=mgt-search-box.d.ts.map