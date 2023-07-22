/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Message } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit';
import { BasePersonCardSection } from '../BasePersonCardSection';
/**
 * The email messages subsection of the person card
 *
 * @export
 * @class MgtMessages
 * @extends {MgtTemplatedComponent}
 */
export declare class MgtMessages extends BasePersonCardSection {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    protected get strings(): {
        emailsSectionTitle: string;
    };
    private _messages;
    constructor(messages: Message[]);
    /**
     * The name for display in the overview section.
     *
     * @readonly
     * @type {string}
     * @memberof MgtMessages
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
     * Reset any state in the section
     *
     * @protected
     * @memberof MgtMessages
     */
    clearState(): void;
    /**
     * Render the icon for display in the navigation ribbon.
     *
     * @returns {TemplateResult}
     * @memberof MgtMessages
     */
    renderIcon(): TemplateResult;
    /**
     * Render the compact view
     *
     * @returns {TemplateResult}
     * @memberof MgtMessages
     */
    renderCompactView(): TemplateResult;
    /**
     * Render the full view
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtMessages
     */
    protected renderFullView(): TemplateResult;
    /**
     * Render a message item
     *
     * @protected
     * @param {IMessage} message
     * @returns {TemplateResult}
     * @memberof MgtMessages
     */
    protected renderMessage(message: Message): TemplateResult;
    private handleMessageClick;
}
//# sourceMappingURL=mgt-messages.d.ts.map