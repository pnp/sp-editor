import { TimelinePipe } from "@pnp/core";
import { Queryable } from "../queryable.js";
export declare type CancelablePromise<T = any> = Promise<T> & {
    cancel(): Promise<void>;
};
/**
 * Defines the signature for observers subscribing to the cancelable moment
 */
export declare type CancelableObserver = (this: Queryable) => Promise<void>;
/**
 * Function wrapper that turns the supplied function into a cancellation scope
 *
 * @param func Func to wrap
 * @returns The same func signature, wrapped with our cancel scoping logic
 */
export declare const asCancelableScope: <T extends any[], U>(func: (...args: T) => U) => (...args: T) => U;
/**
 * Decorator used to mark multi-step methods to ensure all subrequests are properly cancelled
 */
export declare function cancelableScope(_target: any, _propertyKey: string, descriptor: PropertyDescriptor): void;
/**
 * Allows requests to be canceled by the caller by adding a cancel method to the Promise returned by the library
 *
 * @returns Timeline pipe to setup canelability
 */
export declare function Cancelable(): TimelinePipe<Queryable>;
/**
 * Allows you to define an action that is run when a request is cancelled
 *
 * @param action The action to run
 * @returns A timeline pipe used in the request lifecycle
 */
export declare function CancelAction(action: CancelableObserver): TimelinePipe<Queryable>;
//# sourceMappingURL=cancelable.d.ts.map