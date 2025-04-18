/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
interface SectionsConfig {
    /**
     * Gets or sets whether the organization section is shown
     *
     */
    organization?: {
        /**
         * Gets or sets whether the "Works with" section is shown
         *
         * @type {boolean}
         */
        showWorksWith: boolean;
    };
    /**
     * Gets or sets whether the messages section is shown
     *
     * @type {boolean}
     */
    mailMessages: boolean;
    /**
     * Gets or sets whether the files section is shown
     *
     * @type {boolean}
     */
    files: boolean;
    /**
     * Gets or sets whether the profile section is shown
     *
     * @type {boolean}
     */
    profile: boolean;
}
export declare class MgtPersonCardConfig {
    static sections: SectionsConfig;
    static useContactApis: boolean;
    static isSendMessageVisible: boolean;
}
export {};
//# sourceMappingURL=MgtPersonCardConfig.d.ts.map