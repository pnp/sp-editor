import { _SPInstance, ISPQueryable } from "../spqueryable.js";
declare class _GroupSiteManager extends _SPInstance<Record<string, never>> {
    /**
     * Indicates if the current user / application can create Microsoft 365 groups
     *
     *@returns True if possible, otherwise false
     */
    canUserCreateGroup(): Promise<boolean>;
    /**
     * Clears Teams cache for current user / application
     */
    clearCurrentUserTeamsCache(): Promise<void>;
    /**
     * Creates a SharePoint team site for the submitted Microsoft 365 group.
     * More information regarding site creation status here: https://learn.microsoft.com/sharepoint/dev/apis/site-creation-rest#response-2
     *
     *@param groupId Id of the Microsoft 365 group
     *@returns Created SharePoint site information (or current creation status)
     */
    create(groupId: string): Promise<IGroupSiteInfo>;
    /**
     * Creates a Microsoft 365 group with a connected site.
     * This method doesn't work in Azure AD Application context
     *
     *@param displayName The name of the group
     *@param isPublic Whether the new group should be public or private
     *@param ownerPrincipalNames The group owners principal names
     *@param description Detailed information about the group
     *@param creationOptions Additional options ("SPSiteLanguage", "SensitivityLabel", "HubSiteId",...)
     *@returns Created SharePoint site information and group Id (or current creation status)
     */
    createGroup(displayName: string, alias: string, isPublic: boolean, ownerPrincipalNames: string[], description: string, creationOptions: string[]): Promise<IGroupSiteInfo>;
    /**
     * Deletes a group-connected site.
     * This method doesn't work in Azure AD Application context
     *
     *@param siteUrl URL of the group-connected site to delete
     */
    delete(siteUrl: string): Promise<void>;
    /**
     * Creates a team for the current site (group-connected only).
     * This method doesn't work in Azure AD Application context
     *
     *@returns The group-connected site team URL
     */
    ensureTeamForGroup(): Promise<string>;
    /**
     * Creates a team for the current site (group-connected only).
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@returns The group-connected site team ID and URL
     */
    ensureTeamForGroupEx(): Promise<IEnsureTeamForGroupExResponse>;
    /**
     * Gets labels configured for the tenant
     *
     *@param pageNumber Page results number to display
     *@returns A list of labels
     */
    getAllOrgLabels(pageNumber: number): Promise<IOrgLabelsContextList>;
    /**
     * Gets the joined teams for the current user.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param getLogoData True to return logo data, otherwise false
     *@param forceCacheUpdate True to force cache update, otherwise false
     *@returns A list of teams with detailed information. The returned value is a JSON object which can be parsed
     */
    getCurrentUserJoinedTeams(getLogoData: boolean, forceCacheUpdate: boolean): Promise<string>;
    /**
     * Gets the teams shared channels which current user is member of.
     * This method doesn't work in Azure AD application context
     *
     *@returns A list of teams shared channels with summary information (object id, acronym, banner color, ...).
      The returned value is a JSON object which can be parsed
     */
    getCurrentUserSharedChannelMemberGroups(): Promise<string>;
    /**
     * Gets the teams which current user is member of.
     * This method doesn't work in Azure AD Application context
     *
     *@returns A list of teams with summary information (object id, acronym, banner color,...).
      The returned value is a JSON object which can be parsed
     */
    getCurrentUserTeamConnectedMemberGroups(): Promise<string>;
    /**
     * Gets information regarding Microsoft 365 group creation configuration
     *
     *@returns Information about current configuration
     */
    getGroupCreationContext(): Promise<IGroupCreationContext>;
    /**
     * Gets information regarding site groupification configuration for the current site
     *
     *@returns Information about current configuration
     */
    getGroupSiteConversionData(): Promise<IGroupSiteConversionInfo>;
    /**
     * Gets group-connected site creation status
     *
     *@param groupId Microsoft 365 group Id
     *@returns SharePoint site information and group Id (or current creation status)
     */
    getSiteStatus(groupId: string): Promise<IGroupSiteInfo>;
    /**
     * Gets detailed information related to a team channel files URL.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param teamId Team's group Id
     *@param channelId Teams's channel Id
     *@returns Stream information about team channel files URL. The returned value is a JSON object which can be parsed
     */
    getTeamChannelFilesUrl(teamId: string, channelId: string): Promise<ArrayBuffer>;
    /**
     * Gets channels for a team.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param teamId Team's group Id
     *@param useStagingEndpoint Use staging endpoint or not
     *@returns Stream information about team's channels. The returned value is a JSON object which can be parsed
     */
    getTeamChannels(teamId: string, useStagingEndpoint: boolean): Promise<ArrayBuffer>;
    /**
     * Gets channels for a team.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param teamId Team's group Id
     *@returns Detailed information about team's channels. The returned value is a JSON object which can be parsed
     */
    getTeamChannelsDirect(teamId: string): Promise<string>;
    /**
     * Gets channels for a team.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param teamId Team's group Id
     *@returns Detailed information about team's channels
     */
    getTeamChannelsEx(teamId: string): Promise<IChannelInfoCollection>;
    /**
     * Gets channels for a team based on site URL.
     * Works only with root site (neither private or shared channel sites).
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param siteUrl group-connected site URL
     *@returns Detailed information about team's channels
     */
    getTeamChannelsWithSiteUrl(siteUrl: string): Promise<IChannelInfoCollection>;
    /**
     * Gets shared channels membership for a user
     *
     *@param userName User principal name to get shared channels membership
     *@returns Information about user's shared channels. The returned value is a JSON object which can be parsed
     */
    getUserSharedChannelMemberGroups(userName: string): Promise<string>;
    /**
     * Gets teams membership for a user
     *
     *@param userName User principal name to get teams membership
     *@returns Information about requested user's teams. The returned value is a JSON object which can be parsed
     */
    getUserTeamConnectedMemberGroups(userName: string): Promise<string>;
    /**
     * Gets a valid SharePoint site URL from an alias
     *
     *@param alias Alias for SharePoint site URL (also used when creating a Microsoft 365 group)
     *@param managedPath SharePoint managed path ("/sites" or "/teams", optional)
     *@param isTeamSite True if target is a group-connected site, otherwise false (optional)
     *@returns A valid SharePoint site URL
     */
    getValidSiteUrlFromAlias(alias: string, managedPath?: string, isTeamSite?: boolean): Promise<string>;
    /**
     * Indicates if the "Teamify" prompt is displayed or not on a group-connected site.
     * If no parameter is specified, the command will run in the current site context
     *
     *@param siteUrl Group-Connected site
     *@returns true if "Teamify" prompt is hidden, otherwise false
     */
    isTeamifyPromptHidden(siteUrl?: string): Promise<boolean>;
    /**
     * Gets the group-connected site default OneNote Notebook location
     *
     *@param groupId Id of the Microsoft 365 group
     *@returns URL of the group's default OneNote Notebook
     */
    notebook(groupId: string): Promise<string>;
    /**
     * Pins one or more new SharePoint tabs to a team's default channel.
     * This method only works with @pnp/sp behaviors.
     * This method doesn't work in Azure AD Application context
     *
     *@param requestParams Parameters including the tabs data and the team's group Id
     *@returns Successful and failed results for the submitted tabs to add
     */
    pinToTeam(requestParams: IPinToTeamParams): Promise<IPinToTeamResponse>;
    /**
     * Supports calling POST methods not added explicitly to this class
     *
     * @param method method name, used in url path (ex: "CreateGroup")
     * @param args optional, any arguments to include in the body
     * @returns The result of the method invocation T
     */
    call<T = any>(method: string, args?: any): Promise<T>;
}
export interface IGroupSiteManager extends _GroupSiteManager {
}
export declare const GroupSiteManager: import("../spqueryable.js").ISPInvokableFactory<ISPQueryable<IGroupSiteManager>>;
export interface IEnsureTeamForGroupExResponse {
    teamsId: string;
    teamsUrl: string;
}
export interface IOrgLabelsContext {
    DisplayName: string;
    LabelApplicableTo: string;
    ObjectId: string;
}
export interface IOrgLabelsContextList {
    IsLastPage: boolean;
    Labels: IOrgLabelsContext[];
}
export interface IGroupCreationContext {
    ClassificationDescriptions: {
        Key: string;
        Value: any;
        ValueType: string;
    }[];
    ClassificationDescriptionsNew: {
        Key: string;
        Value: any;
        ValueType: string;
    }[];
    ClassificationExtSharingValue: {
        Key: string;
        Value: any;
        ValueType: string;
    }[];
    ClassificationPrivacyValue: {
        Key: string;
        Value: any;
        ValueType: string;
    }[];
    CustomFormUrl: string;
    DataClassificationOptions: string[];
    DataClassificationOptionsNew: {
        Key: string;
        Value: any;
        ValueType: string;
    }[];
    DefaultClassification: string;
    ExternalInvitationEnabled: boolean;
    MachineLearningCaptureEnabled: boolean;
    MachineLearningExperienceEnabled: boolean;
    PreferredLanguage: number;
    RequireSecondaryContact: boolean;
    SensitivityLabelPolicyMandatory: boolean;
    ShowSelfServiceSiteCreation: boolean;
    SiteCreationNewUX: boolean;
    SitePath: string;
    SiteSensitivityLabelId: string;
    URLForCustomHelpPageSensitivityLabel: string;
    UsageGuidelineUrl: string;
}
export interface IGroupSiteConversionInfo {
    GroupType: number;
    IsGroupifyDisabled: boolean;
    IsRegionRestricted: boolean;
    IsWrongPdl: boolean;
    SuggestedMembers: string[];
    SuggestedOwners: string[];
    UnsuggestablePrincipals: string[];
}
export interface IGroupSiteInfo {
    DocumentsUrl: string;
    ErrorMessage: string;
    GroupId: string;
    SiteStatus: number;
    SiteUrl: string;
}
export interface IChannelInfo {
    description: string;
    displayName: string;
    filesFolderWebUrl: string;
    id: string;
    memberShipType: number;
    webUrl: string;
}
export interface IChannelInfoCollection {
    CacheUpdatedTime: Date;
    value: IChannelInfo[];
}
export interface IM365TabItem {
    displayName: string;
    isDefault: boolean;
    itemType: number;
    url: string;
}
export interface IPinToTeamParams {
    tabs: IM365TabItem[];
    teamsId: string;
}
export interface IPinToTeamResponse {
    FailedPinning: IM365TabItem[];
    SuccessfulPinning: IM365TabItem[];
}
export {};
//# sourceMappingURL=types.d.ts.map