/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { PersonType, GroupType, UserType, IDynamicPerson, PersonCardInteraction } from '@microsoft/mgt-components';
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
export type PeoplePickerProps = {
    groupId?: string;
    groupIds?: string[];
    type?: PersonType;
    groupType?: GroupType;
    userType?: UserType;
    transitiveSearch?: boolean;
    people?: IDynamicPerson[];
    showMax?: number;
    disableImages?: boolean;
    showPresence?: boolean;
    personCardInteraction?: PersonCardInteraction;
    selectedPeople?: IDynamicPerson[];
    defaultSelectedUserIds?: string[];
    defaultSelectedGroupIds?: string[];
    placeholder?: string;
    disabled?: boolean;
    allowAnyEmail?: boolean;
    selectionMode?: string;
    userIds?: string[];
    userFilters?: string;
    peopleFilters?: string;
    groupFilters?: string;
    ariaLabel?: string;
    disableSuggestions?: boolean;
    templateContext?: TemplateContext;
    selectionChanged?: (e: CustomEvent<IDynamicPerson[]>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const PeoplePicker: import("react").ForwardRefExoticComponent<PeoplePickerProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=people-picker.d.ts.map