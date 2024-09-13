import { IAttachments } from "./types.js";
declare module "../mail/messages" {
    interface _Message {
        readonly attachments: IAttachments;
    }
    interface IMessage {
        readonly attachments: IAttachments;
    }
}
//# sourceMappingURL=message.d.ts.map