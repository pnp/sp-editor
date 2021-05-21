/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { LitElement, PropertyValues } from 'lit-element';
/**
 * Defines media query based on component width
 *
 * @export
 * @enum {string}
 */
export declare enum ComponentMediaQuery {
    /**
     * devices with width < 768
     */
    mobile = "",
    /**
     * devices with width < 1200
     */
    tablet = "tablet",
    /**
     * devices with width > 1200
     */
    desktop = "desktop"
}
/**
 * BaseComponent extends LitElement adding mgt specific features to all components
 *
 * @export  MgtBaseComponent
 * @abstract
 * @class MgtBaseComponent
 * @extends {LitElement}
 */
export declare abstract class MgtBaseComponent extends LitElement {
    /**
     * Gets or sets the direction of the component
     *
     * @protected
     * @memberof MgtBaseComponent
     */
    protected direction: string;
    /**
     * Gets the ComponentMediaQuery of the component
     *
     * @readonly
     * @type {MgtElement.ComponentMediaQuery}
     * @memberof MgtBaseComponent
     */
    get mediaQuery(): ComponentMediaQuery;
    /**
     * A flag to check if the component is loading data state.
     *
     * @protected
     * @memberof MgtBaseComponent
     */
    protected get isLoadingState(): boolean;
    /**
     * A flag to check if the component has updated once.
     *
     * @readonly
     * @protected
     * @type {boolean}
     * @memberof MgtBaseComponent
     */
    protected get isFirstUpdated(): boolean;
    /**
     * returns component strings
     *
     * @readonly
     * @protected
     * @memberof MgtBaseComponent
     */
    protected get strings(): {
        [x: string]: string;
    };
    /**
     * determines if login component is in loading state
     * @type {boolean}
     */
    private _isLoadingState;
    private _isFirstUpdated;
    private _currentLoadStatePromise;
    constructor();
    /**
     * Invoked each time the custom element is appended into a document-connected element
     *
     * @memberof MgtBaseComponent
     */
    connectedCallback(): void;
    /**
     * Invoked each time the custom element is removed from a document-connected element
     *
     * @memberof MgtBaseComponent
     */
    disconnectedCallback(): void;
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    protected firstUpdated(changedProperties: any): void;
    /**
     * load state into the component.
     * Override this function to provide additional loading logic.
     */
    protected loadState(): Promise<void>;
    protected clearState(): void;
    /**
     * helps facilitate creation of events across components
     *
     * @protected
     * @param {string} eventName
     * @param {*} [detail]
     * @param {boolean} [bubbles=false]
     * @param {boolean} [cancelable=false]
     * @return {*}  {boolean}
     * @memberof MgtBaseComponent
     */
    protected fireCustomEvent(eventName: string, detail?: any, bubbles?: boolean, cancelable?: boolean): boolean;
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param changedProperties Map of changed properties with old values
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Request to reload the state.
     * Use reload instead of load to ensure loading events are fired.
     *
     * @protected
     * @memberof MgtBaseComponent
     */
    protected requestStateUpdate(force?: boolean): Promise<unknown>;
    private setLoadingState;
    private handleProviderUpdates;
    private handleActiveAccountUpdates;
    private handleLocalizationChanged;
    private handleDirectionChanged;
}
//# sourceMappingURL=baseComponent.d.ts.map