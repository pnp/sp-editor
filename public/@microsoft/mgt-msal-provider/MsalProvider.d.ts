/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { AuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/es/IAuthenticationProviderOptions';
import { IProvider, LoginType } from '@microsoft/mgt-element';
import { AuthenticationParameters, Configuration, UserAgentApplication } from 'msal';
/**
 * base config for MSAL authentication
 *
 * @export
 * @interface MsalConfigBase
 */
interface MsalConfigBase {
    /**
     * scopes
     *
     * @type {string[]}
     * @memberof MsalConfigBase
     */
    scopes?: string[];
    /**
     * loginType if login uses popup
     *
     * @type {LoginType}
     * @memberof MsalConfigBase
     */
    loginType?: LoginType;
    /**
     * login hint value
     *
     * @type {string}
     * @memberof MsalConfigBase
     */
    loginHint?: string;
    /**
     * Domain hint value
     *
     * @type {string}
     * @memberof MsalConfigBase
     */
    domainHint?: string;
    /**
     * prompt value
     *
     * @type {string}
     * @memberof MsalConfigBase
     */
    prompt?: string;
}
/**
 * config for MSAL authentication where a UserAgentApplication already exists
 *
 * @export
 * @interface MsalConfig
 */
export interface MsalUserAgentApplicationConfig extends MsalConfigBase {
    /**
     * UserAgentApplication instance to use
     *
     * @type {UserAgentApplication}
     * @memberof MsalConfig
     */
    userAgentApplication: UserAgentApplication;
}
/**
 * config for MSAL authentication
 *
 * @export
 * @interface MsalConfig
 */
export interface MsalConfig extends MsalConfigBase {
    /**
     * clientId alphanumeric code
     *
     * @type {string}
     * @memberof MsalConfig
     */
    clientId: string;
    /**
     * config authority
     *
     * @type {string}
     * @memberof MsalConfig
     */
    authority?: string;
    /**
     * options as defined in
     * https://learn.microsoft.com/azure/active-directory/develop/msal-js-initializing-client-applications#configuration-options
     *
     * @type {Configuration}
     * @memberof MsalConfig
     */
    options?: Configuration;
    /**
     * redirect Uri
     *
     * @type {string}
     * @memberof MsalConfig
     */
    redirectUri?: string;
}
/**
 * Msal Provider using MSAL.js to aquire tokens for authentication
 *
 * @export
 * @class MsalProvider
 * @extends {IProvider}
 */
export declare class MsalProvider extends IProvider {
    /**
     * authentication parameter
     *
     * @type {string[]}
     * @memberof MsalProvider
     */
    scopes: string[];
    /**
     * Gets the user agent application instance
     *
     * @protected
     * @type {UserAgentApplication}
     * @memberof MsalProvider
     */
    get userAgentApplication(): UserAgentApplication;
    /**
     * Name used for analytics
     *
     * @readonly
     * @memberof IProvider
     */
    get name(): string;
    /**
     * client-id authentication
     *
     * @protected
     * @type {string}
     * @memberof MsalProvider
     */
    protected clientId: string;
    private _userAgentApplication;
    private _loginType;
    private _loginHint;
    private _domainHint;
    private _prompt;
    private sessionStorageRequestedScopesKey;
    private sessionStorageDeniedScopesKey;
    constructor(config: MsalConfig | MsalUserAgentApplicationConfig);
    /**
     * attempts to sign in user silently
     *
     * @returns
     * @memberof MsalProvider
     */
    trySilentSignIn(): Promise<void>;
    /**
     * sign in user
     *
     * @param {AuthenticationParameters} [authenticationParameters]
     * @returns {Promise<void>}
     * @memberof MsalProvider
     */
    login(authenticationParameters?: AuthenticationParameters): Promise<void>;
    /**
     * sign out user
     *
     * @returns {Promise<void>}
     * @memberof MsalProvider
     */
    logout(): Promise<void>;
    /**
     * returns an access token for scopes
     *
     * @param {AuthenticationProviderOptions} options
     * @returns {Promise<string>}
     * @memberof MsalProvider
     */
    getAccessToken(options: AuthenticationProviderOptions): Promise<string>;
    /**
     * sets scopes
     *
     * @param {string[]} scopes
     * @memberof MsalProvider
     */
    updateScopes(scopes: string[]): void;
    /**
     * checks if error indicates a user interaction is required
     *
     * @protected
     * @param {*} error
     * @returns
     * @memberof MsalProvider
     */
    protected requiresInteraction(error: any): boolean;
    /**
     * setting scopes in sessionStorage
     *
     * @protected
     * @param {string[]} scopes
     * @memberof MsalProvider
     */
    protected setRequestedScopes(scopes: string[]): void;
    /**
     * getting scopes from sessionStorage if they exist
     *
     * @protected
     * @returns
     * @memberof MsalProvider
     */
    protected getRequestedScopes(): any;
    /**
     * clears requested scopes from sessionStorage
     *
     * @protected
     * @memberof MsalProvider
     */
    protected clearRequestedScopes(): void;
    /**
     * sets Denied scopes to sessionStoage
     *
     * @protected
     * @param {string[]} scopes
     * @memberof MsalProvider
     */
    protected addDeniedScopes(scopes: string[]): void;
    /**
     * gets deniedScopes from sessionStorage
     *
     * @protected
     * @returns
     * @memberof MsalProvider
     */
    protected getDeniedScopes(): any;
    /**
     * if scopes are denied
     *
     * @protected
     * @param {string[]} scopes
     * @returns
     * @memberof MsalProvider
     */
    protected areScopesDenied(scopes: string[]): boolean;
    private initProvider;
    private tokenReceivedCallback;
    private errorReceivedCallback;
}
export {};
//# sourceMappingURL=MsalProvider.d.ts.map