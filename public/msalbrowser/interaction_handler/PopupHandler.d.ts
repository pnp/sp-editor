import { CommonAuthorizationCodeRequest, AuthorizationCodeClient, Logger } from "@azure/msal-common";
import { InteractionHandler, InteractionParams } from "./InteractionHandler";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { PopupWindowAttributes } from "../utils/PopupUtils";
export declare type PopupParams = InteractionParams & {
    popup?: Window | null;
    popupName: string;
    popupWindowAttributes: PopupWindowAttributes;
};
/**
 * This class implements the interaction handler base class for browsers. It is written specifically for handling
 * popup window scenarios. It includes functions for monitoring the popup window for a hash.
 */
export declare class PopupHandler extends InteractionHandler {
    private popupUtils;
    constructor(authCodeModule: AuthorizationCodeClient, storageImpl: BrowserCacheManager, authCodeRequest: CommonAuthorizationCodeRequest, browserRequestLogger: Logger);
    /**
     * Opens a popup window with given request Url.
     * @param requestUrl
     */
    initiateAuthRequest(requestUrl: string, params: PopupParams): Window;
    /**
     * Monitors a window until it loads a url with a known hash, or hits a specified timeout.
     * @param popupWindow - window that is being monitored
     * @param timeout - milliseconds until timeout
     */
    monitorPopupForHash(popupWindow: Window): Promise<string>;
}
//# sourceMappingURL=PopupHandler.d.ts.map