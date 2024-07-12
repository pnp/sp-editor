/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { GraphPageIterator, IGraph } from '@microsoft/mgt-element';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
/**
 *
 * @param {IGraph} graph
 * @param {string} query the graph resource and query string to be requested
 * @param {string[]} additionalScopes an array of scope to be requested before making the request
 * Should be calculated by the calling code using `IProvider.needsAdditionalScopes()`
 * @returns {Promise<GraphPageIterator<MicrosoftGraph.Event>>} a page iterator to allow
 * the calling code to request more data if present and needed
 */
export declare const getEventsQueryPageIterator: (graph: IGraph, query: string, additionalScopes: string[]) => Promise<GraphPageIterator<MicrosoftGraph.Event>>;
/**
 * returns Calender events iterator associated with either the logged in user or a specific groupId
 *
 * @param {IGraph} graph
 * @param {Date} startDateTime
 * @param {Date} endDateTime
 * @param {string} [groupId]
 * @returns {Promise<GraphPageIterator<MicrosoftGraph.Event>>}
 * @memberof Graph
 */
export declare const getEventsPageIterator: (graph: IGraph, startDateTime: Date, endDateTime: Date, groupId?: string) => Promise<GraphPageIterator<MicrosoftGraph.Event>>;
//# sourceMappingURL=mgt-agenda.graph.d.ts.map