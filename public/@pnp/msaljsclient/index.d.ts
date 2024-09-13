import type { Configuration, SilentRequest, PopupRequest } from "@azure/msal-browser";
import { PublicClientApplication } from "@azure/msal-browser";
import { Queryable } from "@pnp/queryable";
export interface MSALOptions {
    /**
     * The name of the MSAL instance to use
     * @default "main"
     */
    name?: string;
    /**
     * The configuration for the PCA
     */
    configuration: Configuration;
    /**
     * The authentication parameters to use
     */
    authParams: SilentRequest & PopupRequest;
    /**
     * Whether or not to log errors to the console
     * @default false
     */
    logErrors?: boolean;
}
/**
 * MSAL behavior for PnPjs
 * @param options The options to use when configuring MSAL
 * @returns Instance of the behavior
 *
 * @see https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/README.md#advanced-topics
 */
export declare function MSAL(options: MSALOptions): (instance: Queryable) => Queryable;
/**
 * Get an MSAL instance by name
 * @param name The name of the instance to get (@default "main")
 * @returns The MSAL instance if found, otherwise throws an error
 *
 * @see https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/README.md#advanced-topics
 *
 * @example Log out of an MSAL instance
 * ```ts
 * const msalInstance = getMSAL();
 * const currentAccount = msalInstance.getActiveAccount();
 * msalInstance.logoutRedirect({ account: currentAccount });
 * ```
 */
export declare function getMSAL(name?: string): PublicClientApplication;
//# sourceMappingURL=index.d.ts.map