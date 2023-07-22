/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { GraphPageIterator, IGraph } from '@microsoft/mgt-element';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
export declare const getEventsQueryPageIterator: (graph: IGraph, query: string, scopes?: string) => Promise<GraphPageIterator<MicrosoftGraph.Event>>;
/**
 * returns Calender events iterator associated with either the logged in user or a specific groupId
 *
 * @param {Date} startDateTime
 * @param {Date} endDateTime
 * @param {string} [groupId]
 * @param {string} preferredTimezone
 * @returns {(Promise<Event[]>)}
 * @memberof Graph
 */
export declare const getEventsPageIterator: (graph: IGraph, startDateTime: Date, endDateTime: Date, groupId?: string) => Promise<GraphPageIterator<MicrosoftGraph.Event>>;
//# sourceMappingURL=mgt-agenda.graph.d.ts.map