import { DateTimeTimeZone, Presence as IUserPresence, ItemBody } from "@microsoft/microsoft-graph-types";
import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
/**
 * Presence
 */
export declare class _Presence extends _GraphInstance<IUserPresence> {
    /**
     * Sets presence information for a user
     *
     * @param presence Presence object to set the state of a user's presence session
     */
    setPresence(presence: ISetPresenceOptions): Promise<void>;
    /**
     * Clear application presence session of a user. If it is the user's only presence session, the user's presence will change to Offline/Offline.
     *
     * @param sessionId Id of the application to clear presence
     */
    clearPresence(sessionId: string): Promise<void>;
    /**
     * Set the preferred availability and activity status for a user
     *
     * @param presence Presence object to set as preferred availbility and activity status of a user
     */
    setPreferredPresence(presence: IPresenceOptions): Promise<void>;
    /**
     * Clears the preferred availability and activity status for a user
     *
     */
    clearPreferredPresence(): Promise<void>;
    /**
     * Set a presence status message for a user
     *
     */
    setStatusMessage(message: IPresenceStatusMessage): Promise<void>;
}
export interface IPresence extends _Presence {
}
export declare const Presence: import("../graphqueryable.js").IGraphInvokableFactory<IPresence>;
export declare class _Communications extends _GraphCollection<IUserPresence[]> {
    /**
     * Retrieve presence information for a group of users
     *
     * @param ids An array of user id's to retrieve presence for.
     */
    getPresencesByUserId(ids: string[]): Promise<IUserPresence[]>;
}
export interface ICommunications extends _Communications {
}
export declare const Communications: import("../graphqueryable.js").IGraphInvokableFactory<ICommunications>;
export interface IPresenceOptions extends IUserPresence {
    expirationDuration?: string;
}
export interface ISetPresenceOptions extends IPresenceOptions {
    sessionId: string;
}
export interface IPresenceStatusMessage {
    message: ItemBody;
    expiryDateTime: DateTimeTimeZone;
}
//# sourceMappingURL=types.d.ts.map