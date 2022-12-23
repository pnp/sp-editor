/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph, CacheItem } from '@microsoft/mgt-element';
import { Group } from '@microsoft/microsoft-graph-types';
/**
 * Group Type enumeration
 *
 * @export
 * @enum {number}
 */
export declare enum GroupType {
    /**
     * Any group Type
     */
    any = 0,
    /**
     * Office 365 group
     */
    unified = 1,
    /**
     * Security group
     */
    security = 2,
    /**
     * Mail Enabled Security group
     */
    mailenabledsecurity = 4,
    /**
     * Distribution Group
     */
    distribution = 8
}
/**
 * Object to be stored in cache
 */
export interface CacheGroup extends CacheItem {
    /**
     * stringified json representing a user
     */
    group?: string;
}
/**
 * Searches the Graph for Groups
 *
 * @export
 * @param {IGraph} graph
 * @param {string} query - what to search for
 * @param {number} [top=10] - number of groups to return
 * @param {GroupType} [groupTypes=GroupType.any] - the type of group to search for
 * @returns {Promise<Group[]>} An array of Groups
 */
export declare function findGroups(graph: IGraph, query: string, top?: number, groupTypes?: GroupType, groupFilters?: string): Promise<Group[]>;
/**
 * Searches the Graph for group members
 *
 * @export
 * @param {IGraph} graph
 * @param {string} query - what to search for
 * @param {string} groupId - what to search for
 * @param {number} [top=10] - number of groups to return
 * @param {boolean} [transitive=false] - whether the return should contain a flat list of all nested members
 * @param {GroupType} [groupTypes=GroupType.any] - the type of group to search for
 * @returns {Promise<Group[]>} An array of Groups
 */
export declare function findGroupsFromGroup(graph: IGraph, query: string, groupId: string, top?: number, transitive?: boolean, groupTypes?: GroupType): Promise<Group[]>;
/**
 * async promise, returns all Graph groups associated with the id provided
 *
 * @param {string} id
 * @returns {(Promise<User>)}
 * @memberof Graph
 */
export declare function getGroup(graph: IGraph, id: string, requestedProps?: string[]): Promise<Group>;
/**
 * Returns a Promise of Graph Groups array associated with the groupIds array
 *
 * @export
 * @param {IGraph} graph
 * @param {string[]} groupIds, an array of string ids
 * @returns {Promise<Group[]>}
 */
export declare function getGroupsForGroupIds(graph: IGraph, groupIds: string[], filters?: string): Promise<Group[]>;
/**
 * Gets groups from the graph that are in the group ids
 * @param graph
 * @param query
 * @param groupId
 * @param top
 * @param transitive
 * @param groupTypes
 * @param filters
 * @returns
 */
export declare function findGroupsFromGroupIds(graph: IGraph, query: string, groupIds: string[], top?: number, groupTypes?: GroupType, filters?: string): Promise<Group[]>;
//# sourceMappingURL=graph.groups.d.ts.map