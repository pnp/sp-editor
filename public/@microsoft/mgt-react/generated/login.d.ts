/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/// <reference types="react" />
import { IDynamicPerson, LoginViewType } from '@microsoft/mgt-components';
import { TemplateContext, TemplateRenderedData } from '@microsoft/mgt-element';
export type LoginProps = {
    userDetails?: IDynamicPerson;
    showPresence?: boolean;
    loginView?: LoginViewType;
    templateContext?: TemplateContext;
    loginInitiated?: (e: CustomEvent<undefined>) => void;
    loginCompleted?: (e: CustomEvent<undefined>) => void;
    loginFailed?: (e: CustomEvent<undefined>) => void;
    logoutInitiated?: (e: CustomEvent<undefined>) => void;
    logoutCompleted?: (e: CustomEvent<undefined>) => void;
    templateRendered?: (e: CustomEvent<TemplateRenderedData>) => void;
};
export declare const Login: import("react").ForwardRefExoticComponent<LoginProps & import("react").HTMLAttributes<unknown> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=login.d.ts.map