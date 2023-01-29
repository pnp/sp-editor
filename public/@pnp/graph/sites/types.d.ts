import { _GraphQueryableCollection, _GraphQueryableInstance } from "../graphqueryable.js";
import { Site as ISiteType } from "@microsoft/microsoft-graph-types";
/**
 * Sites
 */
export declare class _Sites extends _GraphQueryableCollection<ISiteType[]> {
    /**
     * Gets the team site for the group
     */
    get root(): ISite;
    getById(id: string): ISite;
    /**
     * Get a Site by URL
     * @param hostname: string, the host of the site e.g. "contoso.sharepoint.com"
     * @param siteUrl: string, the server relative url of the site e.g. "/sites/teamsite1"
     * @returns ISite
    */
    getByUrl(hostname: string, siteUrl: string): ISite;
}
export interface ISites extends _Sites {
}
export declare const Sites: import("../graphqueryable.js").IGraphInvokableFactory<ISites>;
/**
 * Site
 */
export declare class _Site extends _GraphQueryableInstance<ISiteType> {
    get sites(): ISites;
}
export interface ISite extends _Site {
}
export declare const Site: import("../graphqueryable.js").IGraphInvokableFactory<ISite>;
//# sourceMappingURL=types.d.ts.map