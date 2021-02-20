/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Profile } from '@microsoft/microsoft-graph-types-beta';
import { TemplateResult } from 'lit-element';
import { BasePersonCardSection } from '../BasePersonCardSection';
/**
 * The user profile subsection of the person card
 *
 * @export
 * @class MgtPersonCardProfile
 * @extends {MgtTemplatedComponent}
 */
export declare class MgtPersonCardProfile extends BasePersonCardSection {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    protected get strings(): {
        SkillsAndExperienceSectionTitle: string;
        AboutCompactSectionTitle: string;
        SkillsSubSectionTitle: string;
        LanguagesSubSectionTitle: string;
        WorkExperienceSubSectionTitle: string;
        EducationSubSectionTitle: string;
        professionalInterestsSubSectionTitle: string;
        personalInterestsSubSectionTitle: string; /**
         * The user profile subsection of the person card
         *
         * @export
         * @class MgtPersonCardProfile
         * @extends {MgtTemplatedComponent}
         */
        birthdaySubSectionTitle: string;
        currentYearSubtitle: string;
    };
    /**
     * The name for display in the overview section.
     *
     * @readonly
     * @type {string}
     * @memberof MgtPersonCardProfile
     */
    get displayName(): string;
    /**
     * Returns true if the profile contains data
     * that can be rendered
     *
     * @readonly
     * @type {boolean}
     * @memberof MgtPersonCardProfile
     */
    get hasData(): boolean;
    /**
     * The user's profile metadata
     *
     * @protected
     * @type {IProfile}
     * @memberof MgtPersonCardProfile
     */
    protected get profile(): Profile;
    protected set profile(value: Profile);
    private _profile;
    private _personalInterests;
    private _professionalInterests;
    private _birthdayAnniversary;
    constructor(profile: Profile);
    /**
     * Render the icon for display in the navigation ribbon.
     *
     * @returns {TemplateResult}
     * @memberof MgtPersonCardProfile
     */
    renderIcon(): TemplateResult;
    /**
     * Reset any state in the section
     *
     * @protected
     * @memberof MgtPersonCardProfile
     */
    clearState(): void;
    /**
     * Render the compact view
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardProfile
     */
    protected renderCompactView(): TemplateResult;
    /**
     * Render the full view
     *
     * @protected
     * @returns
     * @memberof MgtPersonCardProfile
     */
    protected renderFullView(): TemplateResult;
    /**
     * Renders all subSections of the profile
     * Defines order of how they render
     *
     * @protected
     * @return {*}
     * @memberof MgtPersonCardProfile
     */
    protected renderSubSections(): TemplateResult[];
    /**
     * Render the user's known languages
     *
     * @protected
     * @returns
     * @memberof MgtPersonCardProfile
     */
    protected renderLanguages(): TemplateResult;
    /**
     * Render the user's skills
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardProfile
     */
    protected renderSkills(): TemplateResult;
    /**
     * Render the user's work experience timeline
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardProfile
     */
    protected renderWorkExperience(): TemplateResult;
    /**
     * Render the user's education timeline
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardProfile
     */
    protected renderEducation(): TemplateResult;
    /**
     * Render the user's professional interests
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardProfile
     */
    protected renderProfessionalInterests(): TemplateResult;
    /**
     * Render the user's personal interests
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardProfile
     */
    protected renderPersonalInterests(): TemplateResult;
    /**
     * Render the user's birthday
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardProfile
     */
    protected renderBirthday(): TemplateResult;
    private isPersonalInterest;
    private isProfessionalInterest;
    private isBirthdayAnniversary;
    private getDisplayDate;
    private getDisplayDateRange;
    private initPostRenderOperations;
    private handleTokenOverflow;
}
//# sourceMappingURL=mgt-person-card-profile.d.ts.map