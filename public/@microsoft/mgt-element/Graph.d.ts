/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Client, GraphRequest } from '@microsoft/microsoft-graph-client';
import { IGraph } from './IGraph';
import { IProvider } from './providers/IProvider';
import { Batch } from './utils/Batch';
/**
 * The base Graph implementation.
 *
 * @export
 * @abstract
 * @class Graph
 */
export declare class Graph implements IGraph {
    /**
     * the internal client used to make graph calls
     *
     * @readonly
     * @type {Client}
     * @memberof Graph
     */
    get client(): Client;
    /**
     * the component name appended to Graph request headers
     *
     * @readonly
     * @type {string}
     * @memberof Graph
     */
    get componentName(): string;
    /**
     * the version of the graph to query
     *
     * @readonly
     * @type {string}
     * @memberof Graph
     */
    get version(): string;
    private readonly _client;
    private _componentName;
    private readonly _version;
    constructor(client: Client, version?: string);
    /**
     * Returns a new instance of the Graph using the same
     * client within the context of the provider.
     *
     * @param {Element} component
     * @returns {IGraph}
     * @memberof Graph
     */
    forComponent(component: Element | string): Graph;
    /**
     * Returns a new graph request for a specific component
     * Used internally for analytics purposes
     *
     * @param {string} path
     * @memberof Graph
     */
    api(path: string): GraphRequest;
    /**
     * creates a new batch request
     *
     * @returns {Batch}
     * @memberof Graph
     */
    createBatch<T = any>(): Batch<T>;
    /**
     * sets the component name used in request headers.
     *
     * @protected
     * @param {Element} component
     * @memberof Graph
     */
    protected setComponent(component: Element | string): void;
}
/**
 * create a new Graph instance using the specified provider.
 *
 * @static
 * @param {IProvider} provider
 * @returns {Graph}
 * @memberof Graph
 */
export declare const createFromProvider: (provider: IProvider, version?: string, component?: Element) => Graph;
//# sourceMappingURL=Graph.d.ts.map