import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { ServiceAnnouncement as IServiceAnnouncementType, ServiceHealth as IServiceHealthType, ServiceAnnouncementAttachment as IServiceAccountAttachmentType, ServiceHealthIssue as IServiceHealthIssueType, ServiceUpdateMessage as IServiceMessageType } from "@microsoft/microsoft-graph-types";
import { IGetById, IGetByName } from "../decorators.js";
/**
 * Tenant Service Announcements
 */
export declare class _ServiceAnnouncements extends _GraphInstance<IServiceAnnouncementType> {
    get healthOverviews(): IHealthOverviews;
    get issues(): IHealthIssues;
    get messages(): IServiceMessages;
}
export interface IServiceAccouncements extends _ServiceAnnouncements {
}
export declare const ServiceAnnouncements: import("../graphqueryable.js").IGraphInvokableFactory<IServiceAccouncements>;
/**
 * Service Health Report
 */
export declare class _ServiceHealth extends _GraphInstance<IServiceHealthType> {
}
export interface IServiceHealth extends _ServiceHealth {
}
export declare const ServiceHealth: import("../graphqueryable.js").IGraphInvokableFactory<IServiceHealth>;
/**
 * Service Health reports
 */
export declare class _HealthOverviews extends _GraphCollection<IServiceHealthType[]> {
}
export interface IHealthOverviews extends _HealthOverviews, IGetByName<IServiceHealth> {
}
export declare const HealthOverviews: import("../graphqueryable.js").IGraphInvokableFactory<IHealthOverviews>;
/**
 * Health Issue
 */
export declare class _HealthIssue extends _GraphInstance<IServiceHealthIssueType> {
}
export interface IHealthIssue extends _HealthIssue {
}
export declare const HealthIssue: import("../graphqueryable.js").IGraphInvokableFactory<IHealthIssue>;
/**
 * Health issues
 */
export declare class _HealthIssues extends _GraphCollection<IServiceHealthIssueType[]> {
    /**
     * Get incident report. The operation returns an error if the specified issue doesn't exist for the tenant or if PIR document does not exist for the issue.
     */
    get incidentReport(): any;
}
export interface IHealthIssues extends _HealthIssues {
}
export declare const HealthIssues: import("../graphqueryable.js").IGraphInvokableFactory<IHealthIssues>;
/**
 * Service Announcements Messages
 */
export declare class _ServiceMessage extends _GraphInstance<IServiceMessageType> {
    /**
    * Get message attachment
    */
    get attachments(): any;
}
export interface IServiceMessage extends _ServiceMessage {
}
export declare const ServiceMessage: import("../graphqueryable.js").IGraphInvokableFactory<IServiceMessage>;
/**
 * Service Announcements Messages
 */
export declare class _ServiceMessages extends _GraphCollection<IServiceHealthIssueType[]> {
    /**
     * Archive a list of service messages as read for signed-in user
     *
     * @param messageIds List of message IDs to mark as read.
     */
    archive(messageIds: string[]): Promise<IServiceMessageUpdate>;
    /**
     * Unarchive a list of service messages as read for signed-in user
     *
     * @param messageIds List of message IDs to mark as read.
     */
    unarchive(messageIds: string[]): Promise<IServiceMessageUpdate>;
    /**
    * Favorite a list of service messages as read for signed-in user
    *
    * @param messageIds List of message IDs to mark as read.
    */
    favorite(messageIds: string[]): Promise<IServiceMessageUpdate>;
    /**
    * Unfavorite a list of service messages as read for signed-in user
    *
    * @param messageIds List of message IDs to mark as read.
    */
    unfavorite(messageIds: string[]): Promise<IServiceMessageUpdate>;
    /**
     * Mark a list of service messages as read for signed-in user
     *
     * @param messageIds List of message IDs to mark as read.
     */
    markRead(messageIds: string[]): Promise<IServiceMessageUpdate>;
    /**
    * Mark a list of service messages as unread for signed-in user
    *
    * @param messageIds List of message IDs to mark as read.
    */
    markUnread(messageIds: string[]): Promise<IServiceMessageUpdate>;
}
export interface IServiceMessages extends _ServiceMessages, IGetById<IServiceMessage> {
}
export declare const ServiceMessages: import("../graphqueryable.js").IGraphInvokableFactory<IServiceMessages>;
/**
 * Service Announcements Message
 */
export declare class _ServiceMessageAttachment extends _GraphInstance<IServiceAccountAttachmentType> {
}
export interface IServiceMessageAttachment extends _ServiceMessageAttachment {
}
export declare const ServiceMessageAttachment: import("../graphqueryable.js").IGraphInvokableFactory<IServiceMessageAttachment>;
/**
 * Service Announcements Message
 */
export declare class _ServiceMessageAttachments extends _GraphCollection<IServiceAccountAttachmentType[]> {
}
export interface IServiceMessageAttachments extends _ServiceMessageAttachments {
}
export declare const ServiceMessageAttachments: import("../graphqueryable.js").IGraphInvokableFactory<IServiceMessageAttachments>;
export interface IServiceMessageUpdate {
    value: boolean;
}
//# sourceMappingURL=serviceAnnouncements.d.ts.map