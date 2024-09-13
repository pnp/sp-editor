import { Web } from "./types.js";
export { IWeb, IWebs, Web, Webs, IWebInfo, IStorageEntity, IWebInfosData, } from "./types.js";
declare module "../fi" {
    interface SPFI {
        /**
         * Access to the current web instance
         */
        readonly web: ReturnType<typeof Web>;
    }
}
//# sourceMappingURL=index.d.ts.map