/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IProvider, IProviderAccount } from '../providers/IProvider';
import { MockGraph } from './MockGraph';
/**
 * Mock Provider access token for Microsoft Graph APIs
 *
 * @export
 * @class MockProvider
 * @extends {IProvider}
 */
export declare class MockProvider extends IProvider {
    provider: IProvider;
    private readonly _mockGraphPromise;
    /**
     * new instance of mock graph provider
     *
     * @memberof MockProvider
     */
    graph: MockGraph;
    constructor(signedIn?: boolean, signedInAccounts?: IProviderAccount[]);
    /**
     * Indicates if the MockProvider is configured to support multi account mode
     * This is only true if the Mock provider has been configured with signedInAccounts in the constructor
     *
     * @readonly
     * @type {boolean}
     * @memberof MockProvider
     */
    get isMultiAccountSupportedAndEnabled(): boolean;
    private readonly _accounts;
    /**
     * Returns the array of accounts the MockProviders has been configured with
     *
     * @return {*}  {IProviderAccount[]}
     * @memberof MockProvider
     */
    getAllAccounts?(): IProviderAccount[];
    /**
     * Returns the first account in the set of accounts the MockProvider has been configured with
     *
     * @return {*}  {IProviderAccount}
     * @memberof MockProvider
     */
    getActiveAccount?(): IProviderAccount;
    /**
     * sets Provider state to SignedIn
     *
     * @returns {Promise<void>}
     * @memberof MockProvider
     */
    login(): Promise<void>;
    /**
     * sets Provider state to signed out
     *
     * @returns {Promise<void>}
     * @memberof MockProvider
     */
    logout(): Promise<void>;
    /**
     * Promise returning token from graph.microsoft.com
     *
     * @returns {Promise<string>}
     * @memberof MockProvider
     */
    getAccessToken(): Promise<string>;
    /**
     * Name used for analytics
     *
     * @readonly
     * @memberof IProvider
     */
    get name(): string;
    private initializeMockGraph;
}
//# sourceMappingURL=MockProvider.d.ts.map