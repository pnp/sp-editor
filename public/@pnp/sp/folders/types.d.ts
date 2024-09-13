import { _SPCollection, _SPInstance, ISPInstance, IDeleteableWithETag, ISPQueryable } from "../spqueryable.js";
import { IItem } from "../items/types.js";
import { IResourcePath } from "../utils/to-resource-path.js";
import "../context-info/index.js";
import { IMoveCopyOptions } from "../types.js";
export declare class _Folders extends _SPCollection<IFolderInfo[]> {
    /**
     * Gets a folder by it's name
     *
     * @param name Folder's name
     */
    getByUrl(name: string): IFolder;
    /**
     * Adds a new folder by path and should be prefered over add
     *
     * @param serverRelativeUrl The server relative url of the new folder to create
     * @param overwrite True to overwrite an existing folder, default false
     */
    addUsingPath(serverRelativeUrl: string, overwrite?: boolean): Promise<IFolderInfo>;
}
export interface IFolders extends _Folders {
}
export declare const Folders: import("../spqueryable.js").ISPInvokableFactory<IFolders>;
export declare class _Folder extends _SPInstance<IFolderInfo> {
    delete: (this: ISPQueryable<any>, eTag?: string) => Promise<void>;
    /**
     * Gets this folder's sub folders
     *
     */
    get folders(): IFolders;
    /**
     * Gets this folder's list item field values
     *
     */
    get listItemAllFields(): ISPInstance;
    /**
     * Gets the parent folder, if available
     *
     */
    get parentFolder(): IFolder;
    /**
     * Gets this folder's properties
     *
     */
    get properties(): ISPInstance;
    /**
     * Gets this folder's storage metrics information
     *
     */
    get storageMetrics(): ISPInstance<IStorageMetrics>;
    /**
     * Updates folder's properties
     * @param props Folder's properties to update
     */
    update(props: Partial<IFolderInfo>): Promise<IFolderInfo>;
    /**
     * Moves the folder to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    recycle(): Promise<string>;
    /**
     * Gets the associated list item for this folder, loading the default properties
     */
    getItem<T>(...selects: string[]): Promise<IItem & T>;
    /**
     * Moves the file by path to the specified destination url.
     * Also works with different site collections.
     *
     * @param destUrl The absolute url or server relative url of the destination file path to move to.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     * @param options Allows you to supply the full set of options controlling the move behavior
     */
    moveByPath(destUrl: string, options: Partial<Omit<IMoveCopyOptions, "ResetAuthorAndCreatedOnCopy">>): Promise<IFolder>;
    /**
     * Moves the file by path to the specified destination url.
     * Also works with different site collections.
     *
     * @param destUrl The absolute url or server relative url of the destination file path to move to.
     * @param keepBoth Keep both if file with the same name in the same location already exists? Only relevant when shouldOverWrite is set to false.
     */
    moveByPath(destUrl: string, KeepBoth?: boolean): Promise<IFolder>;
    /**
     * Moves the folder by path to the specified destination url.
     * Also works with different site collections.
     *
     * @param destUrl The absolute url or server relative url of the destination folder path to move to.
     * @param shouldOverWrite Should a folder with the same name in the same location be overwritten?
     * @param options Allows you to supply the full set of options controlling the copy behavior
     */
    copyByPath(destUrl: string, options: Partial<Omit<IMoveCopyOptions, "RetainEditorAndModifiedOnMove">>): Promise<IFolder>;
    /**
     * Copies a folder by path to destination path
     * Also works with different site collections.
     *
     * @param destUrl Absolute or relative URL of the destination path
     * @param keepBoth Keep both if folder with the same name in the same location already exists?
     */
    copyByPath(destUrl: string, KeepBoth?: boolean): Promise<IFolder>;
    /**
     * Deletes the folder object with options.
     *
     * @param parameters Specifies the options to use when deleting a folder.
     */
    deleteWithParams(parameters: Partial<IFolderDeleteParams>): Promise<void>;
    /**
     * Create the subfolder inside the current folder, as specified by the leafPath
     *
     * @param leafPath leafName of the new folder
     */
    addSubFolderUsingPath(leafPath: string): Promise<IFolder>;
    /**
     * Gets the parent information for this folder's list and web
     */
    getParentInfos(): Promise<IFolderParentInfos>;
    /**
     * Implementation of folder move/copy
     *
     * @param destUrl The server relative path to which the folder will be copied/moved
     * @param options Any options
     * @param methodName The method to call
     * @returns An IFolder representing the moved or copied folder
     */
    protected moveCopyImpl(destUrl: string, options: Partial<IMoveCopyOptions>, methodName: "MoveFolderByPath" | "CopyFolderByPath"): Promise<IFolder>;
}
export interface IFolder extends _Folder, IDeleteableWithETag {
}
export declare const Folder: import("../spqueryable.js").ISPInvokableFactory<IFolder>;
/**
 * Creates an IFolder instance given a base object and a server relative path
 *
 * @param base Valid SPQueryable from which the observers will be used and the web url extracted
 * @param serverRelativePath The server relative url to the folder (ex: '/sites/dev/documents/folder3')
 * @returns IFolder instance referencing the folder described by the supplied parameters
 */
export declare function folderFromServerRelativePath(base: ISPQueryable, serverRelativePath: string): IFolder;
/**
 * Creates an IFolder instance given a base object and an absolute path
 *
 * @param base Valid SPQueryable from which the observers will be used
 * @param serverRelativePath The absolute url to the folder (ex: 'https://tenant.sharepoint.com/sites/dev/documents/folder/')
 * @returns IFolder instance referencing the folder described by the supplied parameters
 */
export declare function folderFromAbsolutePath(base: ISPQueryable, absoluteFolderPath: string): Promise<IFolder>;
/**
 * Creates an IFolder intance given a base object and either an absolute or server relative path to a folder
 *
 * @param base Valid SPQueryable from which the observers will be used
 * @param serverRelativePath server relative or absolute url to the file (ex: 'https://tenant.sharepoint.com/sites/dev/documents/folder' or '/sites/dev/documents/folder')
 * @returns IFile instance referencing the file described by the supplied parameters
 */
export declare function folderFromPath(base: ISPQueryable, path: string): Promise<IFolder>;
export interface IFolderInfo {
    readonly "odata.id": string;
    Exists: boolean;
    IsWOPIEnabled: boolean;
    ItemCount: number;
    Name: string;
    ProgID: string | null;
    ServerRelativeUrl: string;
    ServerRelativePath: IResourcePath;
    TimeCreated: string;
    TimeLastModified: string;
    UniqueId: string;
    WelcomePage: string;
    ContentTypeOrder: string[];
    UniqueContentTypeOrder: string[];
    StorageMetrics?: IStorageMetrics;
}
export interface IStorageMetrics {
    LastModified: string;
    TotalFileCount: number;
    TotalFileStreamSize: number;
    TotalSize: number;
}
export interface IFolderDeleteParams {
    /**
     * If true, delete or recycle a folder iff all files have
     * LockType values SPLockType.Shared or SPLockType.None.
     * When false, delete or recycle the folder if all files
     * have  the LockType value SPLockType.None. See the <see cref="SPFile.SPLockType"/> enum.
     */
    BypassSharedLock: boolean;
    /**
     * Gets or sets a string value that allows SPFolder delete
     * and recycle methods to target a folder with a matching value
     */
    ETagMatch: string;
    /**
     * Gets or sets a Boolean that controls the way in which folders
     * are deleted. If set to true, only empty folders will be deleted.
     * If set to false, folders that are not empty may be deleted.
     */
    DeleteIfEmpty: boolean;
}
export interface IFolderParentInfos {
    Folder: {
        ServerRelativeUrl: string;
    };
    ParentList: {
        Id: string;
        RootFolderServerRelativePath: IResourcePath;
        RootFolderServerRelativeUrl: string;
        RootFolderUniqueId: string;
    };
    ParentWeb: {
        Id: string;
        ServerRelativePath: IResourcePath;
        ServerRelativeUrl: string;
        Url: string;
    };
}
//# sourceMappingURL=types.d.ts.map