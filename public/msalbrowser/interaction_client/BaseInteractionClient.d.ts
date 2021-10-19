import { ICrypto, INetworkModule, Logger, AuthenticationResult, AccountInfo } from "@azure/msal-common";
import { BrowserConfiguration } from "../config/Configuration";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { EventHandler } from "../event/EventHandler";
import { EndSessionRequest } from "../request/EndSessionRequest";
import { RedirectRequest } from "../request/RedirectRequest";
import { PopupRequest } from "../request/PopupRequest";
import { SsoSilentRequest } from "../request/SsoSilentRequest";
export declare abstract class BaseInteractionClient {
    protected config: BrowserConfiguration;
    protected browserStorage: BrowserCacheManager;
    protected browserCrypto: ICrypto;
    protected networkClient: INetworkModule;
    protected logger: Logger;
    protected eventHandler: EventHandler;
    protected correlationId: string;
    constructor(config: BrowserConfiguration, storageImpl: BrowserCacheManager, browserCrypto: ICrypto, logger: Logger, eventHandler: EventHandler, correlationId?: string);
    abstract acquireToken(request: RedirectRequest | PopupRequest | SsoSilentRequest): Promise<AuthenticationResult | void>;
    abstract logout(request: EndSessionRequest): Promise<void>;
    protected clearCacheOnLogout(account?: AccountInfo | null): Promise<void>;
}
//# sourceMappingURL=BaseInteractionClient.d.ts.map