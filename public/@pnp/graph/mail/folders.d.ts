import { MailFolder as IMailFolderType, MailSearchFolder as IMailSearchFolderType } from "@microsoft/microsoft-graph-types";
import { _GraphInstance, _GraphCollection } from "../graphqueryable.js";
import { IGetById, IAddable, IUpdateable, IDeleteable, IHasDelta, IDeltaProps } from "../decorators.js";
import { IMessageRules, IMessages } from "./messages.js";
/**
 * Mail Folder or Mail Search Folder
 */
export declare class _MailFolder extends _GraphInstance<IMailFolderType | IMailSearchFolderType> {
    /**
     * Gets the child folders in this mail folder
     *
     */
    get childFolders(): IMailFolders;
    /**
     * Gets the messages in this mail folder
     *
     */
    get messages(): IMessages;
    /**
     * Gets the child folders in this mail folder
     *
     */
    get messageRules(): IMessageRules;
    /**
     * Copy the mail folder
     *
     * @param destinationFolderId The id of the destination folder to copy the message to
     */
    copy(destinationFolderId: string): Promise<IMailFolderType>;
    /**
     * Move the mail folder
     *
     * @param destinationFolderId The id of the destination folder to copy the message to
     */
    move(destinationFolderId: string): Promise<IMailFolderType>;
}
export interface IMailFolder extends _MailFolder, IUpdateable<IMailFolderType | IMailSearchFolderType>, IDeleteable {
}
export declare const MailFolder: import("../graphqueryable.js").IGraphInvokableFactory<IMailFolder>;
/**
 * Mail Folders or Mail Search Folders
 */
export declare class _MailFolders extends _GraphCollection<IMailFolderType[] | IMailSearchFolderType[]> {
    get includeHidden(): import("../graphqueryable.js").IGraphQueryable<any> & import("@pnp/queryable/index.js").IInvokable<any>;
}
export interface IMailFolders extends _MailFolders, IGetById<IMailFolder>, IAddable<IMailFolderType | IMailSearchFolderType>, IHasDelta<IMailFolderDelta, IMailFolderType> {
}
export declare const MailFolders: import("../graphqueryable.js").IGraphInvokableFactory<IMailFolders>;
export interface IMailFolderDelta extends Omit<IDeltaProps, "token"> {
    changeType?: string;
}
//# sourceMappingURL=folders.d.ts.map