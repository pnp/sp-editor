import { List as IListEntity } from "@microsoft/microsoft-graph-types";
import { _GraphQueryableCollection, _GraphQueryableInstance } from "../graphqueryable.js";
import { IDeleteable, IUpdateable, IGetById } from "../decorators.js";
/**
 * Represents a booking service entity
 */
export declare class _List extends _GraphQueryableInstance<IListEntity> {
}
export interface IList extends _List, IDeleteable, IUpdateable {
}
export declare const List: import("../graphqueryable.js").IGraphInvokableFactory<IList>;
/**
 * Describes a collection of booking service objects
 *
 */
export declare class _Lists extends _GraphQueryableCollection<IListEntity[]> {
    /**
     * Create a new booking service as specified in the request body.
     *
     * @param list  a JSON representation of a List object.
     */
    add(list: IListEntity): Promise<IListAddResult>;
}
export interface ILists extends _Lists, IGetById<IList> {
}
export declare const Lists: import("../graphqueryable.js").IGraphInvokableFactory<ILists>;
/**
 * IListAddResult
 */
export interface IListAddResult {
    list: IList;
    data: IListEntity;
}
//# sourceMappingURL=types.d.ts.map