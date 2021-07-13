/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IProvider } from '../providers/IProvider';
import { MockGraph } from './MockGraph';
/**
 * Mock Provider access token for Microsoft Graph APIs
 *
 * @export
 * @class MockProvider
 * @extends {IProvider}
 */
export declare class MockProvider extends IProvider {
    provider: any;
    /**
     * new instance of mock graph provider
     *
     * @memberof MockProvider
     */
    graph: MockGraph;
    constructor(signedIn?: boolean);
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
}
//# sourceMappingURL=MockProvider.d.ts.map