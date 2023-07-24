import { _GraphQueryableInstance, IGraphQueryableInstance, IGraphQueryableCollection, _GraphQueryableCollection } from "../graphqueryable.js";
import { Drive as IDriveType, DriveItem as IDriveItemType, ItemPreviewInfo as IDriveItemPreviewInfo, ItemAnalytics as IItemAnalytics } from "@microsoft/microsoft-graph-types";
import { IGetById, IDeleteable, IUpdateable } from "../decorators.js";
/**
 * Describes a Drive instance
 *
 */
export declare class _Drive extends _GraphQueryableInstance<IDriveType> {
    /**
     * Method for retrieving the root folder of a drive.
     * @returns IRoot
     */
    get root(): IRoot;
    /**
     * Method for retrieving the related list resource, for use with SharePoint drives.
     * @returns IGraphQueryableInstance
     */
    get list(): IGraphQueryableInstance;
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
export declare class _Drives extends _GraphQueryableCollection<IDriveType[]> {
}
export interface IDrives extends _Drives, IGetById<IDrive> {
}
export declare const Drives: import("../graphqueryable.js").IGraphInvokableFactory<IDrives>;
/**
 * Describes a Root instance
 *
 */
export declare class _Root extends _GraphQueryableInstance<IDriveItemType> {
    /**
     * Method for retrieving children of a folder drive item.
     * @returns IDriveItems
     */
    get children(): IDriveItems;
    /**
     * Search drive for items matching the query
     * @param query string, search parameter
     * @returns IGraphQueryableCollection
     */
    search(query: string): IGraphQueryableCollection;
    /**
     * Method for retrieving thumbnails of the drive items.
     * @returns IGraphQueryableCollection
     */
    get thumbnails(): IGraphQueryableCollection;
    /**
     * Get changes since optional change token
     * @param token - string (Optional)
     * change token
     * @returns IDeltaItems
     */
    delta(token?: string): IGraphQueryableCollection<IDeltaItems>;
    /**
     * Method for uploading a new file, or updating the contents of an existing file.
     * @param fileOptions - IFileOptions
     * @param content - any
     * @param filePathName - string (Optional)
     * e.g. myfile.txt or myfolder/myfile.txt, unneeded for updates
     * @param contentType - string (Optional)
     * e.g. "application/json; charset=utf-8" for JSON files
     * @returns IDriveItem
     */
    upload(fileOptions: IFileOptions): Promise<IDriveItemAddResult>;
}
export interface IRoot extends _Root {
}
export declare const Root: import("../graphqueryable.js").IGraphInvokableFactory<IRoot>;
/**
 * Describes a Drive Item instance
 *
 */
export declare class _DriveItem extends _GraphQueryableInstance<IDriveItemType> {
    /**
     * Method for retrieving children of a folder drive item.
     * @returns IDriveItems
     */
    get children(): IDriveItems;
    /**
     * Method for retrieving thumbnails of the drive items.
     * @returns IGraphQueryableCollection
     */
    get thumbnails(): IGraphQueryableCollection;
    /**
     * Method for retrieving the versions of a drive item.
     * @returns IDriveItemVersionInfo
     */
    get versions(): IGraphQueryableCollection<IDriveItemVersionInfo>;
    /**
     * Method for moving a drive item
     * @param parentReference - { id: string} - reference to destination folder drive item
     * @param name - string - name of the file in the destination
     * @deprecated (v3.11.0) use `moveItem`
     */
    move(parentReference: {
        id: "string";
    }, name: string): Promise<void>;
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
     * Method for setting the contents of a IDriveItem
     * @param content - any - content to upload to the drive item
     * @returns - { id: string; name: string; size: number }
     * @deprecated (v3.11.0) use `upload`
     */
    setContent(content: any): Promise<{
        id: string;
        name: string;
        size: number;
    }>;
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
     * Method for uploading a new file, or updating the contents of an existing file.
     * @param fileOptions - IFileOptions object
     * @param content - any
     * @param filePathName - string (Optional)
     * e.g. myfile.txt or myfolder/myfile.txt, unneeded for updates
     * @param contentType - string (Optional)
     * e.g. "application/json; charset=utf-8" for JSON files
     * @returns IDriveItem
     */
    upload(fileOptions: IFileOptions): Promise<IDriveItemAddResult>;
    /**
     * Method for getting a temporary preview image of a drive item.
     * @param previewOptions - IPreviewOptions (Optional)
     * @returns IDriveItemPreviewInfo
     */
    preview(previewOptions?: IPreviewOptions): Promise<IDriveItemPreviewInfo>;
    /**
     * Method for getting item analytics. Defaults to lastSevenDays.
     * @param analyticsOptions - IAnalyticsOptions (Optional)
     * @returns IGraphQueryableCollection<IItemAnalytics>
     */
    analytics(analyticsOptions?: IAnalyticsOptions): IGraphQueryableCollection<IItemAnalytics>;
}
export interface IDriveItem extends _DriveItem, IDeleteable, IUpdateable {
}
export declare const DriveItem: import("../graphqueryable.js").IGraphInvokableFactory<IDriveItem>;
/**
 * Describes a collection of Drive Item objects
 *
 */
export declare class _DriveItems extends _GraphQueryableCollection<IDriveItemType[]> {
    /**
     * Adds a file to this collection of drive items.
     * For more upload options please see the .upload method on DriveItem and Root.
     * @param filename - string - name of new file
     * @param content - string - contents of file
     * @param contentType - string - content type for header - default to "application/json"
     * @returns IDriveItemAddResult - result with file data and chainable drive item object
     */
    add(filename: string, content: string, contentType?: string): Promise<IDriveItemAddResult>;
    /**
     * Adds a folder to this collection of drive items.
     * @param name - string, name of new folder
     * @param driveItem - DriveItem (Optional) - override default drive item properties
     * @returns IDriveItemAddResult - result with folder data and chainable drive item object
     */
    addFolder(name: string, driveItem?: any): Promise<IDriveItemAddResult>;
}
export interface IDriveItems extends _DriveItems, IGetById<IDriveItem> {
}
export declare const DriveItems: import("../graphqueryable.js").IGraphInvokableFactory<IDriveItems>;
/**
 * IDriveItemAddResult
 */
export interface IDriveItemAddResult {
    data: any;
    driveItem: IDriveItem;
}
export interface IDriveItemVersionInfo {
    id: string;
    lastModifiedBy: {
        user: {
            id: string;
            displayName: string;
        };
    };
    lastModifiedDateTime: string;
    size: number;
}
export interface ISharingWithMeOptions {
    allowExternal: boolean;
}
export interface IItemOptions {
    parentReference?: {
        id?: string;
        driveId?: string;
    };
    name?: string;
}
export interface IFileOptions {
    content: any;
    filePathName?: string;
    contentType?: string;
}
export interface IPreviewOptions {
    page?: string | number;
    zoom?: number;
}
export interface IDeltaItems {
    next: IGraphQueryableCollection<IDeltaItems>;
    delta: IGraphQueryableCollection<IDeltaItems>;
    values: any[];
}
export interface IAnalyticsOptions {
    timeRange: "allTime" | "lastSevenDays";
}
//# sourceMappingURL=types.d.ts.map