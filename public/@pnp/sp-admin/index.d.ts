import { IOffice365Tenant } from "./office-tenant.js";
import { ITenantSiteProperties } from "./site-properties.js";
import { ITenant } from "./tenant.js";
export * from "./types.js";
export * from "./office-tenant.js";
declare module "@pnp/sp/fi" {
    interface SPFI {
        /**
         * Access to the admin capabilities
         */
        readonly admin: IAdmin;
    }
}
export interface IAdmin {
    readonly office365Tenant: IOffice365Tenant;
    readonly siteProperties: ITenantSiteProperties;
    readonly tenant: ITenant;
}
export declare const Admin: IAdmin;
//# sourceMappingURL=index.d.ts.map