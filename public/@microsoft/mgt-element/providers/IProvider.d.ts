/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { AuthenticationProvider } from '@microsoft/microsoft-graph-client/lib/es/IAuthenticationProvider';
import { AuthenticationProviderOptions } from '@microsoft/microsoft-graph-client/lib/es/IAuthenticationProviderOptions';
import { IGraph } from '../IGraph';
import { EventHandler } from '../utils/EventDispatcher';
/**
 * Provider Type to be extended for implmenting new providers
 *
 * @export
 * @abstract
 * @class IProvider
 * @implements {AuthenticationProvider}
 */
export declare abstract class IProvider implements AuthenticationProvider {
    /**
     * The Graph object that contains the Graph client sdk
     *
     * @type {Graph}
     * @memberof IProvider
     */
    graph: IGraph;
    private _state;
    private _loginChangedDispatcher;
    /**
     * returns state of Provider
     *
     * @readonly
     * @type {ProviderState}
     * @memberof IProvider
     */
    get state(): ProviderState;
    constructor();
    /**
     * sets state of Provider and fires loginchangedDispatcher
     *
     * @param {ProviderState} state
     * @memberof IProvider
     */
    setState(state: ProviderState): void;
    /**
     * event handler when login changes
     *
     * @param {EventHandler<LoginChangedEvent>} eventHandler
     * @memberof IProvider
     */
    onStateChanged(eventHandler: EventHandler<LoginChangedEvent>): void;
    /**
     * removes event handler for when login changes
     *
     * @param {EventHandler<LoginChangedEvent>} eventHandler
     * @memberof IProvider
     */
    removeStateChangedHandler(eventHandler: EventHandler<LoginChangedEvent>): void;
    /**
     * option implementation that can be called to sign in user (required for mgt-login to work)
     *
     * @returns {Promise<void>}
     * @memberof IProvider
     */
    login?(): Promise<void>;
    /**
     * optional implementation that can be called to sign out user (required for mgt-login to work)
     *
     * @returns {Promise<void>}
     * @memberof IProvider
     */
    logout?(): Promise<void>;
    /**
     * uses scopes to recieve access token
     *
     * @param {...string[]} scopes
     * @returns {Promise<string>}
     * @memberof IProvider
     */
    getAccessTokenForScopes(...scopes: string[]): Promise<string>;
    /**
     * Promise to receive access token using Provider options
     *
     * @abstract
     * @param {AuthenticationProviderOptions} [options]
     * @returns {Promise<string>}
     * @memberof IProvider
     */
    abstract getAccessToken(options?: AuthenticationProviderOptions): Promise<string>;
}
/**
 * loginChangedEvent
 *
 * @export
 * @interface LoginChangedEvent
 */
export interface LoginChangedEvent {
}
/**
 * LoginType
 *
 * @export
 * @enum {number}
 */
export declare enum LoginType {
    /**
     * Popup = 0
     */
    Popup = 0,
    /**
     * Redirect = 1
     */
    Redirect = 1
}
/**
 * ProviderState
 *
 * @export
 * @enum {number}
 */
export declare enum ProviderState {
    /**
     * Loading = 0
     */
    Loading = 0,
    /**
     * SignedOut = 1
     */
    SignedOut = 1,
    /**
     * SignedIn = 2
     */
    SignedIn = 2
}
//# sourceMappingURL=IProvider.d.ts.map