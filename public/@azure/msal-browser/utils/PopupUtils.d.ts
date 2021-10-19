import { CommonEndSessionRequest, Logger } from "@azure/msal-common";
import { BrowserCacheManager } from "../cache/BrowserCacheManager";
import { PopupParams } from "../interaction_handler/PopupHandler";
import { AuthorizationUrlRequest } from "../request/AuthorizationUrlRequest";
/**
 * Popup configurations for setting dimensions and position of popup window
 */
export declare type PopupWindowAttributes = {
    popupSize?: PopupSize;
    popupPosition?: PopupPosition;
};
export declare type PopupSize = {
    height: number;
    width: number;
};
export declare type PopupPosition = {
    top: number;
    left: number;
};
export declare class PopupUtils {
    private browserStorage;
    private logger;
    private currentWindow;
    constructor(storageImpl: BrowserCacheManager, logger: Logger);
    /**
     * @hidden
     *
     * Configures popup window for login.
     *
     * @param urlNavigate
     * @param title
     * @param popUpWidth
     * @param popUpHeight
     * @param popupWindowAttributes
     * @ignore
     * @hidden
     */
    openPopup(urlNavigate: string, popupParams: PopupParams): Window;
    /**
     * Helper function to set popup window dimensions and position
     * @param urlNavigate
     * @param popupName
     * @param popupWindowAttributes
     * @returns
     */
    static openSizedPopup(urlNavigate: string, popupName: string, popupWindowAttributes: PopupWindowAttributes, logger: Logger): Window | null;
    /**
     * Event callback to unload main window.
     */
    unloadWindow(e: Event): void;
    /**
     * Closes popup, removes any state vars created during popup calls.
     * @param popupWindow
     */
    cleanPopup(popupWindow?: Window): void;
    /**
     * Monitors a window until it loads a url with the same origin.
     * @param popupWindow - window that is being monitored
     */
    monitorPopupForSameOrigin(popupWindow: Window): Promise<void>;
    /**
     * Generates the name for the popup based on the client id and request
     * @param clientId
     * @param request
     */
    static generatePopupName(clientId: string, request: AuthorizationUrlRequest): string;
    /**
     * Generates the name for the popup based on the client id and request for logouts
     * @param clientId
     * @param request
     */
    static generateLogoutPopupName(clientId: string, request: CommonEndSessionRequest): string;
}
//# sourceMappingURL=PopupUtils.d.ts.map