/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Middleware } from '@microsoft/microsoft-graph-client';
/**
 * Helper method to chain Middleware when instantiating new Client
 *
 * @param {...Middleware[]} middleware
 * @returns {Middleware}
 */
export declare const chainMiddleware: (...middleware: Middleware[]) => Middleware;
//# sourceMappingURL=chainMiddleware.d.ts.map