import { IPeopleAdmin } from "./people.js";
import { IServiceAccouncements } from "./serviceAnnouncements.js";
import { ISharePointAdmin } from "./sharepoint.js";
declare module "../fi" {
    interface GraphFI {
        readonly admin: IAdmin;
    }
}
export interface IAdmin {
    readonly people: IPeopleAdmin;
    readonly sharepoint: ISharePointAdmin;
    readonly serviceAnnouncements: IServiceAccouncements;
}
export declare const Admin: IAdmin;
//# sourceMappingURL=index.d.ts.map