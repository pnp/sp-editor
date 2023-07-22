/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
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
    headers: Record<string, string>;
    /**
     * The id of the requests
     *
     * @type {string}
     * @memberof BatchRequest
     */
    id: string;
    constructor(index: number, id: string, resource: string, method: string);
}
//# sourceMappingURL=BatchRequest.d.ts.map