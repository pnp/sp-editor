import { IInvokable, Queryable } from "@pnp/queryable";
import { IPagedResult } from "./behaviors/paged.js";
export declare type GraphInit = string | IGraphQueryable | [IGraphQueryable, string];
export interface IGraphQueryableConstructor<T> {
    new (base: GraphInit, path?: string): T;
}
export declare type IGraphInvokableFactory<R extends IGraphQueryable> = (base: GraphInit, path?: string) => R & IInvokable;
export declare const graphInvokableFactory: <R extends IGraphQueryable<any>>(f: any) => IGraphInvokableFactory<R>;
/**
 * Queryable Base Class
 *
 */
export declare class _GraphQueryable<GetType = any> extends Queryable<GetType> {
    protected parentUrl: string;
    /**
     * Creates a new instance of the Queryable class
     *
     * @constructor
     * @param base A string or Queryable that should form the base part of the url
     *
     */
    constructor(base: GraphInit, path?: string);
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    select(...selects: string[]): this;
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    expand(...expands: string[]): this;
    /**
     * Gets a parent for this instance as specified
     *
     * @param factory The contructor for the class to create
     */
    protected getParent<T extends _GraphQueryable>(factory: IGraphQueryableConstructor<T>, base?: GraphInit, path?: string): T;
}
export interface IGraphQueryable<GetType = any> extends _GraphQueryable<GetType> {
}
export declare const GraphQueryable: IGraphInvokableFactory<IGraphQueryable<any>>;
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
export declare class _GraphQueryableCollection<GetType = any[]> extends _GraphQueryable<GetType> {
    /**
     *
     * @param filter The string representing the filter query
     */
    filter(filter: string): this;
    /**
     * Orders based on the supplied fields
     *
     * @param orderby The name of the field on which to sort
     * @param ascending If false DESC is appended, otherwise ASC (default)
     */
    orderBy(orderBy: string, ascending?: boolean): this;
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    top(top: number): this;
    /**
     * Skips a set number of items in the return set
     *
     * @param num Number of items to skip
     */
    skip(num: number): this;
    /**
     * Skips a set number of items in the return set
     *
     * @param num Number of items to skip
     */
    search(query: string): this;
    /**
     * 	To request second and subsequent pages of Graph data
     */
    skipToken(token: string): this;
    /**
     * 	Retrieves the total count of matching resources
     *  If the resource doesn't support count, this value will always be zero
     */
    count(): Promise<number>;
    /**
     * Allows reading through a collection as pages of information whose size is determined by top or the api method's default
     *
     * @returns an object containing results, the ability to determine if there are more results, and request the next page of results
     */
    paged(): Promise<IPagedResult>;
}
export interface IGraphQueryableCollection<GetType = any[]> extends _GraphQueryableCollection<GetType> {
}
export declare const GraphQueryableCollection: IGraphInvokableFactory<IGraphQueryableCollection<any[]>>;
/**
 * Represents an instance that can be selected
 *
 */
export declare class _GraphQueryableInstance<GetType = any> extends _GraphQueryable<GetType> {
}
export interface IGraphQueryableInstance<GetType = any> extends IInvokable, IGraphQueryable<GetType> {
}
export declare const GraphQueryableInstance: IGraphInvokableFactory<IGraphQueryableInstance<any>>;
//# sourceMappingURL=graphqueryable.d.ts.map