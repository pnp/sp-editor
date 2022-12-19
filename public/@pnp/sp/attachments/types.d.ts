import { ReadableFile } from "../files/readable-file.js";
import { IDeleteableWithETag, _SPCollection } from "../spqueryable.js";
export declare class _Attachments extends _SPCollection<IAttachmentInfo[]> {
    /**
    * Gets a Attachment File by filename
    *
    * @param name The name of the file, including extension.
    */
    getByName(name: string): IAttachment;
    /**
     * Adds a new attachment to the collection. Not supported for batching.
     *
     * @param name The name of the file, including extension.
     * @param content The Base64 file content.
     */
    add(name: string, content: string | Blob | ArrayBuffer): Promise<IAttachmentAddResult>;
}
export interface IAttachments extends _Attachments {
}
export declare const Attachments: import("../spqueryable.js").ISPInvokableFactory<IAttachments>;
export declare class _Attachment extends ReadableFile<IAttachmentInfo> {
    delete: (this: import("../spqueryable.js").ISPQueryable<any>, eTag?: string) => Promise<void>;
    /**
     * Sets the content of a file. Not supported for batching
     *
     * @param content The value to set for the file contents
     */
    setContent(body: string | ArrayBuffer | Blob): Promise<IAttachment>;
    /**
     * Delete this attachment file and send it to recycle bin
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    recycle(eTag?: string): Promise<void>;
}
export interface IAttachment extends _Attachment, IDeleteableWithETag {
}
export declare const Attachment: import("../spqueryable.js").ISPInvokableFactory<IAttachment>;
export interface IAttachmentAddResult {
    file: IAttachment;
    data: IAttachmentFileInfo;
}
export interface IAttachmentFileInfo {
    name: string;
    content: string | Blob | ArrayBuffer;
}
export interface IAttachmentInfo {
    FileName: string;
    FileNameAsPath: {
        DecodedUrl: string;
    };
    ServerRelativePath: {
        DecodedUrl: string;
    };
    ServerRelativeUrl: string;
}
//# sourceMappingURL=types.d.ts.map