import { ICrypto, Logger, ExternalTokenResponse } from "@azure/msal-common";
import { BrowserConfiguration } from "../config/Configuration";
import { SilentRequest } from "../request/SilentRequest";
import { BrowserCacheManager } from "./BrowserCacheManager";
import { ITokenCache } from "./ITokenCache";
export declare type LoadTokenOptions = {
    clientInfo?: string;
    extendedExpiresOn?: number;
};
/**
 * Token cache manager
 */
export declare class TokenCache implements ITokenCache {
    isBrowserEnvironment: boolean;
    protected config: BrowserConfiguration;
    private storage;
    private logger;
    private cryptoObj;
    constructor(configuration: BrowserConfiguration, storage: BrowserCacheManager, logger: Logger, cryptoObj: ICrypto);
    /**
     * API to load tokens to msal-browser cache.
     * @param request
     * @param response
     * @param options
     */
    loadExternalTokens(request: SilentRequest, response: ExternalTokenResponse, options: LoadTokenOptions): void;
    /**
     * Helper function to load id tokens to msal-browser cache
     * @param idToken
     * @param homeAccountId
     * @param environment
     * @param tenantId
     * @param options
     */
    private loadIdToken;
    /**
     * Helper function to load access tokens to msal-browser cache
     * @param request
     * @param response
     * @param options
     * @param homeAccountId
     * @param environment
     * @param tenantId
     * @returns
     */
    private loadAccessToken;
}
//# sourceMappingURL=TokenCache.d.ts.map