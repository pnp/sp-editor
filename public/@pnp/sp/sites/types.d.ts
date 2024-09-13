import { _SPInstance, SPInit } from "../spqueryable.js";
import { IWeb } from "../webs/types.js";
import { IChangeQuery } from "../types.js";
export declare class _Site extends _SPInstance<ISiteInfo> {
    constructor(base: SPInit, path?: string);
    /**
     * Gets the root web of the site collection
     *
     */
    get rootWeb(): IWeb;
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query
     *
     * @param query The change query
     */
    getChanges(query: IChangeQuery): Promise<any>;
    /**
     * Opens a web by id (using POST)
     *
     * @param webId The GUID id of the web to open
     */
    openWebById(webId: string): Promise<IOpenWebByIdResult>;
    /**
     * Gets a Web instance representing the root web of the site collection
     * correctly setup for chaining within the library
     */
    getRootWeb(): Promise<IWeb>;
    /**
     * Deletes the current site
     *
     */
    delete(): Promise<void>;
    /**
     * Gets the document libraries on a site. Static method. (SharePoint Online only)
     *
     * @param absoluteWebUrl The absolute url of the web whose document libraries should be returned
     */
    getDocumentLibraries(absoluteWebUrl: string): Promise<IDocumentLibraryInformation[]>;
    /**
     * Gets the site url from a page url
     *
     * @param absolutePageUrl The absolute url of the page
     */
    getWebUrlFromPageUrl(absolutePageUrl: string): Promise<string>;
    /**
     * Creates a Modern communication site.
     *
     * @param title The title of the site to create
     * @param lcid The language to use for the site. If not specified will default to 1033 (English).
     * @param shareByEmailEnabled If set to true, it will enable sharing files via Email. By default it is set to false
     * @param url The fully qualified URL (e.g. https://yourtenant.sharepoint.com/sites/mysitecollection) of the site.
     * @param description The description of the communication site.
     * @param classification The Site classification to use. For instance 'Contoso Classified'. See https://www.youtube.com/watch?v=E-8Z2ggHcS0 for more information
     * @param siteDesignId The Guid of the site design to be used.
     *                     You can use the below default OOTB GUIDs:
     *                     Topic: 00000000-0000-0000-0000-000000000000
     *                     Showcase: 6142d2a0-63a5-4ba0-aede-d9fefca2c767
     *                     Blank: f6cc5403-0d63-442e-96c0-285923709ffc
     * @param hubSiteId The id of the hub site to which the new site should be associated
     * @param owner Optional owner value, required if executing the method in app only mode
     */
    createCommunicationSite(title: string, lcid: number, shareByEmailEnabled: boolean, url: string, description?: string, classification?: string, siteDesignId?: string, hubSiteId?: string, owner?: string): Promise<ISiteCreationResponse>;
    createCommunicationSiteFromProps(props: ICreateCommSiteProps): Promise<ISiteCreationResponse>;
    /**
     *
     * @param url Site Url that you want to check if exists
     */
    exists(url: string): Promise<boolean>;
    /**
     * Creates a Modern team site backed by Office 365 group. For use in SP Online only. This will not work with App-only tokens
     *
     * @param displayName The title or display name of the Modern team site to be created
     * @param alias Alias of the underlying Office 365 Group
     * @param isPublic Defines whether the Office 365 Group will be public (default), or private.
     * @param lcid The language to use for the site. If not specified will default to English (1033).
     * @param description The description of the site to be created.
     * @param classification The Site classification to use. For instance 'Contoso Classified'. See https://www.youtube.com/watch?v=E-8Z2ggHcS0 for more information
     * @param owners The Owners of the site to be created
     */
    createModernTeamSite(displayName: string, alias: string, isPublic?: boolean, lcid?: number, description?: string, classification?: string, owners?: string[], hubSiteId?: string, siteDesignId?: string): Promise<ISiteCreationResponse>;
    createModernTeamSiteFromProps(props: ICreateTeamSiteProps): Promise<ISiteCreationResponse>;
    update(props: ISiteInfo): Promise<any>;
    /**
     * Set's the site's `Site Logo` property, vs the Site Icon property available on the web's properties
     *
     * @param logoProperties An instance of ISiteLogoProperties which sets the new site logo.
     */
    setSiteLogo(logoProperties: ISiteLogoProperties): Promise<void>;
}
export interface ISite extends _Site {
}
export declare const Site: import("../spqueryable.js").ISPInvokableFactory<ISite>;
/**
 * The result of opening a web by id: contains the data returned as well as a chainable web instance
 */
export interface IOpenWebByIdResult {
    data: any;
    web: IWeb;
}
/**
 * This is the interface to expose data for Document Library
 */
export interface IDocumentLibraryInformation {
    AbsoluteUrl: string;
    DriveId: string;
    FromCrossFarm: boolean;
    Id: string;
    IsDefaultDocumentLibrary: boolean;
    Modified: string;
    ModifiedFriendlyDisplay: string;
    ServerRelativeUrl: string;
    Title: string;
}
export interface ICreateCommSiteProps {
    Classification?: string;
    Description?: string;
    HubSiteId?: string;
    Lcid?: number;
    Owner?: string;
    ShareByEmailEnabled?: boolean;
    SiteDesignId?: string;
    Title: string;
    Url: string;
    WebTemplate?: "SITEPAGEPUBLISHING#0" | "STS#3";
    WebTemplateExtensionId?: string;
}
export interface ICreateTeamSiteProps {
    displayName: string;
    alias: string;
    isPublic?: boolean;
    lcid?: number;
    description?: string;
    classification?: string;
    owners?: string[];
    hubSiteId?: string;
    siteDesignId?: string;
}
export interface ISiteCreationResponse {
    "SiteId": string;
    "SiteStatus": 0 | 1 | 2 | 3;
    "SiteUrl": string;
}
export interface ISiteInfo {
    AllowCreateDeclarativeWorkflow: boolean;
    AllowDesigner: boolean;
    AllowMasterPageEditing: boolean;
    AllowRevertFromTemplate: boolean;
    AllowSaveDeclarativeWorkflowAsTemplate: boolean;
    AllowSavePublishDeclarativeWorkflow: boolean;
    AllowSelfServiceUpgrade: boolean;
    AllowSelfServiceUpgradeEvaluation: boolean;
    AuditLogTrimmingRetention: number;
    ChannelGroupId: string;
    Classification: string;
    CompatibilityLevel: number;
    CurrentChangeToken: {
        StringValue: string;
    };
    DisableAppViews: boolean;
    DisableCompanyWideSharingLinks: boolean;
    DisableFlows: boolean;
    ExternalSharingTipsEnabled: boolean;
    GeoLocation: string;
    GroupId: string;
    HubSiteId: string;
    Id: string;
    IsHubSite: boolean;
    LockIssue: string | null;
    MaxItemsPerThrottledOperation: number;
    MediaTranscriptionDisabled: boolean;
    NeedsB2BUpgrade: boolean;
    PrimaryUri: string;
    ReadOnly: boolean;
    RequiredDesignerVersion: string;
    ResourcePath: {
        DecodedUrl: string;
    };
    SandboxedCodeActivationCapability: number;
    SensitivityLabel: string;
    SensitivityLabelId: string | null;
    ServerRelativeUrl: string;
    ShareByEmailEnabled: boolean;
    ShareByLinkEnabled: boolean;
    ShowUrlStructure: boolean;
    TrimAuditLog: boolean;
    UIVersionConfigurationEnabled: boolean;
    UpgradeReminderDate: string;
    UpgradeScheduled: boolean;
    UpgradeScheduledDate: string;
    Upgrading: boolean;
    Url: string;
    WriteLocked: boolean;
}
export declare enum SiteLogoType {
    /**
     * Site header logo
     */
    WebLogo = 0,
    /**
     * Hub site logo
     */
    HubLogo = 1,
    /**
     * Header background image
     */
    HeaderBackground = 2,
    /**
     * Global navigation logo
     */
    GlobalNavLogo = 3
}
export declare enum SiteLogoAspect {
    Square = 0,
    Rectangular = 1
}
export interface ISiteLogoProperties {
    relativeLogoUrl: string;
    type: SiteLogoType;
    aspect: SiteLogoAspect;
}
//# sourceMappingURL=types.d.ts.map