/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { DriveItem } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit';
import { MgtTemplatedTaskComponent } from '@microsoft/mgt-element';
import { OfficeGraphInsightString, ViewType } from '../../graph/types';
export declare const registerMgtFileComponent: () => void;
/**
 * The File component is used to represent an individual file/folder from OneDrive or SharePoint by displaying information such as the file/folder name, an icon indicating the file type, and other properties such as the author, last modified date, or other details selected by the developer.
 *
 * @export
 * @class MgtFile
 * @extends {MgtTemplatedComponent}
 *
 * @fires {CustomEvent<undefined>} updated - Fired when the component is updated
 *
 * @cssprop --file-type-icon-height - {Length} file type icon height. Default value is 28px.
 * @cssprop --file-border - {String} file item border style. Default value is "1px solid transparent".
 * @cssprop --file-border-radius - {String} the border radius of the file component. Default value is 4px.
 * @cssprop --file-box-shadow - {String} the box-shadow of the component. Default value is none.
 * @cssprop --file-background-color - {Color} the background-color of the component.
 * @cssprop --file-background-color-focus - {Color} the background-color of the component on focus.
 * @cssprop --file-background-color-hover - {Color} the background-color of the component on hover.
 * @cssprop --file-padding - {String} the padding around the file component. Default value is 0px.
 * @cssprop --file-padding-inline-start - {Length} the padding between file icon and file details. Default value is 14px.
 * @cssprop --file-margin - {String} the margin around the file component. Default value is 0px.
 * @cssprop --file-line1-font-size - {Length} the first line text font size. Default value is 12px.
 * @cssprop --file-line1-font-weight - {Length} the first line text font weight. Default value is 400.
 * @cssprop --file-line1-color - {Color} the first line text color.
 * @cssprop --file-line1-text-transform - {String} the first line text text transform. Default value is initial.
 * @cssprop --file-line2-font-size - {Length} the second line text font size. Default value is 12px.
 * @cssprop --file-line2-font-weight - {Length} the second line text font weight. Default value is 400.
 * @cssprop --file-line2-color - {Color} the second line text color.
 * @cssprop --file-line2-text-transform - {String} the second line text text transform. Default value is initial.
 * @cssprop --file-line3-font-size - {Length} the third line text font size. Default value is 12px.
 * @cssprop --file-line3-font-weight - {Length} the third line text font weight. Default value is 400.
 * @cssprop --file-line3-color - {Color} the third line text color.
 * @cssprop --file-line3-text-transform - {String} the third line text text transform. Default value is 400.
 */
export declare class MgtFile extends MgtTemplatedTaskComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    protected get strings(): {
        modifiedSubtitle: string;
        sizeSubtitle: string;
    };
    /**
     * allows developer to provide query for a file
     *
     * @type {string}
     * @memberof MgtFile
     */
    fileQuery: string;
    /**
     * allows developer to provide site id for a file
     *
     * @type {string}
     * @memberof MgtFile
     */
    siteId: string;
    /**
     * allows developer to provide drive id for a file
     *
     * @type {string}
     * @memberof MgtFile
     */
    driveId: string;
    /**
     * allows developer to provide group id for a file
     *
     * @type {string}
     * @memberof MgtFile
     */
    groupId: string;
    /**
     * allows developer to provide list id for a file
     *
     * @type {string}
     * @memberof MgtFile
     */
    listId: string;
    /**
     * allows developer to provide user id for a file
     *
     * @type {string}
     * @memberof MgtFile
     */
    userId: string;
    /**
     * allows developer to provide item id for a file
     *
     * @type {string}
     * @memberof MgtFile
     */
    itemId: string;
    /**
     * allows developer to provide item path for a file
     *
     * @type {string}
     * @memberof MgtFile
     */
    itemPath: string;
    /**
     * allows developer to provide insight type for a file
     * can be trending, used, or shared
     *
     * @type {OfficeGraphInsightString}
     * @memberof MgtFile
     */
    insightType: OfficeGraphInsightString;
    /**
     * allows developer to provide insight id for a file
     *
     * @type {string}
     * @memberof MgtFile
     */
    insightId: string;
    /**
     * allows developer to provide DriveItem object
     *
     * @type {MicrosoftGraph.DriveItem}
     * @memberof MgtFile
     */
    fileDetails: DriveItem;
    /**
     * allows developer to provide file type icon url
     *
     * @type {string}
     * @memberof MgtFile
     */
    fileIcon: string;
    /**
     * object containing Graph details on item
     *
     * @type {MicrosoftGraph.DriveItem}
     * @memberof MgtFile
     */
    driveItem: DriveItem;
    /**
     * Sets the property of the file to use for the first line of text.
     * Default is file name
     *
     * @type {string}
     * @memberof MgtFile
     */
    line1Property: string;
    /**
     * Sets the property of the file to use for the second line of text.
     * Default is last modified date time
     *
     * @type {string}
     * @memberof MgtFile
     */
    line2Property: string;
    /**
     * Sets the property of the file to use for the second line of text.
     * Default is file size
     *
     * @type {string}
     * @memberof MgtFile
     */
    line3Property: string;
    /**
     * Sets what data will be rendered.
     * Valid options are 'image', 'oneline', 'twolines', 'threelines', or 'fourlines'
     * Default is 'threelines'.
     *
     * @type {ViewType}
     * @memberof MgtFile
     */
    view: ViewType;
    /**
     * Get the scopes required for file
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtFile
     */
    static get requiredScopes(): string[];
    protected args(): unknown[];
    constructor();
    renderContent: () => TemplateResult;
    /**
     * Render the state when no data is available
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtFile
     */
    protected renderNoData(): TemplateResult;
    /**
     * Render the file type icon
     *
     * @protected
     * @param {string} [iconSrc]
     * @memberof MgtFile
     */
    protected renderFileTypeIcon(): TemplateResult;
    /**
     * Render the file details
     *
     * @protected
     * @param {MicrosoftGraph.DriveItem} [driveItem]
     * @memberof MgtFile
     */
    protected renderDetails(driveItem: DriveItem): TemplateResult;
    /**
     * load state into the component.
     *
     * @protected
     * @returns
     * @memberof MgtFile
     */
    protected loadState(): Promise<void>;
    private getTextFromProperty;
}
//# sourceMappingURL=mgt-file.d.ts.map