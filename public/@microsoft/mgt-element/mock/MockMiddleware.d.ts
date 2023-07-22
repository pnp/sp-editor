/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Context, Middleware } from '@microsoft/microsoft-graph-client';
/**
 * Implements Middleware for the Mock Client to escape
 * the graph url from the request
 *
 * @class MockMiddleware
 * @implements {Middleware}
 */
export declare class MockMiddleware implements Middleware {
    /**
     * @private
     * A member to hold next middleware in the middleware chain
     */
    private _nextMiddleware;
    private static _baseUrl;
    private static _cache;
    private static get _sessionCache();
    execute(context: Context): Promise<void>;
    /**
     * Handles setting of next middleware
     *
     * @param {Middleware} next
     * @memberof SdkVersionMiddleware
     */
    setNext(next: Middleware): void;
    /**
     * Gets the base url for the mock graph, either from the session cache or from the endpoint service
     *
     * @static
     * @return {string} the base url for the mock graph to use.
     * @memberof MockMiddleware
     */
    static getBaseUrl(): Promise<string>;
    private static setBaseFallbackUrl;
}
//# sourceMappingURL=MockMiddleware.d.ts.map