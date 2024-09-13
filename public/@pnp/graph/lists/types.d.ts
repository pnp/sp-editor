import { List as IListEntity } from "@microsoft/microsoft-graph-types";
import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { IDeleteable, IUpdateable, IGetById, IAddable } from "../decorators.js";
/**
 * Represents a list entity
 */
export declare class _List extends _GraphInstance<IListEntity> {
}
export interface IList extends _List, IDeleteable, IUpdateable {
}
export declare const List: import("../graphqueryable.js").IGraphInvokableFactory<IList>;
/**
 * Describes a collection of list objects
 *
 */
export declare class _Lists extends _GraphCollection<IListEntity[]> {
}
export interface ILists extends _Lists, IGetById<IList>, IAddable<IListEntity, IListEntity> {
}
export declare const Lists: import("../graphqueryable.js").IGraphInvokableFactory<ILists>;
//# sourceMappingURL=types.d.ts.map