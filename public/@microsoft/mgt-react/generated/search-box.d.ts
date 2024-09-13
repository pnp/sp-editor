/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
export type SearchBoxProps = {
    placeholder?: string;
    searchTerm?: string;
    debounceDelay?: number;
    searchTermChanged?: (e: CustomEvent<string>) => void;
};
export declare const SearchBox: import("react").ForwardRefExoticComponent<SearchBoxProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=search-box.d.ts.map