import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { Site as ISiteType } from "@microsoft/microsoft-graph-types";
/**
 * Sites
 */
export declare class _Sites extends _GraphCollection<ISiteType[]> {
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
    getByUrl(hostname: string, siteUrl: string): Promise<ISite>;
    /**
     * List sites across geographies in an organization. This API can also be used to enumerate all sites in a non-multi-geo tenant.
     *
     * @returns A ISites collection which can be used with async iteration to page through the collection
     */
    getAllSites(): ISites;
}
export interface ISites extends _Sites {
}
export declare const Sites: import("../graphqueryable.js").IGraphInvokableFactory<ISites>;
/**
 * Site
 */
export declare class _Site extends _GraphInstance<ISiteType> {
    get sites(): ISites;
    /**
     * Rebases this ISite instances to ensure it is of the pattern /sites/{site id} regardless of how it was first retrieved
     */
    rebase(): Promise<ISite>;
}
export interface ISite extends _Site {
}
export declare const Site: import("../graphqueryable.js").IGraphInvokableFactory<ISite>;
/**
 * Followed Sites
 *
 * Note: At this time listing a user's followed sites is not supported with app-only permissions
 */
export declare class _FollowedSites extends _GraphCollection<ISiteType[]> {
    /**
     * Adds site(s) to the user's collection of followed sites
     *
     * @param siteIds The collection of site ids to add
     * @returns Site info for the newly followed sites
     */
    add(...siteIds: string[]): Promise<ISiteType[]>;
    /**
     * REmoves site(s) to the user's collection of followed sites
     *
     * @param siteIds The collection of site ids to remove
     */
    remove(...siteIds: string[]): Promise<void>;
}
export interface IFollowedSites extends _FollowedSites {
}
export declare const FollowedSites: import("../graphqueryable.js").IGraphInvokableFactory<IFollowedSites>;
//# sourceMappingURL=types.d.ts.map