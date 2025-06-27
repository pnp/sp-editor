/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { SelectedChannel } from '@microsoft/mgt-components';
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
export type TeamsChannelPickerProps = {
    templateContext?: TemplateContext;
    updated?: (e: CustomEvent<undefined>) => void;
    selectionChanged?: (e: CustomEvent<SelectedChannel | null>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const TeamsChannelPicker: import("react").ForwardRefExoticComponent<TeamsChannelPickerProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=teams-channel-picker.d.ts.map