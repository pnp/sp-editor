import { _SPCollection, _SPInstance } from "../spqueryable.js";
export declare class _Subscriptions extends _SPCollection {
    /**
    * Returns all the webhook subscriptions or the specified webhook subscription
    *
    * @param subscriptionId The id of a specific webhook subscription to retrieve, omit to retrieve all the webhook subscriptions
    */
    getById(subscriptionId: string): ISubscription;
    /**
     * Creates a new webhook subscription
     *
     * @param notificationUrl The url to receive the notifications
     * @param expirationDate The date and time to expire the subscription in the form YYYY-MM-ddTHH:mm:ss+00:00 (maximum of 6 months)
     * @param clientState A client specific string (optional)
     */
    add(notificationUrl: string, expirationDate: string, clientState?: string): Promise<any>;
}
export interface ISubscriptions extends _Subscriptions {
}
export declare const Subscriptions: import("../spqueryable.js").ISPInvokableFactory<ISubscriptions>;
export declare class _Subscription extends _SPInstance {
    /**
     * Renews this webhook subscription
     *
     * @param expirationDate The date and time to expire the subscription in the form YYYY-MM-ddTHH:mm:ss+00:00 (maximum of 6 months, optional)
     * @param notificationUrl The url to receive the notifications (optional)
     * @param clientState A client specific string (optional)
     */
    update(expirationDate?: string, notificationUrl?: string, clientState?: string): Promise<any>;
    /**
     * Removes this webhook subscription
     *
     */
    delete(): Promise<void>;
}
export interface ISubscription extends _Subscription {
}
export declare const Subscription: import("../spqueryable.js").ISPInvokableFactory<ISubscription>;
//# sourceMappingURL=types.d.ts.map