/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { User } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit-element';
import { BasePersonCardSection } from '../BasePersonCardSection';
import { MgtPersonCardState } from '../../mgt-person-card.types';
/**
 * The member organization subsection of the person card
 *
 * @export
 * @class MgtPersonCardProfile
 * @extends {MgtTemplatedComponent}
 */
export declare class MgtPersonCardOrganization extends BasePersonCardSection {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    /**
     * returns component strings
     *
     * @readonly
     * @protected
     * @memberof MgtBaseComponent
     */
    protected get strings(): {
        reportsToSectionTitle: string;
        directReportsSectionTitle: string;
        organizationSectionTitle: string;
        youWorkWithSubSectionTitle: string;
        userWorksWithSubSectionTitle: string;
    };
    private _state;
    private _me;
    constructor(state: MgtPersonCardState, me: User);
    /**
     * Reset any state in the section
     *
     * @protected
     * @memberof MgtPersonCardMessages
     */
    clearState(): void;
    /**
     * The name for display in the overview section.
     *
     * @readonly
     * @type {string}
     * @memberof MgtPersonCardOrganization
     */
    get displayName(): string;
    /**
     * Render the icon for display in the navigation ribbon.
     *
     * @returns {TemplateResult}
     * @memberof MgtPersonCardOrganization
     */
    renderIcon(): TemplateResult;
    /**
     * Render the compact view
     *
     * @returns {TemplateResult}
     * @memberof MgtPersonCardOrganization
     */
    protected renderCompactView(): TemplateResult;
    /**
     * Render the full view
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardOrganization
     */
    protected renderFullView(): TemplateResult;
    /**
     * Render a manager org member
     *
     * @protected
     * @param {User} person
     * @returns {TemplateResult}
     * @memberof MgtPersonCardOrganization
     */
    protected renderManager(person: User): TemplateResult;
    /**
     * Render a manager org member
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardOrganization
     */
    protected renderManagers(): TemplateResult[];
    /**
     * Render a direct report
     *
     * @protected
     * @param {User} person
     * @returns {TemplateResult}
     * @memberof MgtPersonCardOrganization
     */
    protected renderDirectReports(): TemplateResult;
    /**
     * Render direct reports in compact view
     *
     * @protected
     * @param {User} person
     * @returns {TemplateResult}
     * @memberof MgtPersonCardOrganization
     */
    protected renderCompactDirectReports(): TemplateResult;
    /**
     * Render the user/self member
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardOrganization
     */
    protected renderCurrentUser(): TemplateResult;
    /**
     * Render a coworker org member
     *
     * @protected
     * @param {User} person
     * @returns {TemplateResult}
     * @memberof MgtPersonCardOrganization
     */
    protected renderCoworker(person: User): TemplateResult;
    /**
     * Render a coworker org member
     *
     * @protected
     * @param {User} person
     * @returns {TemplateResult}
     * @memberof MgtPersonCardOrganization
     */
    protected renderCoworkers(): TemplateResult;
}
//# sourceMappingURL=mgt-person-card-organization.d.ts.map