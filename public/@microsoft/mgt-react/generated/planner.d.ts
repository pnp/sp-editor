/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { TaskFilter, ITask } from '@microsoft/mgt-components';
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
export type PlannerProps = {
    isNewTaskVisible?: boolean;
    readOnly?: boolean;
    targetId?: string;
    targetBucketId?: string;
    initialId?: string;
    initialBucketId?: string;
    hideHeader?: boolean;
    hideOptions?: boolean;
    groupId?: string;
    taskFilter?: TaskFilter;
    templateContext?: TemplateContext;
    updated?: (e: CustomEvent<undefined>) => void;
    taskAdded?: (e: CustomEvent<ITask>) => void;
    taskChanged?: (e: CustomEvent<ITask>) => void;
    taskClick?: (e: CustomEvent<ITask>) => void;
    taskRemoved?: (e: CustomEvent<ITask>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const Planner: import("react").ForwardRefExoticComponent<PlannerProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=planner.d.ts.map