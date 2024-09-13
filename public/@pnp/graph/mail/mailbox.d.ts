import { MailboxSettings as IMailboxSettingsType, AutomaticRepliesSetting as IAutomaticRepliesSetting, LocaleInfo as ILocaleInfo, WorkingHours as IWorkingHours, UserPurpose as IUserPurpose, InferenceClassificationOverride as IInterfaceClassificationOverride } from "@microsoft/microsoft-graph-types";
import { _GraphInstance, _GraphCollection } from "../graphqueryable.js";
import { IGetById, IAddable, IUpdateable, IDeleteable } from "../decorators.js";
/**
 * MailboxSettings
 */
export declare class _MailboxSettings extends _GraphInstance<IMailboxSettingsType> {
    /**
     * Get the automatic replies setting
     *
     */
    automaticRepliesSetting(): Promise<IAutomaticRepliesSetting>;
    /**
     * Get the mailbox settings date format
     *
     */
    dateFormat(): Promise<string>;
    /**
     * Get the delegateMeetingMessageDeliveryOptions settings
     *
     */
    /**
     * Get the delegateMeetingMessageDeliveryOptions settings
     *
     */
    language(): Promise<ILocaleInfo>;
    /**
     * Get the mailbox settings time format
     *
     */
    timeFormat(): Promise<string>;
    /**
     * Get the mailbox settings time format
     *
     */
    timeZone(): Promise<string>;
    /**
     * Get the mailbox settings working hours
     *
     */
    workingHours(): Promise<IWorkingHours>;
    /**
     * Get the mailbox settings user purpose
     *
     */
    userPurpose(): Promise<IUserPurpose>;
}
export interface IMailboxSettings extends _MailboxSettings, IUpdateable<IMailboxSettingsType> {
}
export declare const MailboxSettings: import("../graphqueryable.js").IGraphInvokableFactory<IMailboxSettings>;
/**
 * Focused Inbox Override
 */
export declare class _FocusedInboxOverride extends _GraphInstance<IInterfaceClassificationOverride> {
}
export interface IFocusedInboxOverride extends _FocusedInboxOverride, IUpdateable<IInterfaceClassificationOverride>, IDeleteable {
}
export declare const FocusedInboxOverride: import("../graphqueryable.js").IGraphInvokableFactory<IFocusedInboxOverride>;
/**
 * Focused Inbox Overrides
 */
export declare class _FocusedInboxOverrides extends _GraphCollection<IInterfaceClassificationOverride[]> {
}
export interface IFocusedInboxOverrides extends _FocusedInboxOverrides, IGetById<IFocusedInboxOverride>, IAddable<IInterfaceClassificationOverride> {
}
export declare const FocusedInboxOverrides: import("../graphqueryable.js").IGraphInvokableFactory<IFocusedInboxOverrides>;
//# sourceMappingURL=mailbox.d.ts.map