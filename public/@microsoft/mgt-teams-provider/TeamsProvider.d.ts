/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { AuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/es/IAuthenticationProviderOptions';
import { Configuration } from 'msal';
import { MsalProvider } from '@microsoft/mgt-msal-provider';
declare global {
    interface Window {
        nativeInterface: any;
    }
}
/**
 * Interface to define the configuration when creating a TeamsProvider
 *
 * @export
 * @interface TeamsConfig
 */
export interface TeamsConfig {
    /**
     * The app clientId
     *
     * @type {string}
     * @memberof TeamsConfig
     */
    clientId: string;
    /**
     * The relative or absolute path of the html page that will handle the authentication
     *
     * @type {string}
     * @memberof TeamsConfig
     */
    authPopupUrl: string;
    /**
     * The scopes to use when authenticating the user
     *
     * @type {string[]}
     * @memberof TeamsConfig
     */
    scopes?: string[];
    /**
     * Additional Msal configurations options to use
     * See Msal.js documentation for more details
     *
     * @type {Configuration}
     * @memberof TeamsConfig
     */
    msalOptions?: Configuration;
}
/**
 * Enables authentication of Single page apps inside of a Microsoft Teams tab
 *
 * @export
 * @class TeamsProvider
 * @extends {MsalProvider}
 */
export declare class TeamsProvider extends MsalProvider {
    /**
     * Gets whether the Teams provider can be used in the current context
     * (Whether the app is running in Microsoft Teams)
     *
     * @readonly
     * @static
     * @memberof TeamsProvider
     */
    static get isAvailable(): boolean;
    /**
     * Optional entry point to the teams library
     * If this value is not set, the provider will attempt to use
     * the microsoftTeams global variable.
     *
     * @static
     * @memberof TeamsProvider
     */
    static get microsoftTeamsLib(): any;
    static set microsoftTeamsLib(value: any);
    /**
     * Name used for analytics
     *
     * @readonly
     * @memberof IProvider
     */
    get name(): string;
    /**
     * Handle all authentication redirects in the authentication page and authenticates the user
     *
     * @static
     * @returns
     * @memberof TeamsProvider
     */
    static handleAuth(): Promise<void>;
    private static _localStorageParametersKey;
    private static _sessionStorageLoginInProgress;
    private static _sessionStorageLogoutInProgress;
    private teamsContext;
    private _authPopupUrl;
    private _msalOptions;
    constructor(config: TeamsConfig);
    /**
     * Opens the teams authentication popup to the authentication page
     *
     * @returns {Promise<void>}
     * @memberof TeamsProvider
     */
    login(): Promise<void>;
    /**
     * sign out user
     *
     * @returns {Promise<void>}
     * @memberof MsalProvider
     */
    logout(): Promise<void>;
    /**
     * Returns an access token that can be used for making calls to the Microsoft Graph
     *
     * @param {AuthenticationProviderOptions} options
     * @returns {Promise<string>}
     * @memberof TeamsProvider
     */
    getAccessToken(options: AuthenticationProviderOptions): Promise<string>;
}
//# sourceMappingURL=TeamsProvider.d.ts.map