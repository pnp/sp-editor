/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { CacheStore } from './CacheStore';
import { CacheSchema } from './CacheSchema';
import { CacheItem } from './CacheItem';
/**
 * Holds the cache options for cache store
 *
 * @export
 * @interface CacheConfig
 */
export interface CacheConfig {
    /**
     * Default global invalidation period
     *
     * @type {number}
     * @memberof CacheConfig
     */
    defaultInvalidationPeriod: number;
    /**
     * Controls whether the cache is enabled globally
     *
     * @type {boolean}
     * @memberof CacheConfig
     */
    isEnabled: boolean;
    /**
     * Cache options for groups store
     *
     * @type {CacheOptions}
     * @memberof CacheConfig
     */
    groups: CacheOptions;
    /**
     * Cache options for people store
     *
     * @type {CacheOptions}
     * @memberof CacheConfig
     */
    people: CacheOptions;
    /**
     * Cache options for photos store
     *
     * @type {CacheOptions}
     * @memberof CacheConfig
     */
    photos: CacheOptions;
    /**
     * Cache options for presence store
     *
     * @type {CacheOptions}
     * @memberof CacheConfig
     */
    presence: CacheOptions;
    /**
     * Cache options for users store
     *
     * @type {CacheOptions}
     * @memberof CacheConfig
     */
    users: CacheOptions;
    /**
     * Cache options for a generic response store
     *
     * @type {CacheOptions}
     * @memberof CacheConfig
     */
    response: CacheOptions;
    /**
     * Cache options for files store
     *
     * @type {CacheOptions}
     * @memberof CacheConfig
     */
    files: CacheOptions;
    /**
     * Cache options for fileLists store
     *
     * @type {CacheOptions}
     * @memberof CacheConfig
     */
    fileLists: CacheOptions;
}
/**
 * Options for each store
 *
 * @export
 * @interface CacheOptions
 */
export interface CacheOptions {
    /**
     * Defines the time (in ms) for objects in the store to expire
     *
     * @type {number}
     * @memberof CacheOptions
     */
    invalidationPeriod: number;
    /**
     * Whether the store is enabled or not
     *
     * @type {boolean}
     * @memberof CacheOptions
     */
    isEnabled: boolean;
}
/**
 * class in charge of managing all the caches and their stores
 *
 * @export
 * @class CacheService
 */
export declare class CacheService {
    /**
     * Looks for existing cache, otherwise creates a new one
     *
     * @static
     * @template T
     * @param {CacheSchema} schema
     * @param {string} storeName
     * @returns {CacheStore<T>}
     * @memberof CacheService
     */
    static getCache<T extends CacheItem>(schema: CacheSchema, storeName: string): CacheStore<T>;
    /**
     * Clears cache for a single user when ID is passed
     *
     * @static
     * @param {string} id
     * @memberof CacheService
     */
    static clearCacheById(id: string): Promise<unknown>;
    private static readonly cacheStore;
    private static isInitialized;
    private static readonly cacheConfig;
    /**
     * returns the cacheconfig object
     *
     * @readonly
     * @static
     * @type {CacheConfig}
     * @memberof CacheService
     */
    static get config(): CacheConfig;
    /**
     * Checks for current sign in state and see if it has changed from signed-in to signed out
     *
     *
     * @private
     * @static
     * @memberof CacheService
     */
    private static init;
}
//# sourceMappingURL=CacheService.d.ts.map