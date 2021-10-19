/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import { DriveItem } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit-element';
import './mgt-file-upload/mgt-file-upload';
import { OfficeGraphInsightString, ViewType } from '../../graph/types';
export { FluentDesignSystemProvider, FluentProgressRing } from '@fluentui/web-components';
export * from './mgt-file-upload/mgt-file-upload';
/**
 * The File List component displays a list of multiple folders and files by
 * using the file/folder name, an icon, and other properties specicified by the developer.
 * This component uses the mgt-file component.
 *
 * @export
 * @class MgtFileList
 * @extends {MgtTemplatedComponent}
 *
 * @fires itemClick - Fired when user click a file. Returns the file (DriveItem) details.
 * @cssprop --file-upload-border- {String} File upload border top style
 * @cssprop --file-upload-background-color - {Color} File upload background color with opacity style
 * @cssprop --file-upload-button-float - {string} Upload button float position
 * @cssprop --file-upload-button-background-color - {Color} Background color of upload button
 * @cssprop --file-upload-dialog-background-color - {Color} Background color of upload dialog
 * @cssprop --file-upload-dialog-content-background-color - {Color} Background color of dialog content
 * @cssprop --file-upload-dialog-content-color - {Color} Color of dialog content
 * @cssprop --file-upload-dialog-primarybutton-background-color - {Color} Background color of primary button
 * @cssprop --file-upload-dialog-primarybutton-color - {Color} Color text of primary button
 * @cssprop --file-upload-button-color - {Color} Text color of upload button
 * @cssprop --file-list-background-color - {Color} File list background color
 * @cssprop --file-list-box-shadow - {String} File list box shadow style
 * @cssprop --file-list-border - {String} File list border styles
 * @cssprop --file-list-padding -{String} File list padding
 * @cssprop --file-list-margin -{String} File list margin
 * @cssprop --file-item-background-color--hover - {Color} File item background hover color
 * @cssprop --file-item-border-top - {String} File item border top style
 * @cssprop --file-item-border-left - {String} File item border left style
 * @cssprop --file-item-border-right - {String} File item border right style
 * @cssprop --file-item-border-bottom - {String} File item border bottom style
 * @cssprop --file-item-background-color--active - {Color} File item background active color
 * @cssprop --file-item-border-radius - {String} File item border radius
 * @cssprop --file-item-margin - {String} File item margin
 * @cssprop --show-more-button-background-color - {Color} Show more button background color
 * @cssprop --show-more-button-background-color--hover - {Color} Show more button background hover color
 * @cssprop --show-more-button-font-size - {String} Show more button font size
 * @cssprop --show-more-button-padding - {String} Show more button padding
 * @cssprop --show-more-button-border-bottom-right-radius - {String} Show more button bottom right radius
 * @cssprop --show-more-button-border-bottom-left-radius - {String} Show more button bottom left radius
 * @cssprop --progress-ring-size -{String} Progress ring height and width
 */
export declare class MgtFileList extends MgtTemplatedComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    protected get strings(): {
        showMoreSubtitle: string;
    };
    /**
     * allows developer to provide query for a file list
     *
     * @type {string}
     * @memberof MgtFileList
     */
    get fileListQuery(): string;
    set fileListQuery(value: string);
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
     * @type {number}
     * @memberof MgtFileList
     */
    get pageSize(): number;
    set pageSize(value: number);
    /**
     * A boolean value indication if 'show-more' button should be disabled
     * @type {boolean}
     * @memberof MgtFileList
     */
    hideMoreFilesButton: boolean;
    /**
     * A number value indication for file size upload (KB)
     * @type {number}
     * @memberof MgtFileList
     */
    get maxFileSize(): number;
    set maxFileSize(value: number);
    /**
     * A boolean value indication if file upload extension should be enable or disabled
     * @type {boolean}
     * @memberof MgtFileList
     */
    enableFileUpload: boolean;
    /**
     * A number value to indicate the max number allowed of files to upload.
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
    render(): TemplateResult;
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
    protected renderFiles(): TemplateResult;
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
     * Handle accessibility keyboard enter event on 'show more items' button
     *
     * @param event
     */
    private onShowMoreKeyDown;
    /**
     * Handle accessibility keyboard keyup events on file list
     *
     * @param event
     */
    private onFileListKeyUp;
    /**
     * Handle accessibility keyboard keydown events (arrow up, arrow down, enter, tab) on file list
     *
     * @param event
     */
    private onFileListKeyDown;
    /**
     * Remove accessibility keyboard focused when out of file list
     *
     */
    private onFileListOut;
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
    protected handleItemSelect(item: DriveItem, event: any): void;
    /**
     * Handle the click event on button to show next page.
     *
     * @protected
     * @memberof MgtFileList
     */
    protected renderNextPage(): Promise<void>;
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