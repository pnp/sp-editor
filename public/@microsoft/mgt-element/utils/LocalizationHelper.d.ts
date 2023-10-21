/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { EventDispatcher, EventHandler } from './EventDispatcher';
type ComponentLocalizationRecord = Record<string, string>;
type LocalizationRecord = Record<string, ComponentLocalizationRecord>;
type LocalizationStorage = {
    _components: LocalizationRecord;
} & Record<string, string>;
/**
 * Helper class for Localization
 *
 *
 * @export
 * @class LocalizationHelper
 */
export declare class LocalizationHelper {
    static _strings: LocalizationStorage;
    static _stringsEventDispatcher: EventDispatcher<unknown>;
    static _directionEventDispatcher: EventDispatcher<unknown>;
    private static mutationObserver;
    static get strings(): LocalizationStorage;
    /**
     * Set strings to be localized
     *
     * @static
     * @memberof LocalizationHelper
     */
    static set strings(value: LocalizationStorage);
    /**
     * returns body dir attribute to determine rtl or ltr
     *
     * @static
     * @returns {string} dir
     * @memberof LocalizationHelper
     */
    static getDocumentDirection(): 'rtl' | 'ltr' | 'auto';
    /**
     * Fires event when LocalizationHelper changes state
     *
     * @static
     * @param {EventHandler<ProvidersChangedState>} event
     * @memberof LocalizationHelper
     */
    static onStringsUpdated(event: EventHandler<unknown>): void;
    static removeOnStringsUpdated(event: EventHandler<unknown>): void;
    static onDirectionUpdated(event: EventHandler<unknown>): void;
    static removeOnDirectionUpdated(event: EventHandler<unknown>): void;
    private static _isDirectionInit;
    /**
     * Checks for direction setup and adds mutationObserver
     *
     * @private
     * @static
     * @returns
     * @memberof LocalizationHelper
     */
    private static initDirection;
    /**
     * Provided helper method to determine localized or defaultString for specific string is returned
     *
     * @static updateStringsForTag
     * @param {string} tagName
     * @param  stringsObj
     * @returns
     * @memberof LocalizationHelper
     */
    static updateStringsForTag(tagName: string, stringObj: Record<string, string>): Record<string, string>;
}
export {};
//# sourceMappingURL=LocalizationHelper.d.ts.map