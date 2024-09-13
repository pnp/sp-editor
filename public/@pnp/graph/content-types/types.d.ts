import { ContentType as IContentTypeEntity, ItemReference as IItemReference } from "@microsoft/microsoft-graph-types";
import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { IDeleteable, IUpdateable, IGetById } from "../decorators.js";
/**
 * Represents a content type entity
 */
export declare class _ContentType extends _GraphInstance<IContentTypeEntity> {
    /**
      * Check the publishing status of a contentType in a content type hub site.
      */
    isPublished(): Promise<boolean>;
    /**
     * Publishes a contentType present in the content type hub site.
     */
    publish(): Promise<void>;
    /**
     * Unpublish a contentType from a content type hub site.
     */
    unpublish(): Promise<void>;
    /**
     * Associate a published content type present in a content type hub with a list of hub sites.
     *
     * @param hubSiteUrls List of canonical URLs to the hub sites where the content type needs to be enforced.
     * @param propagateToExistingLists (optional) If true, content types will be enforced on existing lists in the hub sites;
     * otherwise, it'll be applied only to newly created lists.
     */
    associateWithHubSites(hubSiteUrls: string[], propagateToExistingLists?: boolean): Promise<void>;
    /**
     * Copy a file to a default content location in a content type. The file can then be added as a default file or template via a POST operation.
     *
     * @param sourceFile Metadata about the source file that needs to be copied to the default content location. Required.
     * @param destinationFileName Destination filename.
     */
    copyToDefaultContentLocation(sourceFile: IItemReference, destinationFileName: string): Promise<void>;
}
export interface IContentType extends _ContentType, IDeleteable, IUpdateable {
}
export declare const ContentType: import("../graphqueryable.js").IGraphInvokableFactory<IContentType>;
/**
 * Describes a collection of content type objects
 *
 */
export declare class _ContentTypes extends _GraphCollection<IContentTypeEntity[]> {
    /**
     * Add or sync a copy of a published content type from the content type hub to a target site or a list.
     *
     * @param contentTypeId The ID of the content type in the content type hub that will be added to a target site or a list.
     */
    addCopyFromContentTypeHub(contentTypeId: string): Promise<IContentTypeAddResult>;
    /**
     * Get a list of compatible content types from the content type hub that can be added to a target site or a list.
     *
     */
    getCompatibleHubContentTypes(): Promise<IContentTypeEntity[]>;
}
export interface IContentTypes extends _ContentTypes, IGetById<IContentType> {
}
export declare const ContentTypes: import("../graphqueryable.js").IGraphInvokableFactory<IContentTypes>;
/**
 * IContentTypeAddResult
 */
export interface IContentTypeAddResult {
    contentType: IContentType;
    data: IContentTypeEntity;
    pendingLocation?: string;
}
//# sourceMappingURL=types.d.ts.map