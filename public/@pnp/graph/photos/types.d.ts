import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { ProfilePhoto as IProfilePhotoType } from "@microsoft/microsoft-graph-types";
export declare class _Photo extends _GraphInstance<IProfilePhotoType> {
    /**
     * Gets the image bytes as a blob (browser)
     */
    getBlob(): Promise<Blob>;
    /**
     * Gets the image file bytes as a Buffer (node.js)
     */
    getBuffer(): Promise<ArrayBuffer>;
    /**
     * Sets the file bytes
     *
     * @param content Image file contents, max 4 MB
     */
    setContent(content: ArrayBuffer | Blob): Promise<void>;
}
export interface IPhoto extends _Photo {
}
export declare const Photo: import("../graphqueryable.js").IGraphInvokableFactory<IPhoto>;
export declare class _Photos extends _GraphCollection<IProfilePhotoType[]> {
    /**
     * Gets the image reference by size. 48x48, 64x64, 96x96, 120x120, 240x240, 360x360, 432x432, 504x504, and 648x648.
     */
    getBySize(size: string): IPhoto;
}
export interface IPhotos extends _Photos {
}
export declare const Photos: import("../graphqueryable.js").IGraphInvokableFactory<IPhotos>;
//# sourceMappingURL=types.d.ts.map