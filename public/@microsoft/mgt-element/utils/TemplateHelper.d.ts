/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
type ContextualTemplateElement = HTMLTemplateElement & {
    /**
     * The data context of the parent template
     */
    $parentTemplateContext?: object;
};
/**
 * Helper class for Template Instantiation
 *
 * @export
 * @class TemplateHelper
 */
export declare class TemplateHelper {
    /**
     * Render a template into a HTMLElement with the appropriate data context
     *
     * Ex:
     * ```
     * <template>
     *  <div>{{myObj.someStr}}</div>
     *  <div data-for="key in myObj.list">
     *    <div>{{key.anotherStr}}</div>
     *  </div>
     * </template>
     * ```
     *
     * @param root the root element to parent the rendered content
     * @param template the template to render
     * @param context the data context to be applied
     */
    static renderTemplate(root: HTMLElement, template: ContextualTemplateElement, context: object): void;
    /**
     * Set an alternative binding syntax. Default is {{ <value> }}
     *
     * @static
     * @param {string} startStr start of binding syntax
     * @param {string} endStr end of binding syntax
     * @memberof TemplateHelper
     */
    static setBindingSyntax(startStr: string, endStr: string): void;
    /**
     * Global context containing data or functions available to
     * all templates for binding
     *
     * @readonly
     * @static
     * @memberof TemplateHelper
     */
    static get globalContext(): {};
    private static readonly _globalContext;
    private static get expression();
    private static _startExpression;
    private static _endExpression;
    private static _expression;
    private static escapeRegex;
    private static simpleCloneNode;
    private static expandExpressionsAsString;
    private static renderNode;
    private static evalBoolInContext;
    private static evalInContext;
    private static trimExpression;
}
export {};
//# sourceMappingURL=TemplateHelper.d.ts.map