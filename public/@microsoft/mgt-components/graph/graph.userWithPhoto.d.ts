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
 * @param {string} userId
 * @returns {(Promise<IDynamicPerson>)}
 * @memberof Graph
 */
export declare const getUserWithPhoto: (graph: IGraph, userId?: string, requestedProps?: string[]) => Promise<IDynamicPerson>;
//# sourceMappingURL=graph.userWithPhoto.d.ts.map