/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Context, Middleware } from '@microsoft/microsoft-graph-client';
/**
 * Custom Middleware to add custom headers when making calls
 * through the proxy provider
 *
 * @class CustomHeaderMiddleware
 * @implements {Middleware}
 */
export declare class CustomHeaderMiddleware implements Middleware {
    private nextMiddleware;
    private _getCustomHeaders;
    constructor(getCustomHeaders: () => Promise<object>);
    /**
     * Execute the current middleware
     *
     * @param {Context} context
     * @returns {Promise<void>}
     * @memberof CustomHeaderMiddleware
     */
    execute(context: Context): Promise<void>;
    /**
     * Handles setting of next middleware
     *
     * @param {Middleware} next
     * @memberof SdkVersionMiddleware
     */
    setNext(next: Middleware): void;
}
//# sourceMappingURL=CustomHeaderMiddleware.d.ts.map