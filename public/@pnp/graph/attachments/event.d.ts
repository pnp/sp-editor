import { IAttachments } from "./types.js";
declare module "../calendars/types" {
    interface _Event {
        readonly attachments: IAttachments;
    }
    interface IEvent {
        readonly attachments: IAttachments;
    }
}
//# sourceMappingURL=event.d.ts.map