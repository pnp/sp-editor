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
    /**
     * Enable/Disable multi account functionality
     *
     * @protected
     * @type {boolean}
     * @memberof IProvider
     */
    protected isMultipleAccountDisabled: boolean;
    private _state;
    private _loginChangedDispatcher;
    private _activeAccountChangedDispatcher;
    /**
     * Enable/Disable incremental consent
     *
     * @protected
     * @type {boolean}
     * @memberof IProvider
     */
    private _isIncrementalConsentDisabled;
    /**
     * returns state of Provider
     *
     * @readonly
     * @type {ProviderState}
     * @memberof IProvider
     */
    get state(): ProviderState;
    /**
     * Incremental consent setting
     *
     * @readonly
     * @memberof IProvider
     */
    get isIncrementalConsentDisabled(): boolean;
    /**
     * Enable/Disable incremental consent
     *
     * @readonly
     * @memberof IProvider
     */
    set isIncrementalConsentDisabled(disabled: boolean);
    /**
     * Name used for analytics
     *
     * @readonly
     * @memberof IProvider
     */
    get name(): string;
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
     * Returns all signed in accounts.
     *
     * @return {*}  {any[]}
     * @memberof IProvider
     */
    getAllAccounts?(): IProviderAccount[];
    /**
     * Switch between two signed in accounts
     *
     * @param {*} user
     * @memberof IProvider
     */
    setActiveAccount?(user: IProviderAccount): void;
    /**
     * Event handler when Active account changes
     *
     * @param {EventHandler<ActiveAccountChanged>} eventHandler
     * @memberof IProvider
     */
    onActiveAccountChanged(eventHandler: EventHandler<ActiveAccountChanged>): void;
    /**
     * Removes event handler for when Active account changes
     *
     * @param {EventHandler<ActiveAccountChanged>} eventHandler
     * @memberof IProvider
     */
    removeActiveAccountChangedHandler(eventHandler: EventHandler<ActiveAccountChanged>): void;
    /**
     * Fires event when active account changes
     *
     * @memberof IProvider
     */
    private fireActiveAccountChanged;
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
 * ActiveAccountChanged Event
 *
 * @export
 * @interface ActiveAccountChanged
 */
export interface ActiveAccountChanged {
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
/**
 * Account details
 *
 * @export
 */
export type IProviderAccount = {
    username?: string;
    id: string;
};
//# sourceMappingURL=IProvider.d.ts.map