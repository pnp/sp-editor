/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { IDynamicPerson, AvatarSize, AvatarType, PersonCardInteraction, ViewType } from '@microsoft/mgt-components';
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
export type PersonProps = {
    personQuery?: string;
    fallbackDetails?: IDynamicPerson;
    userId?: string;
    usage?: string;
    showPresence?: boolean;
    avatarSize?: AvatarSize;
    personDetails?: IDynamicPerson;
    personImage?: string;
    fetchImage?: boolean;
    disableImageFetch?: boolean;
    verticalLayout?: boolean;
    avatarType?: AvatarType;
    personPresence?: MicrosoftGraph.Presence;
    personCardInteraction?: PersonCardInteraction;
    line1Property?: string;
    line2Property?: string;
    line3Property?: string;
    line4Property?: string;
    view?: ViewType;
    templateContext?: TemplateContext;
    line1clicked?: (e: CustomEvent<IDynamicPerson>) => void;
    line2clicked?: (e: CustomEvent<IDynamicPerson>) => void;
    line3clicked?: (e: CustomEvent<IDynamicPerson>) => void;
    line4clicked?: (e: CustomEvent<IDynamicPerson>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const Person: import("react").ForwardRefExoticComponent<PersonProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=person.d.ts.map