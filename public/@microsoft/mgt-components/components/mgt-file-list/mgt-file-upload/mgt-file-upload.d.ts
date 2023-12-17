/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph, MgtBaseComponent } from '@microsoft/mgt-element';
import { TemplateResult } from 'lit';
import { DriveItem } from '@microsoft/microsoft-graph-types';
import { ViewType } from '../../../graph/types';
/**
 * Upload conflict behavior status
 */
export declare const enum MgtFileUploadConflictBehavior {
    rename = 0,
    replace = 1
}
/**
 * MgtFileUpload upload item lifecycle object.
 *
 * @export
 * @interface MgtFileUploadItem
 */
export interface MgtFileUploadItem {
    /**
     * Session url to keep upload progress open untill all chuncks are sent
     */
    uploadUrl?: string;
    /**
     * Upload file progress value
     */
    percent?: number;
    /**
     * Validate if File has any conflict Behavior
     */
    conflictBehavior?: MgtFileUploadConflictBehavior;
    /**
     * Output "Success" or "Fail" icon base on upload response
     */
    iconStatus?: TemplateResult;
    /**
     * File object to be upload.
     */
    file?: File;
    /**
     * Full file Path to be upload.
     */
    fullPath?: string;
    /**
     * Mgt-File View state change on upload response
     */
    view?: ViewType;
    /**
     * Manipulate fileDetails on upload lifecycle
     */
    driveItem?: DriveItem;
    /**
     * Mgt-File line2Property output field message
     */
    fieldUploadResponse?: string;
    /**
     * Validates state of upload progress
     */
    completed?: boolean;
    /**
     * Load large Files into ArrayBuffer to send by chuncks
     */
    mimeStreamString?: ArrayBuffer;
    /**
     * Max chunck size to upload file by slice
     */
    maxSize?: number;
    /**
     * Minimal chunck size to upload file by slice
     */
    minSize?: number;
}
/**
 * MgtFileUpload configuration object with MgtFileList Properties.
 *
 * @export
 * @interface MgtFileUploadConfig
 */
export interface MgtFileUploadConfig {
    /**
     * MS Graph APIs connector
     *
     * @type {IGraph}
     */
    graph: IGraph;
    /**
     * allows developer to provide site id for a file
     *
     * @type {string}
     */
    siteId?: string;
    /**
     * DriveId to upload Files
     *
     * @type {string}
     */
    driveId?: string;
    /**
     * GroupId to upload Files
     *
     * @type {string}
     */
    groupId?: string;
    /**
     * allows developer to provide item id for a file
     *
     * @type {string}
     */
    itemId?: string;
    /**
     * allows developer to provide item path for a file
     *
     * @type {string}
     */
    itemPath?: string;
    /**
     * allows developer to provide user id for a file
     *
     * @type {string}
     */
    userId?: string;
    /**
     * A number value indication for file size upload (KB)
     *
     * @type {Number}
     */
    maxFileSize?: number;
    /**
     * A number value to indicate the number of files to upload.
     *
     * @type {Number}
     */
    maxUploadFile?: number;
    /**
     * A Array of file extensions to be excluded from file upload.
     *
     * @type {string[]}
     */
    excludedFileExtensions?: string[];
}
/**
 * A component to upload files to OneDrive or SharePoint Sites
 *
 * @export
 * @class MgtFileUpload
 * @extends {MgtBaseComponent}
 *
 * @cssprop --file-upload-background-color-drag - {Color} background color of the file list when you upload by drag and drop.
 * @cssprop --file-upload-button-background-color - {Color} background color of the file upload button.
 * @cssprop --file-upload-button-background-color-hover - {Color} background color of the file upload button on hover.
 * @cssprop --file-upload-button-text-color - {Color} text color of the file upload button.
 * @cssprop --file-upload-dialog-background-color - {Color} background color of the file upload dialog box (appears when uploaded files exist).
 * @cssprop --file-upload-dialog-text-color - {Color} text color of the file upload dialog box content.
 * @cssprop --file-upload-dialog-replace-button-background-color - {Color} background color of the replace button in the dialog box.
 * @cssprop --file-upload-dialog-replace-button-background-color-hover - {Color} background color of the replace button in the dialog box when you hover on it.
 * @cssprop --file-upload-dialog-replace-button-text-color - {Color} text color of the replace button in the dialog box.
 * @cssprop --file-upload-dialog-keep-both-button-background-color - {Color} background color of the keep-both button in the dialog box.
 * @cssprop --file-upload-dialog-keep-both-button-background-color-hover - {Color} background color of the keep-both button in the dialog box when you hover on it.
 * @cssprop --file-upload-dialog-keep-both-button-text-color - {Color} text color of the keep-both button in the dialog box.
 * @cssprop --file-upload-border-drag - {String} the border of the file list when you upload files via drag and drop. Default value is 1px dashed #0078d4.
 * @cssprop --file-upload-button-border - {String} the border of the file upload button. Default value is none.
 * @cssprop --file-upload-dialog-replace-button-border - {String} the border of the file upload replace button in the dialog box. Default value is
 * @cssprop --file-upload-dialog-keep-both-button-border - {String} the border of the file upload keep both button in the dialog box. Default value is none.
 * @cssprop --file-upload-dialog-border - {String} the border of the file upload dialog box. Default value is "1px solid var(--neutral-fill-rest)".
 * @cssprop --file-upload-dialog-width - {String} the width of the file upload dialog box. Default value is auto.
 * @cssprop --file-upload-dialog-height - {String} the height of the file upload dialog box. Default value is auto.
 * @cssprop --file-upload-dialog-padding - {String} the padding of the file upload dialog box. Default value is 24px;
 */
export declare class MgtFileUpload extends MgtBaseComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    protected get strings(): {
        failUploadFile: string;
        cancelUploadFile: string;
        buttonUploadFile: string;
        maximumFilesTitle: string;
        maximumFiles: string;
        maximumFileSizeTitle: string;
        maximumFileSize: string;
        fileTypeTitle: string;
        fileType: string;
        checkAgain: string;
        checkApplyAll: string;
        buttonOk: string;
        buttonCancel: string;
        buttonUpload: string;
        buttonKeep: string;
        buttonReplace: string;
        buttonReselect: string;
        fileReplaceTitle: string;
        fileReplace: string;
        uploadButtonLabel: string;
    };
    /**
     * Allows developer to provide an array of MgtFileUploadItem to upload
     *
     * @type {MgtFileUploadItem[]}
     * @memberof MgtFileUpload
     */
    filesToUpload: MgtFileUploadItem[];
    /**
     * List of mgt-file-list properties used to upload files.
     *
     * @type {MgtFileUploadConfig}
     * @memberof MgtFileUpload
     */
    fileUploadList: MgtFileUploadConfig;
    /**
     * Get the scopes required for file upload
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtFileUpload
     */
    static get requiredScopes(): string[];
    private _dragCounter;
    private get _dropEffect();
    private readonly _maxChunkSize;
    private _dialogTitle;
    private _dialogContent;
    private _dialogPrimaryButton;
    private _dialogSecondaryButton;
    private _dialogCheckBox;
    private _applyAll;
    private _applyAllConflictBehavior;
    private _maximumFileSize;
    private _excludedFileType;
    constructor();
    /**
     * Render the file upload component
     *
     * @returns
     */
    render(): TemplateResult;
    /**
     * Render Folder structure of files to upload
     *
     * @param fileItems
     * @returns
     */
    protected renderFolderTemplate(fileItems: MgtFileUploadItem[]): TemplateResult<1>;
    /**
     * Render file upload area
     *
     * @param fileItem
     * @returns
     */
    protected renderFileTemplate(fileItem: MgtFileUploadItem, folderTabStyle: string): import("lit-html").HTMLTemplateResult;
    /**
     * Render file upload progress
     *
     * @param fileItem
     * @returns
     */
    protected renderFileUploadTemplate(fileItem: MgtFileUploadItem): TemplateResult<1>;
    /**
     * Handle the "Upload Files" button click event to open dialog and select files.
     *
     * @param event
     * @returns
     */
    protected onFileUploadChange: (event: UIEvent) => void;
    /**
     * Handle the click event on upload file button that open select files dialog to upload.
     *
     */
    protected onFileUploadClick: () => void;
    /**
     * Function delete existing file upload sessions
     *
     * @param fileItem
     */
    protected deleteFileUploadSession(fileItem: MgtFileUploadItem): Promise<void>;
    /**
     * Stop listeners from onDragOver event.
     *
     * @param event
     */
    protected handleonDragOver: (event: DragEvent) => void;
    /**
     * Stop listeners from onDragEnter event, enable drag and drop view.
     *
     * @param event
     */
    protected handleonDragEnter: (event: DragEvent) => void;
    /**
     * Stop listeners from ondragenter event, disable drag and drop view.
     *
     * @param event
     */
    protected handleonDragLeave: (event: DragEvent) => void;
    /**
     * Stop listeners from onDrop event and process files.
     *
     * @param event
     */
    protected handleonDrop: (event: DragEvent) => void;
    private readUploadedFiles;
    /**
     * Get Files and initalize MgtFileUploadItem object life cycle to be uploaded
     *
     * @param inputFiles
     */
    protected getSelectedFiles(files: File[]): Promise<void>;
    /**
     * Call modal dialog to replace or keep file.
     *
     * @param file
     * @returns
     */
    protected getFileUploadStatus(file: File, fullPath: string, DialogStatus: string, fileUploadList: MgtFileUploadConfig): Promise<(number | true)[]>;
    /**
     * Get GraphQuery based on pre defined parameters.
     *
     * @param fileItem
     * @returns
     */
    protected getGrapQuery(fullPath: string): string;
    /**
     * Send file using Upload using Graph based on length
     *
     * @param fileUpload
     * @returns
     */
    protected sendFileItemGraph(fileItem: MgtFileUploadItem): Promise<void>;
    /**
     * Manage slices of File to upload file by chunks using Graph and Session Url
     *
     * @param Graph
     * @param fileItem
     * @returns
     */
    protected sendSessionUrlGraph(graph: IGraph, fileItem: MgtFileUploadItem): Promise<DriveItem>;
    /**
     * Change the state of Mgt-File icon upload to Success
     *
     * @param fileUpload
     */
    protected setUploadSuccess(fileUpload: MgtFileUploadItem): void;
    /**
     * Change the state of Mgt-File icon upload to Fail
     *
     * @param fileUpload
     */
    protected setUploadFail(fileUpload: MgtFileUploadItem, errorMessage: string): void;
    /**
     * Retrieve File content as ArrayBuffer
     *
     * @param file
     * @returns
     */
    protected readFileContent(file: File): Promise<string | ArrayBuffer>;
    /**
     * Collect Files from Upload Area based on maxUploadFile
     *
     * @param uploadFilesItems
     * @returns
     */
    protected getFilesFromUploadArea(filesItems: DataTransferItemList | FileList): Promise<File[]>;
    /**
     * Retrieve files from folder and subfolders to array.
     *
     * @param folders
     * @returns
     */
    protected getFolderFiles(folders: FileSystemDirectoryEntry[]): Promise<File[]>;
    private writeFilePath;
}
//# sourceMappingURL=mgt-file-upload.d.ts.map