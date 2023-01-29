import { ICheckInOptions } from "./funcs.js";
import { IDrive, IDrives } from "./types.js";
declare module "../groups/types" {
    interface _Group {
        readonly drive: IDrive;
        readonly drives: IDrives;
    }
    interface IGroup {
        readonly drive: IDrive;
        readonly drives: IDrives;
    }
}
declare module "./types" {
    interface _DriveItem {
        checkIn(checkInOptions?: ICheckInOptions): Promise<void>;
        checkOut(): Promise<void>;
    }
    interface DriveItem {
        checkIn(checkInOptions?: ICheckInOptions): Promise<void>;
        checkOut(): Promise<void>;
    }
}
//# sourceMappingURL=groups.d.ts.map