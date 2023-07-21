import { _GraphQueryableCollection, _GraphQueryableInstance } from "../graphqueryable.js";
import { SharedDriveItem as ISharedDriveItem } from "@microsoft/microsoft-graph-types";
import { IDriveItem } from "../onedrive/types.js";
/**
 * Shares
 */
export declare class _Shares extends _GraphQueryableCollection<ISharedDriveItem[]> {
    /**
     * Gets a share by share id or encoded url
     * @param id The share id
     * @returns An IShare instance
     */
    getById(id: string): IShare;
    /**
     * Creates a sharing link (id) from a given absolute url to a file
     * @param url Absolute file url such as "https://{tenant}.sharepoint.com/sites/dev/Shared%20Documents/new.pptx"
     * @returns An encoded sharing id which can be used in getById to access a file
     */
    encodeSharingLink(url: string): string;
}
export interface IShares extends _Shares {
}
export declare const Shares: import("../graphqueryable.js").IGraphInvokableFactory<IShares>;
/**
 * Share
 */
export declare class _Share extends _GraphQueryableInstance<ISharedDriveItem> {
    /**
     * Access the driveItem associated with this shared file
     */
    get driveItem(): IDriveItem;
}
export interface IShare extends _Share {
}
export declare const Share: import("../graphqueryable.js").IGraphInvokableFactory<IShare>;
//# sourceMappingURL=types.d.ts.map