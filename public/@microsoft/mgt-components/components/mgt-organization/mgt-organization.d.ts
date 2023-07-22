/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { User } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit';
import { BasePersonCardSection } from '../BasePersonCardSection';
import { MgtPersonCardState } from '../mgt-person-card/mgt-person-card.types';
/**
 * The member organization subsection of the person card
 *
 * @export
 * @class MgtOrganization
 * @extends {MgtTemplatedComponent}
 */
export declare class MgtOrganization extends BasePersonCardSection {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
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
     * @memberof MgtOrganization
     */
    get displayName(): string;
    /**
     * The title for display when rendered as a full card.
     *
     * @readonly
     * @type {string}
     * @memberof MgtOrganization
     */
    get cardTitle(): string;
    /**
     * Render the icon for display in the navigation ribbon.
     *
     * @returns {TemplateResult}
     * @memberof MgtOrganization
     */
    renderIcon(): TemplateResult;
    /**
     * Render the compact view
     *
     * @returns {TemplateResult}
     * @memberof MgtOrganization
     */
    protected renderCompactView(): TemplateResult;
    /**
     * Render the full view
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtOrganization
     */
    protected renderFullView(): TemplateResult;
    /**
     * Render a manager org member
     *
     * @protected
     * @param {User} person
     * @returns {TemplateResult}
     * @memberof MgtOrganization
     */
    protected renderManager(person: User): TemplateResult;
    /**
     * Render a manager org member
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtOrganization
     */
    protected renderManagers(): TemplateResult[];
    /**
     * Render a direct report
     *
     * @protected
     * @param {User} person
     * @returns {TemplateResult}
     * @memberof MgtOrganization
     */
    protected renderDirectReports(): TemplateResult;
    /**
     * Render direct reports in compact view
     *
     * @protected
     * @param {User} person
     * @returns {TemplateResult}
     * @memberof MgtOrganization
     */
    protected renderCompactDirectReports(): TemplateResult;
    /**
     * Render the user/self member
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtOrganization
     */
    protected renderCurrentUser(): TemplateResult;
    /**
     * Render a coworker org member
     *
     * @protected
     * @param {User} person
     * @returns {TemplateResult}
     * @memberof MgtOrganization
     */
    protected renderCoworker(person: User): TemplateResult;
    /**
     * Render a coworker org member
     *
     * @protected
     * @param {User} person
     * @returns {TemplateResult}
     * @memberof MgtOrganization
     */
    protected renderCoworkers(): TemplateResult;
}
//# sourceMappingURL=mgt-organization.d.ts.map