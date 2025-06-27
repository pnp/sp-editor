/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
export type AgendaProps = {
    date?: string;
    groupId?: string;
    days?: number;
    eventQuery?: string;
    events?: MicrosoftGraph.Event[];
    showMax?: number;
    groupByDay?: boolean;
    preferredTimezone?: string;
    templateContext?: TemplateContext;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
    updated?: (e: CustomEvent<undefined>) => void;
};
export declare const Agenda: import("react").ForwardRefExoticComponent<AgendaProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=agenda.d.ts.map