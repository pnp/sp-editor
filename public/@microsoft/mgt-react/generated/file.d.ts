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
export type FileProps = {
    fileQuery?: string;
    siteId?: string;
    driveId?: string;
    groupId?: string;
    listId?: string;
    userId?: string;
    itemId?: string;
    itemPath?: string;
    insightType?: OfficeGraphInsightString;
    insightId?: string;
    fileDetails?: MicrosoftGraph.DriveItem;
    fileIcon?: string;
    driveItem?: MicrosoftGraph.DriveItem;
    line1Property?: string;
    line2Property?: string;
    line3Property?: string;
    view?: ViewType;
    templateContext?: TemplateContext;
    updated?: (e: CustomEvent<undefined>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const File: import("react").ForwardRefExoticComponent<FileProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=file.d.ts.map