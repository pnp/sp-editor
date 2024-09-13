/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { TodoFilter } from '@microsoft/mgt-components';
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
export type TodoProps = {
    taskFilter?: TodoFilter;
    readOnly?: boolean;
    hideHeader?: boolean;
    hideOptions?: boolean;
    targetId?: string;
    initialId?: string;
    templateContext?: TemplateContext;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const Todo: import("react").ForwardRefExoticComponent<TodoProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=todo.d.ts.map