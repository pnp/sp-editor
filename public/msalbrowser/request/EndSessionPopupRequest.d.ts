import { CommonEndSessionRequest } from "@azure/msal-common";
import { PopupWindowAttributes } from "../utils/PopupUtils";
/**
 * EndSessionPopupRequest
 * - account                - Account object that will be logged out of. All tokens tied to this account will be cleared.
 * - postLogoutRedirectUri  - URI to navigate to after logout page inside the popup. Required to ensure popup can be closed.
 * - authority              - Authority to send logout request to.
 * - correlationId          - Unique GUID set per request to trace a request end-to-end for telemetry purposes.
 * - idTokenHint            - ID Token used by B2C to validate logout if required by the policy
 * - mainWindowRedirectUri  - URI to navigate the main window to after logout is complete
 * - popupWindowAttributes  - Optional popup window attributes. popupSize with height and width, and popupPosition with top and left can be set.
 */
export declare type EndSessionPopupRequest = Partial<CommonEndSessionRequest> & {
    authority?: string;
    mainWindowRedirectUri?: string;
    popupWindowAttributes?: PopupWindowAttributes;
};
//# sourceMappingURL=EndSessionPopupRequest.d.ts.map