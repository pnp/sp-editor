/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * Available icon sizes
 */
export type IconSize = 16 | 20 | 24 | 32 | 40 | 48 | 64 | 96;
/**
 * Helper to provide fluent icon image urls
 *
 * @param type
 * @param size
 * @param extension
 * @returns
 */
export declare const getFileTypeIconUri: (type: string, size: IconSize, extension: 'png' | 'svg') => string;
/**
 * Helper to provide fluent icon image urls with the correct size
 *
 * @param type
 * @param size
 * @param extension
 * @returns
 */
export declare const getFileTypeIconUriByExtension: (type: string, size: IconSize, extension: 'png' | 'svg') => string;
//# sourceMappingURL=fluent-icons.d.ts.map