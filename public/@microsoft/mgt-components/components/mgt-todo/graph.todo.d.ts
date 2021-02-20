/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { DateTimeTimeZone, ItemBody, PatternedRecurrence } from '@microsoft/microsoft-graph-types';
import { IGraph } from '@microsoft/mgt-element';
export interface LinkedResource {
    id: string;
    webUrl: string;
    applicationName: string;
    displayName: string;
    externalId: string;
}
export declare enum TaskStatus {
    notStarted = 0,
    inProgress = 1,
    completed = 2,
    deferred = 3,
    waitingOnOthers = 4
}
export declare enum TaskImportance {
    low = 0,
    normal = 1,
    high = 2
}
export declare enum WellknownListName {
    none = 0,
    default = 1,
    flaggedEmails = 2,
    unknownFutureValue = 3
}
export interface TodoTask {
    id: string;
    title: string;
    body: ItemBody;
    importance: TaskImportance;
    status: TaskStatus;
    createdDateTime: Date;
    completedDateTime: DateTimeTimeZone;
    lastModifiedDate: Date;
    bodyLastModifiedDateTime: Date;
    dueDateTime: DateTimeTimeZone;
    isReminderOn: boolean;
    reminderDateTime: DateTimeTimeZone;
    recurrence: PatternedRecurrence;
    linkedResources: LinkedResource[];
}
export interface TodoTaskList {
    id: string;
    displayName: string;
    tasks: TodoTask[];
    isOwner: boolean;
    isShared: boolean;
    wellknownName: WellknownListName;
}
/**
 * Get all todo tasks for a specific task list.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @returns {Promise<TodoTask[]>}
 */
export declare function getTodoTasks(graph: IGraph, listId: string): Promise<TodoTask[]>;
/**
 * Get a specific todo task.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {string} taskId
 * @returns {Promise<TodoTask>}
 */
export declare function getTodoTask(graph: IGraph, listId: string, taskId: string): Promise<TodoTask>;
/**
 * get all todo task lists
 *
 * @export
 * @param {IGraph} graph
 * @returns {Promise<TodoTaskList[]>}
 */
export declare function getTodoTaskLists(graph: IGraph): Promise<TodoTaskList[]>;
/**
 * Get a specific todo task list.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @returns {Promise<TodoTaskList>}
 */
export declare function getTodoTaskList(graph: IGraph, listId: string): Promise<TodoTaskList>;
/**
 * Create a new todo task.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {{ title: string; dueDateTime: { dateTime: string; timeZone: string } }} taskData
 * @returns {Promise<TodoTask>}
 */
export declare function createTodoTask(graph: IGraph, listId: string, taskData: {
    title: string;
    dueDateTime?: {
        dateTime: string;
        timeZone: string;
    };
}): Promise<TodoTask>;
/**
 * Create a new todo task list.
 *
 * @export
 * @param {IGraph} graph
 * @param {{ displayName: string }} list
 * @returns {Promise<TodoTaskList>}
 */
export declare function createTodoTaskList(graph: IGraph, listData: {
    displayName: string;
}): Promise<TodoTaskList>;
/**
 * Delete a todo task.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {string} taskId
 * @returns {Promise<void>}
 */
export declare function deleteTodoTask(graph: IGraph, listId: string, taskId: string): Promise<void>;
/**
 * Delete a todo task list.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @returns {Promise<void>}
 */
export declare function deleteTodoTaskList(graph: IGraph, listId: string): Promise<void>;
/**
 * Update a todo task.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {string} taskId
 * @param {TodoTask} taskData
 * @returns {Promise<TodoTask>}
 */
export declare function updateTodoTask(graph: IGraph, listId: string, taskId: string, taskData: TodoTask): Promise<TodoTask>;
/**
 * Update a todo task list.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {TodoTaskList} taskListData
 * @returns {Promise<TodoTaskList>}
 */
export declare function updateTodoTaskList(graph: IGraph, listId: string, taskListData: TodoTaskList): Promise<TodoTaskList>;
//# sourceMappingURL=graph.todo.d.ts.map