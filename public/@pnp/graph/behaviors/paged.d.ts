import { TimelinePipe } from "@pnp/core";
import { IGraphQueryableCollection } from "../graphqueryable.js";
export interface IPagedResult {
    count: number;
    value: any | any[] | null;
    hasNext: boolean;
    nextLink: string;
}
/**
 * A function that will take a collection defining IGraphQueryableCollection and return the count of items
 * in that collection. Not all Graph collections support Count.
 *
 * @param col The collection to count
 * @returns number representing the count
 */
export declare function Count<T>(col: IGraphQueryableCollection<T>): Promise<number>;
/**
 * Configures a collection query to returned paged results via async iteration
 *
 * @param col Collection forming the basis of the paged collection, this param is NOT modified
 * @returns A duplicate collection which will return paged results
 */
export declare function AsAsyncIterable<T>(col: IGraphQueryableCollection<T>): AsyncIterable<T>;
/**
 * Behavior that converts results to pages when used with a collection (exposed through the paged method of GraphCollection)
 *
 * @returns A TimelinePipe used to configure the queryable
 */
export declare function Paged(): TimelinePipe;
//# sourceMappingURL=paged.d.ts.map