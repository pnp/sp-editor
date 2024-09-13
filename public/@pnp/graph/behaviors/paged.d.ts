import { TimelinePipe } from "@pnp/core";
import { IGraphCollection } from "../graphqueryable.js";
export interface IPagedResult<T> {
    count: number;
    value: T[] | null;
    hasNext: boolean;
    nextLink: string;
    deltaLink: string;
}
/**
 * A function that will take a collection defining IGraphCollection and return the count of items
 * in that collection. Not all Graph collections support Count.
 *
 * @param col The collection to count
 * @returns number representing the count
 */
export declare function Count<T>(col: IGraphCollection<T>): Promise<number>;
/**
 * Behavior that converts results to pages when used with a collection (exposed through the paged method of GraphCollection)
 *
 * @returns A TimelinePipe used to configure the queryable
 */
export declare function Paged(supportsCount?: boolean): TimelinePipe;
//# sourceMappingURL=paged.d.ts.map