/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
export type PickerProps = {
    resource?: string;
    version?: string;
    maxPages?: number;
    placeholder?: string;
    keyName?: string;
    entityType?: string;
    scopes?: string[];
    cacheEnabled?: boolean;
    cacheInvalidationPeriod?: number;
    selectedValue?: string;
    templateContext?: TemplateContext;
    selectionChanged?: (e: CustomEvent<any>) => void;
    updated?: (e: CustomEvent<undefined>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const Picker: import("react").ForwardRefExoticComponent<PickerProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=picker.d.ts.map