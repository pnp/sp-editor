/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Profile } from '@microsoft/microsoft-graph-types-beta';
import { TemplateResult } from 'lit';
import { BasePersonCardSection } from '../BasePersonCardSection';
/**
 * The user profile subsection of the person card
 *
 * @export
 * @class MgtProfile
 * @extends {MgtTemplatedComponent}
 *
 * @cssprop --token-overflow-color - {Color} Color of the text showing more undisplayed values i.e. +3 more
 */
export declare class MgtProfile extends BasePersonCardSection {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    protected get strings(): {
        SkillsAndExperienceSectionTitle: string;
        AboutCompactSectionTitle: string;
        SkillsSubSectionTitle: string;
        LanguagesSubSectionTitle: string;
        WorkExperienceSubSectionTitle: string;
        EducationSubSectionTitle: string;
        professionalInterestsSubSectionTitle: string;
        personalInterestsSubSectionTitle: string;
        birthdaySubSectionTitle: string;
        currentYearSubtitle: string;
        socialMediaSubSectionTitle: string;
    };
    /**
     * The name for display in the overview section.
     *
     * @readonly
     * @type {string}
     * @memberof MgtProfile
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
     * Returns true if the profile contains data
     * that can be rendered
     *
     * @readonly
     * @type {boolean}
     * @memberof MgtProfile
     */
    get hasData(): boolean;
    /**
     * The user's profile metadata
     *
     * @protected
     * @type {IProfile}
     * @memberof MgtProfile
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
     * @memberof MgtProfile
     */
    renderIcon(): TemplateResult;
    /**
     * Reset any state in the section
     *
     * @protected
     * @memberof MgtProfile
     */
    clearState(): void;
    /**
     * Render the compact view
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtProfile
     */
    protected renderCompactView(): TemplateResult;
    /**
     * Render the full view
     *
     * @protected
     * @returns
     * @memberof MgtProfile
     */
    protected renderFullView(): TemplateResult<1>;
    /**
     * Renders all subSections of the profile
     * Defines order of how they render
     *
     * @protected
     * @return {*}
     * @memberof MgtProfile
     */
    protected renderSubSections(): TemplateResult[];
    /**
     * Render the user's known languages
     *
     * @protected
     * @returns
     * @memberof MgtProfile
     */
    protected renderLanguages(): TemplateResult;
    /**
     * Render the user's skills
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtProfile
     */
    protected renderSkills(): TemplateResult;
    /**
     * Render the user's work experience timeline
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtProfile
     */
    protected renderWorkExperience(): TemplateResult;
    /**
     * Render the user's education timeline
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtProfile
     */
    protected renderEducation(): TemplateResult;
    /**
     * Render the user's professional interests
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtProfile
     */
    protected renderProfessionalInterests(): TemplateResult;
    /**
     * Render the user's personal interests
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtProfile
     */
    protected renderPersonalInterests(): TemplateResult;
    /**
     * Render the user's birthday
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtProfile
     */
    protected renderBirthday(): TemplateResult;
    private readonly isPersonalInterest;
    private readonly isProfessionalInterest;
    private readonly isBirthdayAnniversary;
    private getDisplayDate;
    private getDisplayDateRange;
    private displayLocation;
    private initPostRenderOperations;
    private handleTokenOverflow;
}
//# sourceMappingURL=mgt-profile.d.ts.map