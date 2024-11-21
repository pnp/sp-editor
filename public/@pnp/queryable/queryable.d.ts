import { Timeline, TimelinePipe } from "@pnp/core";
export type QueryableConstructObserver = (this: IQueryableInternal, init: QueryableInit, path?: string) => void;
export type QueryablePreObserver = (this: IQueryableInternal, url: string, init: RequestInit, result: any) => Promise<[string, RequestInit, any]>;
export type QueryableAuthObserver = (this: IQueryableInternal, url: URL, init: RequestInit) => Promise<[URL, RequestInit]>;
export type QueryableSendObserver = (this: IQueryableInternal, url: URL, init: RequestInit) => Promise<Response>;
export type QueryableParseObserver = (this: IQueryableInternal, url: URL, response: Response, result: any | undefined) => Promise<[URL, Response, any]>;
export type QueryablePostObserver = (this: IQueryableInternal, url: URL, result: any | undefined) => Promise<[URL, any]>;
export type QueryableDataObserver<T = any> = (this: IQueryableInternal, result: T) => void;
declare const DefaultMoments: {
    readonly construct: (observers: QueryableConstructObserver[], init: QueryableInit, path?: string) => Timeline<any>;
    readonly pre: (observers: QueryablePreObserver[], url: string, init: RequestInit, result: any) => Promise<[url: string, init: RequestInit, result: any]>;
    readonly auth: (observers: QueryableAuthObserver[], url: URL, init: RequestInit) => Promise<[url: URL, init: RequestInit]>;
    readonly send: (observers: QueryableSendObserver[], url: URL, init: RequestInit) => Promise<Promise<Response>>;
    readonly parse: (observers: QueryableParseObserver[], url: URL, response: Response, result: any) => Promise<[url: URL, response: Response, result: any]>;
    readonly post: (observers: QueryablePostObserver[], url: URL, result: any) => Promise<[url: URL, result: any]>;
    readonly data: (observers: QueryableDataObserver<any>[], ...args: any[]) => void;
};
export type QueryableInit = Queryable<any> | string | [Queryable<any>, string];
export type QueryParams = {
    /**
     * Sets the value associated to a given search parameter to the given value. If there were several values, delete the others.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/set)
     */
    set(name: string, value: string): void;
    /**
     * Returns the first value associated to the given search parameter.
     *
     * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/get)
     */
    get(name: string): string | null;
    /**
    * Returns a Boolean indicating if such a search parameter exists.
    *
    * [MDN Reference](https://developer.mozilla.org/docs/Web/API/URLSearchParams/has)
    */
    has(name: string, value?: string): boolean;
    /** Returns a string containing a query string suitable for use in a URL. Does not include the question mark. */
    toString(): string;
    /**
     * Iterator accessor
     */
    [Symbol.iterator](): Iterator<[string, string]>;
};
export declare class Queryable<R> extends Timeline<typeof DefaultMoments> implements IQueryableInternal<R> {
    protected _query: QueryParams;
    protected _url: string;
    protected InternalResolve: symbol;
    protected InternalReject: symbol;
    protected InternalPromise: symbol;
    constructor(init: QueryableInit, path?: string);
    /**
     * Directly concatenates the supplied string to the current url, not normalizing "/" chars
     *
     * @param pathPart The string to concatenate to the url
     */
    concat(pathPart: string): this;
    /**
     * Gets the full url with query information
     *
     */
    toRequestUrl(): string;
    /**
     * Querystring key, value pairs which will be included in the request
     */
    get query(): QueryParams;
    /**
     * Gets the current url
     *
     */
    toUrl(): string;
    protected execute(userInit: RequestInit): Promise<void>;
}
/**
 * This interface adds the invokable method to Queryable allowing obj() to be called correctly
 * The code is contained in invokable decorator
 */
export interface Queryable<R = any> extends IInvokable<R> {
}
export interface IQueryableInternal<R = any> extends Timeline<any>, IInvokable {
    readonly query: QueryParams;
    <T = R>(this: IQueryableInternal, init?: RequestInit): Promise<T>;
    using(...behaviors: TimelinePipe[]): this;
    toRequestUrl(): string;
    toUrl(): string;
}
export type Operation = <T = any>(this: IQueryableInternal, init?: RequestInit) => Promise<T>;
export declare function get<T = any>(this: IQueryableInternal, init?: RequestInit): Promise<T>;
export declare function post<T = any>(this: IQueryableInternal, init?: RequestInit): Promise<T>;
export declare function put<T = any>(this: IQueryableInternal, init?: RequestInit): Promise<T>;
export declare function patch<T = any>(this: IQueryableInternal, init?: RequestInit): Promise<T>;
export declare function del<T = any>(this: IQueryableInternal, init?: RequestInit): Promise<T>;
export declare function op<T>(q: IQueryableInternal, operation: Operation, init?: RequestInit): Promise<T>;
export declare function queryableFactory<InstanceType>(constructor: {
    new (init: QueryableInit, path?: string): InstanceType;
}): (init: QueryableInit, path?: string) => InstanceType;
/**
 * Allows a decorated object to be invoked as a function, optionally providing an implementation for that action
 *
 * @param invokeableAction Optional. The logic to execute upon invoking the object as a function.
 * @returns Decorator which applies the invokable logic to the tagged class
 */
export declare function invokable(invokeableAction?: (this: any, init?: RequestInit) => Promise<any>): (target: any) => any;
export interface IInvokable<R = any> {
    <T = R>(init?: RequestInit): Promise<T>;
}
export {};
//# sourceMappingURL=queryable.d.ts.map