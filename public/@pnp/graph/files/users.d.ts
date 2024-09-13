import { IDrive, IDrives } from "./types.js";
declare module "../users/types" {
    interface _User {
        readonly drive: IDrive;
        readonly drives: IDrives;
    }
    interface IUser {
        readonly drive: IDrive;
        readonly drives: IDrives;
    }
}
declare module "./types" {
    interface _Drive {
        special(specialFolder: SpecialFolder): IDriveItem;
    }
    interface IDrive {
        special(specialFolder: SpecialFolder): IDriveItem;
    }
    interface _DriveItem {
        restore(restoreOptions: IItemOptions): Promise<IDriveItem>;
    }
    interface IDriveItem {
        restore(restoreOptions: IItemOptions): Promise<IDriveItem>;
    }
}
export declare enum SpecialFolder {
    "Documents" = "documents",
    "Photos" = "photos",
    "CameraRoll" = "cameraroll",
    "AppRoot" = "approot",
    "Music" = "music"
}
//# sourceMappingURL=users.d.ts.map