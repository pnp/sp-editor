/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
/**
 * IDynamicPerson describes the person object we use throughout mgt-person,
 * which can be one of three similar Graph types.
 *
 * In addition, this custom type also defines the optional `personImage` property,
 * which is used to pass the image around to other components as part of the person object.
 */
export type IUser = MicrosoftGraph.User | MicrosoftGraph.Person;
export type IContact = MicrosoftGraph.Contact;
export type IGroup = MicrosoftGraph.Group;
export type IDynamicPerson = (IUser | IContact | IGroup) & {
    /**
     * personDetails.personImage is a toolkit injected property to pass image between components
     * an optimization to avoid fetching the image when unnecessary.
     *
     * @type {string}
     */
    personImage?: string;
};
/**
 * avatarSize describes the enum strings that can be passed in to determine
 * size of avatar.
 */
export type AvatarSize = 'small' | 'large' | 'auto';
/**
 * Insight string types used to retrieve OneDrive files
 */
export type OfficeGraphInsightString = 'trending' | 'used' | 'shared';
declare const viewTypes: readonly ["image", "oneline", "twolines", "threelines", "fourlines"];
/**
 * Enumeration to define what parts of the person component render
 *
 * @export
 * @enum {string}
 */
export type ViewType = (typeof viewTypes)[number];
export declare const isViewType: (value: unknown) => value is "image" | "oneline" | "twolines" | "threelines" | "fourlines";
export declare const viewTypeConverter: (value: string, defaultValue?: ViewType) => ViewType;
/**
 * Postion describes the position of the dropdown
 */
export type Position = 'above' | 'below';
export {};
//# sourceMappingURL=types.d.ts.map