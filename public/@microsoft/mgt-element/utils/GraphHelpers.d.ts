/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { AuthenticationHandlerOptions, Middleware } from '@microsoft/microsoft-graph-client';
import { GraphEndpoint } from '../IGraph';
/**
 * creates an AuthenticationHandlerOptions from scopes array that
 * can be used in the Graph sdk middleware chain
 *
 * @export
 * @param {...string[]} scopes
 * @returns
 */
export declare const prepScopes: (...scopes: string[]) => AuthenticationHandlerOptions[];
/**
 * Helper method to chain Middleware when instantiating new Client
 *
 * @param {...Middleware[]} middleware
 * @returns {Middleware}
 */
export declare const chainMiddleware: (...middleware: Middleware[]) => Middleware;
/**
 * Helper method to validate a base URL string
 *
 * @param url a URL string
 * @returns GraphEndpoint
 */
export declare const validateBaseURL: (url: string) => GraphEndpoint;
//# sourceMappingURL=GraphHelpers.d.ts.map