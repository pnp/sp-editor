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
        follow(): Promise<IDriveItem>;
        unfollow(): void;
    }
    interface IDriveItem {
        restore(restoreOptions: IItemOptions): Promise<IDriveItem>;
        follow(): Promise<IDriveItem>;
        unfollow(): void;
    }
}
export declare type SpecialFolder = "documents" | "photos" | "cameraroll" | "approot" | "music";
//# sourceMappingURL=users.d.ts.map