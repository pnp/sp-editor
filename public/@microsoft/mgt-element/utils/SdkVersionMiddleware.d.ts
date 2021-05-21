/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Context, Middleware } from '@microsoft/microsoft-graph-client';
/**
 * Implements Middleware for the Graph sdk to inject
 * the toolkit version in the SdkVersion header
 *
 * @class SdkVersionMiddleware
 * @implements {Middleware}
 */
export declare class SdkVersionMiddleware implements Middleware {
    /**
     * @private
     * A member to hold next middleware in the middleware chain
     */
    private _nextMiddleware;
    private _packageVersion;
    private _providerName;
    constructor(packageVersion: string, providerName?: string);
    execute(context: Context): Promise<void>;
    /**
     * Handles setting of next middleware
     *
     * @param {Middleware} next
     * @memberof SdkVersionMiddleware
     */
    setNext(next: Middleware): void;
}
//# sourceMappingURL=SdkVersionMiddleware.d.ts.map