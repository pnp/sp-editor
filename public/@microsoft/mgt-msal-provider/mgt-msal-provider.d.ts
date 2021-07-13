/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtBaseProvider } from '@microsoft/mgt-element';
/**
 * Authentication Library Provider for Microsoft personal accounts
 *
 * @export
 * @class MgtMsalProvider
 * @extends {MgtBaseProvider}
 */
export declare class MgtMsalProvider extends MgtBaseProvider {
    /**
     * String alphanumerical value relation to a specific user
     *
     * @memberof MgtMsalProvider
     */
    clientId: string;
    /**
     * The login type that should be used: popup or redirect
     *
     * @memberof MgtMsalProvider
     */
    loginType: any;
    /**
     * The authority to use.
     *
     * @memberof MgtMsalProvider
     */
    authority: any;
    /**
     * Comma separated list of scopes
     *
     * @memberof MgtMsalProvider
     */
    scopes: any;
    /**
     * The redirect uri to use
     *
     * @memberof MgtMsalProvider
     */
    redirectUri: any;
    /**
     * The domain hint to use during login
     *
     * @memberof MgtMsalProvider
     */
    domainHint: any;
    /**
     * The prompt type to use during login
     *
     * @memberof MgtMsalProvider
     */
    prompt: any;
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
     * @memberof MgtMsalProvider
     */
    protected initializeProvider(): void;
}
//# sourceMappingURL=mgt-msal-provider.d.ts.map