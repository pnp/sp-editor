/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtBaseProvider } from '@microsoft/mgt-element';
/**
 * Authentication component for ProxyProvider
 *
 * @export
 * @class MgtProxyProvider
 * @extends {LitElement}
 */
export declare class MgtProxyProvider extends MgtBaseProvider {
    /**
     * The base url to the proxy api
     *
     * @type {string}
     * @memberof MgtProxyProvider
     */
    graphProxyUrl: string;
    /**
     * Gets whether this provider can be used in this environment
     *
     * @readonly
     * @memberof MgtMsalProvider
     */
    get isAvailable(): boolean;
    /**
     * method called to initialize the provider. Each derived class should provide their own implementation.
     *
     * @protected
     * @memberof MgtProxyProvider
     */
    protected initializeProvider(): void;
}
//# sourceMappingURL=mgt-proxy-provider.d.ts.map