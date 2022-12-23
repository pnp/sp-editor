import { _SPInstance } from "@pnp/sp";
import { ITenantSitePropertiesInfo } from "./types.js";
declare class _TenantSiteProperties extends _SPInstance<ITenantSitePropertiesInfo> {
    /**
    * Choose which fields to return
    *
    * @param selects One or more fields to return
    * @description we limit the selects here because there are so many values possible and it improves discoverability.
    * Unfortunately this doesn't work as a general solution due to expands
    */
    select(...selects: ("*" | keyof ITenantSitePropertiesInfo)[]): this;
    /**
     * Clears the Lockdown placed due to Sharing-Lockdown Policy
     */
    clearSharingLockDown(siteUrl: string): Promise<void>;
    /**
     * Supports calling POST methods not added explicitly to this class
     *
     * @param method method name, used in url path (ex: "CreateGroupForSite")
     * @param args optional, any arguments to include in the body
     * @returns The result of the method invocation T
     */
    call<T = any>(method: string, args?: any): Promise<T>;
}
export interface ITenantSiteProperties extends _TenantSiteProperties {
}
export declare const TenantSiteProperties: import("@pnp/sp").ISPInvokableFactory<ITenantSiteProperties>;
export {};
//# sourceMappingURL=site-properties.d.ts.map