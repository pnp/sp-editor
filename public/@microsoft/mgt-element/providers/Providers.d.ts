/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Client } from '@microsoft/microsoft-graph-client';
import { User } from '@microsoft/microsoft-graph-types';
import { EventHandler } from '../utils/EventDispatcher';
import { IProvider } from './IProvider';
/**
 * Provides implementation for acquiring the necessary access token for calling the Microsoft Graph APIs.
 *
 * @export
 * @class Providers
 */
export declare class Providers {
    /**
     * returns the value of provider used globally. All components use this property to get a reference to the provider.
     *
     * @static
     * @type {IProvider}
     * @memberof Providers
     */
    static get globalProvider(): IProvider;
    static set globalProvider(provider: IProvider);
    /**
     * Fires event when Provider changes state
     *
     * @static
     * @param {EventHandler<ProvidersChangedState>} event
     * @memberof Providers
     */
    static onProviderUpdated(event: EventHandler<ProvidersChangedState>): void;
    /**
     * Remove event handler
     *
     * @static
     * @param {EventHandler<ProvidersChangedState>} event
     * @memberof Providers
     */
    static removeProviderUpdatedListener(event: EventHandler<ProvidersChangedState>): void;
    /**
     * Fires event when Provider changes state
     *
     * @static
     * @param {EventHandler<ProvidersChangedState>} event
     * @memberof Providers
     */
    static onActiveAccountChanged(event: EventHandler<any>): void;
    /**
     * Remove event handler
     *
     * @static
     * @param {EventHandler<ProvidersChangedState>} event
     * @memberof Providers
     */
    static removeActiveAccountChangedListener(event: EventHandler<any>): void;
    /**
     * Gets the current signed in user
     *
     * @static
     * @memberof Providers
     */
    static me(): Promise<User>;
    /**
     * Gets the current graph client
     *
     * @readonly
     * @static
     * @type {Client}
     * @memberof Providers
     */
    static get client(): Client;
    private static _eventDispatcher;
    private static _activeAccountChangedDispatcher;
    private static _globalProvider;
    private static _me;
    private static handleProviderStateChanged;
    private static handleActiveAccountChanged;
}
/**
 * on Provider Change State
 *
 * @export
 * @enum {number}
 */
export declare enum ProvidersChangedState {
    /**
     * ProviderChanged = 0
     */
    ProviderChanged = 0,
    /**
     * ProviderStateChanged = 1
     */
    ProviderStateChanged = 1
}
//# sourceMappingURL=Providers.d.ts.map