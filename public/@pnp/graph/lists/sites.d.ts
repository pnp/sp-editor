import { ILists } from "./types.js";
declare module "../sites/types" {
    interface _Site {
        readonly lists: ILists;
    }
    interface ISite {
        /**
         * Read the attachment files data for an item
         */
        readonly lists: ILists;
    }
}
//# sourceMappingURL=sites.d.ts.map