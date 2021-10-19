import { AuthenticationResult } from "@azure/msal-common";
import { StandardInteractionClient } from "./StandardInteractionClient";
import { EndSessionPopupRequest } from "../request/EndSessionPopupRequest";
import { PopupRequest } from "../request/PopupRequest";
export declare class PopupClient extends StandardInteractionClient {
    /**
     * Acquires tokens by opening a popup window to the /authorize endpoint of the authority
     * @param request
     */
    acquireToken(request: PopupRequest): Promise<AuthenticationResult>;
    /**
     * Clears local cache for the current user then opens a popup window prompting the user to sign-out of the server
     * @param logoutRequest
     */
    logout(logoutRequest?: EndSessionPopupRequest): Promise<void>;
    /**
     * Helper which obtains an access_token for your API via opening a popup window in the user's browser
     * @param validRequest
     * @param popupName
     * @param popup
     * @param popupWindowAttributes
     *
     * @returns A promise that is fulfilled when this function has completed, or rejected if an error was raised.
     */
    private acquireTokenPopupAsync;
    /**
     *
     * @param validRequest
     * @param popupName
     * @param requestAuthority
     * @param popup
     * @param mainWindowRedirectUri
     * @param popupWindowAttributes
     */
    private logoutPopupAsync;
}
//# sourceMappingURL=PopupClient.d.ts.map