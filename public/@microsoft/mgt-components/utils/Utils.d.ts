/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
export declare const getRelativeDisplayDate: (date: Date) => string;
/**
 * returns day, month and year
 *
 * @export
 * @param {Date} date
 * @returns
 */
export declare const getDateString: (date: Date) => string;
/**
 * returns month and day
 *
 * @export
 * @param {Date} date
 * @returns
 */
export declare const getShortDateString: (date: Date) => string;
/**
 * returns month string based on number
 *
 * @export
 * @param {number} month
 * @returns {string}
 */
export declare const getMonthString: (month: number) => string;
/**
 * returns day of week string based on number
 * where 0 === Sunday
 *
 * @export
 * @param {number} day
 * @returns {string}
 */
export declare const getDayOfWeekString: (day: number) => string;
/**
 * retrieve the days in the month provided by number
 *
 * @export
 * @param {number} monthNum
 * @returns {number}
 */
export declare const getDaysInMonth: (monthNum: number) => number;
/**
 * returns serialized date from month number and year number
 *
 * @export
 * @param {number} month
 * @param {number} year
 * @returns
 */
export declare const getDateFromMonthYear: (month: number, year: number) => Date;
/**
 * ensures one call at a time
 *
 * @export
 * @param {*} func
 * @param {*} time
 * @returns
 */
export declare const debounce: (func: Function, time: number) => () => void;
/**
 * converts a blob to base64 encoding
 *
 * @param {Blob} blob
 * @returns {Promise<string>}
 */
export declare const blobToBase64: (blob: Blob) => Promise<string>;
/**
 * extracts an email address from a string
 *
 * @param {string} emailString
 * @returns {string}
 */
export declare const extractEmailAddress: (emailString: string) => string;
/**
 * checks if the email string is a valid email
 *
 * @param {string} emailString
 * @returns {boolean}
 */
export declare const isValidEmail: (emailString: string) => boolean;
/**
 * Convert bytes to human readable.
 *
 * @param bytes
 * @param decimals
 * @returns
 */
export declare const formatBytes: (bytes: number, decimals?: number) => string;
/**
 * Formats the a provided summary to valid html
 *
 * @param summary
 * @returns string
 */
export declare const sanitizeSummary: (summary: string) => string;
/**
 * Trims the file extension from a file name
 *
 * @param fileName
 * @returns
 */
export declare const trimFileExtension: (fileName: string) => string;
/**
 * Get the name of a piece of content from the url
 *
 * @param webUrl
 * @returns
 */
export declare const getNameFromUrl: (webUrl: string) => string;
/**
 * Defines the expiration time
 *
 * @param currentInvalidationPeriod
 * @returns number
 */
export declare const getResponseInvalidationTime: (currentInvalidationPeriod: number) => number;
/**
 * Whether the response store is enabled
 *
 * @returns boolean
 */
export declare const getIsResponseCacheEnabled: () => boolean;
//# sourceMappingURL=Utils.d.ts.map