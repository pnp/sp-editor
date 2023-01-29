/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { User } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit-element';
import { BasePersonCardSection } from '../BasePersonCardSection';
/**
 * Represents a contact part and its metadata
 *
 * @interface IContactPart
 */
interface IContactPart {
    icon: TemplateResult;
    title: string;
    value?: string;
    onClick?: (e: Event) => void;
    showCompact: boolean;
}
/**
 * The contact details subsection of the person card
 *
 * @export
 * @class MgtPersonCardProfile
 * @extends {MgtTemplatedComponent}
 */
export declare class MgtPersonCardContact extends BasePersonCardSection {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    protected get strings(): {
        contactSectionTitle: string;
        emailTitle: string;
        chatTitle: string;
        businessPhoneTitle: string;
        cellPhoneTitle: string;
        departmentTitle: string;
        titleTitle: string;
        officeLocationTitle: string;
        copyToClipboardButton: string;
    };
    /**
     * Returns true if the component has data it can render
     *
     * @readonly
     * @abstract
     * @type {boolean}
     * @memberof BasePersonCardSection
     */
    get hasData(): boolean;
    private _person?;
    private _contactParts;
    constructor(person: User);
    /**
     * The name for display in the overview section.
     *
     * @readonly
     * @type {string}
     * @memberof MgtPersonCardContact
     */
    get displayName(): string;
    /**
     * Render the icon for display in the navigation ribbon.
     *
     * @returns {TemplateResult}
     * @memberof MgtPersonCardContact
     */
    renderIcon(): TemplateResult;
    /**
     * Reset any state in the section
     *
     * @protected
     * @memberof MgtPersonCardContact
     */
    clearState(): void;
    /**
     * Render the compact view
     *
     * @returns {TemplateResult}
     * @memberof MgtPersonCardContact
     */
    protected renderCompactView(): TemplateResult;
    /**
     * Render the full view
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardContact
     */
    protected renderFullView(): TemplateResult;
    /**
     * Render a specific contact part
     *
     * @protected
     * @param {IContactPart} part
     * @returns {TemplateResult}
     * @memberof MgtPersonCardContact
     */
    protected renderContactPart(part: IContactPart): TemplateResult;
    /**
     * Handle the click event for contact parts
     *
     * @protected
     * @memberof MgtPersonCardContact
     */
    protected handlePartClick(e: MouseEvent, value: string): void;
    private sendLink;
    /**
     * Send a chat message to the user
     *
     * @protected
     * @memberof MgtPersonCardContact
     */
    protected sendChat(upn: string): void;
    /**
     * Send an email to the user
     *
     * @protected
     * @memberof MgtPersonCardContact
     */
    protected sendEmail(email: string): void;
    /**
     * Send a call to the user
     *
     * @protected
     * @memberof MgtPersonCardContact
     */
    protected sendCall: (phone: string) => void;
}
export {};
//# sourceMappingURL=mgt-person-card-contact.d.ts.map