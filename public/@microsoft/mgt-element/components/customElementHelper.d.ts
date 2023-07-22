/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
declare class CustomElementHelper {
    private get defaultPrefix();
    private _disambiguation;
    /**
     * Adds a disambiguation segment to the custom elements registered with the browser
     *
     * @param {string} disambiguation
     * @return {CustomElementHelper} the current object
     * @memberof CustomElementHelper
     */
    withDisambiguation(disambiguation: string): this;
    /**
     * Provides the prefix to be used for mgt web component tags
     *
     * @readonly
     * @type {string}
     * @memberof CustomElementHelper
     */
    get prefix(): string;
    /**
     * Returns the current value for the disambiguation
     *
     * @readonly
     * @type {string}
     * @memberof CustomElementHelper
     */
    get disambiguation(): string;
    /**
     * Returns true if a value has been provided for the disambiguation
     *
     * @readonly
     * @type {boolean}
     * @memberof CustomElementHelper
     */
    get isDisambiguated(): boolean;
    /**
     * Removes disambiguation from the provided tagName.
     * Intended for use when providing tag names in analytics headers passed by the Graph client
     *
     * @param {string} tagName
     * @return {*}  {string}
     * @memberof CustomElementHelper
     */
    normalize(tagName: string): string;
}
/**
 * Helper object to provide the desired prefix for mgt web component tags
 *
 * @type CustomElementHelper
 */
declare const customElementHelper: CustomElementHelper;
export { customElementHelper };
//# sourceMappingURL=customElementHelper.d.ts.map