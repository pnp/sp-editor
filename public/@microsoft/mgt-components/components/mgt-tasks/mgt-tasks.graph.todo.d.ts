/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { OutlookTask, OutlookTaskFolder, OutlookTaskGroup } from '@microsoft/microsoft-graph-types-beta';
/**
 * async promise, allows developer to add new to-do task
 *
 * @param {*} newTask
 * @returns {Promise<OutlookTask>}
 * @memberof BetaGraph
 */
export declare function addTodoTask(graph: IGraph, newTask: any): Promise<OutlookTask>;
/**
 * async promise, returns all Outlook taskGroups associated with the logged in user
 *
 * @returns {Promise<OutlookTaskGroup[]>}
 * @memberof BetaGraph
 */
export declare function getAllMyTodoGroups(graph: IGraph): Promise<OutlookTaskGroup[]>;
/**
 * async promise, returns all Outlook tasks associated with a taskFolder with folderId
 *
 * @param {string} folderId
 * @returns {Promise<OutlookTask[]>}
 * @memberof BetaGraph
 */
export declare function getAllTodoTasksForFolder(graph: IGraph, folderId: string): Promise<OutlookTask[]>;
/**
 * async promise, returns all Outlook taskFolders associated with groupId
 *
 * @param {string} groupId
 * @returns {Promise<OutlookTaskFolder[]>}
 * @memberof BetaGraph
 */
export declare function getFoldersForTodoGroup(graph: IGraph, groupId: string): Promise<OutlookTaskFolder[]>;
/**
 * async promise, returns to-do tasks from Outlook groups associated with a groupId
 *
 * @param {string} groupId
 * @returns {Promise<OutlookTaskGroup>}
 * @memberof BetaGraph
 */
export declare function getSingleTodoGroup(graph: IGraph, groupId: string): Promise<OutlookTaskGroup>;
/**
 * async promise, allows developer to remove task based on taskId
 *
 * @param {string} taskId
 * @param {string} eTag
 * @returns {Promise<any>}
 * @memberof BetaGraph
 */
export declare function removeTodoTask(graph: IGraph, taskId: string, eTag: string): Promise<any>;
/**
 * async promise, allows developer to set to-do task to completed state
 *
 * @param {string} taskId
 * @param {string} eTag
 * @returns {Promise<OutlookTask>}
 * @memberof BetaGraph
 */
export declare function setTodoTaskComplete(graph: IGraph, taskId: string, eTag: string): Promise<OutlookTask>;
/**
 * async promise, allows developer to set to-do task to incomplete state
 *
 * @param {string} taskId
 * @param {string} eTag
 * @returns {Promise<OutlookTask>}
 * @memberof BetaGraph
 */
export declare function setTodoTaskIncomplete(graph: IGraph, taskId: string, eTag: string): Promise<OutlookTask>;
/**
 * async promise, allows developer to redefine to-do Task details associated with a taskId
 *
 * @param {string} taskId
 * @param {*} task
 * @param {string} eTag
 * @returns {Promise<OutlookTask>}
 * @memberof BetaGraph
 */
export declare function setTodoTaskDetails(graph: IGraph, taskId: string, task: any, eTag: string): Promise<OutlookTask>;
//# sourceMappingURL=mgt-tasks.graph.todo.d.ts.map