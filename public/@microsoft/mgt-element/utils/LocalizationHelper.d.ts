/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { EventDispatcher, EventHandler } from './EventDispatcher';
/**
 * Helper class for Localization
 *
 *
 * @export
 * @class LocalizationHelper
 */
export declare class LocalizationHelper {
    static _strings: any;
    static _stringsEventDispatcher: EventDispatcher<any>;
    static _directionEventDispatcher: EventDispatcher<any>;
    private static mutationObserver;
    static get strings(): any;
    /**
     * Set strings to be localized
     *
     * @static
     * @memberof LocalizationHelper
     */
    static set strings(value: any);
    /**
     * returns body dir attribute to determine rtl or ltr
     *
     * @static
     * @returns {string} dir
     * @memberof LocalizationHelper
     */
    static getDocumentDirection(): string;
    /**
     * Fires event when LocalizationHelper changes state
     *
     * @static
     * @param {EventHandler<ProvidersChangedState>} event
     * @memberof LocalizationHelper
     */
    static onStringsUpdated(event: EventHandler<any>): void;
    static removeOnStringsUpdated(event: EventHandler<any>): void;
    static onDirectionUpdated(event: EventHandler<any>): void;
    static removeOnDirectionUpdated(event: EventHandler<any>): void;
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
    static updateStringsForTag(tagName: string, stringObj: any): any;
}
//# sourceMappingURL=LocalizationHelper.d.ts.map