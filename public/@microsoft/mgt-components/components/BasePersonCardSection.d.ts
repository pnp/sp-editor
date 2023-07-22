/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import { TemplateResult } from 'lit';
import { IDynamicPerson } from '../graph/types';
import './sub-components/mgt-spinner/mgt-spinner';
/**
 * Defines the interface for a person card section.
 * This allows us to avoid forced inheritance and allow for more flexibility in the future.
 */
export interface CardSection {
    readonly cardTitle: string;
    tagName: string;
    asCompactView(): CardSection;
    asFullView(): CardSection;
    renderIcon(): TemplateResult;
}
/**
 * A base class for building person card subsections.
 *
 * @export
 * @class BasePersonCardSection
 * @extends {MgtTemplatedComponent}
 */
export declare abstract class BasePersonCardSection extends MgtTemplatedComponent implements CardSection {
    /**
     * Set the person details to render
     *
     * @type {IDynamicPerson}
     * @memberof BasePersonCardSection
     */
    get personDetails(): IDynamicPerson;
    set personDetails(value: IDynamicPerson);
    /**
     * The name for display in the overview section.
     *
     * @abstract
     * @type {string}
     * @memberof BasePersonCardSection
     */
    abstract get displayName(): string;
    /**
     * The title for using when rendering the full card.
     *
     * @readonly
     * @abstract
     * @memberof BasePersonCardSection
     */
    abstract get cardTitle(): string;
    /**
     * Determines the appropriate view state: full or compact
     *
     * @protected
     * @type {boolean}
     * @memberof BasePersonCardSection
     */
    protected get isCompact(): boolean;
    private _isCompact;
    private _personDetails;
    constructor();
    /**
     * Render the icon for display in the navigation ribbon.
     *
     * @protected
     * @abstract
     * @returns {TemplateResult}
     * @memberof BasePersonCardSection
     */
    abstract renderIcon(): TemplateResult;
    /**
     * Set the section to compact view mode
     *
     * @returns
     * @memberof BasePersonCardSection
     */
    asCompactView(): this;
    /**
     * Set the section to full view mode
     *
     * @returns
     * @memberof BasePersonCardSection
     */
    asFullView(): this;
    /**
     * Reset any state in the section
     *
     * @protected
     * @abstract
     * @memberof BasePersonCardSection
     */
    protected clearState(): void;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    protected render(): TemplateResult;
    /**
     * Render a spinner while the component loads state
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof BasePersonCardSection
     */
    protected renderLoading(): TemplateResult;
    /**
     * Render the section in a empty data state
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardContact
     */
    protected renderNoData(): TemplateResult;
    /**
     * Render the compact view
     *
     * @protected
     * @abstract
     * @returns {TemplateResult}
     * @memberof BasePersonCardSection
     */
    protected abstract renderCompactView(): TemplateResult;
    /**
     * Render the full view
     *
     * @protected
     * @abstract
     * @returns {TemplateResult}
     * @memberof BasePersonCardSection
     */
    protected abstract renderFullView(): TemplateResult;
    /**
     * Navigate the card to a different user.
     *
     * @protected
     * @memberof BasePersonCardSection
     */
    protected navigateCard(person: IDynamicPerson): void;
}
//# sourceMappingURL=BasePersonCardSection.d.ts.map