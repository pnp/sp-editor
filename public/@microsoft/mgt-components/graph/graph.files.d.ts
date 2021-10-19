/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { CacheItem, CacheStore, GraphPageIterator, IGraph } from '@microsoft/mgt-element';
import { DriveItem, UploadSession } from '@microsoft/microsoft-graph-types';
/**
 * Object to be stored in cache
 */
interface CacheFileList extends CacheItem {
    /**
     * stringified json representing a list of files
     */
    files?: string[];
    /**
     * nextLink string to get next page
     */
    nextLink?: string;
}
/**
 * document thumbnail object stored in cache
 */
export interface CacheThumbnail extends CacheItem {
    /**
     * tag associated with thumbnail
     */
    eTag?: string;
    /**
     * document thumbnail
     */
    thumbnail?: string;
}
/**
 * Clear Cache of FileList
 */
export declare function clearFilesCache(): void;
/**
 * Defines the time it takes for objects in the cache to expire
 */
export declare const getFileInvalidationTime: () => number;
/**
 * Whether or not the cache is enabled
 */
export declare const getIsFilesCacheEnabled: () => boolean;
/**
 * Defines the time it takes for objects in the cache to expire
 */
export declare const getFileListInvalidationTime: () => number;
/**
 * Whether or not the cache is enabled
 */
export declare const getIsFileListsCacheEnabled: () => boolean;
export declare function getDriveItemByQuery(graph: IGraph, resource: string): Promise<DriveItem>;
export declare function getDriveItemById(graph: IGraph, driveId: string, itemId: string): Promise<DriveItem>;
export declare function getDriveItemByPath(graph: IGraph, driveId: string, itemPath: string): Promise<DriveItem>;
export declare function getGroupDriveItemById(graph: IGraph, groupId: string, itemId: string): Promise<DriveItem>;
export declare function getGroupDriveItemByPath(graph: IGraph, groupId: string, itemPath: string): Promise<DriveItem>;
export declare function getMyDriveItemById(graph: IGraph, itemId: string): Promise<DriveItem>;
export declare function getMyDriveItemByPath(graph: IGraph, itemPath: string): Promise<DriveItem>;
export declare function getSiteDriveItemById(graph: IGraph, siteId: string, itemId: string): Promise<DriveItem>;
export declare function getSiteDriveItemByPath(graph: IGraph, siteId: string, itemPath: string): Promise<DriveItem>;
export declare function getListDriveItemById(graph: IGraph, siteId: string, listId: string, itemId: string): Promise<DriveItem>;
export declare function getUserDriveItemById(graph: IGraph, userId: string, itemId: string): Promise<DriveItem>;
export declare function getUserDriveItemByPath(graph: IGraph, userId: string, itemPath: string): Promise<DriveItem>;
export declare function getMyInsightsDriveItemById(graph: IGraph, insightType: string, id: string): Promise<DriveItem>;
export declare function getUserInsightsDriveItemById(graph: IGraph, userId: string, insightType: string, id: string): Promise<DriveItem>;
export declare function getFilesIterator(graph: IGraph, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getDriveFilesByIdIterator(graph: IGraph, driveId: string, itemId: string, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getDriveFilesByPathIterator(graph: IGraph, driveId: string, itemPath: string, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getGroupFilesByIdIterator(graph: IGraph, groupId: string, itemId: string, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getGroupFilesByPathIterator(graph: IGraph, groupId: string, itemPath: string, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getFilesByIdIterator(graph: IGraph, itemId: string, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getFilesByPathIterator(graph: IGraph, itemPath: string, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getSiteFilesByIdIterator(graph: IGraph, siteId: string, itemId: string, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getSiteFilesByPathIterator(graph: IGraph, siteId: string, itemPath: string, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getUserFilesByIdIterator(graph: IGraph, userId: string, itemId: string, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getUserFilesByPathIterator(graph: IGraph, userId: string, itemPath: string, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getFilesByListQueryIterator(graph: IGraph, listQuery: string, top?: number): Promise<GraphPageIterator<DriveItem>>;
export declare function getMyInsightsFiles(graph: IGraph, insightType: string): Promise<DriveItem[]>;
export declare function getUserInsightsFiles(graph: IGraph, userId: string, insightType: string): Promise<DriveItem[]>;
export declare function getFilesByQueries(graph: IGraph, fileQueries: string[]): Promise<DriveItem[]>;
export declare function getFileListFromCache(cache: CacheStore<CacheFileList>, store: string, key: string): Promise<CacheFileList>;
export declare function fetchNextAndCacheForFilesPageIterator(filesPageIterator: any): Promise<void>;
/**
 * retrieves the specified document thumbnail
 *
 * @param {string} resource
 * @param {string[]} scopes
 * @returns {Promise<string>}
 */
export declare function getDocumentThumbnail(graph: IGraph, resource: string, scopes: string[]): Promise<CacheThumbnail>;
/**
 * retrieve file properties based on Graph query
 *
 * @param graph
 * @param resource
 * @returns
 */
export declare function getGraphfile(graph: IGraph, resource: string): Promise<DriveItem>;
/**
 * retrieve UploadSession Url for large file and send by chuncks
 *
 * @param graph
 * @param resource
 * @returns
 */
export declare function getUploadSession(graph: IGraph, resource: string, conflictBehavior: number): Promise<UploadSession>;
/**
 * send file chunck to OneDrive, SharePoint Site
 *
 * @param graph
 * @param resource
 * @param file
 * @returns
 */
export declare function sendFileChunck(graph: IGraph, resource: string, contentLength: string, contentRange: string, file: Blob): Promise<any>;
/**
 * send file to OneDrive, SharePoint Site
 *
 * @param graph
 * @param resource
 * @param file
 * @returns
 */
export declare function sendFileContent(graph: IGraph, resource: string, file: File): Promise<DriveItem>;
/**
 * delete upload session
 *
 * @param graph
 * @param resource
 * @returns
 */
export declare function deleteSessionFile(graph: IGraph, resource: string): Promise<any>;
export {};
//# sourceMappingURL=graph.files.d.ts.map