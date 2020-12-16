/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { User } from '@microsoft/microsoft-graph-types';
import { PersonType } from './graph.people';
import { IDynamicPerson } from './types';
/**
 * async promise, returns Graph User data relating to the user logged in
 *
 * @returns {(Promise<User>)}
 * @memberof Graph
 */
export declare function getMe(graph: IGraph): Promise<User>;
/**
 * asnyc promise, returns IDynamicPerson
 *
 * @param {string} userId
 * @returns {(Promise<IDynamicPerson>)}
 * @memberof Graph
 */
export declare function getUserWithPhoto(graph: IGraph, userId?: string): Promise<IDynamicPerson>;
/**
 * async promise, returns all Graph users associated with the userPrincipleName provided
 *
 * @param {string} userPrincipleName
 * @returns {(Promise<User>)}
 * @memberof Graph
 */
export declare function getUser(graph: IGraph, userPrincipleName: string): Promise<User>;
/**
 * Returns a Promise of Graph Users array associated with the user ids array
 *
 * @export
 * @param {IGraph} graph
 * @param {string[]} userIds, an array of string ids
 * @returns {Promise<User[]>}
 */
export declare function getUsersForUserIds(graph: IGraph, userIds: string[]): Promise<User[]>;
/**
 * Returns a Promise of Graph Users array associated with the people queries array
 *
 * @export
 * @param {IGraph} graph
 * @param {string[]} peopleQueries, an array of string ids
 * @returns {Promise<User[]>}
 */
export declare function getUsersForPeopleQueries(graph: IGraph, peopleQueries: string[]): Promise<User[]>;
/**
 * Search Microsoft Graph for Users in the organization
 *
 * @export
 * @param {IGraph} graph
 * @param {string} query - the string to search for
 * @param {number} [top=10] - maximum number of results to return
 * @returns {Promise<User[]>}
 */
export declare function findUsers(graph: IGraph, query: string, top?: number): Promise<User[]>;
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
export declare function findGroupMembers(graph: IGraph, query: string, groupId: string, top?: number, personType?: PersonType, transitive?: boolean): Promise<User[]>;
//# sourceMappingURL=graph.user.d.ts.map