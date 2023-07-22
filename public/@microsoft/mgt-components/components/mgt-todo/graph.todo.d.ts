/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { TodoTaskList, TodoTask } from '@microsoft/microsoft-graph-types';
import { IGraph } from '@microsoft/mgt-element';
export interface LinkedResource {
    id: string;
    webUrl: string;
    applicationName: string;
    displayName: string;
    externalId: string;
}
/**
 * Get all todo tasks for a specific task list.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @returns {Promise<TodoTask[]>}
 */
export declare const getTodoTasks: (graph: IGraph, listId: string) => Promise<TodoTask[]>;
/**
 * Get a specific todo task.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {string} taskId
 * @returns {Promise<TodoTask>}
 */
export declare const getTodoTask: (graph: IGraph, listId: string, taskId: string) => Promise<TodoTask>;
/**
 * get all todo task lists
 *
 * @export
 * @param {IGraph} graph
 * @returns {Promise<TodoTaskList[]>}
 */
export declare const getTodoTaskLists: (graph: IGraph) => Promise<TodoTaskList[]>;
/**
 * Get a specific todo task list.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @returns {Promise<TodoTaskList>}
 */
export declare const getTodoTaskList: (graph: IGraph, listId: string) => Promise<TodoTaskList>;
/**
 * Create a new todo task.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {{ title: string; dueDateTime: { dateTime: string; timeZone: string } }} taskData
 * @returns {Promise<TodoTask>}
 */
export declare const createTodoTask: (graph: IGraph, listId: string, taskData: {
    title: string;
    dueDateTime?: {
        dateTime: string;
        timeZone: string;
    };
}) => Promise<TodoTask>;
/**
 * Create a new todo task list.
 *
 * @export
 * @param {IGraph} graph
 * @param {{ displayName: string }} list
 * @returns {Promise<TodoTaskList>}
 */
export declare const createTodoTaskList: (graph: IGraph, listData: {
    displayName: string;
}) => Promise<TodoTaskList>;
/**
 * Delete a todo task.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {string} taskId
 * @returns {Promise<void>}
 */
export declare const deleteTodoTask: (graph: IGraph, listId: string, taskId: string) => Promise<void>;
/**
 * Delete a todo task list.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @returns {Promise<void>}
 */
export declare const deleteTodoTaskList: (graph: IGraph, listId: string) => Promise<void>;
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
export declare const updateTodoTask: (graph: IGraph, listId: string, taskId: string, taskData: TodoTask) => Promise<TodoTask>;
/**
 * Update a todo task list.
 *
 * @export
 * @param {IGraph} graph
 * @param {string} listId
 * @param {TodoTaskList} taskListData
 * @returns {Promise<TodoTaskList>}
 */
export declare const updateTodoTaskList: (graph: IGraph, listId: string, taskListData: TodoTaskList) => Promise<TodoTaskList>;
//# sourceMappingURL=graph.todo.d.ts.map