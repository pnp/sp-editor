/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
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
 * Searches the Graph for Groups
 *
 * @export
 * @param {IGraph} graph
 * @param {string} query - what to search for
 * @param {number} [top=10] - number of groups to return
 * @param {GroupType} [groupTypes=GroupType.any] - the type of group to search for
 * @returns {Promise<Group[]>} An array of Groups
 */
export declare function findGroups(graph: IGraph, query: string, top?: number, groupTypes?: GroupType): Promise<Group[]>;
/**
 * Searches the Graph for Groups
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
//# sourceMappingURL=graph.groups.d.ts.map