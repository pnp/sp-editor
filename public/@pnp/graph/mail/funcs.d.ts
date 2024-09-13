import { TimeZoneInformation, Message as IMessageType } from "@microsoft/microsoft-graph-types";
import { IGraphQueryable } from "../graphqueryable.js";
/**
 * Get the occurrences, exceptions, and single instances of events in a calendar view defined by a time range,
 * from the user's default calendar, or from some other calendar of the user's
 *
 * @param this IGraphQueryable instance
 * @param type "reply" | "replyAll" | "createReply" | "createReplyAll" | "forward" | "createForward"
 * @param response The body of the response message
 *   If using JSON provide either comment: string or message: IMessageType.
 *   If using MIME format, provide the MIME content with the applicable Internet message headers, all encoded in base64 format.
 * @param timeZone (optional) The time zone to use when creating the draft.
 *   Only use when providing a JSON message.
 */
export declare function mailResponse(gq: IGraphQueryable, type: "reply" | "replyAll" | "createReply" | "createReplyAll" | "forward" | "createForward", response: any, timeZone?: TimeZoneInformation): Promise<IMessageType | void>;
//# sourceMappingURL=funcs.d.ts.map