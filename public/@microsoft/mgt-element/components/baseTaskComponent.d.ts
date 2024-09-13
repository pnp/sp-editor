/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Task } from '@lit/task';
import { LitElement, PropertyValueMap, PropertyValues, TemplateResult } from 'lit';
import { ProviderState } from '../providers/IProvider';
import { ComponentMediaQuery } from './baseComponent';
/**
 * BaseComponent extends LitElement adding mgt specific features to all components
 *
 * @export  MgtBaseTaskComponent
 * @abstract
 * @class MgtBaseTaskComponent
 * @extends {LitElement}
 */
export declare abstract class MgtBaseTaskComponent extends LitElement {
    /**
     * Supplies the component with a reactive property based on the current provider state
     *
     * @protected
     * @memberof MgtBaseTaskComponent
     */
    protected providerState: ProviderState;
    /**
     * Exposes the semver of the library the component is part of
     *
     * @readonly
     * @static
     * @memberof MgtBaseTaskComponent
     */
    static get packageVersion(): string;
    /**
     * Gets or sets the direction of the component
     *
     * @protected
     * @memberof MgtBaseTaskComponent
     */
    protected direction: 'ltr' | 'rtl' | 'auto';
    /**
     * Gets the ComponentMediaQuery of the component
     *
     * @readonly
     * @type {MgtElement.ComponentMediaQuery}
     * @memberof MgtBaseTaskComponent
     */
    get mediaQuery(): ComponentMediaQuery;
    /**
     * A flag to check if the component has updated once.
     *
     * @readonly
     * @protected
     * @type {boolean}
     * @memberof MgtBaseTaskComponent
     */
    protected get isFirstUpdated(): boolean;
    /**
     * returns component strings
     *
     * @readonly
     * @protected
     * @memberof MgtBaseTaskComponent
     */
    protected get strings(): Record<string, string>;
    private _isFirstUpdated;
    constructor();
    /**
     * Invoked each time the custom element is appended into a document-connected element
     *
     * @memberof MgtBaseTaskComponent
     */
    connectedCallback(): void;
    /**
     * Invoked each time the custom element is removed from a document-connected element
     *
     * @memberof MgtBaseTaskComponent
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
    protected firstUpdated(changedProperties: PropertyValueMap<unknown> | Map<PropertyKey, unknown>): void;
    /**
     * Used to clear state in inherited components
     */
    protected clearState(): void;
    /**
     * helps facilitate creation of events across components
     *
     * @protected
     * @param {string} eventName
     * @param {*} [detail]
     * @param {boolean} [bubbles=false]
     * @param {boolean} [cancelable=false]
     * @param {boolean} [composed=false]
     * @return {*}  {boolean}
     * @memberof MgtBaseTaskComponent
     */
    protected fireCustomEvent(eventName: string, detail?: unknown, bubbles?: boolean, cancelable?: boolean, composed?: boolean): boolean;
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
     * load state into the component.
     * Override this function to provide actual loading logic.
     */
    protected loadState(): Promise<void>;
    /**
     * Override this function to provide the actual list of properties to trigger the task to run.
     * The default implementation returns an array with the providerState.
     * @returns {unknown[]} the properties when changed which trigger the Task to run
     */
    protected args(): unknown[];
    /**
     * Task that is run whenever one of the args changes
     * By default this task will call loadState
     */
    protected _task: Task<unknown[], void>;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    protected render(): TemplateResult;
    /**
     * A default loading template.
     * @returns default loading template
     */
    protected renderLoading: () => TemplateResult;
    protected renderError: (e: unknown) => TemplateResult;
    protected renderContent: () => TemplateResult;
    private readonly handleProviderUpdates;
    private readonly handleActiveAccountUpdates;
    private readonly handleLocalizationChanged;
    private readonly handleDirectionChanged;
}
//# sourceMappingURL=baseTaskComponent.d.ts.map