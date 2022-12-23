import { _SPInstance, _SPCollection, SPInit } from "../spqueryable.js";
import { SharepointIds, ResourceVisualization } from "@microsoft/microsoft-graph-types";
export declare class _Favorites extends _SPInstance implements IFavorites {
    get followedSites(): IFollowedSites;
    get followedListItems(): IFollowedListItems;
}
export declare const Favorites: (baseUrl: SPInit) => IFavorites;
export declare class _FollowedSites extends _SPCollection<IFollowedSiteInfo[]> {
    /**
    * Adds a site to user's followed sites
    *
    * @param tenantUrl Name of a tenant (e.g. yourtenant.sharepoint.com).
    * @param siteId Id of a site collection.
    * @param webId Id of a site.
    * @param webUrl Absolute URL of a site.
    */
    add(tenantUrl: string, siteId: string, webId: string, webUrl: string): Promise<IFollowedSiteInfo[]>;
    /**
    * Removes a site from user's followed sites
    *
    * @param tenantUrl Name of a tenant (e.g. yourtenant.sharepoint.com).
    * @param siteId Id of a site collection.
    * @param webId Id of a site.
    * @param webUrl Absolute URL of a site.
    */
    remove(tenantUrl: string, siteId: string, webId: string, webUrl: string): Promise<void>;
}
export interface IFollowedSites extends _FollowedSites {
}
export declare const FollowedSites: import("../spqueryable.js").ISPInvokableFactory<IFollowedSites>;
export declare class _FollowedListItems extends _SPCollection<IFollowedListItemInfo[]> {
    /**
    * Adds an item to user's _saved for later_ list
    *
    * @param siteId Id of a site collection of an item to add
    * @param webId Id of a site of an item to add
    * @param listId Id of a list of an item to add
    * @param listItemUniqueId Unique id of an item to add
    */
    add(siteId: string, webId: string, listId: string, listItemUniqueId: string): Promise<IFollowedListItemInfo>;
    /**
    * Removes an item from user's _saved for later_ list
    *
    * @param siteId Id of a site collection of an item to remove
    * @param webId Id of a site of an item to remove
    * @param listId Id of a list of an item to remove
    * @param listItemUniqueId Unique id of an item to remove
    */
    remove(siteId: string, webId: string, listId: string, listItemUniqueId: string): Promise<void>;
}
export interface IFollowedListItems extends _FollowedListItems {
}
export declare const FollowedListItems: import("../spqueryable.js").ISPInvokableFactory<IFollowedListItems>;
export interface IFavorites {
    readonly followedSites: IFollowedSites;
    readonly followedListItems: IFollowedListItems;
}
export interface IFollowedSiteInfo {
    id: string;
    webUrl: string;
    title: string;
    sharepointIds: SharepointIds;
    siteCollection: {
        hostName: string;
    };
    template: any;
    exchangeIds: IFollowedExchangeId;
    resourceVisualization: {
        color: string;
    };
}
export interface IFollowedListItemInfo {
    description: string;
    id: string;
    lastModifiedDateTime: string;
    name: string;
    size: number;
    webUrl: string;
    serverRedirectedUrl: string;
    contentClass: string;
    lastModifiedBy: {
        user: IFavoritesUser;
    };
    sharepointIds: SharepointIds;
    contentType: {
        id: string;
    };
    resourceVisualization: IFavoritesResourceVisualization;
    exchangeIds: IFollowedExchangeId;
    followed: {
        followedDateTime: string;
    };
    file: {
        fileExtension: string;
    };
    news: {
        publishedDateTime: string;
        newsType: string;
        author: IFavoritesUser;
    };
}
export interface IFavoritesResourceVisualization extends ResourceVisualization {
    color: string;
}
export interface IFollowedExchangeId {
    id: string;
    documentId: string;
}
export interface IFavoritesUser {
    displayName: string;
    userPrincipalName: string;
}
//# sourceMappingURL=types.d.ts.map