/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
declare const avatarTypes: readonly ["photo", "initials"];
export type AvatarType = (typeof avatarTypes)[number];
export declare const isAvatarType: (value: unknown) => value is "initials" | "photo";
export declare const avatarTypeConverter: (value: string, defaultValue?: AvatarType) => AvatarType;
/**
 * Configuration object for the Person component
 *
 * @export
 * @interface MgtPersonConfig
 */
export interface MgtPersonConfig {
    /**
     * Sets or gets whether the person component can use Contacts APIs to
     * find contacts and their images
     *
     * @type {boolean}
     */
    useContactApis: boolean;
}
export {};
//# sourceMappingURL=mgt-person-types.d.ts.map