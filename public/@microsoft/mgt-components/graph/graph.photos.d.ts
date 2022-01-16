/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph, CacheItem } from '@microsoft/mgt-element';
import { IDynamicPerson } from './types';
/**
 * photo object stored in cache
 */
export interface CachePhoto extends CacheItem {
    /**
     * user tag associated with photo
     */
    eTag?: string;
    /**
     * user/contact photo
     */
    photo?: string;
}
/**
 * Defines expiration time
 */
export declare const getPhotoInvalidationTime: () => number;
/**
 * Whether photo store is enabled
 */
export declare const getIsPhotosCacheEnabled: () => boolean;
/**
 * retrieves a photo for the specified resource.
 *
 * @param {string} resource
 * @param {string[]} scopes
 * @returns {Promise<string>}
 */
export declare function getPhotoForResource(graph: IGraph, resource: string, scopes: string[]): Promise<CachePhoto>;
/**
 * async promise, returns Graph photos associated with contacts of the logged in user
 * @param contactId
 * @returns {Promise<string>}
 * @memberof Graph
 */
export declare function getContactPhoto(graph: IGraph, contactId: string): Promise<string>;
/**
 * async promise, returns Graph photo associated with provided userId
 * @param userId
 * @returns {Promise<string>}
 * @memberof Graph
 */
export declare function getUserPhoto(graph: IGraph, userId: string): Promise<string>;
/**
 * async promise, returns Graph photo associated with the logged in user
 * @returns {Promise<string>}
 * @memberof Graph
 */
export declare function myPhoto(graph: IGraph): Promise<string>;
/**
 * async promise, loads image of user
 *
 * @export
 */
export declare function getPersonImage(graph: IGraph, person: IDynamicPerson, useContactsApis?: boolean): Promise<string>;
export declare function getGroupImage(graph: IGraph, group: any, useContactsApis?: boolean): Promise<string>;
/**
 * checks if user has a photo in the cache
 * @param userId
 * @returns {CachePhoto}
 * @memberof Graph
 */
export declare function getPhotoFromCache(userId: string, storeName: string): Promise<CachePhoto>;
/**
 * checks if user has a photo in the cache
 * @param userId
 * @returns {void}
 * @memberof Graph
 */
export declare function storePhotoInCache(userId: string, storeName: string, value: CachePhoto): Promise<void>;
//# sourceMappingURL=graph.photos.d.ts.map