/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { CacheItem, CacheStore, GraphPageIterator, IGraph } from '@microsoft/mgt-element';
import { DriveItem } from '@microsoft/microsoft-graph-types';
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
export declare function getFileListFromCache(cache: CacheStore<CacheFileList>, key: string): Promise<CacheFileList>;
export declare function fetchNextAndCacheForFilesPageIterator(filesPageIterator: any): Promise<void>;
export {};
//# sourceMappingURL=graph.files.d.ts.map