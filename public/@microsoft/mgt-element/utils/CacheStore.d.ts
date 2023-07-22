/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { CacheItem, CacheSchema } from './CacheService';
/**
 * Represents a store in the cache
 *
 * @class CacheStore
 * @template T
 */
export declare class CacheStore<T extends CacheItem> {
    private readonly schema;
    private readonly store;
    constructor(schema: CacheSchema, store: string);
    /**
     * gets value from cache for the given key
     *
     * @param {string} key
     * @returns {Promise<T>}
     * @memberof Cache
     */
    getValue(key: string): Promise<T>;
    /**
     * inserts value into cache for the given key
     *
     * @param {string} key
     * @param {T} item
     * @returns
     * @memberof Cache
     */
    putValue(key: string, item: T): Promise<void>;
    /**
     * Clears the store of all stored values
     *
     * @returns
     * @memberof Cache
     */
    clearStore(): Promise<void>;
    /**
     * Returns the name of the parent DB that the cache store belongs to
     */
    getDBName(): Promise<string>;
    private getDb;
}
//# sourceMappingURL=CacheStore.d.ts.map