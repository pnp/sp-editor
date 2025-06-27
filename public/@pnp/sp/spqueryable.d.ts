import { Queryable, IInvokable } from "@pnp/queryable";
export type SPInit = string | ISPQueryable | [ISPQueryable, string];
export interface ISPConstructor<T extends ISPQueryable = ISPQueryable> {
    new (base: SPInit, path?: string): T;
}
export type ISPInvokableFactory<R extends ISPQueryable> = (base: SPInit, path?: string) => R & IInvokable;
export declare const spInvokableFactory: <R extends ISPQueryable<any>>(f: any) => ISPInvokableFactory<R>;
/**
 * SharePointQueryable Base Class
 *
 */
export declare class _SPQueryable<GetType = any> extends Queryable<GetType> {
    protected parentUrl: string;
    /**
     * Creates a new instance of the SharePointQueryable class
     *
     * @constructor
     * @param base A string or SharePointQueryable that should form the base part of the url
     *
     */
    constructor(base: SPInit, path?: string);
    /**
     * Gets the full url with query information
     */
    toRequestUrl(): string;
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
    protected getParent<T extends ISPQueryable>(factory: ISPInvokableFactory<any>, path?: string, base?: string): T;
}
export interface ISPQueryable<GetType = any> extends _SPQueryable<GetType> {
}
export declare const SPQueryable: ISPInvokableFactory<ISPQueryable<any>>;
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
export declare class _SPCollection<GetType = any[]> extends _SPQueryable<GetType> {
    /**
     * Filters the returned collection (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_supported)
     *
     * @param filter The string representing the filter query
     */
    filter<T = UnwrapArray<GetType>>(filter: string | ComparisonResult<T> | ((f: InitialFieldQuery<T>) => ComparisonResult<T>)): this;
    /**
     * Orders based on the supplied fields
     *
     * @param orderby The name of the field on which to sort
     * @param ascending If false DESC is appended, otherwise ASC (default)
     */
    orderBy(orderBy: string, ascending?: boolean): this;
    /**
     * Skips the specified number of items
     *
     * @param skip The number of items to skip
     */
    skip(skip: number): this;
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    top(top: number): this;
}
export interface ISPCollection<GetType = any[]> extends _SPCollection<GetType> {
}
export declare const SPCollection: ISPInvokableFactory<ISPCollection<any[]>>;
/**
 * Represents an instance that can be selected
 *
 */
export declare class _SPInstance<GetType = any> extends _SPQueryable<GetType> {
}
export interface ISPInstance<GetType = any> extends _SPInstance<GetType> {
}
export declare const SPInstance: ISPInvokableFactory<ISPInstance<any>>;
/**
 * Adds the a delete method to the tagged class taking no parameters and calling spPostDelete
 */
export declare function deleteable(): (this: ISPQueryable) => Promise<void>;
export interface IDeleteable {
    /**
     * Delete this instance
     */
    delete(): Promise<void>;
}
export declare function deleteableWithETag(): (this: ISPQueryable, eTag?: string) => Promise<void>;
export interface IDeleteableWithETag {
    /**
     * Delete this instance
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    delete(eTag?: string): Promise<void>;
}
export declare const spGet: <T = any>(o: ISPQueryable<any>, init?: RequestInit) => Promise<T>;
export declare const spPost: <T = any>(o: ISPQueryable<any>, init?: RequestInit) => Promise<T>;
export declare const spPostMerge: <T = any>(o: ISPQueryable<any>, init?: RequestInit) => Promise<T>;
export declare const spPostDelete: <T = any>(o: ISPQueryable<any>, init?: RequestInit) => Promise<T>;
export declare const spPostDeleteETag: <T = any>(o: ISPQueryable<any>, init?: RequestInit, eTag?: string) => Promise<T>;
export declare const spDelete: <T = any>(o: ISPQueryable<any>, init?: RequestInit) => Promise<T>;
export declare const spPatch: <T = any>(o: ISPQueryable<any>, init?: RequestInit) => Promise<T>;
type KeysMatching<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
type KeysMatchingObjects<T> = {
    [K in keyof T]: T[K] extends object ? (T[K] extends Date ? never : K) : never;
}[keyof T];
type UnwrapArray<T> = T extends (infer U)[] ? U : T;
declare class BaseQuery {
    protected query: string[];
    constructor(query: string[]);
}
declare class QueryableFields<T> extends BaseQuery {
    constructor(q: string[]);
    text(internalName: KeysMatching<T, string>): TextField<T>;
    choice(internalName: KeysMatching<T, string>): TextField<T>;
    multiChoice(internalName: KeysMatching<T, string[]>): TextField<T>;
    number(internalName: KeysMatching<T, number>): NumberField<T>;
    date(internalName: KeysMatching<T, Date>): DateField<T>;
    boolean(internalName: KeysMatching<T, boolean>): BooleanField<T>;
    lookup<TKey extends KeysMatchingObjects<T>>(internalName: TKey): LookupQueryableFields<T, T[TKey]>;
    lookupId<TKey extends KeysMatching<T, number>>(internalName: TKey): NumberField<T>;
}
declare class QueryableAndResult<T> extends QueryableFields<T> {
    or(...queries: (ComparisonResult<T> | ((f: QueryableFields<T>) => ComparisonResult<T>))[]): ComparisonResult<T>;
}
declare class QueryableOrResult<T> extends QueryableFields<T> {
    and(...queries: (ComparisonResult<T> | ((f: QueryableFields<T>) => ComparisonResult<T>))[]): ComparisonResult<T>;
}
export declare class InitialFieldQuery<T> extends QueryableFields<T> {
    or(): QueryableFields<T>;
    or(...queries: (ComparisonResult<T> | ((f: QueryableFields<T>) => ComparisonResult<T>))[]): ComparisonResult<T>;
    and(): QueryableFields<T>;
    and(...queries: (ComparisonResult<T> | ((f: QueryableFields<T>) => ComparisonResult<T>))[]): ComparisonResult<T>;
}
declare class LookupQueryableFields<TBaseInterface, TExpandedType> extends BaseQuery {
    private LookupField;
    constructor(q: string[], LookupField: string);
    Id(id: number): ComparisonResult<TBaseInterface>;
    text(internalName: KeysMatching<TExpandedType, string>): TextField<TBaseInterface>;
    number(internalName: KeysMatching<TExpandedType, number>): NumberField<TBaseInterface>;
}
declare class NullableField<TBaseInterface, TInputValueType> extends BaseQuery {
    protected LastIndex: number;
    protected InternalName: string;
    constructor(q: string[]);
    protected toODataValue(value: TInputValueType): string;
    isNull(): ComparisonResult<TBaseInterface>;
    isNotNull(): ComparisonResult<TBaseInterface>;
}
declare class ComparableField<T, TInputValueType> extends NullableField<T, TInputValueType> {
    equals(value: TInputValueType): ComparisonResult<T>;
    notEquals(value: TInputValueType): ComparisonResult<T>;
    in(...values: TInputValueType[]): ComparisonResult<T>;
    notIn(...values: TInputValueType[]): ComparisonResult<T>;
}
declare class TextField<TBaseInterface> extends ComparableField<TBaseInterface, string> {
    startsWith(value: string): ComparisonResult<TBaseInterface>;
    contains(value: string): ComparisonResult<TBaseInterface>;
}
declare class BooleanField<TBaseInterface> extends NullableField<TBaseInterface, boolean> {
    protected toODataValue(value: boolean | null): string;
    isTrue(): ComparisonResult<TBaseInterface>;
    isFalse(): ComparisonResult<TBaseInterface>;
    isFalseOrNull(): ComparisonResult<TBaseInterface>;
}
declare class NumericField<T, TInputValueType> extends ComparableField<T, TInputValueType> {
    greaterThan(value: TInputValueType): ComparisonResult<T>;
    greaterThanOrEquals(value: TInputValueType): ComparisonResult<T>;
    lessThan(value: TInputValueType): ComparisonResult<T>;
    lessThanOrEquals(value: TInputValueType): ComparisonResult<T>;
}
declare class NumberField<T> extends NumericField<T, number> {
    protected toODataValue(value: number): string;
}
declare class DateField<TBaseInterface> extends NumericField<TBaseInterface, Date> {
    protected toODataValue(value: Date): string;
    isBetween(startDate: Date, endDate: Date): ComparisonResult<TBaseInterface>;
    isToday(): ComparisonResult<TBaseInterface>;
}
export declare class ComparisonResult<T> extends BaseQuery {
    and(): QueryableAndResult<T>;
    and(...queries: (ComparisonResult<T> | ((f: QueryableFields<T>) => ComparisonResult<T>))[]): ComparisonResult<T>;
    or(): QueryableOrResult<T>;
    or(...queries: (ComparisonResult<T> | ((f: QueryableFields<T>) => ComparisonResult<T>))[]): ComparisonResult<T>;
    toString(): string;
}
export {};
//# sourceMappingURL=spqueryable.d.ts.map