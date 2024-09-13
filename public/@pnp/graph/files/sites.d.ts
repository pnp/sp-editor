import { IDrive, IDrives } from "./types.js";
import { ICheckInOptions } from "./funcs.js";
import { IList } from "../lists/types.js";
declare module "../sites/types" {
    interface _Site {
        readonly drive: IDrive;
        readonly drives: IDrives;
    }
    interface ISite {
        readonly drive: IDrive;
        readonly drives: IDrives;
    }
}
declare module "./types" {
    interface _Drive {
        list: IList;
    }
    interface IDrive {
        list: IList;
    }
    interface _DriveItem {
        checkIn(checkInOptions?: ICheckInOptions): Promise<void>;
        checkOut(): Promise<void>;
    }
    interface DriveItem {
        checkIn(checkInOptions?: ICheckInOptions): Promise<void>;
        checkOut(): Promise<void>;
    }
}
//# sourceMappingURL=sites.d.ts.map