/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { CacheItem, CacheStore, GraphPageIterator, IGraph } from '@microsoft/mgt-element';
import { DriveItem, UploadSession } from '@microsoft/microsoft-graph-types';
/**
 * Simple type guard to check if a response is an UploadSession
 *
 * @param session
 * @returns
 */
export declare const isUploadSession: (session: unknown) => session is UploadSession;
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
export declare const clearFilesCache: () => Promise<void>;
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
/**
 * Load a DriveItem give and arbitrary query
 *
 * @param graph
 * @param resource
 * @returns
 */
export declare const getDriveItemByQuery: (graph: IGraph, resource: string, storeName?: string, scopes?: string) => Promise<DriveItem>;
export declare const getDriveItemById: (graph: IGraph, driveId: string, itemId: string) => Promise<DriveItem>;
export declare const getDriveItemByPath: (graph: IGraph, driveId: string, itemPath: string) => Promise<DriveItem>;
export declare const getGroupDriveItemById: (graph: IGraph, groupId: string, itemId: string) => Promise<DriveItem>;
export declare const getGroupDriveItemByPath: (graph: IGraph, groupId: string, itemPath: string) => Promise<DriveItem>;
export declare const getMyDriveItemById: (graph: IGraph, itemId: string) => Promise<DriveItem>;
export declare const getMyDriveItemByPath: (graph: IGraph, itemPath: string) => Promise<DriveItem>;
export declare const getSiteDriveItemById: (graph: IGraph, siteId: string, itemId: string) => Promise<DriveItem>;
export declare const getSiteDriveItemByPath: (graph: IGraph, siteId: string, itemPath: string) => Promise<DriveItem>;
export declare const getListDriveItemById: (graph: IGraph, siteId: string, listId: string, itemId: string) => Promise<DriveItem>;
export declare const getUserDriveItemById: (graph: IGraph, userId: string, itemId: string) => Promise<DriveItem>;
export declare const getUserDriveItemByPath: (graph: IGraph, userId: string, itemPath: string) => Promise<DriveItem>;
export declare const getMyInsightsDriveItemById: (graph: IGraph, insightType: string, id: string) => Promise<DriveItem>;
export declare const getUserInsightsDriveItemById: (graph: IGraph, userId: string, insightType: string, id: string) => Promise<DriveItem>;
export declare const getFilesIterator: (graph: IGraph, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getDriveFilesByIdIterator: (graph: IGraph, driveId: string, itemId: string, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getDriveFilesByPathIterator: (graph: IGraph, driveId: string, itemPath: string, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getGroupFilesByIdIterator: (graph: IGraph, groupId: string, itemId: string, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getGroupFilesByPathIterator: (graph: IGraph, groupId: string, itemPath: string, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getFilesByIdIterator: (graph: IGraph, itemId: string, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getFilesByPathIterator: (graph: IGraph, itemPath: string, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getSiteFilesByIdIterator: (graph: IGraph, siteId: string, itemId: string, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getSiteFilesByPathIterator: (graph: IGraph, siteId: string, itemPath: string, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getUserFilesByIdIterator: (graph: IGraph, userId: string, itemId: string, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getUserFilesByPathIterator: (graph: IGraph, userId: string, itemPath: string, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getFilesByListQueryIterator: (graph: IGraph, listQuery: string, top?: number) => Promise<GraphPageIterator<DriveItem>>;
export declare const getMyInsightsFiles: (graph: IGraph, insightType: string) => Promise<DriveItem[]>;
export declare const getUserInsightsFiles: (graph: IGraph, userId: string, insightType: string) => Promise<DriveItem[]>;
export declare const getFilesByQueries: (graph: IGraph, fileQueries: string[]) => Promise<DriveItem[]>;
export declare const getFileListFromCache: (cache: CacheStore<CacheFileList>, store: string, key: string) => Promise<CacheFileList>;
export declare const fetchNextAndCacheForFilesPageIterator: (filesPageIterator: GraphPageIterator<DriveItem>) => Promise<void>;
/**
 * retrieves the specified document thumbnail
 *
 * @param {string} resource
 * @param {string[]} scopes
 * @returns {Promise<string>}
 */
export declare const getDocumentThumbnail: (graph: IGraph, resource: string, scopes: string[]) => Promise<CacheThumbnail>;
/**
 * retrieve file properties based on Graph query
 *
 * @param graph
 * @param resource
 * @returns
 */
export declare const getGraphfile: (graph: IGraph, resource: string) => Promise<DriveItem>;
/**
 * retrieve UploadSession Url for large file and send by chuncks
 *
 * @param graph
 * @param resource
 * @returns
 */
export declare const getUploadSession: (graph: IGraph, resource: string, conflictBehavior: number) => Promise<UploadSession>;
/**
 * send file chunck to OneDrive, SharePoint Site
 *
 * @param graph
 * @param resource
 * @param file
 * @returns
 */
export declare const sendFileChunk: (graph: IGraph, resource: string, contentLength: string, contentRange: string, file: Blob) => Promise<UploadSession | DriveItem>;
/**
 * send file to OneDrive, SharePoint Site
 *
 * @param graph
 * @param resource
 * @param file
 * @returns
 */
export declare const sendFileContent: (graph: IGraph, resource: string, file: File) => Promise<DriveItem>;
/**
 * delete upload session
 *
 * @param graph
 * @param resource
 * @returns
 */
export declare const deleteSessionFile: (graph: IGraph, resource: string) => Promise<void>;
export {};
//# sourceMappingURL=graph.files.d.ts.map