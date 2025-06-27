/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { DataChangedDetail } from '@microsoft/mgt-components';
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
export type SearchResultsProps = {
    queryString?: string;
    queryTemplate?: string;
    entityTypes?: string[];
    scopes?: string[];
    contentSources?: string[];
    version?: string;
    size?: number;
    pagingMax?: number;
    fetchThumbnail?: boolean;
    fields?: string[];
    enableTopResults?: boolean;
    cacheEnabled?: boolean;
    cacheInvalidationPeriod?: number;
    currentPage?: number;
    templateContext?: TemplateContext;
    updated?: (e: CustomEvent<undefined>) => void;
    dataChange?: (e: CustomEvent<DataChangedDetail>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const SearchResults: import("react").ForwardRefExoticComponent<SearchResultsProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=search-results.d.ts.map