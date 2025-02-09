import { IDrive, IDrives } from "./types.js";
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
}
//# sourceMappingURL=sites.d.ts.map