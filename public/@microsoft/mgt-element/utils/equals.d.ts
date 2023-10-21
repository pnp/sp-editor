/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * Crude implementation of equivalence between the two specified arguments.
 *
 * The primary intent of this function is for comparing data contexts, which
 * are expected to be object literals with potentially nested structures and
 * where leaf values are primitives.
 */
export declare const equals: (o1: unknown, o2: unknown) => boolean;
/**
 * Compares two arrays if the elements are equals
 * Should be used for arrays of primitive types
 *
 * @export
 * @template T the type of the elements in the array (should be primitive)
 * @param {T[]} arr1
 * @param {T[]} arr2
 * @returns true if both arrays contain the same items or if both arrays are null or empty
 */
export declare const arraysAreEqual: <T>(arr1: T[], arr2: T[]) => boolean;
//# sourceMappingURL=equals.d.ts.map