/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { AuthenticationHandlerOptions } from '@microsoft/microsoft-graph-client';
/**
 * creates an AuthenticationHandlerOptions from scopes array that
 * can be used in the Graph sdk middleware chain
 *
 * @export
 * @param {...string[]} scopes
 * @returns
 */
export declare const prepScopes: (scopes: string[], provider?: import("..").IProvider) => AuthenticationHandlerOptions[];
//# sourceMappingURL=prepScopes.d.ts.map