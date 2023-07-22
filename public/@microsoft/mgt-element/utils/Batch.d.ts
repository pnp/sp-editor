/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { BatchResponse, IBatch } from '../IBatch';
import { IGraph } from '../IGraph';
/**
 * Method to reduce repetitive requests to the Graph
 *
 * @export
 * @class Batch
 */
export declare class Batch<T = any> implements IBatch<T> {
    private static get baseUrl();
    private readonly allRequests;
    private readonly requestsQueue;
    private scopes;
    private retryAfter;
    private readonly graph;
    private nextIndex;
    constructor(graph: IGraph);
    /**
     * Get whether there are requests that have not been executed
     *
     * @readonly
     * @memberof Batch
     */
    get hasRequests(): boolean;
    /**
     * sets new request and scopes
     *
     * @param {string} id
     * @param {string} resource
     * @param {string[]} [scopes]
     * @memberof Batch
     */
    get(id: string, resource: string, scopes?: string[], headers?: Record<string, string>): void;
    /**
     * Execute the next set of requests.
     * This will execute up to 20 requests at a time
     *
     * @returns {Promise<Map<string, BatchResponse<T>>>}
     * @memberof Batch
     */
    executeNext(): Promise<Map<string, BatchResponse<T>>>;
    /**
     * Execute all requests, up to 20 at a time until
     * all requests have been executed
     *
     * @returns {Promise<Map<string, BatchResponse<T>>>}
     * @memberof Batch
     */
    executeAll(): Promise<Map<string, BatchResponse<T>>>;
}
//# sourceMappingURL=Batch.d.ts.map