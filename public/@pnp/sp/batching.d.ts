import { TimelinePipe } from "@pnp/core";
import { Queryable } from "@pnp/queryable";
import { ISPQueryable } from "./spqueryable.js";
declare module "./fi" {
    interface SPFI {
        /**
         * Creates a batch behavior and associated execute function
         *
         */
        batched(props?: ISPBatchProps): [SPFI, () => Promise<void>];
    }
}
declare module "./webs/types" {
    interface _Web {
        /**
         * Creates a batch behavior and associated execute function
         *
         */
        batched(props?: ISPBatchProps): [IWeb, () => Promise<void>];
    }
}
interface ISPBatchProps {
    /**
     * Controls the headers copied from the original request into the batched request, applied to all items
     * default: /Accept|Content-Type|IF-Match/i
     */
    headersCopyPattern?: RegExp;
}
/**
 * Creates a batched version of the supplied base, meaning that all chained fluent operations from the new base are part of the batch
 *
 * @param base The base from which to initialize the batch
 * @param props Any properties used to initialize the batch functionality
 * @returns A tuple of [behavior used to assign objects to the batch, the execute function used to resolve the batch requests]
 */
export declare function createBatch(base: ISPQueryable, props?: ISPBatchProps): [TimelinePipe, () => Promise<void>];
/**
 * Behavior that blocks batching for the request regardless of "method"
 *
 * This is used for requests to bypass batching methods. Example - Request Digest where we need to get a request-digest inside of a batch.
 * @returns TimelinePipe
 */
export declare function BatchNever(): (instance: Queryable) => Queryable<any>;
export {};
//# sourceMappingURL=batching.d.ts.map