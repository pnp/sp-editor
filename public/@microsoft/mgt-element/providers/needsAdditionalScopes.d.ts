/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * wrapper function check for scopes that need to be consented to.
 * By default uses the current global provider, otherwise uses the supplied IProvider
 *
 * @param {string[]} validScopes the set of scopes of which one is required.
 * @param {IProvider} [provider = Providers.globalProvider] the scope aware provider against which to check for existing consented scopes
 */
export declare const needsAdditionalScopes: (validScopes: string[], provider?: import("./IProvider").IProvider) => string[];
//# sourceMappingURL=needsAdditionalScopes.d.ts.map