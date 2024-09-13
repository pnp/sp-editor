/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { IDynamicPerson } from '@microsoft/mgt-components';
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
export type PersonCardProps = {
    personDetails?: IDynamicPerson;
    personQuery?: string;
    lockTabNavigation?: boolean;
    userId?: string;
    personImage?: string;
    fetchImage?: boolean;
    isExpanded?: boolean;
    inheritDetails?: boolean;
    showPresence?: boolean;
    personPresence?: MicrosoftGraph.Presence;
    templateContext?: TemplateContext;
    expanded?: (e: CustomEvent<null>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const PersonCard: import("react").ForwardRefExoticComponent<PersonCardProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=person-card.d.ts.map