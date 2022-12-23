import { ColumnDefinition as IColumnDefinition } from "@microsoft/microsoft-graph-types";
import { _GraphQueryableCollection, _GraphQueryableInstance } from "../graphqueryable.js";
import { IDeleteable, IGetById, IUpdateable } from "../decorators.js";
/**
 * Represents a columns entity
 */
export declare class _Column extends _GraphQueryableInstance<IColumnDefinition> {
}
export interface IColumn extends _Column, IDeleteable, IUpdateable<IColumnDefinition> {
}
export declare const Column: import("../graphqueryable.js").IGraphInvokableFactory<IColumn>;
/**
 * Describes a collection of column objects
 */
export declare class _Columns extends _GraphQueryableCollection<IColumnDefinition[]> {
}
export interface IColumns extends _Columns, IGetById<IColumn> {
}
export declare const Columns: import("../graphqueryable.js").IGraphInvokableFactory<IColumns>;
//# sourceMappingURL=types.d.ts.map