/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtBaseProvider } from '@microsoft/mgt-element';
/**
 * Authentication Library Provider for Microsoft Teams accounts
 *
 * @export
 * @class MgtTeamsProvider
 * @extends {MgtBaseProvider}
 */
export declare class MgtTeamsProvider extends MgtBaseProvider {
    /**
     * String alphanumerical value relation to a specific user
     *
     * @memberof MgtTeamsProvider
     */
    clientId: string;
    /**
     * The relative or absolute path of the html page that will handle the authentication
     *
     * @memberof MgtTeamsProvider
     */
    authPopupUrl: string;
    /**
     * The authority to use.
     *
     * @memberof MgtTeamsProvider
     */
    authority: any;
    /**
     * Comma separated list of scopes.
     *
     * @memberof MgtTeamsProvider
     */
    scopes: any;
    /**
     * Gets whether this provider can be used in this environment
     *
     * @readonly
     * @memberof MgtTeamsProvider
     */
    get isAvailable(): boolean;
    /**
     * method called to initialize the provider. Each derived class should provide their own implementation
     *
     * @protected
     * @memberof MgtTeamsProvider
     */
    protected initializeProvider(): void;
}
//# sourceMappingURL=mgt-teams-provider.d.ts.map