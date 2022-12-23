import { IRecycleBin } from "./types.js";
export { IRecycleBin, IRecycleBinItemObject as IRecycleBinItem, RecycleBin, } from "./types.js";
declare module "../webs/types" {
    interface _Web {
        readonly recycleBin: IRecycleBin;
    }
    interface IWeb {
        /**
         * Read the attachment files data for an item
         */
        readonly recycleBin: IRecycleBin;
    }
}
declare module "../sites/types" {
    interface _Site {
        readonly recycleBin: IRecycleBin;
    }
    interface ISite {
        /**
         * Read the attachment files data for an item
         */
        readonly recycleBin: IRecycleBin;
    }
}
//# sourceMappingURL=index.d.ts.map