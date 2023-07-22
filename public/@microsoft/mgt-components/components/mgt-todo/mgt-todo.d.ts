/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { TemplateResult } from 'lit';
import '../mgt-person/mgt-person';
import { MgtTasksBase } from '../mgt-tasks-base/mgt-tasks-base';
import '../sub-components/mgt-arrow-options/mgt-arrow-options';
import '../sub-components/mgt-dot-options/mgt-dot-options';
import { TodoTaskList, TodoTask } from '@microsoft/microsoft-graph-types';
/**
 * Filter function
 */
export type TodoFilter = (task: TodoTask) => boolean;
/**
 * component enables the user to view, add, remove, complete, or edit todo tasks. It works with tasks in Microsoft Planner or Microsoft To-Do.
 *
 * @export
 * @class MgtTodo
 * @extends {MgtTasksBase}
 *
 * @cssprop --task-color - {Color} - Task text color
 * @cssprop --task-background-color - {Color} - Task background color
 * @cssprop --task-complete-background - {Color} - Task background color when completed
 * @cssprop --task-date-input-active-color - {Color} - Task date input active color
 * @cssprop --task-date-input-hover-color - {Color} - Task date input hover color
 * @cssprop --task-background-color-hover - {Color} - Task background when hovered
 * @cssprop --task-box-shadow - {Color} - Task box shadow color
 * @cssprop --task-border-completed - {Color} - Task border color when completed
 * @cssprop --task-radio-background-color - {Color} - Task radio background color
 */
export declare class MgtTodo extends MgtTasksBase {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    /**
     * Strings for localization
     *
     * @readonly
     * @protected
     * @memberof MgtTodo
     */
    protected get strings(): {
        cancelNewTaskSubtitle: string;
        newTaskPlaceholder: string;
        newTaskLabel: string;
        addTaskButtonSubtitle: string;
        deleteTaskLabel: string;
        dueDate: string;
        newTaskDateInputLabel: string;
        newTaskNameInputLabel: string;
        cancelAddingTask: string;
    };
    /**
     * Optional filter function when rendering tasks
     *
     * @type {TodoFilter}
     * @memberof MgtTodo
     */
    taskFilter: TodoFilter;
    /**
     * Get the scopes required for todo
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtTodo
     */
    static get requiredScopes(): string[];
    private _tasks;
    private _isLoadingTasks;
    private _loadingTasks;
    private _newTaskDueDate;
    private _newTaskName;
    private _isNewTaskBeingAdded;
    private _graph;
    private currentList;
    private _isDarkMode;
    constructor();
    /**
     * updates provider state
     *
     * @memberof MgtTasks
     */
    connectedCallback(): void;
    /**
     * removes updates on provider state
     *
     * @memberof MgtTasks
     */
    disconnectedCallback(): void;
    private readonly onThemeChanged;
    /**
     * Render the list of todo tasks
     */
    protected renderTasks(): TemplateResult;
    /**
     * Render the generic picker or the task list displayName.
     *
     */
    protected renderPicker(): TemplateResult<1>;
    /**
     * Create a new todo task and add it to the list
     *
     * @protected
     * @returns {Promise<void>}
     * @memberof MgtTodo
     */
    protected addTask: () => Promise<void>;
    /**
     * Render the panel for creating a new task
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtTodo
     */
    protected renderNewTask: () => TemplateResult;
    /**
     * Handle a change in taskList.
     *
     * @protected
     * @param {CustomEvent} e
     * @returns {TemplateResult}
     * @memberof MgtTodo
     */
    protected handleSelectionChanged: (e: CustomEvent<TodoTaskList>) => void;
    /**
     * Render task details.
     *
     * @protected
     * @param {TodoTask} task
     * @returns {TemplateResult}
     * @memberof MgtTodo
     */
    protected renderTaskDetails: (task: TodoTask) => TemplateResult;
    /**
     * Render a task in the list.
     *
     * @protected
     * @param {TodoTask} task
     * @returns {TemplateResult}
     * @memberof MgtTodo
     */
    protected renderTask: (task: TodoTask) => TemplateResult<1>;
    /**
     * Render a completed task in the list.
     *
     * @protected
     * @param {TodoTask} task
     * @returns {TemplateResult}
     * @memberof MgtTodo
     */
    protected renderCompletedTask: (task: TodoTask) => TemplateResult<1>;
    /**
     * loads tasks from dataSource
     *
     * @returns {Promise<void>}
     * @memberof MgtTodo
     */
    protected loadState: () => Promise<void>;
    /**
     * Send a request the Graph to create a new todo task item
     *
     * @protected
     * @returns {Promise<void>}
     * @memberof MgtTodo
     */
    protected createNewTask(): Promise<void>;
    /**
     * Clear out the new task metadata input fields
     *
     * @protected
     * @memberof MgtTodo
     */
    protected clearNewTaskData: () => void;
    /**
     * Clear the state of the component
     *
     * @protected
     * @memberof MgtTodo
     */
    protected clearState: () => void;
    private readonly loadTasks;
    private readonly updateTaskStatus;
    private readonly removeTask;
    private handleTaskCheckClick;
    private readonly handleInput;
    private readonly handleKeyDown;
    private readonly handleDateChange;
}
//# sourceMappingURL=mgt-todo.d.ts.map