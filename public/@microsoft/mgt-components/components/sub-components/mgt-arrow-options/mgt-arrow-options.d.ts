/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtBaseComponent } from '@microsoft/mgt-element';
/**
 * Custom Component used to handle an arrow rendering for TaskGroups utilized in the task component.
 *
 * @cssprop --arrow-options-left {Length} The distance of the dropdown menu from the left in absolute position. Default is 0.
 * @cssprop --arrow-options-button-background-color {Color} The background color of the arrow options button.
 * @cssprop --arrow-options-button-font-size {Length} The font size of the button text. Default is large.
 * @cssprop --arrow-options-button-font-weight {Length} The font weight of the button text. Default is 600.
 * @cssprop --arrow-options-button-font-color {Color} The font color of the text in the button.
 *
 * @export MgtArrowOptions
 * @class MgtArrowOptions
 * @extends {MgtBaseComponent}
 */
export declare class MgtArrowOptions extends MgtBaseComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * user the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    /**
     * Determines if header menu is rendered or hidden.
     *
     * @type {boolean}
     * @memberof MgtArrowOptions
     */
    open: boolean;
    /**
     * Title of chosen TaskGroup.
     *
     * @type {string}
     * @memberof MgtArrowOptions
     */
    value: string;
    /**
     * Menu options to be rendered with an attached UIEvent handler for expansion of details
     *
     * @type {object}
     * @memberof MgtArrowOptions
     */
    options: Record<string, (e: UIEvent) => void>;
    private readonly _clickHandler;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Handles clicking for header menu, utilizing boolean switch open
     *
     * @param {MouseEvent} e attaches to Header to open menu
     * @memberof MgtArrowOptions
     */
    onHeaderClick: (e: MouseEvent) => void;
    /**
     * Handles key down presses done on the header element.
     *
     * @param {KeyboardEvent} e
     */
    private readonly onHeaderKeyDown;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    render(): import("lit-html").TemplateResult<1>;
    private getMenuOptions;
}
//# sourceMappingURL=mgt-arrow-options.d.ts.map