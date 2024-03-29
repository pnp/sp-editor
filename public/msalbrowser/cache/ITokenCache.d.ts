import { ExternalTokenResponse } from "@azure/msal-common";
import { SilentRequest } from "../request/SilentRequest";
import { LoadTokenOptions } from "./TokenCache";
export interface ITokenCache {
    /** API to side-load tokens to MSAL cache */
    loadExternalTokens(request: SilentRequest, response: ExternalTokenResponse, options: LoadTokenOptions): void;
}
//# sourceMappingURL=ITokenCache.d.ts.map