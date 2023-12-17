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
     * Arrow Icon pointing down
     */
    ArrowDown = 0,
    /**
     * Icon separates team from channel in selection
     */
    TeamSeparator = 1,
    /**
     * Search icon
     */
    Search = 2,
    /**
     * Skype Arrow icon (out of office status)
     */
    SkypeArrow = 3,
    /**
     * Smaller email icon used in top of person card
     */
    SmallEmail = 4,
    /**
     * Smaller email, hovered version, icon used in top of person card
     */
    SmallEmailHovered = 5,
    /**
     * Smaller chat icon used in top of person card
     */
    SmallChat = 6,
    /**
     * Small chat icon, hover version, used in top of person card
     */
    SmallChatHovered = 7,
    /**
     * Video icon used in top of person card
     */
    Video = 8,
    /**
     * Videoicon, hovered version used in top of person card
     */
    VideoHovered = 9,
    /**
     * Downward chevron
     */
    ExpandDown = 10,
    /**
     * Overview icon
     */
    Overview = 11,
    /**
     * Paper plane
     */
    Send = 12,
    /**
     * Phone/Mail icon
     */
    Contact = 13,
    /**
     * Copy to clipboard
     */
    Copy = 14,
    /**
     * A phone handset
     */
    Phone = 15,
    /**
     * A cellphone
     */
    CellPhone = 16,
    /**
     * Chat message
     */
    Chat = 17,
    /**
     * Call icon
     */
    Call = 18,
    /**
     * Call icon, hovered version
     */
    CallHovered = 19,
    /**
     * Confirmation icon
     */
    Confirmation = 20,
    /**
     * Company department
     */
    Department = 21,
    /**
     * Email message
     */
    Email = 22,
    /**
     * Location indicator
     */
    OfficeLocation = 23,
    /**
     * A person
     */
    Person = 24,
    /**
     * Messages
     */
    Messages = 25,
    /**
     * Organization tree
     */
    Organization = 26,
    /**
     * Right facing chevron
     */
    ExpandRight = 27,
    /**
     * Person profile
     */
    Profile = 28,
    /**
     * Balloon
     */
    Birthday = 29,
    /**
     * File icon
     */
    File = 30,
    /**
     * Files icon
     */
    Files = 31,
    /**
     * Back arrow
     */
    Back = 32,
    /**
     * Close icon
     */
    Close = 33,
    /**
     * Upload icon
     */
    Upload = 34,
    /**
     * File Cloud icon
     */
    FileCloud = 35,
    /**
     * Drag File Mouse Icon
     */
    DragFile = 36,
    /**
     *
     * Cancel icon
     */
    Cancel = 37,
    /**
     *
     * Checkmark icon
     *
     */
    CheckMark = 38,
    /**
     *
     * Success icon
     */
    Success = 39,
    /**
     *
     * Fail icon
     */
    Fail = 40,
    /**
     *
     * account selection
     */
    SelectAccount = 41,
    /**
     * News
     */
    News = 42,
    /**
     * Bookmark
     */
    DoubleBookmark = 43,
    /**
     * Left chevron
     */
    ChevronLeft = 44,
    /**
     * Right chevron
     */
    ChevronRight = 45,
    /**
     * Event
     */
    Event = 46,
    /**
     * Q&A
     */
    BookOpen = 47,
    /**
     * File outer icon
     */
    FileOuter = 48,
    /**
     * Book question icon
     */
    BookQuestion = 49,
    /**
     * Globe icon
     */
    Globe = 50,
    /**
     * Delete icon
     */
    Delete = 51,
    /**
     *
     * Add icon
     */
    Add = 52,
    /**
     *
     * Calendar icon
     */
    Calendar = 53,
    Planner = 54,
    Milestone = 55,
    PersonAdd = 56,
    PresenceAvailable = 57,
    PresenceOofAvailable = 58,
    PresenceBusy = 59,
    PresenceOofBusy = 60,
    PresenceDnd = 61,
    PresenceOofDnd = 62,
    PresenceAway = 63,
    PresenceOofAway = 64,
    PresenceOffline = 65,
    PresenceStatusUnknown = 66
}
/**
 * returns an svg
 *
 * @param svgIcon defined by name
 * @param color hex value
 */
export declare const getSvg: (svgIcon: SvgIcon, color?: string) => import("lit-html").TemplateResult<1>;
//# sourceMappingURL=SvgHelper.d.ts.map