/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { AuthenticationProviderOptions } from '@microsoft/microsoft-graph-client';
import { IProvider } from './IProvider';
/**
 * Facilitates create of new custom provider
 *
 * @export
 * @class SimpleProvider
 * @extends {IProvider}
 */
export declare class SimpleProvider extends IProvider {
    private readonly _getAccessTokenHandler;
    private readonly _loginHandler;
    private readonly _logoutHandler;
    /**
     * Name used for analytics
     *
     * @readonly
     * @memberof IProvider
     */
    get name(): string;
    constructor(getAccessTokenHandler: (scopes: string[]) => Promise<string>, loginHandler?: () => Promise<void>, logoutHandler?: () => Promise<void>);
    /**
     * Invokes the getAccessToken function
     *
     * @param {AuthenticationProviderOptions} [options]
     * @returns {Promise<string>}
     * @memberof SimpleProvider
     */
    getAccessToken(options?: AuthenticationProviderOptions): Promise<string>;
    /**
     * Invokes login function
     *
     * @returns {Promise<void>}
     * @memberof SimpleProvider
     */
    login(): Promise<void>;
    /**
     * Invokes logout function
     *
     * @returns {Promise<void>}
     * @memberof SimpleProvider
     */
    logout(): Promise<void>;
}
//# sourceMappingURL=SimpleProvider.d.ts.map