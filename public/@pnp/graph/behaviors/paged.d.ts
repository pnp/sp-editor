import { TimelinePipe } from "@pnp/core";
import { IGraphQueryableCollection } from "../graphqueryable.js";
export interface IPagedResult {
    count: number;
    value: any[] | null;
    hasNext: boolean;
    next(): Promise<IPagedResult>;
}
/**
 * Configures a collection query to returned paged results
 *
 * @param col Collection forming the basis of the paged collection, this param is NOT modified
 * @returns A duplicate collection which will return paged results
 */
export declare function AsPaged(col: IGraphQueryableCollection, supportsCount?: boolean): IGraphQueryableCollection;
/**
 * Behavior that converts results to pages when used with a collection (exposed through the paged method of GraphCollection)
 *
 * @returns A TimelinePipe used to configure the queryable
 */
export declare function Paged(supportsCount?: boolean): TimelinePipe;
//# sourceMappingURL=paged.d.ts.map