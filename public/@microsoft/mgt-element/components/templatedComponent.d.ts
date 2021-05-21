/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { PropertyValues } from 'lit-element';
import { MgtBaseComponent } from './baseComponent';
import { TemplateContext } from '../utils/TemplateContext';
/**
 * An abstract class that defines a templatable web component
 *
 * @export
 * @abstract
 * @class MgtTemplatedComponent
 * @extends {MgtBaseComponent}
 *
 * @fires templateRendered - fires when a template is rendered
 */
export declare abstract class MgtTemplatedComponent extends MgtBaseComponent {
    /**
     * Additional data context to be used in template binding
     * Use this to add event listeners or value converters
     *
     * @type {MgtElement.TemplateContext}
     * @memberof MgtTemplatedComponent
     */
    templateContext: TemplateContext;
    /**
     * Holds all templates defined by developer
     *
     * @protected
     * @memberof MgtTemplatedComponent
     */
    protected templates: {};
    private _renderedSlots;
    private _renderedTemplates;
    private _slotNamesAddedDuringRender;
    constructor();
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    protected update(changedProperties: any): void;
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
     * Render a <template> by type and return content to render
     *
     * @param templateType type of template (indicated by the data-type attribute)
     * @param context the data context that should be expanded in template
     * @param slotName the slot name that will be used to host the new rendered template. set to a unique value if multiple templates of this type will be rendered. default is templateType
     */
    protected renderTemplate(templateType: string, context: object, slotName?: string): import("lit-element").TemplateResult;
    /**
     * Check if a specific template has been provided.
     *
     * @protected
     * @param {string} templateName
     * @returns {boolean}
     * @memberof MgtTemplatedComponent
     */
    protected hasTemplate(templateName: string): boolean;
    private getTemplates;
    private removeUnusedSlottedElements;
}
//# sourceMappingURL=templatedComponent.d.ts.map