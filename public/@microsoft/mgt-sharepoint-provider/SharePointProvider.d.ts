/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IProvider } from '@microsoft/mgt-element';
/**
 * AadTokenProvider
 *
 * @interface AadTokenProvider
 */
declare interface AadTokenProvider {
    /**
     * get token with x
     *
     * @param {string} x
     * @memberof AadTokenProvider
     */
    getToken(x: string): any;
}
/**
 * contains the contextual services available to a web part
 *
 * @export
 * @interface WebPartContext
 */
declare interface WebPartContext {
    aadTokenProviderFactory: any;
}
/**
 * SharePoint Provider handler
 *
 * @export
 * @class SharePointProvider
 * @extends {IProvider}
 */
export declare class SharePointProvider extends IProvider {
    /**
     * returns _provider
     *
     * @readonly
     * @memberof SharePointProvider
     */
    get provider(): AadTokenProvider;
    /**
     * returns _idToken
     *
     * @readonly
     * @type {boolean}
     * @memberof SharePointProvider
     */
    get isLoggedIn(): boolean;
    /**
     * Name used for analytics
     *
     * @readonly
     * @memberof IProvider
     */
    get name(): string;
    /**
     * privilege level for authentication
     *
     * @type {string[]}
     * @memberof SharePointProvider
     */
    scopes: string[];
    /**
     * authority
     *
     * @type {string}
     * @memberof SharePointProvider
     */
    authority: string;
    private _idToken;
    private _provider;
    constructor(context: WebPartContext);
    /**
     * uses provider to receive access token via SharePoint Provider
     *
     * @returns {Promise<string>}
     * @memberof SharePointProvider
     */
    getAccessToken(): Promise<string>;
    /**
     * update scopes
     *
     * @param {string[]} scopes
     * @memberof SharePointProvider
     */
    updateScopes(scopes: string[]): void;
    private internalLogin;
}
export {};
//# sourceMappingURL=SharePointProvider.d.ts.map