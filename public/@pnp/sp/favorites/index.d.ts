import { IFavorites } from "./types.js";
export { IFavorites, Favorites, IFollowedSites, IFollowedSiteInfo, IFollowedExchangeId, IFollowedListItems, IFollowedListItemInfo, IFavoritesResourceVisualization, IFavoritesUser, } from "./types.js";
declare module "../fi" {
    interface SPFI {
        /**
         * Access to the favorites instance which allows you to track followed sites and items.
         */
        readonly favorites: IFavorites;
    }
}
//# sourceMappingURL=index.d.ts.map