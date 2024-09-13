import { TokenRequest } from "../TokenRequest";
import { AccountInfo as NaaAccountInfo } from "../AccountInfo";
import { RedirectRequest } from "../../request/RedirectRequest";
import { PopupRequest } from "../../request/PopupRequest";
import { AccountInfo as MsalAccountInfo, AuthError, ClientAuthError, ClientConfigurationError, InteractionRequiredAuthError, ServerError, ICrypto, Logger, TokenClaims, AccountInfo, IdTokenEntity, AccessTokenEntity } from "@azure/msal-common";
import { AuthenticationResult } from "../../response/AuthenticationResult";
import { AuthResult } from "../AuthResult";
import { SsoSilentRequest } from "../../request/SsoSilentRequest";
import { SilentRequest } from "../../request/SilentRequest";
export declare class NestedAppAuthAdapter {
    protected crypto: ICrypto;
    protected logger: Logger;
    protected clientId: string;
    protected clientCapabilities: string[];
    constructor(clientId: string, clientCapabilities: string[], crypto: ICrypto, logger: Logger);
    toNaaTokenRequest(request: PopupRequest | RedirectRequest | SilentRequest | SsoSilentRequest): TokenRequest;
    fromNaaTokenResponse(request: TokenRequest, response: AuthResult, reqTimestamp: number): AuthenticationResult;
    fromNaaAccountInfo(fromAccount: NaaAccountInfo, idToken?: string, idTokenClaims?: TokenClaims): MsalAccountInfo;
    /**
     *
     * @param error BridgeError
     * @returns AuthError, ClientAuthError, ClientConfigurationError, ServerError, InteractionRequiredError
     */
    fromBridgeError(error: unknown): AuthError | ClientAuthError | ClientConfigurationError | ServerError | InteractionRequiredAuthError;
    /**
     * Returns an AuthenticationResult from the given cache items
     *
     * @param account
     * @param idToken
     * @param accessToken
     * @param reqTimestamp
     * @returns
     */
    toAuthenticationResultFromCache(account: AccountInfo, idToken: IdTokenEntity, accessToken: AccessTokenEntity, request: SilentRequest, correlationId: string): AuthenticationResult;
}
//# sourceMappingURL=NestedAppAuthAdapter.d.ts.map