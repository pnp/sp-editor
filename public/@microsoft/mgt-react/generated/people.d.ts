/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { IDynamicPerson, PersonCardInteraction } from '@microsoft/mgt-components';
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
export type PeopleProps = {
    groupId?: string;
    userIds?: string[];
    people?: IDynamicPerson[];
    peopleQueries?: string[];
    showMax?: number;
    showPresence?: boolean;
    personCardInteraction?: PersonCardInteraction;
    resource?: string;
    version?: string;
    scopes?: string[];
    fallbackDetails?: IDynamicPerson[];
    templateContext?: TemplateContext;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const People: import("react").ForwardRefExoticComponent<PeopleProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=people.d.ts.map