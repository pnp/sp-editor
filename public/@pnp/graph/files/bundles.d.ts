import { _GraphInstance, _GraphCollection } from "../graphqueryable.js";
import { Bundle as IBundleType, DriveItem as IDriveItemType } from "@microsoft/microsoft-graph-types";
import { IGetById, IDeleteable, IUpdateable } from "../decorators.js";
/**
 * Describes a Bundle instance
 * ONLY SUPPORTED IN PERSONAL ONEDRIVE
 */
export declare class _Bundle extends _GraphInstance<IBundleType> {
    /**
     * Method for adding a drive item to a bundle.
     * @param id - The Id of a DriveItem object to add to the bundle
     * @returns void - 204 if successful
     */
    addItem(id: string): Promise<void>;
    /**
     * Method for removing a drive item from a bundle.
     * @param id - The Id of a DriveItem object to remove from the bundle
     * @returns void - 204 if successful
     */
    removeItem(id: string): Promise<void>;
}
export interface IBundle extends _Bundle, IDeleteable, IUpdateable {
}
export declare const Bundle: import("../graphqueryable.js").IGraphInvokableFactory<IBundle>;
/**
 * Describes a collection of Bundle objects
 * ONLY SUPPORTED IN PERSONAL ONEDRIVE
 */
export declare class _Bundles extends _GraphCollection<IBundleType[]> {
    /**
     * Method for creating a new bundle.
     * @param bundleDef - IBundleDef object
     * @returns Microsoft Graph - DriveItem
     */
    create(bundleDef: IBundleDef): Promise<IDriveItemType>;
}
export interface IBundles extends _Bundles, IGetById<IBundle> {
}
export declare const Bundles: import("../graphqueryable.js").IGraphInvokableFactory<IBundles>;
export interface IBundleDef {
    name: string;
    "@microsoft.graph.conflictBehavior": "rename";
    bundle: IBundleType;
    children: {
        id: string;
    }[];
}
//# sourceMappingURL=bundles.d.ts.map