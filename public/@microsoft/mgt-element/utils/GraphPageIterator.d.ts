/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { GraphRequest } from '@microsoft/microsoft-graph-client';
import { IGraph } from '../IGraph';
/**
 * A helper class to assist in getting multiple pages from a resource
 *
 * @export
 * @class GraphPageIterator
 * @template T
 */
export declare class GraphPageIterator<T> {
    /**
     * Gets all the items already fetched for this request
     *
     * @readonly
     * @type {T[]}
     * @memberof GraphPageIterator
     */
    get value(): T[];
    /**
     * Gets wheather this request has more pages
     *
     * @readonly
     * @type {boolean}
     * @memberof GraphPageIterator
     */
    get hasNext(): boolean;
    /**
     * Creates a new GraphPageIterator
     *
     * @static
     * @template T - the type of entities expected from this request
     * @param {IGraph} graph - the graph instance to use for making requests
     * @param {GraphRequest} request - the initial request
     * @param {string} [version] - optional version to use for the requests - by default uses the default version
     * from the graph parameter
     * @returns a GraphPageIterator
     * @memberof GraphPageIterator
     */
    static create<T>(graph: IGraph, request: GraphRequest, version?: string): Promise<GraphPageIterator<T>>;
    /**
     * Creates a new GraphPageIterator from existing value
     *
     * @static
     * @template T - the type of entities expected from this request
     * @param {IGraph} graph - the graph instance to use for making requests
     * @param value - the existing value
     * @param nextLink - optional nextLink to use to get the next page
     * from the graph parameter
     * @returns a GraphPageIterator
     * @memberof GraphPageIterator
     */
    static createFromValue<T>(graph: IGraph, value: any, nextLink?: any): GraphPageIterator<T>;
    private _graph;
    private _nextLink;
    private _version;
    private _value;
    /**
     * Gets the next page for this request
     *
     * @returns {Promise<T[]>}
     * @memberof GraphPageIterator
     */
    next(): Promise<T[]>;
}
//# sourceMappingURL=GraphPageIterator.d.ts.map