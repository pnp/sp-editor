/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { SharedInsight } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit-element';
import { BasePersonCardSection } from '../BasePersonCardSection';
/**
 * The files subsection of the person card
 *
 * @export
 * @class MgtPersonCardProfile
 * @extends {MgtTemplatedComponent}
 */
export declare class MgtPersonCardFiles extends BasePersonCardSection {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    protected get strings(): {
        filesSectionTitle: string;
        sharedTextSubtitle: string;
    };
    private _files;
    constructor(files: SharedInsight[]);
    /**
     * The name for display in the overview section.
     *
     * @readonly
     * @type {string}
     * @memberof MgtPersonCardFiles
     */
    get displayName(): string;
    /**
     * Reset any state in the section
     *
     * @protected
     * @memberof MgtPersonCardFiles
     */
    clearState(): void;
    /**
     * Render the icon for display in the navigation ribbon.
     *
     * @returns {TemplateResult}
     * @memberof MgtPersonCardFiles
     */
    renderIcon(): TemplateResult;
    /**
     * Render the compact view
     *
     * @returns {TemplateResult}
     * @memberof MgtPersonCardFiles
     */
    renderCompactView(): TemplateResult;
    /**
     * Render the full view
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPersonCardFiles
     */
    protected renderFullView(): TemplateResult;
    /**
     * Render a file item
     *
     * @protected
     * @param {IFile} file
     * @returns {TemplateResult}
     * @memberof MgtPersonCardFiles
     */
    protected renderFile(file: SharedInsight): TemplateResult;
    private handleFileClick;
}
//# sourceMappingURL=mgt-person-card-files.d.ts.map