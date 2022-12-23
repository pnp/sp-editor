import { _SPCollection, _SPInstance } from "../spqueryable.js";
/**
 * Describes a recycle bin item
 *
 */
export declare class _RecycleBinItem extends _SPInstance<IRecycleBinItemObject> {
    /**
     * Delete's the Recycle Bin item
     *
     */
    delete(): Promise<void>;
    /**
     * Moves Recycle Bin item to the Second-stage Recycle Bin
     *
     */
    moveToSecondStage(): Promise<void>;
    /**
     * Restore the the Recycle Bin item
     *
     */
    restore(): Promise<void>;
}
export interface IRecycleBinItem extends _RecycleBinItem {
}
export declare const RecycleBinItem: import("../spqueryable.js").ISPInvokableFactory<IRecycleBinItem>;
/**
 * Describes a collection of recycle bin items
 *
 */
export declare class _RecycleBin extends _SPCollection<IRecycleBinItemObject[]> {
    /**
    * Gets a Recycle Bin Item by id
    *
    * @param id The string id of the recycle bin item
    */
    getById(id: string): IRecycleBinItem;
    /**
     * Delete's all items in the Recycle Bin
     *
     */
    deleteAll(): Promise<void>;
    /**
     * Delete's all items in the Second-stage Recycle Bin
     *
     */
    deleteAllSecondStageItems(): Promise<void>;
    /**
     * Moves all items in the Recycle Bin to the Second-stage Recycle Bin
     *
     */
    moveAllToSecondStage(): Promise<void>;
    /**
     * Restore all items in the Recycle Bin
     *
     */
    restoreAll(): Promise<void>;
}
export interface IRecycleBin extends _RecycleBin {
}
export declare const RecycleBin: import("../spqueryable.js").ISPInvokableFactory<IRecycleBin>;
export interface IRecycleBinItemObject {
    AuthorEmail: string;
    AuthorName: string;
    DeletedByEmail: string;
    DeletedByName: string;
    DeletedDate: string;
    DeletedDateLocalFormatted: string;
    DirName: string;
    DirNamePath: {
        DecodedUrl: string;
    };
    Id: string;
    ItemState: number;
    ItemType: number;
    LeafName: string;
    LeafNamePath: {
        DecodedUrl: string;
    };
    Size: number;
    Title: string;
}
//# sourceMappingURL=types.d.ts.map