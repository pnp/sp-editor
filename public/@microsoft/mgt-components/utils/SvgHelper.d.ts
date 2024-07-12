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
     *
     * Dot Icon
     */
    Dot = 22,
    /**
     * Email message
     */
    Email = 23,
    /**
     * Location indicator
     */
    OfficeLocation = 24,
    /**
     * A person
     */
    Person = 25,
    /**
     * Messages
     */
    Messages = 26,
    /**
     * Organization tree
     */
    Organization = 27,
    /**
     * Right facing chevron
     */
    ExpandRight = 28,
    /**
     * Person profile
     */
    Profile = 29,
    /**
     * Balloon
     */
    Birthday = 30,
    /**
     * File icon
     */
    File = 31,
    /**
     * Files icon
     */
    Files = 32,
    /**
     * Back arrow
     */
    Back = 33,
    /**
     * Close icon
     */
    Close = 34,
    /**
     * Upload icon
     */
    Upload = 35,
    /**
     * File Cloud icon
     */
    FileCloud = 36,
    /**
     * Drag File Mouse Icon
     */
    DragFile = 37,
    /**
     *
     * Cancel icon
     */
    Cancel = 38,
    /**
     *
     * Checkmark icon
     *
     */
    CheckMark = 39,
    /**
     *
     * Radio icon
     *
     */
    Radio = 40,
    /**
     *
     * Success icon
     */
    Success = 41,
    /**
     *
     * Fail icon
     */
    Fail = 42,
    /**
     *
     * account selection
     */
    SelectAccount = 43,
    /**
     * News
     */
    News = 44,
    /**
     * Bookmark
     */
    DoubleBookmark = 45,
    /**
     * Left chevron
     */
    ChevronLeft = 46,
    /**
     * Right chevron
     */
    ChevronRight = 47,
    /**
     * Event
     */
    Event = 48,
    /**
     * Q&A
     */
    BookOpen = 49,
    /**
     * File outer icon
     */
    FileOuter = 50,
    /**
     * Book question icon
     */
    BookQuestion = 51,
    /**
     * Globe icon
     */
    Globe = 52,
    /**
     * Delete icon
     */
    Delete = 53,
    /**
     *
     * Add icon
     */
    Add = 54,
    /**
     *
     * Calendar icon
     */
    Calendar = 55,
    Planner = 56,
    Milestone = 57,
    PersonAdd = 58,
    PresenceAvailable = 59,
    PresenceOofAvailable = 60,
    PresenceBusy = 61,
    PresenceOofBusy = 62,
    PresenceDnd = 63,
    PresenceOofDnd = 64,
    PresenceAway = 65,
    PresenceOofAway = 66,
    PresenceOffline = 67,
    PresenceStatusUnknown = 68
}
/**
 * returns an svg
 *
 * @param svgIcon defined by name
 * @param color hex value
 */
export declare const getSvg: (svgIcon: SvgIcon, color?: string) => import("lit").TemplateResult<1>;
//# sourceMappingURL=SvgHelper.d.ts.map