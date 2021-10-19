import { ICrypto, Logger, ServerTelemetryManager, CommonAuthorizationCodeRequest, AuthorizationCodeClient, ClientConfiguration, Authority, CommonEndSessionRequest } from "@azure/msal-common";
import { BaseInteractionClient } from "./BaseInteractionClient";
import { BrowserConfiguration } from "../config/Configuration";
import { AuthorizationUrlRequest } from "../request/AuthorizationUrlRequest";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { EventHandler } from "../event/EventHandler";
import { InteractionType } from "../utils/BrowserConstants";
import { EndSessionRequest } from "../request/EndSessionRequest";
import { INavigationClient } from "../navigation/INavigationClient";
import { RedirectRequest } from "../request/RedirectRequest";
import { PopupRequest } from "../request/PopupRequest";
import { SsoSilentRequest } from "../request/SsoSilentRequest";
/**
 * Defines the class structure and helper functions used by the "standard", non-brokered auth flows (popup, redirect, silent (RT), silent (iframe))
 */
export declare abstract class StandardInteractionClient extends BaseInteractionClient {
    protected navigationClient: INavigationClient;
    constructor(config: BrowserConfiguration, storageImpl: BrowserCacheManager, browserCrypto: ICrypto, logger: Logger, eventHandler: EventHandler, navigationClient: INavigationClient, correlationId?: string);
    /**
     * Generates an auth code request tied to the url request.
     * @param request
     */
    protected initializeAuthorizationCodeRequest(request: AuthorizationUrlRequest): Promise<CommonAuthorizationCodeRequest>;
    /**
     * Initializer for the logout request.
     * @param logoutRequest
     */
    protected initializeLogoutRequest(logoutRequest?: EndSessionRequest): CommonEndSessionRequest;
    /**
     * Creates an Authorization Code Client with the given authority, or the default authority.
     * @param serverTelemetryManager
     * @param authorityUrl
     */
    protected createAuthCodeClient(serverTelemetryManager: ServerTelemetryManager, authorityUrl?: string): Promise<AuthorizationCodeClient>;
    /**
     * Creates a Client Configuration object with the given request authority, or the default authority.
     * @param serverTelemetryManager
     * @param requestAuthority
     * @param requestCorrelationId
     */
    protected getClientConfiguration(serverTelemetryManager: ServerTelemetryManager, requestAuthority?: string): Promise<ClientConfiguration>;
    /**
     * @param hash
     * @param interactionType
     */
    protected validateAndExtractStateFromHash(hash: string, interactionType: InteractionType, requestCorrelationId?: string): string;
    /**
     * Used to get a discovered version of the default authority.
     * @param requestAuthority
     * @param requestCorrelationId
     */
    protected getDiscoveredAuthority(requestAuthority?: string): Promise<Authority>;
    /**
     * Helper to validate app environment before making a request.
     * @param request
     * @param interactionType
     */
    protected preflightInteractiveRequest(request: RedirectRequest | PopupRequest, interactionType: InteractionType): AuthorizationUrlRequest;
    /**
     * Helper to initialize required request parameters for interactive APIs and ssoSilent()
     * @param request
     * @param interactionType
     */
    protected initializeAuthorizationRequest(request: RedirectRequest | PopupRequest | SsoSilentRequest, interactionType: InteractionType): AuthorizationUrlRequest;
}
//# sourceMappingURL=StandardInteractionClient.d.ts.map