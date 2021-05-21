/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MiddlewareOptions } from '@microsoft/microsoft-graph-client';
import { MgtBaseComponent } from '../components/baseComponent';
/**
 * Middleware Options used for component telemetry
 *
 * @export
 * @class ComponentMiddlewareOptions
 * @implements {MiddlewareOptions}
 */
export declare class ComponentMiddlewareOptions implements MiddlewareOptions {
    /**
     * The name of the component
     *
     * @type {string}
     * @memberof ComponentMiddlewareOptions
     */
    componentName: string;
    constructor(component: MgtBaseComponent | string);
}
//# sourceMappingURL=ComponentMiddlewareOptions.d.ts.map