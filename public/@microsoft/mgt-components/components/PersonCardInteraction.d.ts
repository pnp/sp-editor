/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
declare const interactions: readonly ["none", "hover", "click"];
/**
 * Defines how a person card is shown when a user interacts with
 * a person component
 *
 */
export type PersonCardInteraction = (typeof interactions)[number];
export declare const isPersonCardInteraction: (value: unknown) => value is "click" | "none" | "hover";
export declare const personCardConverter: (value: string, defaultValue?: PersonCardInteraction) => PersonCardInteraction;
export {};
//# sourceMappingURL=PersonCardInteraction.d.ts.map