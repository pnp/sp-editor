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
    static get styles(): import("lit").CSSResult[];
    /**
     * Strings for localization
     *
     * @readonly
     * @protected
     * @memberof MgtDotOptions
     */
    protected get strings(): {
        dotOptionsTitle: string;
    };
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
    options: Record<string, (e: Event) => void>;
    private readonly _clickHandler;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    render(): import("lit-html").TemplateResult<1>;
    private readonly handleItemClick;
    private readonly handleItemKeydown;
    /**
     * Used by the render method to attach click handler to each dot item
     *
     * @param {string} name
     * @param {MenuOptionEventFunction} clickFn
     * @returns
     * @memberof MgtDotOptions
     */
    getMenuOption(name: string, clickFn: (e: Event) => void): import("lit-html").TemplateResult<1>;
    private readonly onDotClick;
    private readonly onDotKeydown;
    private handleKeydownMenuOption;
}
//# sourceMappingURL=mgt-dot-options.d.ts.map