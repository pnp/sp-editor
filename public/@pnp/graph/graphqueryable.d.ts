import { IInvokable, Queryable } from "@pnp/queryable";
export type GraphInit = string | IGraphQueryable | [IGraphQueryable, string];
export interface IGraphConstructor<T> {
    new (base: GraphInit, path?: string): T;
}
export type IGraphInvokableFactory<R extends IGraphQueryable> = (base: GraphInit, path?: string) => R & IInvokable;
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
    protected getParent<T extends _GraphQueryable>(factory: IGraphConstructor<T>, base?: GraphInit, path?: string): T;
}
export interface IGraphQueryable<GetType = any> extends _GraphQueryable<GetType> {
}
export declare const GraphQueryable: IGraphInvokableFactory<IGraphQueryable<any>>;
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
export declare class _GraphCollection<GetType = any[]> extends _GraphQueryable<GetType> {
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
    [Symbol.asyncIterator](): AsyncIterator<GetType, any, undefined>;
}
export interface IGraphCollection<GetType = any[]> extends _GraphCollection<GetType> {
}
export declare const GraphCollection: IGraphInvokableFactory<IGraphCollection<any[]>>;
/**
 * Represents an instance that can be selected
 *
 */
export declare class _GraphInstance<GetType = any> extends _GraphQueryable<GetType> {
}
export interface IGraphInstance<GetType = any> extends IInvokable, IGraphQueryable<GetType> {
}
export declare const GraphInstance: IGraphInvokableFactory<IGraphInstance<any>>;
export declare const graphGet: <T = any>(o: IGraphQueryable<any>, init?: RequestInit) => Promise<T>;
export declare const graphPost: <T = any>(o: IGraphQueryable<any>, init?: RequestInit) => Promise<T>;
export declare const graphDelete: <T = any>(o: IGraphQueryable<any>, init?: RequestInit) => Promise<T>;
export declare const graphPatch: <T = any>(o: IGraphQueryable<any>, init?: RequestInit) => Promise<T>;
export declare const graphPut: <T = any>(o: IGraphQueryable<any>, init?: RequestInit) => Promise<T>;
//# sourceMappingURL=graphqueryable.d.ts.map