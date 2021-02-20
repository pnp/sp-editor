/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Message } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit-element';
import { BasePersonCardSection } from '../BasePersonCardSection';
/**
 * The email messages subsection of the person card
 *
 * @export
 * @class MgtPersonCardMessages
 * @extends {MgtTemplatedComponent}
 */
export declare class MgtPersonCardMessages extends BasePersonCardSection {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
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
     * @memberof MgtPersonCardMessages
     */
    get displayName(): string;
    /**
     * Reset any state in the section
     *
     * @protected
     * @memberof MgtPersonCardMessages
     */
    clearState(): void;
    /**
     * Render the icon for display in the navigation ribbon.
     *
     * @returns {TemplateResult}
     * @memberof MgtPersonCardMessages
     */
    renderIcon(): TemplateResult;
    /**
     * Render the compact view
     *
     * @returns {TemplateResult}
     * @memberof MgtPersonCardMessages
     */
    renderCompactView(): TemplateResult;
    /**
     * Render the full view
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardMessages
     */
    protected renderFullView(): TemplateResult;
    /**
     * Render a message item
     *
     * @protected
     * @param {IMessage} message
     * @returns {TemplateResult}
     * @memberof MgtPersonCardMessages
     */
    protected renderMessage(message: Message): TemplateResult;
    private handleMessageClick;
}
//# sourceMappingURL=mgt-person-card-messages.d.ts.map