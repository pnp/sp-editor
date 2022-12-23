import { Queryable } from "../queryable.js";
import { TimelinePipe } from "@pnp/core";
export declare type CacheKeyFactory = (url: string) => string;
export declare type CacheExpireFunc = (url: string) => Date;
export interface ICachingProps {
    store?: "local" | "session";
    keyFactory?: CacheKeyFactory;
    expireFunc?: CacheExpireFunc;
}
/**
 * Behavior that forces caching for the request regardless of "method"
 *
 * @returns TimelinePipe
 */
export declare function CacheAlways(): (instance: Queryable) => Queryable<any>;
/**
 * Behavior that blocks caching for the request regardless of "method"
 *
 * Note: If both Caching and CacheAlways are present AND CacheNever is present the request will not be cached
 * as we give priority to the CacheNever case
 *
 * @returns TimelinePipe
 */
export declare function CacheNever(): (instance: Queryable) => Queryable<any>;
/**
 * Behavior that allows you to specify a cache key for a request
 *
 * @param key The key to use for caching
  */
export declare function CacheKey(key: string): (instance: Queryable) => Queryable<any>;
/**
 * Adds caching to the requests based on the supplied props
 *
 * @param props Optional props that configure how caching will work
 * @returns TimelinePipe used to configure requests
 */
export declare function Caching(props?: ICachingProps): TimelinePipe<Queryable>;
/**
 * Based on the supplied properties, creates bound logic encapsulating common caching configuration
 * sharable across implementations to more easily provide consistent behavior across behaviors
 *
 * @param props Any caching props used to initialize the core functions
 */
export declare function bindCachingCore(url: string, init: RequestInit, props?: Partial<ICachingProps>): [boolean, () => any, (any: any) => void];
//# sourceMappingURL=caching.d.ts.map