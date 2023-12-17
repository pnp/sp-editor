/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IDynamicPerson, IUser } from './types';
export declare const isGroup: (obj: IDynamicPerson) => obj is import("@microsoft/microsoft-graph-types").Group;
export declare const isUser: (obj: IDynamicPerson) => obj is IUser;
export declare const isContact: (obj: IDynamicPerson) => obj is import("@microsoft/microsoft-graph-types").Contact;
//# sourceMappingURL=entityType.d.ts.map