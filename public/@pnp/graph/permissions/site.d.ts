import { Permission as IPermissionType } from "@microsoft/microsoft-graph-types";
import { IPermissions } from "./types.js";
declare module "../sites/types" {
    interface _Site {
        readonly permissions: IPermissions;
        add(permissions: Pick<IPermissionType, "roles" | "grantedToIdentities" | "expirationDateTime">): Promise<IPermissionType>;
    }
    interface ISite {
        readonly permissions: IPermissions;
        add(permissions: Pick<IPermissionType, "roles" | "grantedToIdentities" | "expirationDateTime">): Promise<IPermissionType>;
    }
}
declare module "./types" {
    interface _Permissions {
        add(permissions: Pick<IPermissionType, "roles" | "grantedToIdentities" | "expirationDateTime">): Promise<IPermissionType>;
    }
    interface IPermissions {
        add(permissions: Pick<IPermissionType, "roles" | "grantedToIdentities" | "expirationDateTime">): Promise<IPermissionType>;
    }
}
//# sourceMappingURL=site.d.ts.map