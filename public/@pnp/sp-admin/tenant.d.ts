import { _SPInstance } from "@pnp/sp";
import { IRenderListDataParameters } from "@pnp/sp/lists/index.js";
import { IHubSiteInfo } from "@pnp/sp/hubsites/index.js";
import { IHomeSitesDetails, IPortalHealthStatus, IPowerAppsEnvironment, ISiteAdministratorsFieldsData, ISiteAdminsInfo, ISiteCreationProps, ISitePropertiesEnumerableFilter, ISiteUserGroupsData, ISPHubSiteCreationInfo, ISPOOperation, ISPOSiteCreationSource, ISPOWebTemplatesInfo, ITenantInfo, ITenantSitePropertiesInfo, IUpdateGroupSiteProperties, SPOHubSiteUserRights } from "./types.js";
declare class _Tenant extends _SPInstance<ITenantInfo> {
    /**
    * Choose which fields to return
    *
    * @param selects One or more fields to return
    * @description we limit the selects here because there are so many values possible and it improves discoverability.
    * Unfortunately this doesn't work as a general solution due to expands
    */
    select(...selects: ("*" | keyof ITenantInfo)[]): this;
    /**
     * Returns a site object for the given URL
     *
     * @param url URL of the requested site object
     * @param includeDetail true to include details
     * @returns Returns a site object for the given URL
     */
    getSitePropertiesByUrl(url: string, includeDetail?: boolean): Promise<Partial<ITenantSitePropertiesInfo>>;
    /**
     * Gets SPOSiteProperties objects for all sites from SharePoint in the tenancy that match the filter expression
     *
     * @param speFilter If the filter is null or empty string, then all the sites are returned
     */
    getSitePropertiesFromSharePointByFilters(speFilter: (Partial<ISitePropertiesEnumerableFilter> | null | "")): Promise<Partial<ITenantSitePropertiesInfo>[]>;
    /**
     * Get whether this tenant has valid education license
     */
    hasValidEducationLicense(): Promise<boolean>;
    /**
     * Queues a site collection for creation with the given properties
     *
     * @param siteCreationProperties The initial properties for the site which is to be created
     * @returns Queues a site collection for creation with the given properties
     */
    createSite(siteCreationProperties: ISiteCreationProps): Promise<ISPOOperation>;
    /**
     * Gets all the SPWebTemplates on this Tenant
     *
     * @returns An SPOWebTemplateCollection containing a SPOWebTemplate information for each template
     */
    getSPOTenantAllWebTemplates(): Promise<ISPOWebTemplatesInfo>;
    /**
     * Handles updating the properties based on updateType of all the sites which are part of the groupId
     *
     * @param groupId Group Id
     * @param siteId Site Id
     * @param updateType Property which is required to be updated
     * @param UpdateGroupSitePropertiesParameters
     * @param parameters Params which are required to be passed based on the updateType
     * @returns string denoting the user storage key which can be used by client to pull the async workflow status
     */
    updateGroupSiteProperties(groupId: string, siteId: string, updateType: "Unknow" | "StorageQuota", parameters?: Partial<IUpdateGroupSiteProperties>): Promise<string>;
    /**
     * Gets all the site collection templates available in SPO for the given UI culture
     *
     * @returns An SPOWebTemplateCollection for all the site collection templates available in SPO for the given UI culture.
     */
    getSPOAllWebTemplates(cultureName: string, compatibilityLevel: number): Promise<ISPOWebTemplatesInfo>;
    /**
     * Gets all the SPWebTemplates for site collections on this Tenant
     *
     * @returns An SPOWebTemplateCollection for all the site collection templates available in SPO for the given UI culture.
     */
    getSPOTenantWebTemplates(localeId: number, compatibilityLevel: number): Promise<ISPOWebTemplatesInfo>;
    /**
     * Returns the site header logo by site URL.
     *
     * @param siteUrl Absolute URL to the site
     * @returns Stream containing the site logo data
     */
    getSiteThumbnailLogo(siteUrl: string): Promise<ArrayBuffer>;
    /**
     * Gets all the SPSiteCreationSources
     */
    getSPOSiteCreationSources(): Promise<ISPOSiteCreationSource[]>;
    /**
     * Deletes the site to the recycle bin
     *
     * @param siteUrl Absolute url of the site to remove
     */
    removeSite(siteUrl: string): Promise<ISPOOperation>;
    /**
     * Gets the health Status of the site
     *
     * @param sourceUrl Absolute url of the site
     */
    getSiteHealthStatus(sourceUrl: string): Promise<IPortalHealthStatus>;
    /**
     * Performs the Swap operation on the provided sites
     */
    swapSiteWithSmartGestureOptionForce(sourceUrl: string, targetUrl: string, archiveUrl: string, includeSmartGestures: boolean, force: boolean): Promise<ISPOOperation>;
    /**
     * Performs the Swap operation on the provided sites
     */
    swapSiteWithSmartGestureOption(sourceUrl: string, targetUrl: string, archiveUrl: string, includeSmartGestures: boolean): Promise<ISPOOperation>;
    /**
     * Performs the Swap operation on the provided sites
     */
    swapSite(sourceUrl: string, targetUrl: string, archiveUrl: string): Promise<ISPOOperation>;
    /**
     * Permanently deletes the site from the recycle bin
     *
     * @param siteUrl URL of the site to be deleted
     */
    removeDeletedSite(siteUrl: string): Promise<ISPOOperation>;
    /**
     * Permanently deletes the site from the recycle bin
     *
     * @param siteUrl URL of the site to be deleted
     * @param siteId SiteID of the site to be deleted
     */
    removeDeletedSitePreferId(siteUrl: string, siteId: string): Promise<ISPOOperation>;
    /**
     * Restores site from deleted state (recycle bin)
     *
     * @param siteUrl URL of the site to be restored
     */
    restoreDeletedSite(siteUrl: string): Promise<ISPOOperation>;
    /**
     * Restores site from deleted state (recycle bin)
     *
     * @param siteId SiteID of the site to be restored
     */
    restoreDeletedSiteById(siteId: string): Promise<ISPOOperation>;
    /**
     * Restores site from deleted state (recycle bin)
     *
     * @param siteUrl URL of the site to be restored
     * @param siteId SiteID of the site to be deleted
     */
    restoreDeletedSitePreferId(siteUrl: string, siteId: string): Promise<ISPOOperation>;
    /**
     * A collection of PowerApps environments
     */
    getPowerAppsEnvironments(): Promise<IPowerAppsEnvironment[]>;
    /**
     * Sets the configuration values for Idle session sign out for unmanaged devices
     * @param enabled Boolean indicating if the policy should be enabled
     * @param warnAfter TimeSpan containing the time before warning the user
     * @param signOutAfter TimeSpan containing the time before signing out the user
     * @returns True if the operation succeeds, false otherwise
     */
    setIdleSessionSignOutForUnmanagedDevices(enabled: boolean, warnAfter: string, signOutAfter: string): Promise<IPowerAppsEnvironment[]>;
    /**
     * Gets the configuration values for Idle session sign out for unmanaged devices
     */
    getIdleSessionSignOutForUnmanagedDevices(): Promise<string>;
    /**
     * RESTful API to export SPList to CSV file and return file download link
     *
     * @param viewXml XML of the export view
     */
    exportToCSV(viewXml: string): Promise<string>;
    /**
     * RESTful API to export SPList to CSV file and return file download link
     *
     * @param viewXml XML of the export view
     * @param listName Name of Admin SPList to be exported
     */
    exportAdminListToCSV(viewXml: string, listName: string): Promise<string>;
    /**
     * RESTful API to set site's user groups
     *
     */
    setSiteUserGroups(siteUserGroupsData: ISiteUserGroupsData): Promise<void>;
    /**
     * RESTful API to set site administrators
     */
    setSiteAdministrators(siteAdministratorsFieldsData: ISiteAdministratorsFieldsData): Promise<void>;
    /**
     * RESTful API to check tenant licenses.
     *
     * @returns True if and only if tenant has all licenses in parameter
     */
    checkTenantLicenses(licenses: string[]): Promise<boolean>;
    /**
     * RESTful API to check tenant intune license
     */
    checkTenantIntuneLicense(): Promise<boolean>;
    /**
     * Gets a list of site administrators for the given site
     *
     * @param siteId guid site id
     * @returns Array of site admins
     */
    getSiteAdministrators(siteId: string): Promise<ISiteAdminsInfo[]>;
    /**
     * Renders Tenant Admin SPList Data after filtering based on the groupId the site belongs to
     *
     * @param groupId Group Id the sites belong to
     */
    renderFilteredAdminListDataByGroupId(groupId: string): Promise<ArrayBuffer>;
    /**
     * Renders Tenant Admin SPList Data
     */
    renderAdminListData(listName: string, parameters: IRenderListDataParameters, overrideParameters?: any): Promise<ArrayBuffer>;
    /**
     * Renders Tenant Admin SPList Data after filtering based on filter conditions
     */
    renderFilteredAdminListData(listName: string, parameters: IRenderListDataParameters): Promise<ArrayBuffer>;
    /**
     * Gets SPList total item Count
     *
     * @param listName Optional List Name. By Default Aggregated TenantAdmin SPList will be used
     * @returns List item count
     */
    getSPListItemCount(listName?: string): Promise<number>;
    /**
     * Registers the site with the specified URL as a HubSite
     *
     * @param siteUrl The URL of the site to make into a HubSite
     * @returns The properties of the new HubSite
     */
    registerHubSite(siteUrl: string): Promise<IHubSiteInfo>;
    /**
     * Registers the site with the specified URL as a HubSite
     *
     * @param siteUrl The URL of the site to make into a HubSite
     * @param creationInformation Information used to create this HubSite, If not specified, some default properties will be set instead
     * @returns The properties of the new HubSite
     */
    registerHubSiteWithCreationInformation(siteUrl: string, creationInformation?: Partial<ISPHubSiteCreationInfo>): Promise<IHubSiteInfo>;
    /**
     * Makes the specified site no longer a HubSite and removes it from the list of HubSites The site is not deleted by this operation;
     * it is merely removed from the list of available HubSites
     *
     * @param siteUrl The URL of the site which should no longer be a HubSite
     */
    unregisterHubSite(siteUrl: string): Promise<IHubSiteInfo>;
    /**
     * Connects a site to a HubSite using hub site id, support multi-geo
     *
     * @param siteUrl URL of the site to connect to the HubSite
     * @param hubSiteId Guid of the HubSite ID
     */
    connectSiteToHubSiteById(siteUrl: string, hubSiteId: string): Promise<void>;
    /**
     * Grant HubSite rights to users giving HubSite ID, support multi-geo
     *
     * @param hubSiteId ID of the HubSite
     * @param principals principals of users to grant rights
     * @param grantedRights The HubSite rights to grant
     */
    grantHubSiteRightsById(hubSiteId: string, principals: string[], grantedRights: SPOHubSiteUserRights): Promise<IHubSiteInfo>;
    /**
     * Revoke HubSite rights from users giving HubSite ID, support multi-geo
     *
     * @param hubSiteId ID of the HubSite
     * @param principals principals of users to revoke rights
     */
    revokeHubSiteRightsById(hubSiteId: string, principals: string[]): Promise<IHubSiteInfo>;
    /**
     * Get the home site Ids, url and site title
     *
     * @param bypasscache bypass tenant store cache
     * @param expandDetails call the expensive API with cross geo call to fill siteUrl and site title
     */
    getHomeSitesDetails(bypasscache?: boolean, expandDetails?: boolean): Promise<IHomeSitesDetails>;
    /**
     * Add a new home site in tenant admin setting
     *
     * @param homeSiteUrl The home site URL
     * @param audiences The targeting audiences
     * @param order The rank order of this home site. The order starts at 1, defaults to end of order if not provided
     * @returns Details about ID, title, URL from the adding home site
     */
    addHomeSite(homeSiteUrl: string, audiences: string[], order?: number): Promise<IHomeSitesDetails>;
    /**
     * Update the home site with specific URL for its audiences
     *
     * @param homeSiteUrl The home site URL
     * @param audiences The targeting audiences
     * @param order The rank order of this home site. The order starts at 1, defaults to end of order if not provided
     * @returns Details about ID, title, URL from the adding home site
     */
    updateHomeSite(homeSiteUrl: string, audiences: string[], order?: number): Promise<IHomeSitesDetails>;
    /**
     * Reorder the rank of all home sites in tenant admin setting
     *
     * @param homeSitesSiteIds All home sites siteId with new order
     * @returns Details about siteId and webId from all home sites in a new order
     */
    reorderHomeSites(homeSitesSiteIds: string[]): Promise<IHomeSitesDetails[]>;
    /**
     * Remove a home site in tenant admin setting
     *
     * @param homeSiteUrl The home site URL
     */
    removeHomeSite(homeSiteUrl: string): Promise<void>;
    /**
     * Get site subscription id
     */
    getSiteSubscriptionId(): Promise<string>;
    /**
     * Supports calling POST methods not added explicitly to this class
     *
     * @param method method name, used in url path (ex: "CreateGroupForSite")
     * @param args optional, any arguments to include in the body
     * @returns The result of the method invocation T
     */
    call<T = any>(method: string, args?: any): Promise<T>;
}
export interface ITenant extends _Tenant {
}
export declare const Tenant: import("@pnp/sp").ISPInvokableFactory<ITenant>;
export {};
//# sourceMappingURL=tenant.d.ts.map