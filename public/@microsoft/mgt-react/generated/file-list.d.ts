/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { OfficeGraphInsightString, ViewType } from '@microsoft/mgt-components';
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
export type FileListProps = {
    fileListQuery?: string;
    fileQueries?: string[];
    files?: MicrosoftGraph.DriveItem[];
    siteId?: string;
    driveId?: string;
    groupId?: string;
    itemId?: string;
    itemPath?: string;
    userId?: string;
    insightType?: OfficeGraphInsightString;
    itemView?: ViewType;
    fileExtensions?: string[];
    pageSize?: number;
    disableOpenOnClick?: boolean;
    hideMoreFilesButton?: boolean;
    maxFileSize?: number;
    enableFileUpload?: boolean;
    maxUploadFile?: number;
    excludedFileExtensions?: string[];
    templateContext?: TemplateContext;
    updated?: (e: CustomEvent<undefined>) => void;
    itemClick?: (e: CustomEvent<MicrosoftGraph.DriveItem>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const FileList: import("react").ForwardRefExoticComponent<FileListProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=file-list.d.ts.map