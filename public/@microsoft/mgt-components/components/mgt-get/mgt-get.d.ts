/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
/**
 * Enumeration to define what types of query are available
 *
 * @export
 * @enum {string}
 */
export declare enum ResponseType {
    /**
     * Fetches a call as JSON
     */
    json = "json",
    /**
     * Fetches a call as image
     */
    image = "image"
}
/**
 * Custom element for making Microsoft Graph get queries
 *
 * @fires dataChange - Fired when data changes
 *
 * @export
 * @class mgt-get
 * @extends {MgtTemplatedComponent}
 */
export declare class MgtGet extends MgtTemplatedComponent {
    /**
     * The resource to get
     *
     * @type {string}
     * @memberof MgtGet
     */
    resource: string;
    /**
     * The scopes to request
     *
     * @type {string[]}
     * @memberof MgtGet
     */
    scopes: string[];
    /**
     * Api version to use for request
     *
     * @type {string}
     * @memberof MgtGet
     */
    version: string;
    /**
     * Type of response
     * Default = json
     * Supported values = json, image
     *
     * @type {ResponseType}
     * @memberof MgtGet
     */
    type: ResponseType;
    /**
     * Maximum number of pages to get for the resource
     * default = 3
     * if <= 0, all pages will be fetched
     *
     * @type {number}
     * @memberof MgtGet
     */
    maxPages: number;
    /**
     * Number of milliseconds to poll the delta API and
     * update the response. Set to positive value to enable
     *
     * @type {number}
     * @memberof MgtGet
     */
    pollingRate: number;
    /**
     * Enables cache on the response from the specified resource
     * default = false
     *
     * @type {boolean}
     * @memberof MgtGet
     */
    cacheEnabled: boolean;
    /**
     * Invalidation period of the cache for the responses in milliseconds
     *
     * @type {number}
     * @memberof MgtGet
     */
    cacheInvalidationPeriod: number;
    /**
     * Gets or sets the response of the request
     *
     * @type any
     * @memberof MgtGet
     */
    response: any;
    /**
     *
     * Gets or sets the error (if any) of the request
     * @type any
     * @memberof MgtGet
     */
    error: any;
    private isPolling;
    private isRefreshing;
    /**
     * Synchronizes property values when attributes change.
     *
     * @param {*} name
     * @param {*} oldValue
     * @param {*} newValue
     * @memberof MgtPersonCard
     */
    attributeChangedCallback(name: any, oldval: any, newval: any): void;
    /**
     * Refresh the data
     *
     * @param {boolean} [hardRefresh=false]
     * if false (default), the component will only update if the data changed
     * if true, the data will be first cleared and reloaded completely
     * @memberof MgtGet
     */
    refresh(hardRefresh?: boolean): void;
    /**
     * Clears state of the component
     *
     * @protected
     * @memberof MgtGet
     */
    protected clearState(): void;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    protected render(): any;
    /**
     * load state into the component.
     *
     * @protected
     * @returns
     * @memberof MgtGet
     */
    protected loadState(): Promise<void>;
    private shouldRetrieveCache;
    private shouldUpdateCache;
}
//# sourceMappingURL=mgt-get.d.ts.map