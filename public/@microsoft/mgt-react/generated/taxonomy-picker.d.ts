/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
export type TaxonomyPickerProps = {
    termsetId?: string;
    termId?: string;
    siteId?: string;
    locale?: string;
    version?: string;
    placeholder?: string;
    position?: string;
    defaultSelectedTermId?: string;
    selectedTerm?: MicrosoftGraph.TermStore.Term;
    disabled?: boolean;
    cacheEnabled?: boolean;
    cacheInvalidationPeriod?: number;
    templateContext?: TemplateContext;
    selectionChanged?: (e: CustomEvent<MicrosoftGraph.TermStore.Term>) => void;
    updated?: (e: CustomEvent<undefined>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const TaxonomyPicker: import("react").ForwardRefExoticComponent<TaxonomyPickerProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=taxonomy-picker.d.ts.map