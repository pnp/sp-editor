import { CommonAuthorizationUrlRequest } from "@azure/msal-common";
/**
 * This type is deprecated and will be removed on the next major version update
 */
export declare type AuthorizationUrlRequest = Omit<CommonAuthorizationUrlRequest, "state" | "nonce"> & {
    state: string;
    nonce: string;
};
//# sourceMappingURL=AuthorizationUrlRequest.d.ts.map