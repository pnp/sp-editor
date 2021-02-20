/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * A helper class for interacting with the Teams Client SDK.
 *
 * @export
 * @class TeamsHelper
 */
export declare class TeamsHelper {
    /**
     * Optional entry point to the teams library
     * If this value is not set, the provider will attempt to use
     * the microsoftTeams global variable.
     *
     * @static
     * @type {*}
     * @memberof TeamsHelper
     */
    static get microsoftTeamsLib(): any;
    static set microsoftTeamsLib(value: any);
    /**
     * Gets whether the Teams provider can be used in the current context
     * (Whether the app is running in Microsoft Teams)
     *
     * @readonly
     * @static
     * @memberof TeamsHelper
     */
    static get isAvailable(): boolean;
    /**
     * Execute a deeplink against the Teams lib.
     *
     * @static
     * @param {string} deeplink
     * @param {(status: boolean, reason?: string) => void} [onComplete]
     * @memberof TeamsHelper
     */
    static executeDeepLink(deeplink: string, onComplete?: (status: boolean, reason?: string) => void): void;
    private static _microsoftTeamsLib;
}
//# sourceMappingURL=TeamsHelper.d.ts.map