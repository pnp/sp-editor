/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { BatchResponse, IBatch } from '../IBatch';
import { IGraph } from '../IGraph';
/**
 * Represents a request to be executed in a batch
 *
 * @class BatchRequest
 */
export declare class BatchRequest {
    /**
     * url used in request
     *
     * @type {string}
     * @memberof BatchRequest
     */
    resource: string;
    /**
     * method passed to be requested
     *
     * @type {string}
     * @memberof BatchRequest
     */
    method: string;
    /**
     * The index of the requests as it was added to the queue
     * Use this value if you need to sort the responses
     * in the order they were added
     *
     * @type {number}
     * @memberof BatchRequest
     */
    index: number;
    /**
     * The headers of the request
     *
     * @type {{[headerName: string]: string}}
     * @memberof BatchRequest
     */
    headers: {
        [header: string]: string;
    };
    /**
     * The id of the requests
     *
     * @type {string}
     * @memberof BatchRequest
     */
    id: string;
    constructor(index: any, id: any, resource: string, method: string);
}
/**
 * Method to reduce repetitive requests to the Graph
 *
 * @export
 * @class Batch
 */
export declare class Batch implements IBatch {
    private static baseUrl;
    private allRequests;
    private requestsQueue;
    private scopes;
    private retryAfter;
    private graph;
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
    get(id: string, resource: string, scopes?: string[], headers?: {
        [header: string]: string;
    }): void;
    /**
     * Execute the next set of requests.
     * This will execute up to 20 requests at a time
     *
     * @returns {Promise<Map<string, BatchResponse>>}
     * @memberof Batch
     */
    executeNext(): Promise<Map<string, BatchResponse>>;
    /**
     * Execute all requests, up to 20 at a time until
     * all requests have been executed
     *
     * @returns {Promise<Map<string, BatchResponse>>}
     * @memberof Batch
     */
    executeAll(): Promise<Map<string, BatchResponse>>;
}
//# sourceMappingURL=Batch.d.ts.map