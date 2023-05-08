import { ISPQueryable, SPInit, _SPInstance } from "../spqueryable.js";
export declare class _SitePageService extends _SPInstance implements ISitePageService {
    constructor(baseUrl: string | ISPQueryable, path?: string);
    /**
    * Gets current user unified group memberships
    */
    getCurrentUserMemberships(): Promise<string[]>;
}
export interface ISitePageService extends _SitePageService {
}
export declare const SitePageService: (base: SPInit, path?: string) => ISitePageService;
//# sourceMappingURL=types.d.ts.map