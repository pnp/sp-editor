/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * Wrapper around the window.sessionStorage API. Use
 * this to set, get and clear session items.
 */
export declare class SessionCache {
    private readonly session;
    constructor();
    /**
     * Stores a value in session storage.
     *
     * @param key
     * @param value
     */
    setItem(key: string, value: string): void;
    /**
     * Gets the value for a given key from session storage.
     *
     * @param {string} key
     * @return {*}  {string}
     * @memberof SessionCache
     */
    getItem(key: string): string;
    /**
     * Clears session storage.
     *
     * @memberof SessionCache
     */
    clear(): void;
}
/**
 * Checks if a sessionStorage or a localStorage is available
 * for use in a browser.
 *
 * @param storageType can be 'sessionStorage' or 'localStorage'.
 * @returns true if the storage is available for use.
 */
export declare const storageAvailable: (storageType: string) => boolean;
//# sourceMappingURL=SessionCache.d.ts.map