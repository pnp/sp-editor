import { ExternalTokenResponse } from "@azure/msal-common/browser";
import { SilentRequest } from "../request/SilentRequest.js";
import { LoadTokenOptions } from "./TokenCache.js";
import { AuthenticationResult } from "../response/AuthenticationResult.js";
export interface ITokenCache {
    /**
     * API to side-load tokens to MSAL cache
     * @returns `AuthenticationResult` for the response that was loaded.
     */
    loadExternalTokens(request: SilentRequest, response: ExternalTokenResponse, options: LoadTokenOptions): Promise<AuthenticationResult>;
}
//# sourceMappingURL=ITokenCache.d.ts.map