/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Graph } from '@microsoft/mgt-element';
/**
 * ProxyGraph Instance
 *
 * @export
 * @class ProxyGraph
 * @extends {Graph}
 */
export declare class ProxyGraph extends Graph {
    constructor(baseUrl: string, getCustomHeaders: () => Promise<object>);
}
//# sourceMappingURL=ProxyGraph.d.ts.map