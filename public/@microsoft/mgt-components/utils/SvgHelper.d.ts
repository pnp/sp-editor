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
     * A phone handset
     */
    Phone = 12,
    /**
     * A cellphone
     */
    CellPhone = 13,
    /**
     * Chat message
     */
    Chat = 14,
    /**
     * Company department
     */
    Department = 15,
    /**
     * Email message
     */
    Email = 16,
    /**
     * Location indicator
     */
    OfficeLocation = 17,
    /**
     * A person
     */
    Person = 18,
    /**
     * Messages
     */
    Messages = 19,
    /**
     * Organization tree
     */
    Organization = 20,
    /**
     * Right facing chevron
     */
    ExpandRight = 21,
    /**
     * Person profile
     */
    Profile = 22,
    /**
     * Balloon
     */
    Birthday = 23,
    /**
     * File icon
     */
    File = 24,
    /**
     * Files icon
     */
    Files = 25,
    /**
     * Back arrow
     */
    Back = 26,
    /**
     * Upload icon
     */
    Upload = 27,
    /**
     * File Cloud icon
     */
    FileCloud = 28,
    /**
     * Drag File Mouse Icon
     */
    DragFile = 29,
    /**
     *
     * Cancel icon
     */
    Cancel = 30,
    /**
     *
     * Success icon
     */
    Success = 31,
    /**
     *
     * Fail icon
     */
    Fail = 32
}
/**
 * returns an svg
 * @param svgIcon defined by name
 * @param color hex value
 */
export declare function getSvg(svgIcon: SvgIcon, color?: string): import("lit-element").TemplateResult;
//# sourceMappingURL=SvgHelper.d.ts.map