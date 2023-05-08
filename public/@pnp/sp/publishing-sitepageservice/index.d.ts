import { ISitePageService } from "./types.js";
export { ISitePageService, SitePageService, } from "./types.js";
declare module "../fi" {
    interface SPFI {
        /**
         * Access to SP.Publishing.SitePageService API which allows you to get your current unified group memberships
         */
        readonly publishingSitePageService: ISitePageService;
    }
}
//# sourceMappingURL=index.d.ts.map