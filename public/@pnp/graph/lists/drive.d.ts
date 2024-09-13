import { IList } from "./types.js";
declare module "../files/types" {
    interface _Drive {
        getList: () => Promise<IList>;
    }
    interface IDrive {
        /**
         * Read the attachment files data for an item
         */
        getList: () => Promise<IList>;
    }
}
//# sourceMappingURL=drive.d.ts.map