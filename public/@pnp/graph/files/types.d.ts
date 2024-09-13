import { _GraphInstance, IGraphCollection, _GraphCollection, IGraphQueryable, IGraphInstance } from "../graphqueryable.js";
import { Drive as IDriveType, DriveItem as IDriveItemType, ItemPreviewInfo as IDriveItemPreviewType, ThumbnailSet as IThumbnailSetType, DriveItemVersion as IDriveItemVersionType, UploadSession as IUploadSessionType, DriveItemUploadableProperties as IDriveItemUploadablePropertiesType, SensitivityLabelAssignmentMethod as ISensitivityLabelAssignmentMethodType, ExtractSensitivityLabelsResult as IExtractSensitivityLabelsResultType, ItemRetentionLabel as IItemRetentionLabelType } from "@microsoft/microsoft-graph-types";
import { IGetById, IDeleteable, IUpdateable, IHasDelta, IDeltaProps } from "../decorators.js";
import { IResumableUpload, IResumableUploadOptions } from "./resumableUpload.js";
/**
 * Describes a Drive instance
 *
 */
export declare class _Drive extends _GraphInstance<IDriveType> {
    /**
     * Method for retrieving the root folder of a drive.
     * @returns IRoot
     */
    get root(): IRoot;
    /**
     * Method for retrieving recently accessed drive items by the user.
     * @returns IDriveItems
     */
    get recent(): IDriveItems;
    /**
     * Method for retrieving drive items shared with the user.
     * @param options - ISharingWithMeOptions (Optional)
     * @returns IDriveItems
     */
    sharedWithMe(options?: ISharingWithMeOptions): Promise<IDriveItems>;
    /**
     * Method for retrieving a drive item by id.
     * @param id - string - the drive item id to retrieve
     * @returns IDriveItem
     */
    getItemById(id: string): IDriveItem;
    /**
     * Method for retrieving drive items the user is following.
     * @returns IDriveItems
     */
    get following(): IDriveItems;
    /**
     * Get DriveItems by Path
     * @param path string, partial path to folder must not contain a leading or trailing "/" e.g. folderA/folderB/folderC
     * @returns IDriveItems
     */
    getItemsByPath(path: string): IDriveItems;
    /**
     * Get DriveItem by Path
     * @param path string, partial path to folder must not contain a leading or trailing "/" e.g. folderA/folderB/fileName.txt
     * @returns IDriveItems
     */
    getItemByPath(path: string): IDriveItem;
}
export interface IDrive extends _Drive {
}
export declare const Drive: import("../graphqueryable.js").IGraphInvokableFactory<IDrive>;
/**
 * Describes a collection of Drive objects
 *
 */
export declare class _Drives extends _GraphCollection<IDriveType[]> {
}
export interface IDrives extends _Drives, IGetById<IDrive> {
}
export declare const Drives: import("../graphqueryable.js").IGraphInvokableFactory<IDrives>;
/**
 * Describes a Root instance
 *
 */
export declare class _Root extends _GraphInstance<IDriveItemType> {
    /**
     * Method for retrieving children of a folder drive item.
     * @returns IDriveItems
     */
    get children(): IDriveItems;
    /**
     * Search drive for items matching the query
     * @param query string, search parameter
     * @returns IGraphCollection
     */
    search(query: string): IGraphCollection;
    /**
     * Method for retrieving thumbnails of the drive items.
     * @returns IGraphCollection
     */
    get thumbnails(): IGraphInstance<IThumbnailSetType>;
    /**
     * Method for uploading a new file, or updating the contents of an existing file.
     * @param fileOptions - IFileOptions object
     * @returns IDriveItem
     */
    upload(fileOptions: IFileUploadOptions): Promise<IDriveItemType>;
}
export interface IRoot extends _Root, IHasDelta<Omit<IDeltaProps, "deltatoken">, IDriveItemType> {
}
export declare const Root: import("../graphqueryable.js").IGraphInvokableFactory<IRoot>;
/**
 * Describes a Drive Item instance
 *
 */
export declare class _DriveItem extends _GraphInstance<IDriveItemType> {
    /**
     * Method for retrieving children of a folder drive item.
     * @returns IDriveItems
     */
    get children(): IDriveItems;
    get items(): IDriveItems;
    /**
     * Method for retrieving thumbnails of the drive items.
     * @returns Microsoft Graph - ThumbnailSet
     */
    get thumbnails(): IGraphCollection<IThumbnailSetType>;
    /**
     * Method for retrieving the versions of a drive item.
     * @returns IDriveItemVersionInfo
     */
    get versions(): IGraphCollection<IDriveItemVersionType>;
    /**
     * Method for moving a file to a new location and/or name.
     * @param moveOptions - IItemOptions object
     * @returns string - the URL where the new file is located
     */
    moveItem(moveOptions: IItemOptions): Promise<IDriveItem>;
    /**
     * Method for retrieving the contents of a drive item.
     * @returns Blob
     */
    getContent(): Promise<Blob>;
    /**
     * Method for copying a file to a new location and/or name.
     * @param copyOptions - IItemOptions
     * @returns string, the URL where the new file is located
     */
    copyItem(copyOptions: IItemOptions): Promise<string>;
    /**
     * Method for converting the format of a drive item.
     * @param format - string - "pdf" is only option
     * @returns Blob - content of the converted file
     */
    convertContent(format: "pdf"): Promise<Blob>;
    /**
     * Method for getting a temporary preview image of a drive item.
     * @returns Microsoft Graph - DriveItem
     */
    follow(): Promise<IDriveItemType>;
    /**
     * Method for getting a temporary preview image of a drive item.
     * @returns void
     */
    unfollow(): Promise<void>;
    /**
     * Method for uploading a new file, or updating the contents of an existing file.
     * @param fileOptions - IFileUploadOptions object
     * @returns Microsoft Graph - DriveItem
     */
    upload(fileOptions: IFileUploadOptions): Promise<IDriveItemType>;
    /**
     * Method for uploading a new file, or updating the contents of an existing file.
     * @param resuableUploadOptions - IResumableUploadOptions object
     * @returns session: Microsoft Graph - UploadSession, resumableUpload: IResumableUpload
     */
    createUploadSession(resuableUploadOptions: IResumableUploadOptions<IDriveItemUploadablePropertiesType>): Promise<{
        session: IUploadSessionType;
        resumableUpload: IResumableUpload;
    }>;
    /**
     * Method for getting a temporary preview image of a drive item.
     * @param previewOptions - IPreviewOptions (Optional)
     * @returns Microsoft Graph - DriveItemPreview
     */
    preview(previewOptions?: IPreviewOptions): Promise<IDriveItemPreviewType>;
    /**
     * Method for permanently deleting a driveItem by using its ID.
     * @returns void
     */
    permanentDelete(): Promise<void>;
    /**
     * Method for permanently deleting a driveItem by using its ID.
     * @param label: ISensitivityLabel
     * @returns string - long running operation status URL
     */
    assignSensitivityLabel(label: ISensitivityLabel): Promise<string>;
    /**
     * Method for permanently deleting a driveItem by using its ID.
     * @returns Microsoft Graph - ExtractSensitivityLabelsResult
     */
    extractSensitivityLabels(): Promise<IExtractSensitivityLabelsResultType>;
    /**
     * Method for retrieving the retention label of the drive item.
     * @returns Microsoft Graph - ItemRetentionLabel
     */
    retentionLabel(): IGraphQueryable<IItemRetentionLabelType>;
    /**
     * Method for locking/unlocking a record of the drive item.
     * @returns Microsoft Graph - ItemRetentionLabel
     */
    recordLocked(locked: boolean): Promise<IItemRetentionLabelType>;
    /**
     * Method for deleting a retention label from a driveItem.
     * @returns void
     */
    removeRetentionLabel(): Promise<void>;
    /**
     * Method for updating a retention label on a driveItem.
     * @returns Microsoft Graph - ItemRetentionLabel
     */
    updateRetentionLabel(name: string): Promise<IItemRetentionLabelType>;
}
export interface IDriveItem extends _DriveItem, IDeleteable, IUpdateable {
}
export declare const DriveItem: import("../graphqueryable.js").IGraphInvokableFactory<IDriveItem>;
/**
 * Describes a collection of Drive Item objects
 *
 */
export declare class _DriveItems extends _GraphCollection<IDriveItemType[]> {
    /**
     * Adds a file to this collection of drive items.
     * This method allows more control for conflict behavior and affecting other properties of the DriveItem than the .upload method.
     * For more upload options please see the .upload method on DriveItem.
     * @param fileInfo - IDriveItemAdd
     * @returns Microsoft Graph - DriveItem
     */
    add(fileInfo: IDriveItemAdd): Promise<IDriveItemType>;
    /**
     * Adds a folder to this collection of drive items.
     * @param folderInfo - an object of type IDriveItemAddFolder specifying the properties of the new folder
     * @returns Microsoft Graph - DriveItem
     */
    addFolder(folderInfo: IDriveItemAddFolder): Promise<IDriveItemType>;
}
export interface IDriveItems extends _DriveItems, IGetById<IDriveItemType> {
}
export declare const DriveItems: import("../graphqueryable.js").IGraphInvokableFactory<IDriveItems>;
/**
 * IDriveItemAdd - for adding a drive item and the corresponding contents
 * @param filename - string - file name.
 * @param content - any - file content.
 * @param contentType - string (Optional) - e.g. "application/json; charset=utf-8" for JSON files
 * @param driveItem - DriveItem (Optional).
 * @param conflictBehavior - string (Optional) - "rename" | "replace" | "fail" rename is default
 */
export interface IDriveItemAdd {
    filename: string;
    content: string;
    contentType?: string;
    driveItem?: IDriveItem;
    conflictBehavior?: "rename" | "replace" | "fail";
}
/**
 * IDriveItemAddFolder - for adding a folder drive item
 * @param name - string - folder name.
 * @param driveItem - DriveItem (Optional).
 * @param conflictBehavior - string (Optional) - "rename" | "replace" | "fail" rename is default
 */
export interface IDriveItemAddFolder {
    name: string;
    driveItem?: IDriveItem;
    conflictBehavior?: "rename" | "replace" | "fail";
}
/**
 * ISharingWithMeOptions - Sharing file with me options
 * @param allowExternal - boolean - To include items shared from external tenants set to true - default false
 */
export interface ISharingWithMeOptions {
    allowExternal: boolean;
}
/**
 * IItemOptions - for copy/move operations
 * @param name - string (Optional) - destination file name.
 * @param parentReference - Parent DriveItem Info (Optional). id of Drive Item and driveId of Drive.
 */
export interface IItemOptions {
    parentReference?: {
        id?: string;
        driveId?: string;
    };
    name?: string;
}
/**
 * IFileUploadOptions for uploading a file.
 * @param content - any
 * @param filePathName - string (Optional)
 * e.g. myfile.txt or myfolder/myfile.txt, unneeded for updates
 * @param contentType - string (Optional)
 * e.g. "application/json; charset=utf-8" for JSON files
 * @param eTag - string (Optional)
 * @param eTagMatch - string (Optional) - eTag header "If-Match" or "If-None-Match"
 */
export interface IFileUploadOptions {
    content: any;
    filePathName?: string;
    contentType?: string;
    eTag?: string;
    eTagMatch?: "If-Match" | "If-None-Match";
}
/**
 * IPreviewOptions for getting a file preview image.
 * @param page - string/number (Optional) - Page number of document to start at, if applicable.
 * @param zoom - number (Optional) - Zoom level to start at, if applicable.
 */
export interface IPreviewOptions {
    page?: string | number;
    zoom?: number;
}
/**
 * ISensitivityLabel - for assigning a sensitivity label to a drive item
 * @param sensitivityLabelId - string - the id of the sensitivity label
 * @param assignmentMethod - Microsoft Graph SensitivityLabelAssignmentMethod - "standard" | "privileged" | "auto" | "none"
 * @param justificationText - string - the justification for the sensitivity label
 */
export interface ISensitivityLabel {
    sensitivityLabelId: string;
    assignmentMethod: ISensitivityLabelAssignmentMethodType;
    justificationText: string;
}
//# sourceMappingURL=types.d.ts.map