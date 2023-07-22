/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph, BetaGraph } from '@microsoft/mgt-element';
import { Team } from '@microsoft/microsoft-graph-types';
import { CachePhoto } from '../../graph/graph.photos';
/**
 * async promise, returns all Teams associated with the user logged in
 *
 * @returns {Promise<Team[]>}
 * @memberof Graph
 */
export declare const getAllMyTeams: (graph: IGraph, scopes: string[]) => Promise<Team[]>;
/** An object collection of cached photos. */
type CachePhotos = Record<string, CachePhoto>;
/**
 * Load the photos for a give set of teamIds
 *
 * @param graph {BetaGraph}
 * @param teamIds {string[]}
 * @returns {Promise<CachePhotos>}
 */
export declare const getTeamsPhotosforPhotoIds: (graph: BetaGraph, teamIds: string[]) => Promise<CachePhotos>;
export {};
//# sourceMappingURL=mgt-teams-channel-picker.graph.d.ts.map