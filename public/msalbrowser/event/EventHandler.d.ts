import { ICrypto, Logger } from "@azure/msal-common";
import { InteractionType } from "../utils/BrowserConstants";
import { EventCallbackFunction, EventError, EventPayload } from "./EventMessage";
import { EventType } from "./EventType";
export declare class EventHandler {
    private eventCallbacks;
    private logger;
    private browserCrypto;
    constructor(logger: Logger, browserCrypto: ICrypto);
    /**
     * Adds event callbacks to array
     * @param callback
     */
    addEventCallback(callback: EventCallbackFunction): string | null;
    /**
     * Removes callback with provided id from callback array
     * @param callbackId
     */
    removeEventCallback(callbackId: string): void;
    /**
     * Emits events by calling callback with event message
     * @param eventType
     * @param interactionType
     * @param payload
     * @param error
     */
    emitEvent(eventType: EventType, interactionType?: InteractionType, payload?: EventPayload, error?: EventError): void;
}
//# sourceMappingURL=EventHandler.d.ts.map