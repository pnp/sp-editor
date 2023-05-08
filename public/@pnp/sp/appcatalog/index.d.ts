import { IWeb } from "../webs/types.js";
import { IAppCatalog } from "./types.js";
import "./web.js";
export { IAppAddResult, IApp, IAppCatalog, App, AppCatalog, } from "./types.js";
declare module "../fi" {
    interface SPFI {
        tenantAppcatalog: IAppCatalog;
        getTenantAppCatalogWeb(): Promise<IWeb>;
    }
}
//# sourceMappingURL=index.d.ts.map