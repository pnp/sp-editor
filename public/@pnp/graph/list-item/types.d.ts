import { ListItem as IListItemEntity, ListItemVersion as IListItemVersion, DocumentSetVersion as IDocumentSetVersionEntity } from "@microsoft/microsoft-graph-types";
import { _GraphCollection, _GraphInstance, IGraphCollection } from "../graphqueryable.js";
import { IDeleteable, IUpdateable, IGetById, IAddable } from "../decorators.js";
/**
 * Represents a list item entity
 */
export declare class _ListItem extends _GraphInstance<IListItemEntity> {
    /**
     * Method for retrieving the versions of a list item.
     * @returns IListItemVersion
     */
    get versions(): IGraphCollection<IListItemVersion>;
}
export interface IListItem extends _ListItem, IDeleteable, IUpdateable {
}
export declare const ListItem: import("../graphqueryable.js").IGraphInvokableFactory<IListItem>;
/**
 * Describes a collection of list item objects
 *
 */
export declare class _ListItems extends _GraphCollection<IListItemEntity[]> {
}
export interface IListItems extends _ListItems, IGetById<IListItem>, IAddable<IListItemEntity> {
}
export declare const ListItems: import("../graphqueryable.js").IGraphInvokableFactory<IListItems>;
/**
 * Represents a document set version
 */
export declare class _DocumentSetVersion extends _GraphInstance<IDocumentSetVersionEntity> {
    /**
     * Restore a document set version
     *
     */
    restore(): Promise<void>;
}
export interface IDocumentSetVersion extends _DocumentSetVersion, IDeleteable {
}
export declare const DocumentSetVersion: import("../graphqueryable.js").IGraphInvokableFactory<IDocumentSetVersion>;
/**
 * Describes a collection of document set versions
 *
 */
export declare class _DocumentSetVersions extends _GraphCollection<IDocumentSetVersionEntity[]> {
}
export interface IDocumentSetVersions extends _DocumentSetVersions, IGetById<IDocumentSetVersion>, IAddable<IDocumentSetVersionEntity> {
}
export declare const DocumentSetVersions: import("../graphqueryable.js").IGraphInvokableFactory<IDocumentSetVersions>;
//# sourceMappingURL=types.d.ts.map