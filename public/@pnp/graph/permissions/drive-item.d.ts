import { IPermissions } from "./types.js";
import { Permission as IPermissionType, DriveRecipient as IDriveRecipientType } from "@microsoft/microsoft-graph-types";
declare module "../files/types" {
    interface _DriveItem {
        readonly permissions: IPermissions;
        addPermissions(permissionsInviteInfo: IPermissionsInviteInfo): Promise<IPermissionType[]>;
    }
    interface IDriveItem {
        readonly permissions: IPermissions;
        addPermissions(permissionsInviteInfo: IPermissionsInviteInfo): Promise<IPermissionType[]>;
    }
}
export interface IPermissionsInviteInfo {
    recipients: IDriveRecipientType[];
    requireSignIn: boolean;
    sendInvitation: boolean;
    roles: ["read" | "write" | "owner"];
    expirationDateTime?: string;
    password?: string;
    retainInheritedPermissions?: boolean;
}
//# sourceMappingURL=drive-item.d.ts.map