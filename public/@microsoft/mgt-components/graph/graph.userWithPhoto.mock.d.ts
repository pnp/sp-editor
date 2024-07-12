/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { IDynamicPerson } from './types';
/**
 * async promise, returns IDynamicPerson
 *
 * @param {string} _userId
 * @returns {(Promise<IDynamicPerson>)}
 * @memberof Graph
 */
export declare const getUserWithPhoto: (_graph: IGraph, _userId?: string, _requestedProps?: string[]) => Promise<IDynamicPerson>;
//# sourceMappingURL=graph.userWithPhoto.mock.d.ts.map