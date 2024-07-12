/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { Team } from '@microsoft/microsoft-graph-types';
import { CachePhoto } from '../../graph/graph.photos';
import { DropdownItem } from './teams-channel-picker-types';
/**
 * async promise, returns all Teams associated with the user logged in
 *
 * @returns {Promise<Team[]>}
 * @memberof Graph
 */
export declare const getAllMyTeams: (graph: IGraph) => Promise<Team[]>;
/** An object collection of cached photos. */
type CachePhotos = Record<string, CachePhoto>;
/**
 * Load the photos for a give set of teamIds
 *
 * @param graph {IGraph}
 * @param teamIds {string[]}
 * @returns {Promise<CachePhotos>}
 */
export declare const getTeamsPhotosForPhotoIds: (graph: IGraph, teamIds: string[]) => Promise<CachePhotos>;
/**
 * Creates an array of DropdownItems from an array of Teams populated with channels and photos
 *
 * @param graph {IGraph}
 * @param teams {Team[]} the teams to get channels for
 * @returns {Promise<DropdownItem[]>} a promise that resolves to an array of DropdownItems
 */
export declare const getChannelsForTeams: (graph: IGraph, teams: Team[]) => Promise<DropdownItem[]>;
export {};
//# sourceMappingURL=mgt-teams-channel-picker.graph.d.ts.map