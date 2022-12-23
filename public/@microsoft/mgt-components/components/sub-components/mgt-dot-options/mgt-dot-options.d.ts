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
 * @export MgtDotOptions
 * @class MgtDotOptions
 * @extends {MgtBaseComponent}
 */
export declare class MgtDotOptions extends MgtBaseComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * user the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    /**
     * Determines if header menu is rendered or hidden.
     *
     * @type {boolean}
     * @memberof MgtDotOptions
     */
    open: boolean;
    /**
     * Menu options to be rendered with an attached MouseEvent handler for expansion of details
     *
     * @memberof MgtDotOptions
     */
    options: {
        [option: string]: (e: Event) => void | any;
    };
    private _clickHandler;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    render(): import("lit-element").TemplateResult;
    /**
     * Used by the render method to attach click handler to each dot item
     *
     * @param {string} name
     * @param {((e: Event) => void | any)} click
     * @returns
     * @memberof MgtDotOptions
     */
    getMenuOption(name: string, click: (e: Event) => void | any): import("lit-element").TemplateResult;
    private onDotClick;
    private onDotKeydown;
    private handleKeydownMenuOption;
}
//# sourceMappingURL=mgt-dot-options.d.ts.map