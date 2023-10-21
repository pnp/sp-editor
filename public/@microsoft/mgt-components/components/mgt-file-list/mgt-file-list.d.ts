/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import { DriveItem } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit';
import './mgt-file-upload/mgt-file-upload';
import { OfficeGraphInsightString, ViewType } from '../../graph/types';
import { CardSection } from '../BasePersonCardSection';
/**
 * The File List component displays a list of multiple folders and files by
 * using the file/folder name, an icon, and other properties specified by the developer.
 * This component uses the mgt-file component.
 *
 * @export
 * @class MgtFileList
 *
 * @fires {CustomEvent<MicrosoftGraph.DriveItem>} itemClick - Fired when a user clicks on a file.
 * it returns the file (DriveItem) details.
 *
 * NOTE: This component also allows customizing the tokens from mgt-file and mgt-file-upload components.
 * @cssprop --file-list-background-color - {Color} the background color of the component.
 * @cssprop --file-list-box-shadow - {String} the box-shadow syle of the component. Default value is --elevation-shadow-card-rest.
 * @cssprop --file-list-border-radius - {Length} the file list box border radius. Default value is 8px.
 * @cssprop --file-list-border - {String} the file list border style. Default value is none.
 * @cssprop --file-list-padding -{String} the file list padding.  Default value is 0px.
 * @cssprop --file-list-margin -{String} the file list margin. Default value is 0px.
 * @cssprop --show-more-button-background-color - {Color} the "show more" button background color.
 * @cssprop --show-more-button-background-color--hover - {Color} the "show more" button background color on hover.
 * @cssprop --show-more-button-font-size - {String} the "show more" text font size. Default value is 12px.
 * @cssprop --show-more-button-padding - {String} the "show more" button padding. Default value is 0px.
 * @cssprop --show-more-button-border-bottom-right-radius - {String} the "show more" button bottom right border radius. Default value is 8px.
 * @cssprop --show-more-button-border-bottom-left-radius - {String} the "show more" button bottom left border radius. Default value is 8px;
 * @cssprop --progress-ring-size -{String} Progress ring height and width. Default value is 24px.
 */
export declare class MgtFileList extends MgtTemplatedComponent implements CardSection {
    private _isCompact;
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    protected get strings(): Record<string, string>;
    /**
     * allows developer to provide query for a file list
     *
     * @type {string}
     * @memberof MgtFileList
     */
    get fileListQuery(): string;
    set fileListQuery(value: string);
    /**
     * The name for display in the overview section.
     *
     * @readonly
     * @type {string}
     * @memberof MgtFileList
     */
    get displayName(): string;
    /**
     * The title for the card when rendered as a card full.
     *
     * @readonly
     * @type {string}
     * @memberof MgtFileList
     */
    get cardTitle(): string;
    /**
     * Render the icon for display in the navigation ribbon.
     *
     * @returns {TemplateResult}
     * @memberof MgtFileList
     */
    renderIcon(): TemplateResult;
    /**
     * allows developer to provide an array of file queries
     *
     * @type {string[]}
     * @memberof MgtFileList
     */
    get fileQueries(): string[];
    set fileQueries(value: string[]);
    /**
     * allows developer to provide an array of files
     *
     * @type {MicrosoftGraph.DriveItem[]}
     * @memberof MgtFileList
     */
    files: DriveItem[];
    /**
     * allows developer to provide site id for a file
     *
     * @type {string}
     * @memberof MgtFileList
     */
    get siteId(): string;
    set siteId(value: string);
    /**
     * allows developer to provide drive id for a file
     *
     * @type {string}
     * @memberof MgtFileList
     */
    get driveId(): string;
    set driveId(value: string);
    /**
     * allows developer to provide group id for a file
     *
     * @type {string}
     * @memberof MgtFileList
     */
    get groupId(): string;
    set groupId(value: string);
    /**
     * allows developer to provide item id for a file
     *
     * @type {string}
     * @memberof MgtFileList
     */
    get itemId(): string;
    set itemId(value: string);
    /**
     * allows developer to provide item path for a file
     *
     * @type {string}
     * @memberof MgtFileList
     */
    get itemPath(): string;
    set itemPath(value: string);
    /**
     * allows developer to provide user id for a file
     *
     * @type {string}
     * @memberof MgtFile
     */
    get userId(): string;
    set userId(value: string);
    /**
     * allows developer to provide insight type for a file
     * can be trending, used, or shared
     *
     * @type {OfficeGraphInsightString}
     * @memberof MgtFileList
     */
    get insightType(): OfficeGraphInsightString;
    set insightType(value: OfficeGraphInsightString);
    /**
     * Sets what data to be rendered (file icon only, oneLine, twoLines threeLines).
     * Default is 'threeLines'.
     *
     * @type {ViewType}
     * @memberof MgtFileList
     */
    itemView: ViewType;
    /**
     * allows developer to provide file type to filter the list
     * can be docx
     *
     * @type {string[]}
     * @memberof MgtFileList
     */
    get fileExtensions(): string[];
    set fileExtensions(value: string[]);
    /**
     * A number value to indicate the number of more files to load when show more button is clicked
     *
     * @type {number}
     * @memberof MgtFileList
     */
    get pageSize(): number;
    set pageSize(value: number);
    disableOpenOnClick: boolean;
    /**
     * A boolean value indication if 'show-more' button should be disabled
     *
     * @type {boolean}
     * @memberof MgtFileList
     */
    hideMoreFilesButton: boolean;
    /**
     * A number value indication for file size upload (KB)
     *
     * @type {number}
     * @memberof MgtFileList
     */
    get maxFileSize(): number;
    set maxFileSize(value: number);
    /**
     * A boolean value indication if file upload extension should be enable or disabled
     *
     * @type {boolean}
     * @memberof MgtFileList
     */
    enableFileUpload: boolean;
    /**
     * A number value to indicate the max number allowed of files to upload.
     *
     * @type {number}
     * @memberof MgtFileList
     */
    get maxUploadFile(): number;
    set maxUploadFile(value: number);
    /**
     * A Array of file extensions to be excluded from file upload.
     *
     * @type {string[]}
     * @memberof MgtFileList
     */
    get excludedFileExtensions(): string[];
    set excludedFileExtensions(value: string[]);
    /**
     * Get the scopes required for file list
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtFileList
     */
    static get requiredScopes(): string[];
    private _fileListQuery;
    private _fileQueries;
    private _siteId;
    private _itemId;
    private _driveId;
    private _itemPath;
    private _groupId;
    private _insightType;
    private _fileExtensions;
    private _pageSize;
    private _excludedFileExtensions;
    private _maxUploadFile;
    private _maxFileSize;
    private _userId;
    private _preloadedFiles;
    private pageIterator;
    private _focusedItemIndex;
    private _isLoadingMore;
    constructor();
    /**
     * Override requestStateUpdate to include clearstate.
     *
     * @memberof MgtFileList
     */
    protected requestStateUpdate(force?: boolean): Promise<unknown>;
    /**
     * Reset state
     *
     * @memberof MgtFileList
     */
    protected clearState(): void;
    /**
     * Set the section to compact view mode
     *
     * @returns
     * @memberof BasePersonCardSection
     */
    asCompactView(): this;
    /**
     * Set the section to full view mode
     *
     * @returns
     * @memberof BasePersonCardSection
     */
    asFullView(): this;
    /**
     * Render the file list
     *
     * @return {*}
     * @memberof MgtFileList
     */
    render(): TemplateResult;
    /**
     * Render the compact view
     *
     * @returns {TemplateResult}
     * @memberof MgtFileList
     */
    renderCompactView(): TemplateResult;
    /**
     * Render the full view
     *
     * @returns {TemplateResult}
     * @memberof MgtFileList
     */
    renderFullView(): TemplateResult;
    /**
     * Render the loading state
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtFileList
     */
    protected renderLoading(): TemplateResult;
    /**
     * Render the state when no data is available
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtFileList
     */
    protected renderNoData(): TemplateResult;
    /**
     * Render the list of files.
     *
     * @protected
     * @param {*} files
     * @returns {TemplateResult}
     * @memberof mgtFileList
     */
    protected renderFiles(files: DriveItem[]): TemplateResult;
    /**
     * Render an individual file.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof mgtFileList
     */
    protected renderFile(file: DriveItem): TemplateResult;
    /**
     * Render the button when clicked will show more files.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtFileList
     */
    protected renderMoreFileButton(): TemplateResult;
    /**
     * Render MgtFileUpload sub component
     *
     * @returns
     */
    protected renderFileUpload(): TemplateResult;
    /**
     * Handles setting the focusedItemIndex to 0 when you focus on the first item
     * in the file list.
     *
     * @returns void
     */
    private readonly onFocusFirstItem;
    /**
     * Handle accessibility keyboard keydown events (arrow up, arrow down, enter, tab) on file list
     *
     * @param event
     */
    private readonly onFileListKeyDown;
    /**
     * load state into the component.
     *
     * @protected
     * @returns
     * @memberof MgtFileList
     */
    protected loadState(): Promise<void>;
    /**
     * Handle the click event on an item.
     *
     * @protected
     * @memberof MgtFileList
     */
    protected handleItemSelect(item: DriveItem, event: UIEvent): void;
    /**
     * Handle the click event on button to show next page.
     *
     * @protected
     * @memberof MgtFileList
     */
    protected renderNextPage(): Promise<void>;
    private handleFileClick;
    /**
     * Get file extension string from file name
     *
     * @param name file name
     * @returns {string} file extension
     */
    private getFileExtension;
    /**
     * Handle remove and add css class on accessibility keyboard select and focus
     *
     * @param fileList HTML element
     * @param focusedItem HTML element
     * @param className background class to be applied
     */
    private updateItemBackgroundColor;
    /**
     * Handle reload of File List and condition to clear cache
     *
     * @param clearCache boolean, if true clear cache
     */
    reload(clearCache?: boolean): void;
}
//# sourceMappingURL=mgt-file-list.d.ts.map