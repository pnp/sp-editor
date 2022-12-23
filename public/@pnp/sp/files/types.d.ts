import { _SPCollection, ISPInstance, IDeleteableWithETag, ISPQueryable, IDeleteable } from "../spqueryable.js";
import { IItem } from "../items/index.js";
import { ISiteUserProps } from "../site-users/types.js";
import { IMoveCopyOptions } from "../types.js";
import { ReadableFile } from "./readable-file.js";
import "../context-info/index.js";
/**
 * Describes a collection of File objects
 *
 */
export declare class _Files extends _SPCollection<IFileInfo[]> {
    /**
     * Gets a File by filename
     *
     * @param name The name of the file, including extension.
     */
    getByUrl(name: string): IFile;
    /**
     * Adds a file using the pound percent safe methods
     *
     * @param url Encoded url of the file
     * @param content The file content
     * @param parameters Additional parameters to control method behavior
     */
    addUsingPath(url: string, content: string | ArrayBuffer | Blob, parameters?: IAddUsingPathProps): Promise<IFileAddResult>;
    /**
     * Uploads a file. Not supported for batching
     *
     * @param url The folder-relative url of the file.
     * @param content The Blob file content to add
     * @param progress A callback function which can be used to track the progress of the upload
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten? (default: true)
     * @param chunkSize The size of each file slice, in bytes (default: 10485760)
     * @returns The new File and the raw response.
     */
    addChunked(url: string, content: Blob, progress?: (data: IFileUploadProgressData) => void, shouldOverWrite?: boolean, chunkSize?: number): Promise<IFileAddResult>;
    /**
     * Adds a ghosted file to an existing list or document library. Not supported for batching.
     *
     * @param fileUrl The server-relative url where you want to save the file.
     * @param templateFileType The type of use to create the file.
     * @returns The template file that was added and the raw response.
     */
    addTemplateFile(fileUrl: string, templateFileType: TemplateFileType): Promise<IFileAddResult>;
}
export interface IFiles extends _Files {
}
export declare const Files: import("../spqueryable.js").ISPInvokableFactory<IFiles>;
/**
 * Describes a single File instance
 *
 */
export declare class _File extends ReadableFile<IFileInfo> {
    delete: (this: ISPQueryable<any>, eTag?: string) => Promise<void>;
    /**
     * Gets a value that specifies the list item field values for the list item corresponding to the file.
     *
     */
    get listItemAllFields(): ISPInstance;
    /**
     * Gets a collection of versions
     *
     */
    get versions(): IVersions;
    /**
     * Gets the current locked by user
     *
     */
    getLockedByUser(): Promise<ISiteUserProps | null>;
    /**
     * Approves the file submitted for content approval with the specified comment.
     * Only documents in lists that are enabled for content approval can be approved.
     *
     * @param comment The comment for the approval.
     */
    approve(comment?: string): Promise<void>;
    /**
     * Stops the chunk upload session without saving the uploaded data. Does not support batching.
     * If the file doesn’t already exist in the library, the partially uploaded file will be deleted.
     * Use this in response to user action (as in a request to cancel an upload) or an error or exception.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     */
    cancelUpload(uploadId: string): Promise<void>;
    /**
     * Checks the file in to a document library based on the check-in type.
     *
     * @param comment A comment for the check-in. Its length must be <= 1023.
     * @param checkinType The check-in type for the file.
     */
    checkin(comment?: string, checkinType?: CheckinType): Promise<void>;
    /**
     * Checks out the file from a document library.
     */
    checkout(): Promise<void>;
    /**
     * Copies the file to the destination url.
     *
     * @param url The absolute url or server relative url of the destination file path to copy to.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     */
    copyTo(url: string, shouldOverWrite?: boolean): Promise<void>;
    /**
     * Moves the file by path to the specified destination url.
     * Also works with different site collections.
     *
     * @param destUrl The absolute url or server relative url of the destination file path to move to.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     * @param options Allows you to supply the full set of options controlling the copy behavior
     */
    copyByPath(destUrl: string, shouldOverWrite: boolean, options: Partial<Omit<IMoveCopyOptions, "RetainEditorAndModifiedOnMove">>): Promise<IFile>;
    /**
     * Moves the file by path to the specified destination url.
     * Also works with different site collections.
     *
     * @param destUrl The absolute url or server relative url of the destination file path to move to.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     * @param keepBoth Keep both if file with the same name in the same location already exists? Only relevant when shouldOverWrite is set to false.
     */
    copyByPath(destUrl: string, shouldOverWrite: boolean, KeepBoth?: boolean): Promise<IFile>;
    /**
     * Denies approval for a file that was submitted for content approval.
     * Only documents in lists that are enabled for content approval can be denied.
     *
     * @param comment The comment for the denial.
     */
    deny(comment?: string): Promise<void>;
    /**
     * Moves the file by path to the specified destination url.
     * Also works with different site collections.
     *
     * @param destUrl The absolute url or server relative url of the destination file path to move to.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     * @param options Allows you to supply the full set of options controlling the move behavior
     */
    moveByPath(destUrl: string, shouldOverWrite: boolean, options: Partial<Omit<IMoveCopyOptions, "ResetAuthorAndCreatedOnCopy">>): Promise<IFile>;
    /**
     * Moves the file by path to the specified destination url.
     * Also works with different site collections.
     *
     * @param destUrl The absolute url or server relative url of the destination file path to move to.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     * @param keepBoth Keep both if file with the same name in the same location already exists? Only relevant when shouldOverWrite is set to false.
     */
    moveByPath(destUrl: string, shouldOverWrite: boolean, KeepBoth?: boolean): Promise<IFile>;
    /**
     * Submits the file for content approval with the specified comment.
     *
     * @param comment The comment for the published file. Its length must be <= 1023.
     */
    publish(comment?: string): Promise<void>;
    /**
     * Moves the file to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     *
     * @returns The GUID of the recycled file.
     */
    recycle(): Promise<string>;
    /**
     * Deletes the file object with options.
     *
     * @param parameters Specifies the options to use when deleting a file.
     */
    deleteWithParams(parameters: Partial<IFileDeleteParams>): Promise<void>;
    /**
     * Reverts an existing checkout for the file.
     *
     */
    undoCheckout(): Promise<void>;
    /**
     * Removes the file from content approval or unpublish a major version.
     *
     * @param comment The comment for the unpublish operation. Its length must be <= 1023.
     */
    unpublish(comment?: string): Promise<void>;
    /**
     * Checks to see if the file represented by this object exists
     *
     */
    exists(): Promise<boolean>;
    /**
     * Sets the content of a file, for large files use setContentChunked. Not supported in batching.
     *
     * @param content The file content
     *
     */
    setContent(content: string | ArrayBuffer | Blob): Promise<IFile>;
    /**
     * Gets the associated list item for this folder, loading the default properties
     */
    getItem<T>(...selects: string[]): Promise<IItem & T>;
    /**
     * Sets the contents of a file using a chunked upload approach. Not supported in batching.
     *
     * @param file The file to upload
     * @param progress A callback function which can be used to track the progress of the upload
     * @param chunkSize The size of each file slice, in bytes (default: 10485760)
     */
    setContentChunked(file: Blob, progress?: (data: IFileUploadProgressData) => void, chunkSize?: number): Promise<IFileAddResult>;
    /**
     * Starts a new chunk upload session and uploads the first fragment.
     * The current file content is not changed when this method completes.
     * The method is idempotent (and therefore does not change the result) as long as you use the same values for uploadId and stream.
     * The upload session ends either when you use the CancelUpload method or when you successfully
     * complete the upload session by passing the rest of the file contents through the ContinueUpload and FinishUpload methods.
     * The StartUpload and ContinueUpload methods return the size of the running total of uploaded data in bytes,
     * so you can pass those return values to subsequent uses of ContinueUpload and FinishUpload.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fragment The file contents.
     * @returns The size of the total uploaded data in bytes.
     */
    protected startUpload(uploadId: string, fragment: ArrayBuffer | Blob): Promise<number>;
    /**
     * Continues the chunk upload session with an additional fragment.
     * The current file content is not changed.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fileOffset The size of the offset into the file where the fragment starts.
     * @param fragment The file contents.
     * @returns The size of the total uploaded data in bytes.
     */
    protected continueUpload(uploadId: string, fileOffset: number, fragment: ArrayBuffer | Blob): Promise<number>;
    /**
     * Uploads the last file fragment and commits the file. The current file content is changed when this method completes.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     * @param fileOffset The size of the offset into the file where the fragment starts.
     * @param fragment The file contents.
     * @returns The newly uploaded file.
     */
    protected finishUpload(uploadId: string, fileOffset: number, fragment: ArrayBuffer | Blob): Promise<IFileAddResult>;
}
export interface IFile extends _File, IDeleteableWithETag {
}
export declare const File: import("../spqueryable.js").ISPInvokableFactory<IFile>;
/**
 * Creates an IFile instance given a base object and a server relative path
 *
 * @param base Valid SPQueryable from which the observers will be used and the web url extracted
 * @param serverRelativePath The server relative url to the file (ex: '/sites/dev/documents/file.txt')
 * @returns IFile instance referencing the file described by the supplied parameters
 */
export declare function fileFromServerRelativePath(base: ISPQueryable, serverRelativePath: string): IFile;
/**
 * Creates an IFile instance given a base object and an absolute path
 *
 * @param base Valid SPQueryable from which the observers will be used
 * @param serverRelativePath The absolute url to the file (ex: 'https://tenant.sharepoint.com/sites/dev/documents/file.txt')
 * @returns IFile instance referencing the file described by the supplied parameters
 */
export declare function fileFromAbsolutePath(base: ISPQueryable, absoluteFilePath: string): Promise<IFile>;
/**
 * Creates an IFile intance given a base object and either an absolute or server relative path to a file
 *
 * @param base Valid SPQueryable from which the observers will be used
 * @param serverRelativePath server relative or absolute url to the file (ex: 'https://tenant.sharepoint.com/sites/dev/documents/file.txt' or '/sites/dev/documents/file.txt')
 * @returns IFile instance referencing the file described by the supplied parameters
 */
export declare function fileFromPath(base: ISPQueryable, path: string): Promise<IFile>;
/**
 * Describes a collection of Version objects
 *
 */
export declare class _Versions extends _SPCollection {
    /**
     * Gets a version by id
     *
     * @param versionId The id of the version to retrieve
     */
    getById(versionId: number): IVersion;
    /**
     * Deletes all the file version objects in the collection.
     *
     */
    deleteAll(): Promise<void>;
    /**
     * Deletes the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    deleteById(versionId: number): Promise<void>;
    /**
     * Recycles the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    recycleByID(versionId: number): Promise<void>;
    /**
     * Deletes the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    deleteByLabel(label: string): Promise<void>;
    /**
     * Recycles the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    recycleByLabel(label: string): Promise<void>;
    /**
     * Creates a new file version from the file specified by the version label.
     *
     * @param label The version label of the file version to restore, for example: 1.2
     */
    restoreByLabel(label: string): Promise<void>;
}
export interface IVersions extends _Versions {
}
export declare const Versions: import("../spqueryable.js").ISPInvokableFactory<IVersions>;
/**
 * Describes a single Version instance
 *
 */
export declare class _Version extends ReadableFile<IVersionInfo> {
    delete: (this: ISPQueryable<any>) => Promise<void>;
}
export interface IVersion extends _Version, IDeleteable {
}
export declare const Version: import("../spqueryable.js").ISPInvokableFactory<IVersion>;
/**
 * Types for document check in.
 * Minor = 0
 * Major = 1
 * Overwrite = 2
 */
export declare enum CheckinType {
    Minor = 0,
    Major = 1,
    Overwrite = 2
}
/**
 * Describes file and result
 */
export interface IFileAddResult {
    file: IFile;
    data: IFileInfo;
}
/**
 * File move opertions
 */
export declare enum MoveOperations {
    /**
     * Produce an error if a file with the same name exists in the destination
     */
    None = 0,
    /**
     * Overwrite a file with the same name if it exists. Value is 1.
     */
    Overwrite = 1,
    /**
     * Complete the move operation even if supporting files are separated from the file. Value is 8.
     */
    AllowBrokenThickets = 8,
    /**
     * Boolean specifying whether to retain the source of the move's editor and modified by datetime.
     */
    RetainEditorAndModifiedOnMove = 2048
}
export declare enum TemplateFileType {
    StandardPage = 0,
    WikiPage = 1,
    FormPage = 2,
    ClientSidePage = 3
}
/**
 * Describes SharePoint file upload progress data
 */
export interface IFileUploadProgressData {
    uploadId: string;
    stage: "starting" | "continue" | "finishing";
    blockNumber: number;
    totalBlocks: number;
    chunkSize: number;
    currentPointer: number;
    fileSize: number;
}
export interface IAddUsingPathProps {
    /**
     * Overwrite the file if it exists
     */
    Overwrite: boolean;
    /**
     * specifies whether to auto checkout on invalid Data. It'll be useful if the list contains validation whose requirements upload will not be able to meet.
     */
    AutoCheckoutOnInvalidData?: boolean;
    /**
     * Specifies a XOR hash of the file data which should be used to ensure end-2-end data integrity, base64 representation
     */
    XorHash?: string;
}
export interface IFileInfo {
    readonly "odata.id": string;
    CheckInComment: string;
    CheckOutType: number;
    ContentTag: string;
    CustomizedPageStatus: number;
    ETag: string;
    Exists: boolean;
    IrmEnabled: boolean;
    Length: string;
    Level: number;
    LinkingUri: string | null;
    LinkingUrl: string;
    ListId: string;
    MajorVersion: number;
    MinorVersion: number;
    Name: string;
    ServerRelativeUrl: string;
    SiteId: string;
    TimeCreated: string;
    TimeLastModified: string;
    Title: string | null;
    UIVersion: number;
    UIVersionLabel: string;
    UniqueId: string;
    WebId: string;
}
export interface IVersionInfo {
    Created: string;
    ID: number;
    VersionLabel: string;
    Length: number;
    Size: number;
    CreatedBy: any;
    Url: string;
    IsCurrentVersion: boolean;
    CheckInComment: string;
}
export interface IFileDeleteParams {
    /**
     * If true, delete or recyle a file when the LockType
     * value is SPLockType.Shared or SPLockType.None.
     * When false, delete or recycle the file when
     * the LockType value SPLockType.None.
     */
    BypassSharedLock: boolean;
    /**
     * Gets or sets a string value that allows SPfile delete and recycle methods
     * to target a file with a matching value. Use null to unconditionally delete the file.
     */
    ETagMatch: string;
}
//# sourceMappingURL=types.d.ts.map