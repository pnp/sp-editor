import { IMessages } from "./messages.js";
import { IMailFolders } from "./folders.js";
import { IOutlook } from "./categories.js";
import { IFocusedInboxOverrides, IMailboxSettings } from "./mailbox.js";
import { Message as IMessageType } from "@microsoft/microsoft-graph-types";
declare module "../users/types" {
    interface _User {
        readonly messages: IMessages;
        readonly mailboxSettings: IMailboxSettings;
        readonly mailFolders: IMailFolders;
        readonly outlook: IOutlook;
        readonly focusedInboxOverrides: IFocusedInboxOverrides;
        sendMail(message: IMessageType, saveToSentItems?: boolean): Promise<void>;
        translateExchangeIds(translateExchangeIds: ITranslateExchangeIds): Promise<ITranslateExchangeIdsResponse[]>;
    }
    interface IUser {
        readonly messages: IMessages;
        readonly mailboxSettings: IMailboxSettings;
        readonly mailFolders: IMailFolders;
        readonly outlook: IOutlook;
        readonly focusedInboxOverrides: IFocusedInboxOverrides;
        sendMail(message: IMessageType, saveToSentItems?: boolean): Promise<void>;
        translateExchangeIds(translateExchangeIds: ITranslateExchangeIds): Promise<ITranslateExchangeIdsResponse[]>;
    }
}
export interface IExchangeIdFormat {
    entryId: string;
    ewsId: string;
    immutableEntryId: string;
    restId: string;
    restImmutableEntryId: string;
}
export interface ITranslateExchangeIds {
    inputIds: string[];
    sourceIdType: IExchangeIdFormat;
    targetIdType: IExchangeIdFormat;
}
export interface ITranslateExchangeIdsResponse {
    sourceId: string;
    targetId: string;
}
//# sourceMappingURL=users.d.ts.map