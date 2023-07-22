/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { Presence } from '@microsoft/microsoft-graph-types';
import { IDynamicPerson } from './types';
/**
 * async promise, allows developer to get user presence
 *
 * @returns {Promise<Presence>}
 * @param {IGraph} graph
 * @param {string} userId - id for the user or null for current signed in user
 * @memberof BetaGraph
 */
export declare const getUserPresence: (graph: IGraph, userId?: string) => Promise<Presence>;
/**
 * async promise, allows developer to get person presense by providing array of IDynamicPerson
 *
 * @returns {}
 * @memberof BetaGraph
 */
export declare const getUsersPresenceByPeople: (graph: IGraph, people?: IDynamicPerson[]) => Promise<Record<string, Presence>>;
//# sourceMappingURL=graph.presence.d.ts.map