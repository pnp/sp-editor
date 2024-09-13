import { Message as IMessageType, MessageRule as IMessageRuleType, TimeZoneInformation } from "@microsoft/microsoft-graph-types";
import { _GraphInstance, _GraphCollection } from "../graphqueryable.js";
import { IGetById, IAddable, IUpdateable, IDeleteable, IHasDelta, IDeltaProps } from "../decorators.js";
/**
 * Message
 */
export declare class _Message extends _GraphInstance<IMessageType> {
    /**
     * Sends the message
     *
     */
    send(): Promise<void>;
    /**
     * Copy the message
     *
     * @param destinationFolderId The id of the destination folder to copy the message to
     */
    copy(destinationFolderId: string): Promise<IMessageType>;
    /**
     * Move the message
     *
     * @param destinationFolderId The id of the destination folder to copy the message to
     */
    move(destinationFolderId: string): Promise<IMessageType>;
    /**
     * Create a draft response
     *
     * @param response (optional) The body of the response message
     *   If using JSON, do not provide any payload, you will get an error.
     *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
     * @param timeZone (optional) The time zone to use when creating the draft.
     *   Only use when providing a JSON message.
     */
    createReply(response?: string, timeZone?: TimeZoneInformation): Promise<IMessageType>;
    /**
     * Send a message response
     *
     * @param response (optional) The body of the response message
     *   If using JSON provide either comment: string or message: IMessageType.
     *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
     * @param timeZone (optional) The time zone to use when creating the draft.
     *   Only use when providing a JSON message.
     */
    reply(response?: any, timeZone?: TimeZoneInformation): Promise<void>;
    /**
     * Create a draft response message to all
     *
     * @param response (optional) The body of the response message
     *   If using JSON, do not provide any payload, you will get an error.
     *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
     * @param timeZone (optional) The time zone to use when creating the draft.
     *   Only use when providing a JSON message.
     */
    createReplyAll(response?: string, timeZone?: TimeZoneInformation): Promise<IMessageType>;
    /**
    * Send a message response to all
    *
    * @param response (optional) The body of the response message
    *   If using JSON provide either comment: string or message: IMessageType.
    *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
    * @param timeZone (optional) The time zone to use when creating the draft.
    *   Only use when providing a JSON message.
    */
    replyAll(response?: any, timeZone?: TimeZoneInformation): Promise<void>;
    /**
     * Create a draft forward message
     *
     * @param forward (optional) The body of the forward message
     *   If using JSON provide either comment: string or message: IMessageType.
     *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
     * @param timeZone (optional) The time zone to use when creating the draft.
     *   Only use when providing a JSON message.
     */
    createForward(forward?: any, timeZone?: TimeZoneInformation): Promise<IMessageType>;
    /**
    * Forward a message
    *
    * @param forward (optional) The body of the forward message
    *   If using JSON provide either comment: string or message: IMessageType.
    *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
    * @param timeZone (optional) The time zone to use when creating the draft.
    *   Only use when providing a JSON message.
    */
    forward(forward?: any, timeZone?: TimeZoneInformation): Promise<void>;
}
export interface IMessage extends _Message, IUpdateable<IMessageType>, IDeleteable {
}
export declare const Message: import("../graphqueryable.js").IGraphInvokableFactory<IMessage>;
/**
 * Messages
 */
export declare class _Messages extends _GraphCollection<IMessageType[]> {
}
export interface IMessages extends _Messages, IGetById<IMessage>, IAddable<IMessageType>, IDeleteable, IHasDelta<IMessageDelta, IMessageType> {
}
export declare const Messages: import("../graphqueryable.js").IGraphInvokableFactory<IMessages>;
/**
 * Message Rule
 */
export declare class _MessageRule extends _GraphInstance<IMessageRuleType> {
}
export interface IMessageRule extends _MessageRule, IUpdateable<IMessageRuleType>, IDeleteable {
}
export declare const MessageRule: import("../graphqueryable.js").IGraphInvokableFactory<IMessageRule>;
/**
 * Message Rules
 */
export declare class _MessageRules extends _GraphCollection<IMessageRuleType[]> {
}
export interface IMessageRules extends _MessageRules, IGetById<IMessageRule>, IAddable<IMessageRuleType> {
}
export declare const MessageRules: import("../graphqueryable.js").IGraphInvokableFactory<IMessageRules>;
export interface IMessageDelta extends Omit<IDeltaProps, "token"> {
    changeType?: string;
}
//# sourceMappingURL=messages.d.ts.map