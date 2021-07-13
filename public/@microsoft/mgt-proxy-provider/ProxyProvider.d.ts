/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IProvider, Graph } from '@microsoft/mgt-element';
/**
 * Proxy Provider access token for Microsoft Graph APIs
 *
 * @export
 * @class ProxyProvider
 * @extends {IProvider}
 */
export declare class ProxyProvider extends IProvider {
    /**
     * new instance of proxy graph provider
     *
     * @memberof ProxyProvider
     */
    graph: Graph;
    /**
     * Name used for analytics
     *
     * @readonly
     * @memberof IProvider
     */
    get name(): string;
    constructor(graphProxyUrl: string, getCustomHeaders?: () => Promise<object>);
    /**
     * Promise returning token
     *
     * @returns {Promise<string>}
     * @memberof ProxyProvider
     */
    getAccessToken(): Promise<string>;
}
//# sourceMappingURL=ProxyProvider.d.ts.map