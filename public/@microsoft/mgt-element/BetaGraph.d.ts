/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from './IGraph';
import { Client } from '@microsoft/microsoft-graph-client';
import { Graph } from './Graph';
/**
 * BetaGraph
 *
 * @export
 * @class BetaGraph
 * @extends {BetaGraph}
 */
export declare class BetaGraph extends Graph {
    /**
     * get a BetaGraph instance based on an existing IGraph implementation.
     *
     * @static
     * @param {Graph} graph
     * @returns {BetaGraph}
     * @memberof BetaGraph
     */
    static fromGraph(graph: IGraph): BetaGraph;
    constructor(client: Client, version?: string);
    /**
     * Returns a new instance of the Graph using the same
     * client within the context of the provider.
     *
     * @param {Element} component
     * @returns {BetaGraph}
     * @memberof BetaGraph
     */
    forComponent(component: Element | string): BetaGraph;
}
//# sourceMappingURL=BetaGraph.d.ts.map