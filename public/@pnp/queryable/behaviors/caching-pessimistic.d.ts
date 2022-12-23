import { TimelinePipe } from "@pnp/core";
import { ICachingProps } from "./caching.js";
/**
 * Pessimistic Caching Behavior
 * Always returns the cached value if one exists but asynchronously executes the call and updates the cache.
 * If a expireFunc is included then the cache update only happens if the cache has expired.
 *
 * @param store Use local or session storage
 * @param keyFactory: a function that returns the key for the cache value, if not provided a default hash of the url will be used
 * @param expireFunc: a function that returns a date of expiration for the cache value, if not provided the cache never expires but is always updated.
 */
export declare function CachingPessimisticRefresh(props?: ICachingProps): TimelinePipe;
//# sourceMappingURL=caching-pessimistic.d.ts.map