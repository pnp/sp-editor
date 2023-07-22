/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * An EventHandler for custom events
 */
export type EventHandler<E> = (event: E) => void;
/**
 * Provider EventDispatcher
 *
 * @export
 * @class EventDispatcher
 * @template E
 */
export declare class EventDispatcher<E> {
    private readonly eventHandlers;
    /**
     * fires event handler
     *
     * @param {E} event
     * @memberof EventDispatcher
     */
    fire(event: E): void;
    /**
     * adds eventHandler
     *
     * @param {EventHandler<E>} eventHandler
     * @memberof EventDispatcher
     */
    add(eventHandler: EventHandler<E>): void;
    /**
     * removes eventHandler
     *
     * @param {EventHandler<E>} eventHandler
     * @memberof EventDispatcher
     */
    remove(eventHandler: EventHandler<E>): void;
}
//# sourceMappingURL=EventDispatcher.d.ts.map