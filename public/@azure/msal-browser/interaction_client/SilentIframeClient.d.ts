import { AuthenticationResult, ICrypto, Logger } from "@azure/msal-common";
import { StandardInteractionClient } from "./StandardInteractionClient";
import { BrowserConfiguration } from "../config/Configuration";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { EventHandler } from "../event/EventHandler";
import { INavigationClient } from "../navigation/INavigationClient";
import { ApiId } from "../utils/BrowserConstants";
import { SsoSilentRequest } from "../request/SsoSilentRequest";
export declare class SilentIframeClient extends StandardInteractionClient {
    private apiId;
    constructor(config: BrowserConfiguration, storageImpl: BrowserCacheManager, browserCrypto: ICrypto, logger: Logger, eventHandler: EventHandler, navigationClient: INavigationClient, apiId: ApiId, correlationId?: string);
    /**
     * Acquires a token silently by opening a hidden iframe to the /authorize endpoint with prompt=none
     * @param request
     */
    acquireToken(request: SsoSilentRequest): Promise<AuthenticationResult>;
    /**
     * Currently Unsupported
     */
    logout(): Promise<void>;
    /**
     * Helper which acquires an authorization code silently using a hidden iframe from given url
     * using the scopes requested as part of the id, and exchanges the code for a set of OAuth tokens.
     * @param navigateUrl
     * @param userRequestScopes
     */
    private silentTokenHelper;
}
//# sourceMappingURL=SilentIframeClient.d.ts.map