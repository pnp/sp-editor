/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { PropertyValues, TemplateResult } from 'lit';
import { MgtBaseComponent } from '@microsoft/mgt-element/';
/**
 * A component to create flyout anchored to an element
 *
 * @export
 * @class MgtFlyout
 * @extends {LitElement}
 */
export declare class MgtFlyout extends MgtBaseComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    /**
     * Gets or sets whether the flyout is light dismissible.
     *
     * @type {boolean}
     * @memberof MgtFlyout
     */
    isLightDismiss: boolean;
    /**
     * Gets or sets whether the flyout should avoid rendering the flyout
     * on top of the anchor
     *
     * @type {boolean}
     * @memberof MgtFlyout
     */
    avoidHidingAnchor: boolean;
    /**
     * Gets or sets whether the flyout is visible
     *
     * @type {string}
     * @memberof MgtFlyout
     */
    get isOpen(): boolean;
    set isOpen(value: boolean);
    private get _edgePadding();
    private _renderedOnce;
    private get _flyout();
    private get _anchor();
    private get _topScout();
    private get _bottomScout();
    private _isOpen;
    private _smallView;
    private _windowHeight;
    constructor();
    /**
     * Show the flyout.
     */
    open(): void;
    /**
     * Close the flyout.
     */
    close(): void;
    /**
     * Invoked each time the custom element is disconnected from the document's DOM
     *
     * @memberof MgtFlyout
     */
    disconnectedCallback(): void;
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param changedProperties Map of changed properties with old values
     */
    protected updated(changedProps: PropertyValues): void;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    protected render(): TemplateResult<1>;
    /**
     * Renders the anchor content.
     *
     * @protected
     * @returns
     * @memberof MgtFlyout
     */
    protected renderAnchor(): TemplateResult;
    /**
     * Renders the flyout.
     */
    protected renderFlyout(): TemplateResult;
    /**
     * Updates the position of the flyout.
     * Makes a second recursive call to ensure the flyout is positioned correctly.
     * This is needed as the width of the flyout is not settled until afer the first render.
     *
     * @private
     * @param {boolean} [firstPass=true]
     * @return {*}
     * @memberof MgtFlyout
     */
    private updateFlyout;
    private setupWindowEvents;
    private readonly handleWindowEvent;
    private readonly handleResize;
    private readonly handleKeyUp;
    private readonly handleFlyoutWheel;
}
//# sourceMappingURL=mgt-flyout.d.ts.map