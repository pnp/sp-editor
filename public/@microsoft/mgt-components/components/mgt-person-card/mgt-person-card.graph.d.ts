/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { IDynamicPerson } from '../../graph/types';
import { MgtPersonCardConfig, MgtPersonCardState } from './mgt-person-card.types';
/**
 * Get data to populate the person card
 *
 * @export
 * @param {IGraph} graph
 * @param {IDynamicPerson} personDetails
 * @param {boolean} isMe
 * @param {MgtPersonCardConfig} config
 * @return {*}  {Promise<MgtPersonCardState>}
 */
export declare function getPersonCardGraphData(graph: IGraph, personDetails: IDynamicPerson, isMe: boolean, config: MgtPersonCardConfig): Promise<MgtPersonCardState>;
//# sourceMappingURL=mgt-person-card.graph.d.ts.map