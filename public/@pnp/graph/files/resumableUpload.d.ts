import { UploadSession as IUploadSessionType } from "@microsoft/microsoft-graph-types";
import { _GraphInstance, IGraphQueryable } from "../graphqueryable.js";
/**
 * Describes a resumable upload session
 *
 */
export declare class _ResumableUpload extends _GraphInstance<IUploadSessionType> {
    /** Get the status of teh Resumable Upload URL */
    get status(): IGraphQueryable<IUploadSessionType>;
    /** Upload a chunk of the file
    * @param byteLength - number - the length of the byte array
    * @param buffer - any - the buffer to upload
    * @param contentRange - string (Optional) - the content range to upload e.g. `bytes 0-311/312`
    */
    upload(byteLength: number, buffer: any, contentRange?: string): Promise<IUploadSessionType>;
    /** Cancel the Resumable Upload */
    cancel(): Promise<void>;
}
export interface IResumableUpload extends _ResumableUpload {
}
export declare const ResumableUpload: import("../graphqueryable.js").IGraphInvokableFactory<IResumableUpload>;
export declare function getUploadSession(resuableUploadOptions: any): Promise<{
    session: IUploadSessionType;
    resumableUpload: IResumableUpload;
}>;
/**
 * IResumableUploadOptions for creating a resumable upload for uploading a file.
 * @param item - Microsoft Graph - IDriveItemUploadablePropertiesType (Optional), must specify the name property.
 * @param create - boolean (Optional) - default true for new files; false for updates
 * @param deferCommit - boolean (Optional)
 * @param eTag - string (Optional)
 * @param eTagMatch - string (Optional) - eTag header "If-Match" or "If-None-Match"
 * @param conflictBehavior - string (Optional) - "rename" | "replace" | "fail" rename is default
 */
export interface IResumableUploadOptions<T> {
    item?: T;
    create?: boolean;
    deferCommit?: boolean;
    eTag?: string;
    eTagMatch?: "If-Match" | "If-None-Match";
    conflictBehavior?: "rename" | "replace" | "fail";
}
//# sourceMappingURL=resumableUpload.d.ts.map