/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { User } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit';
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
 * @class MgtContact
 * @extends {MgtTemplatedComponent}
 */
export declare class MgtContact extends BasePersonCardSection {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
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
    private readonly _person?;
    private readonly _contactParts;
    constructor(person: User);
    /**
     * The name for display in the overview section.
     *
     * @readonly
     * @type {string}
     * @memberof MgtContact
     */
    get displayName(): string;
    /**
     * The title for display when rendered as a full card.
     *
     * @readonly
     * @type {string}
     * @memberof MgtContact
     */
    get cardTitle(): string;
    /**
     * Render the icon for display in the navigation ribbon.
     *
     * @returns {TemplateResult}
     * @memberof MgtContact
     */
    renderIcon(): TemplateResult;
    /**
     * Reset any state in the section
     *
     * @protected
     * @memberof MgtContact
     */
    clearState(): void;
    /**
     * Render the compact view
     *
     * @returns {TemplateResult}
     * @memberof MgtContact
     */
    protected renderCompactView(): TemplateResult;
    /**
     * Render the full view
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtContact
     */
    protected renderFullView(): TemplateResult;
    /**
     * Render a specific contact part
     *
     * @protected
     * @param {IContactPart} part
     * @returns {TemplateResult}
     * @memberof MgtContact
     */
    protected renderContactPart(part: IContactPart): TemplateResult;
    /**
     * Handle the click event for contact parts
     *
     * @protected
     * @memberof MgtContact
     */
    protected handlePartClick(e: MouseEvent, value: string): void;
    private sendLink;
    /**
     * Send a chat message to the user
     *
     * @protected
     * @memberof MgtContact
     */
    protected sendChat(upn: string): void;
    /**
     * Send an email to the user
     *
     * @protected
     * @memberof MgtContact
     */
    protected sendEmail(email: string): void;
    /**
     * Send a call to the user
     *
     * @protected
     * @memberof MgtContact
     */
    protected sendCall: (phone: string) => void;
}
export {};
//# sourceMappingURL=mgt-contact.d.ts.map