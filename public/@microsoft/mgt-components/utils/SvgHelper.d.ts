/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * Defines icon used by svgHelper
 *
 * @export
 * @enum {number}
 */
export declare enum SvgIcon {
    /**
     * Arrow Icon pointing right
     */
    ArrowRight = 0,
    /**
     * Arrow Icon pointing down
     */
    ArrowDown = 1,
    /**
     * Icon separates team from channel in selection
     */
    TeamSeparator = 2,
    /**
     * Search icon
     */
    Search = 3,
    /**
     * Skype Arrow icon (out of office status)
     */
    SkypeArrow = 4,
    /**
     * Smaller email icon used in top of person card
     */
    SmallEmail = 5,
    /**
     * Smaller chat icon used in top of person card
     */
    SmallChat = 6,
    /**
     * Downward chevron
     */
    ExpandDown = 7,
    /**
     * Overview icon
     */
    Overview = 8,
    /**
     * Paper plane
     */
    Send = 9,
    /**
     * Phone/Mail icon
     */
    Contact = 10,
    /**
     * Copy to clipboard
     */
    Copy = 11,
    /**
     * A cellphone
     */
    CellPhone = 12,
    /**
     * Chat message
     */
    Chat = 13,
    /**
     * Company department
     */
    Department = 14,
    /**
     * Email message
     */
    Email = 15,
    /**
     * Location indicator
     */
    OfficeLocation = 16,
    /**
     * A person
     */
    Person = 17,
    /**
     * Messages
     */
    Messages = 18,
    /**
     * Organization tree
     */
    Organization = 19,
    /**
     * Right facing chevron
     */
    ExpandRight = 20,
    /**
     * Person profile
     */
    Profile = 21,
    /**
     * Balloon
     */
    Birthday = 22,
    /**
     * File icon
     */
    File = 23,
    /**
     * Files icon
     */
    Files = 24,
    /**
     * Back arrow
     */
    Back = 25
}
/**
 * returns an svg
 * @param svgIcon defined by name
 * @param color hex value
 */
export declare function getSvg(svgIcon: SvgIcon, color?: string): import("lit-element").TemplateResult;
//# sourceMappingURL=SvgHelper.d.ts.map