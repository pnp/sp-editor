import { AuthenticationResult } from "@azure/msal-common";
import { StandardInteractionClient } from "./StandardInteractionClient";
import { EndSessionRequest } from "../request/EndSessionRequest";
import { RedirectRequest } from "../request/RedirectRequest";
export declare class RedirectClient extends StandardInteractionClient {
    /**
     * Redirects the page to the /authorize endpoint of the IDP
     * @param request
     */
    acquireToken(request: RedirectRequest): Promise<void>;
    /**
     * Checks if navigateToLoginRequestUrl is set, and:
     * - if true, performs logic to cache and navigate
     * - if false, handles hash string and parses response
     * @param hash
     */
    handleRedirectPromise(hash?: string): Promise<AuthenticationResult | null>;
    /**
     * Gets the response hash for a redirect request
     * Returns null if interactionType in the state value is not "redirect" or the hash does not contain known properties
     * @param hash
     */
    private getRedirectResponseHash;
    /**
     * Checks if hash exists and handles in window.
     * @param hash
     * @param state
     */
    private handleHash;
    /**
     * Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Default behaviour is to redirect the user to `window.location.href`.
     * @param logoutRequest
     */
    logout(logoutRequest?: EndSessionRequest): Promise<void>;
    /**
     * Use to get the redirectStartPage either from request or use current window
     * @param requestStartPage
     */
    protected getRedirectStartPage(requestStartPage?: string): string;
}
//# sourceMappingURL=RedirectClient.d.ts.map