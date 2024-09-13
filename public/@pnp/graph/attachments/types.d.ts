import { Attachment as IAttachmentType } from "@microsoft/microsoft-graph-types";
import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { IDeleteable, IGetById } from "../decorators.js";
/**
 * Attachment
 */
export declare class _Attachment extends _GraphInstance<IAttachmentType> {
}
export interface IAttachment extends _Attachment, IDeleteable {
}
export declare const Attachment: import("../graphqueryable.js").IGraphInvokableFactory<IAttachment>;
/**
 * Attachments
 */
export declare class _Attachments extends _GraphCollection<IAttachmentType[]> {
    /**
     * Add attachment to this collection
     *
     * @param attachmentInfo Attachment properties
     * @param bytes File content
     */
    addFile(attachmentInfo: IAttachmentType, bytes: string | Blob): Promise<IAttachmentType>;
}
export interface IAttachments extends _Attachments, IGetById<IAttachment> {
}
export declare const Attachments: import("../graphqueryable.js").IGraphInvokableFactory<IAttachments>;
//# sourceMappingURL=types.d.ts.map