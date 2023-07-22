/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { CacheItem, IGraph } from '@microsoft/mgt-element';
import { User } from '@microsoft/microsoft-graph-types';
import { PersonType } from './graph.people';
import { IDynamicPerson } from './types';
/**
 * Object to be stored in cache
 */
export interface CacheUser extends CacheItem {
    /**
     * stringified json representing a user
     */
    user?: string;
}
/**
 * Object to be stored in cache
 */
export interface CacheUserQuery extends CacheItem {
    /**
     * max number of results the query asks for
     */
    maxResults?: number;
    /**
     * list of users returned by query
     */
    results?: string[];
}
/**
 * Defines the time it takes for objects in the cache to expire
 */
export declare const getUserInvalidationTime: () => number;
/**
 * Whether or not the cache is enabled
 */
export declare const getIsUsersCacheEnabled: () => boolean;
export declare const getUsers: (graph: IGraph, userFilters?: string, top?: number) => Promise<User[]>;
/**
 * async promise, returns Graph User data relating to the user logged in
 *
 * @returns {(Promise<User>)}
 * @memberof Graph
 */
export declare const getMe: (graph: IGraph, requestedProps?: string[]) => Promise<User>;
/**
 * async promise, returns all Graph users associated with the userPrincipleName provided
 *
 * @param {string} userPrincipleName
 * @returns {(Promise<User>)}
 * @memberof Graph
 */
export declare const getUser: (graph: IGraph, userPrincipleName: string, requestedProps?: string[]) => Promise<User>;
/**
 * Returns a Promise of Graph Users array associated with the user ids array
 *
 * @export
 * @param {IGraph} graph
 * @param {string[]} userIds, an array of string ids
 * @returns {Promise<User[]>}
 */
export declare const getUsersForUserIds: (graph: IGraph, userIds: string[], searchInput?: string, userFilters?: string, fallbackDetails?: IDynamicPerson[]) => Promise<User[]>;
/**
 * Returns a Promise of Graph Users array associated with the people queries array
 *
 * @export
 * @param {IGraph} graph
 * @param {string[]} peopleQueries, an array of string ids
 * @returns {Promise<User[]>}
 */
export declare const getUsersForPeopleQueries: (graph: IGraph, peopleQueries: string[], fallbackDetails?: IDynamicPerson[]) => Promise<User[]>;
/**
 * Search Microsoft Graph for Users in the organization
 *
 * @export
 * @param {IGraph} graph
 * @param {string} query - the string to search for
 * @param {number} [top=10] - maximum number of results to return
 * @returns {Promise<User[]>}
 */
export declare const findUsers: (graph: IGraph, query: string, top?: number, userFilters?: string) => Promise<User[]>;
/**
 * async promise, returns all matching Graph users who are member of the specified group
 *
 * @param {string} query
 * @param {string} groupId - the group to query
 * @param {number} [top=10] - number of people to return
 * @param {PersonType} [personType=PersonType.person] - the type of person to search for
 * @param {boolean} [transitive=false] - whether the return should contain a flat list of all nested members
 * @returns {(Promise<User[]>)}
 */
export declare const findGroupMembers: (graph: IGraph, query: string, groupId: string, top?: number, personType?: PersonType, transitive?: boolean, userFilters?: string, peopleFilters?: string) => Promise<User[]>;
export declare const findUsersFromGroupIds: (graph: IGraph, query: string, groupIds: string[], top?: number, personType?: PersonType, transitive?: boolean, groupFilters?: string) => Promise<User[]>;
//# sourceMappingURL=graph.user.d.ts.map