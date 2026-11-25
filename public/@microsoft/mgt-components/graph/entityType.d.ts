/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IDynamicPerson, IContact, IGroup, IUser } from './types';
export declare const isGroup: (obj: IDynamicPerson) => obj is IGroup;
export declare const isUser: (obj: IDynamicPerson) => obj is IUser;
export declare const isContact: (obj: IDynamicPerson) => obj is IContact;
//# sourceMappingURL=entityType.d.ts.map