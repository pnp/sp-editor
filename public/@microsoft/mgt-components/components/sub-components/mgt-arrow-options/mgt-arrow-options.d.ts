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
 * @export MgtArrowOptions
 * @class MgtArrowOptions
 * @extends {MgtBaseComponent}
 */
export declare class MgtArrowOptions extends MgtBaseComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * user the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
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
     * Menu options to be rendered with an attached MouseEvent handler for expansion of details
     *
     * @type {object}
     * @memberof MgtArrowOptions
     */
    options: {
        [name: string]: (e: MouseEvent) => any | void;
    };
    private _clickHandler;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Handles clicking for header menu, utilizing boolean switch open
     *
     * @param {MouseEvent} e attaches to Header to open menu
     * @memberof MgtArrowOptions
     */
    onHeaderClick(e: MouseEvent): void;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    render(): import("lit-element").TemplateResult;
    private getMenuOptions;
}
//# sourceMappingURL=mgt-arrow-options.d.ts.map