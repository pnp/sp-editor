/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import type * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { Position } from '../../graph/types';
import { TemplateResult } from 'lit';
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import '../../styles/style-helper';
/**
 * Web component that can query the Microsoft Graph API for Taxonomy
 * and render a dropdown control with terms,
 * allowing selection of a single term based on
 * the specified term set id or a combination of the specified term set id and the specified term id.
 * Uses mgt-get.
 *
 * @fires {CustomEvent<MicrosoftGraph.TermStore.Term>} selectionChanged - Fired when an option is clicked/selected
 * @export
 * @class MgtTaxonomyPicker
 * @extends {MgtTemplatedComponent}
 *
 * @cssprop --taxonomy-picker-background-color - {Color} Picker component background color
 * @cssprop --taxonomy-picker-list-max-height - {String} max height for options list. Default value is 380px.
 * @cssprop --taxonomy-picker-placeholder-color - {Color} Text color for the placeholder in the picker
 * @cssprop --taxonomy-picker-placeholder-hover-color - {Color} Text color for the placeholder in the picker on hover
 */
export declare class MgtTaxonomyPicker extends MgtTemplatedComponent {
    /**
     * The strings to be used for localizing the component.
     *
     * @readonly
     * @protected
     * @memberof MgtTaxonomyPicker
     */
    protected get strings(): {
        termsetIdRequired: string;
        noTermsFound: string;
        comboboxPlaceholder: string;
        loadingMessage: string;
    };
    static get styles(): import("lit").CSSResult[];
    /**
     * The termsetId of the term set whose children to get.
     *
     * @type {string}
     * @memberof MgtTaxonomyPicker
     */
    termsetId: string;
    /**
     * The termId of the term whose children to get. This term must be a child of the term set specified by termsetId.
     *
     * @type {string}
     * @memberof MgtTaxonomyPicker
     */
    termId: string;
    /**
     * The id of the site where the termset is located. If not specified, the termset is assumed to be at the tenant level.
     *
     * @type {string}
     * @memberof MgtTaxonomyPicker
     */
    siteId: string;
    /**
     * The locale based on which the term names should be returned.
     *
     * @type {string}
     * @memberof MgtTaxonomyPicker
     */
    locale: string;
    /**
     * Api version to use for request.
     * Default is beta.
     *
     * @type {string}
     * @memberof MgtTaxonomyPicker
     */
    version: string;
    /**
     * A placeholder for the picker.
     *
     * @type {string}
     * @memberof MgtTaxonomyPicker
     */
    placeholder: string;
    /**
     * The position of the dropdown. Can be 'above' or 'below'.
     *
     * @type {string}
     * @memberof MgtTaxonomyPicker
     */
    position: Position;
    /**
     * The default selected term id.
     *
     * @type {string}
     * @memberof MgtTaxonomyPicker
     */
    get defaultSelectedTermId(): string;
    set defaultSelectedTermId(value: string);
    /**
     * The selected term.
     *
     * @type {MicrosoftGraph.TermStore.Term}
     * @memberof MgtTaxonomyPicker
     */
    get selectedTerm(): MicrosoftGraph.TermStore.Term;
    set selectedTerm(value: MicrosoftGraph.TermStore.Term);
    /**
     * Determines whether component should be disabled or not
     *
     * @type {boolean}
     * @memberof MgtPeoplePicker
     */
    disabled: boolean;
    /**
     * Enables cache on the response from the specified resource.
     * Default is false.
     *
     * @type {boolean}
     * @memberof MgtTaxonomyPicker
     */
    cacheEnabled: boolean;
    /**
     * Invalidation period of the cache for the responses in milliseconds.
     *
     * @type {number}
     * @memberof MgtTaxonomyPicker
     */
    cacheInvalidationPeriod: number;
    private isRefreshing;
    private _selectedTerm;
    private _defaultSelectedTermId;
    private terms;
    private noTerms;
    constructor();
    /**
     * Refresh the data
     *
     * @param {boolean} [hardRefresh=false]
     * if false (default), the component will only update if the data changed
     * if true, the data will be first cleared and reloaded completely
     * @memberof MgtTaxonomyPicker
     */
    refresh(hardRefresh?: boolean): void;
    /**
     * Clears the state of the component
     *
     * @protected
     * @memberof MgtTaxonomyPicker
     */
    protected clearState(): void;
    /**
     * Invoked on each update to perform rendering the picker. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    render(): TemplateResult;
    /**
     * Renders loading spinner while terms are fetched from the Graph
     *
     * @protected
     * @returns
     * @memberof MgtTaxonomyPicker
     */
    protected renderLoading(): TemplateResult;
    /**
     * Render the no-data state.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtTaxonomyPicker
     */
    protected renderError(): TemplateResult;
    /**
     * Render the no-data state.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtTaxonomyPicker
     */
    protected renderNoData(): TemplateResult;
    /**
     * Render picker.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtTaxonomyPicker
     */
    protected renderTaxonomyPicker(): TemplateResult;
    /**
     * Render picker item.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtTaxonomyPicker
     */
    protected renderTaxonomyPickerItem(term: MicrosoftGraph.TermStore.Term): TemplateResult;
    /**
     * Render picker.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtTaxonomyPicker
     */
    protected renderGet(): TemplateResult;
    /**
     * load state into the component.
     *
     * @protected
     * @returns
     * @memberof MgtTaxonomyPicker
     */
    protected loadState(): Promise<void>;
    private handleDataChange;
    private handleClick;
}
//# sourceMappingURL=mgt-taxonomy-picker.d.ts.map