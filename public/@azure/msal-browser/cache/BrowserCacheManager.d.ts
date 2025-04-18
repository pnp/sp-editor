import { CommonAuthorizationCodeRequest, ICrypto, AccountEntity, IdTokenEntity, AccessTokenEntity, RefreshTokenEntity, AppMetadataEntity, CacheManager, ServerTelemetryEntity, ThrottlingEntity, Logger, AuthorityMetadataEntity, AccountInfo, TokenKeys, CredentialType, CacheRecord, IPerformanceClient, StaticAuthorityOptions, StoreInCache } from "@azure/msal-common/browser";
import { CacheOptions } from "../config/Configuration.js";
import { InteractionType } from "../utils/BrowserConstants.js";
import { MemoryStorage } from "./MemoryStorage.js";
import { IWindowStorage } from "./IWindowStorage.js";
import { NativeTokenRequest } from "../broker/nativeBroker/NativeRequest.js";
import { AuthenticationResult } from "../response/AuthenticationResult.js";
import { SilentRequest } from "../request/SilentRequest.js";
import { SsoSilentRequest } from "../request/SsoSilentRequest.js";
import { RedirectRequest } from "../request/RedirectRequest.js";
import { PopupRequest } from "../request/PopupRequest.js";
import { CookieStorage } from "./CookieStorage.js";
import { EventHandler } from "../event/EventHandler.js";
/**
 * This class implements the cache storage interface for MSAL through browser local or session storage.
 * Cookies are only used if storeAuthStateInCookie is true, and are only used for
 * parameters such as state and nonce, generally.
 */
export declare class BrowserCacheManager extends CacheManager {
    protected cacheConfig: Required<CacheOptions>;
    protected browserStorage: IWindowStorage<string>;
    protected internalStorage: MemoryStorage<string>;
    protected temporaryCacheStorage: IWindowStorage<string>;
    protected cookieStorage: CookieStorage;
    protected logger: Logger;
    protected performanceClient: IPerformanceClient;
    private eventHandler;
    constructor(clientId: string, cacheConfig: Required<CacheOptions>, cryptoImpl: ICrypto, logger: Logger, performanceClient: IPerformanceClient, eventHandler: EventHandler, staticAuthorityOptions?: StaticAuthorityOptions);
    initialize(correlationId: string): Promise<void>;
    /**
     * Parses passed value as JSON object, JSON.parse() will throw an error.
     * @param input
     */
    protected validateAndParseJson(jsonValue: string): object | null;
    /**
     * Reads account from cache, deserializes it into an account entity and returns it.
     * If account is not found from the key, returns null and removes key from map.
     * @param accountKey
     * @returns
     */
    getAccount(accountKey: string): AccountEntity | null;
    /**
     * set account entity in the platform cache
     * @param account
     */
    setAccount(account: AccountEntity, correlationId: string): Promise<void>;
    /**
     * Returns the array of account keys currently cached
     * @returns
     */
    getAccountKeys(): Array<string>;
    /**
     * Add a new account to the key map
     * @param key
     */
    addAccountKeyToMap(key: string): boolean;
    /**
     * Remove an account from the key map
     * @param key
     */
    removeAccountKeyFromMap(key: string): void;
    /**
     * Extends inherited removeAccount function to include removal of the account key from the map
     * @param key
     */
    removeAccount(key: string): Promise<void>;
    /**
     * Removes credentials associated with the provided account
     * @param account
     */
    removeAccountContext(account: AccountEntity): Promise<void>;
    /**
     * Removes given idToken from the cache and from the key map
     * @param key
     */
    removeIdToken(key: string): void;
    /**
     * Removes given accessToken from the cache and from the key map
     * @param key
     */
    removeAccessToken(key: string): Promise<void>;
    /**
     * Removes given refreshToken from the cache and from the key map
     * @param key
     */
    removeRefreshToken(key: string): void;
    /**
     * Gets the keys for the cached tokens associated with this clientId
     * @returns
     */
    getTokenKeys(): TokenKeys;
    /**
     * Adds the given key to the token key map
     * @param key
     * @param type
     */
    addTokenKey(key: string, type: CredentialType): void;
    /**
     * Removes the given key from the token key map
     * @param key
     * @param type
     */
    removeTokenKey(key: string, type: CredentialType): void;
    /**
     * generates idToken entity from a string
     * @param idTokenKey
     */
    getIdTokenCredential(idTokenKey: string): IdTokenEntity | null;
    /**
     * set IdToken credential to the platform cache
     * @param idToken
     */
    setIdTokenCredential(idToken: IdTokenEntity, correlationId: string): Promise<void>;
    /**
     * generates accessToken entity from a string
     * @param key
     */
    getAccessTokenCredential(accessTokenKey: string): AccessTokenEntity | null;
    /**
     * set accessToken credential to the platform cache
     * @param accessToken
     */
    setAccessTokenCredential(accessToken: AccessTokenEntity, correlationId: string): Promise<void>;
    /**
     * generates refreshToken entity from a string
     * @param refreshTokenKey
     */
    getRefreshTokenCredential(refreshTokenKey: string): RefreshTokenEntity | null;
    /**
     * set refreshToken credential to the platform cache
     * @param refreshToken
     */
    setRefreshTokenCredential(refreshToken: RefreshTokenEntity, correlationId: string): Promise<void>;
    /**
     * fetch appMetadata entity from the platform cache
     * @param appMetadataKey
     */
    getAppMetadata(appMetadataKey: string): AppMetadataEntity | null;
    /**
     * set appMetadata entity to the platform cache
     * @param appMetadata
     */
    setAppMetadata(appMetadata: AppMetadataEntity): void;
    /**
     * fetch server telemetry entity from the platform cache
     * @param serverTelemetryKey
     */
    getServerTelemetry(serverTelemetryKey: string): ServerTelemetryEntity | null;
    /**
     * set server telemetry entity to the platform cache
     * @param serverTelemetryKey
     * @param serverTelemetry
     */
    setServerTelemetry(serverTelemetryKey: string, serverTelemetry: ServerTelemetryEntity): void;
    /**
     *
     */
    getAuthorityMetadata(key: string): AuthorityMetadataEntity | null;
    /**
     *
     */
    getAuthorityMetadataKeys(): Array<string>;
    /**
     * Sets wrapper metadata in memory
     * @param wrapperSKU
     * @param wrapperVersion
     */
    setWrapperMetadata(wrapperSKU: string, wrapperVersion: string): void;
    /**
     * Returns wrapper metadata from in-memory storage
     */
    getWrapperMetadata(): [string, string];
    /**
     *
     * @param entity
     */
    setAuthorityMetadata(key: string, entity: AuthorityMetadataEntity): void;
    /**
     * Gets the active account
     */
    getActiveAccount(): AccountInfo | null;
    /**
     * Sets the active account's localAccountId in cache
     * @param account
     */
    setActiveAccount(account: AccountInfo | null): void;
    /**
     * fetch throttling entity from the platform cache
     * @param throttlingCacheKey
     */
    getThrottlingCache(throttlingCacheKey: string): ThrottlingEntity | null;
    /**
     * set throttling entity to the platform cache
     * @param throttlingCacheKey
     * @param throttlingCache
     */
    setThrottlingCache(throttlingCacheKey: string, throttlingCache: ThrottlingEntity): void;
    /**
     * Gets cache item with given key.
     * Will retrieve from cookies if storeAuthStateInCookie is set to true.
     * @param key
     */
    getTemporaryCache(cacheKey: string, generateKey?: boolean): string | null;
    /**
     * Sets the cache item with the key and value given.
     * Stores in cookie if storeAuthStateInCookie is set to true.
     * This can cause cookie overflow if used incorrectly.
     * @param key
     * @param value
     */
    setTemporaryCache(cacheKey: string, value: string, generateKey?: boolean): void;
    /**
     * Removes the cache item with the given key.
     * @param key
     */
    removeItem(key: string): void;
    /**
     * Removes the temporary cache item with the given key.
     * Will also clear the cookie item if storeAuthStateInCookie is set to true.
     * @param key
     */
    removeTemporaryItem(key: string): void;
    /**
     * Gets all keys in window.
     */
    getKeys(): string[];
    /**
     * Clears all cache entries created by MSAL.
     */
    clear(): Promise<void>;
    /**
     * Clears all access tokes that have claims prior to saving the current one
     * @param performanceClient {IPerformanceClient}
     * @param correlationId {string} correlation id
     * @returns
     */
    clearTokensAndKeysWithClaims(performanceClient: IPerformanceClient, correlationId: string): Promise<void>;
    /**
     * Prepend msal.<client-id> to each key; Skip for any JSON object as Key (defined schemas do not need the key appended: AccessToken Keys or the upcoming schema)
     * @param key
     * @param addInstanceId
     */
    generateCacheKey(key: string): string;
    /**
     * Create authorityKey to cache authority
     * @param state
     */
    generateAuthorityKey(stateString: string): string;
    /**
     * Create Nonce key to cache nonce
     * @param state
     */
    generateNonceKey(stateString: string): string;
    /**
     * Creates full cache key for the request state
     * @param stateString State string for the request
     */
    generateStateKey(stateString: string): string;
    /**
     * Gets the cached authority based on the cached state. Returns empty if no cached state found.
     */
    getCachedAuthority(cachedState: string): string | null;
    /**
     * Updates account, authority, and state in cache
     * @param serverAuthenticationRequest
     * @param account
     */
    updateCacheEntries(state: string, nonce: string, authorityInstance: string, loginHint: string, account: AccountInfo | null): void;
    /**
     * Reset all temporary cache items
     * @param state
     */
    resetRequestCache(state: string): void;
    /**
     * Removes temporary cache for the provided state
     * @param stateString
     */
    cleanRequestByState(stateString: string): void;
    /**
     * Looks in temporary cache for any state values with the provided interactionType and removes all temporary cache items for that state
     * Used in scenarios where temp cache needs to be cleaned but state is not known, such as clicking browser back button.
     * @param interactionType
     */
    cleanRequestByInteractionType(interactionType: InteractionType): void;
    cacheCodeRequest(authCodeRequest: CommonAuthorizationCodeRequest): void;
    /**
     * Gets the token exchange parameters from the cache. Throws an error if nothing is found.
     */
    getCachedRequest(state: string): CommonAuthorizationCodeRequest;
    /**
     * Gets cached native request for redirect flows
     */
    getCachedNativeRequest(): NativeTokenRequest | null;
    isInteractionInProgress(matchClientId?: boolean): boolean;
    getInteractionInProgress(): string | null;
    setInteractionInProgress(inProgress: boolean): void;
    /**
     * Builds credential entities from AuthenticationResult object and saves the resulting credentials to the cache
     * @param result
     * @param request
     */
    hydrateCache(result: AuthenticationResult, request: SilentRequest | SsoSilentRequest | RedirectRequest | PopupRequest): Promise<void>;
    /**
     * saves a cache record
     * @param cacheRecord {CacheRecord}
     * @param storeInCache {?StoreInCache}
     * @param correlationId {?string} correlation id
     */
    saveCacheRecord(cacheRecord: CacheRecord, correlationId: string, storeInCache?: StoreInCache): Promise<void>;
}
export declare const DEFAULT_BROWSER_CACHE_MANAGER: (clientId: string, logger: Logger, performanceClient: IPerformanceClient, eventHandler: EventHandler) => BrowserCacheManager;
//# sourceMappingURL=BrowserCacheManager.d.ts.map