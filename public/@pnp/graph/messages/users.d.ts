import { IMessages, IMailboxSettings, IMailFolders } from "./types.js";
import { Message } from "@microsoft/microsoft-graph-types";
declare module "../users/types" {
    interface _User {
        readonly messages: IMessages;
        readonly mailboxSettings: IMailboxSettings;
        readonly mailFolders: IMailFolders;
        sendMail(message: Message): Promise<void>;
    }
    interface IUser {
        readonly messages: IMessages;
        readonly mailboxSettings: IMailboxSettings;
        readonly mailFolders: IMailFolders;
        sendMail(message: Message): Promise<void>;
    }
}
//# sourceMappingURL=users.d.ts.map