/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { ResponseType, DataChangedDetail } from '@microsoft/mgt-components';
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
export type GetProps = {
    resource?: string;
    scopes?: string[];
    version?: string;
    type?: ResponseType;
    maxPages?: number;
    pollingRate?: number;
    cacheEnabled?: boolean;
    cacheInvalidationPeriod?: number;
    response?: any;
    templateContext?: TemplateContext;
    dataChange?: (e: CustomEvent<DataChangedDetail>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const Get: import("react").ForwardRefExoticComponent<GetProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=get.d.ts.map