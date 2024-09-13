import { _GraphInstance, _GraphCollection } from "../graphqueryable.js";
import { IUpdateable, IGetById, IDeleteable } from "../decorators.js";
import { Team as ITeamType, TeamsAsyncOperation as ITeamsAsyncOperation, TeamsTab as ITeamsTabType, TeamsAppInstallation as ITeamsAppInstallation, ChatMessage as IChatMessage } from "@microsoft/microsoft-graph-types";
/**
 * Represents a Microsoft Team
 */
export declare class _Team extends _GraphInstance<ITeamType> {
    get primaryChannel(): IChannel;
    get channels(): IChannels;
    get installedApps(): IInstalledApps;
    /**
     * Archives this Team
     *
     * @param shouldSetSpoSiteReadOnlyForMembers Should members have Read-only in associated Team Site
     */
    archive(shouldSetSpoSiteReadOnlyForMembers?: boolean): Promise<void>;
    /**
    * Unarchives this Team
    */
    unarchive(): Promise<void>;
    /**
     * Clones this Team
     * @param name The name of the new Group
     * @param description Optional description of the group
     * @param partsToClone Parts to clone ex: apps,tabs,settings,channels,members
     * @param visibility Set visibility to public or private
     */
    cloneTeam(name: string, description?: string, partsToClone?: string, visibility?: "public" | "private"): Promise<ITeamCreateResultAsync>;
    getOperationById(id: string): Promise<ITeamsAsyncOperation>;
}
export interface ITeam extends _Team, IUpdateable<ITeamType> {
}
export declare const Team: import("../graphqueryable.js").IGraphInvokableFactory<ITeam>;
/**
 * Teams
 */
export declare class _Teams extends _GraphCollection<ITeamType[]> {
    create(team: ITeamType): Promise<ITeamCreateResultAsync>;
}
export interface ITeams extends _Teams, IGetById<ITeam> {
}
export declare const Teams: import("../graphqueryable.js").IGraphInvokableFactory<ITeams>;
/**
 * Channel
 */
export declare class _Channel extends _GraphInstance<IChannel> {
    get tabs(): ITabs;
    get messages(): IMessages;
}
export interface IChannel extends _Channel {
}
export declare const Channel: import("../graphqueryable.js").IGraphInvokableFactory<IChannel>;
/**
 * Channels
 */
export declare class _Channels extends _GraphCollection<IChannel[]> {
    /**
     * Creates a new Channel in the Team
     * @param displayName The display name of the new channel
     * @param description Optional description of the channel
     *
     */
    add(displayName: string, description?: string): Promise<IChannelCreateResult>;
}
export interface IChannels extends _Channels, IGetById<IChannel> {
}
export declare const Channels: import("../graphqueryable.js").IGraphInvokableFactory<IChannels>;
/**
 * Message
 */
export declare class _Message extends _GraphInstance<IChatMessage> {
}
export interface IMessage extends _Message {
}
export declare const Message: import("../graphqueryable.js").IGraphInvokableFactory<IMessage>;
/**
 * Messages
 */
export declare class _Messages extends _GraphCollection<IChatMessage[]> {
    /**
     * Adds a message
     * @param message ChatMessage object that defines the message
     *
     */
    add(message: IChatMessage): Promise<IMessageCreateResult>;
}
export interface IMessages extends _Messages, IGetById<IMessage> {
}
export declare const Messages: import("../graphqueryable.js").IGraphInvokableFactory<IMessages>;
/**
 * Tab
 */
export declare class _Tab extends _GraphInstance {
}
export interface ITab extends _Tab, IUpdateable, IDeleteable {
}
export declare const Tab: import("../graphqueryable.js").IGraphInvokableFactory<ITab>;
/**
 * Tabs
 */
export declare class _Tabs extends _GraphCollection {
    /**
     * Adds a tab to the channel
     * @param name The name of the new Tab
     * @param appUrl The url to an app ex: https://graph.microsoft.com/beta/appCatalogs/teamsApps/12345678-9abc-def0-123456789a
     * @param tabsConfiguration visit https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/teamstab_add for reference
     */
    add(name: string, appUrl: string, properties: ITeamsTabType): Promise<ITabCreateResult>;
}
export interface ITabs extends _Tabs, IGetById<ITab> {
}
export declare const Tabs: import("../graphqueryable.js").IGraphInvokableFactory<ITabs>;
export interface ITeamUpdateResult {
    data: any;
    team: ITeam;
}
export interface IChannelCreateResult {
    data: any;
    channel: IChannel;
}
export interface IMessageCreateResult {
    data: any;
    message: IMessage;
}
export interface ITabCreateResult {
    data: any;
    tab: ITab;
}
export interface ITabUpdateResult {
    data: any;
    tab: ITab;
}
export interface ITeamCreateResultAsync {
    teamId: string;
    operationId: string;
}
export interface ITeamCreateResult {
    data: any;
    team: ITeam;
}
/**
 * InstalledApp
 */
export declare class _InstalledApp extends _GraphInstance<ITeamsAppInstallation> {
    upgrade(): Promise<void>;
}
export interface IInstalledApp extends _InstalledApp, IDeleteable {
}
export declare const InstalledApp: import("../graphqueryable.js").IGraphInvokableFactory<IInstalledApp>;
/**
 * InstalledApps
 */
export declare class _InstalledApps extends _GraphCollection<ITeamsAppInstallation[]> {
    /**
     * Adds an installed app to the collection
     * @param teamsAppId The id of the app to add.
     */
    add(teamsAppId: string): Promise<IAppAddResult>;
}
export interface IInstalledApps extends _InstalledApps, IGetById<IInstalledApp> {
}
export declare const InstalledApps: import("../graphqueryable.js").IGraphInvokableFactory<IInstalledApps>;
export interface IAppAddResult {
    data: any;
    app: IInstalledApp;
}
//# sourceMappingURL=types.d.ts.map