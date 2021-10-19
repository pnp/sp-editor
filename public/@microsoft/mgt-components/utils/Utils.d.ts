/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
export declare function getRelativeDisplayDate(date: Date): string;
/**
 * returns a promise that resolves after specified time
 * @param time in milliseconds
 */
export declare function delay(ms: number): Promise<void>;
/**
 * returns month and day
 *
 * @export
 * @param {Date} date
 * @returns
 */
export declare function getShortDateString(date: Date): string;
/**
 * returns month string based on number
 *
 * @export
 * @param {number} month
 * @returns {string}
 */
export declare function getMonthString(month: number): string;
/**
 * returns day of week string based on number
 * where 0 === Sunday
 *
 * @export
 * @param {number} day
 * @returns {string}
 */
export declare function getDayOfWeekString(day: number): string;
/**
 * retrieve the days in the month provided by number
 *
 * @export
 * @param {number} monthNum
 * @returns {number}
 */
export declare function getDaysInMonth(monthNum: number): number;
/**
 * returns serialized date from month number and year number
 *
 * @export
 * @param {number} month
 * @param {number} year
 * @returns
 */
export declare function getDateFromMonthYear(month: number, year: number): Date;
/**
 * ensures one call at a time
 *
 * @export
 * @param {*} func
 * @param {*} time
 * @returns
 */
export declare function debounce(func: any, time: any): () => void;
/**
 * converts a blob to base64 encoding
 *
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
export declare function blobToBase64(blob: Blob): Promise<string>;
/**
 * extracts an email address from a string
 *
 * @param {string} emailString
 * @returns {string}
 */
export declare function extractEmailAddress(emailString: string): string;
/**
 * checks if the email string is a valid email
 *
 * @param {string} emailString
 * @returns {boolean}
 */
export declare function isValidEmail(emailString: string): boolean;
/**
 * Convert bytes to human readable.
 *
 * @param bytes
 * @param decimals
 * @returns
 */
export declare function formatBytes(bytes: any, decimals?: number): string;
//# sourceMappingURL=Utils.d.ts.map