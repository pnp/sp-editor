/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { TemplateResult } from 'lit-element';
import '../mgt-person/mgt-person';
import { MgtTasksBase } from '../mgt-tasks-base/mgt-tasks-base';
import '../sub-components/mgt-arrow-options/mgt-arrow-options';
import '../sub-components/mgt-dot-options/mgt-dot-options';
import { TodoTask } from './graph.todo';
export type TodoFilter = (task: TodoTask) => boolean;
/**
 * component enables the user to view, add, remove, complete, or edit todo tasks. It works with tasks in Microsoft Planner or Microsoft To-Do.
 *
 * @export
 * @class MgtTodo
 * @extends {MgtTasksBase}
 *
 * @cssprop --tasks-background-color - {Color} Task background color
 * @cssprop --tasks-header-padding - {String} Tasks header padding
 * @cssprop --tasks-title-padding - {String} Tasks title padding
 * @cssprop --tasks-plan-title-font-size - {Length} Tasks plan title font size
 * @cssprop --tasks-plan-title-padding - {String} Tasks plan title padding
 * @cssprop --tasks-new-button-width - {String} Tasks new button width
 * @cssprop --tasks-new-button-height - {String} Tasks new button height
 * @cssprop --tasks-new-button-color - {Color} Tasks new button color
 * @cssprop --tasks-new-button-background - {String} Tasks new button background
 * @cssprop --tasks-new-button-border - {String} Tasks new button border
 * @cssprop --tasks-new-button-hover-background - {Color} Tasks new button hover background
 * @cssprop --tasks-new-button-active-background - {Color} Tasks new button active background
 * @cssprop --task-margin - {String} Task margin
 * @cssprop --task-background - {Color} Task background
 * @cssprop --task-border - {String} Task border
 * @cssprop --task-header-color - {Color} Task header color
 * @cssprop --task-header-margin - {String} Task header margin
 * @cssprop --task-new-margin - {String} Task new margin
 * @cssprop --task-new-border - {String} Task new border
 * @cssprop --task-new-input-margin - {String} Task new input margin
 * @cssprop --task-new-input-padding - {String} Task new input padding
 * @cssprop --task-new-input-font-size - {Length} Task new input font size
 * @cssprop --task-new-select-border - {String} Task new select border
 * @cssprop --task-new-add-button-background - {Color} Task new add button background
 * @cssprop --task-new-add-button-disabled-background - {Color} Task new add button disabled background
 * @cssprop --task-new-cancel-button-color - {Color} Task new cancel button color
 * @cssprop --task-complete-background - {Color} Task complete background
 * @cssprop --task-complete-border - {String} Task complete border
 * @cssprop --task-icon-alignment - {String} Task icon alignment
 * @cssprop --task-icon-background - {Color} Task icon color
 * @cssprop --task-icon-background-completed - {Color} Task icon background color when completed
 * @cssprop --task-icon-border - {String} Task icon border styles
 * @cssprop --task-icon-border-completed - {String} Task icon border style when task is completed
 * @cssprop --task-icon-border-radius - {String} Task icon border radius
 * @cssprop --task-icon-color - {Color} Task icon color
 * @cssprop --task-icon-color-completed - {Color} Task icon color when completed
 */
export declare class MgtTodo extends MgtTasksBase {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    protected get strings(): {
        cancelNewTaskSubtitle: string;
        newTaskPlaceholder: string;
        addTaskButtonSubtitle: string;
        removeTaskSubtitle: string;
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
    private _lists;
    private _tasks;
    private _currentList;
    private _isLoadingTasks;
    private _loadingTasks;
    private _newTaskDueDate;
    private _newTaskListId;
    private _graph;
    constructor();
    /**
     * Render the list of todo tasks
     */
    protected renderTasks(): TemplateResult;
    /**
     * Render the details part of the new task panel
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtTodo
     */
    protected renderNewTaskDetails(): TemplateResult;
    /**
     * Render the header part of the component.
     *
     * @protected
     * @returns
     * @memberof MgtTodo
     */
    protected renderHeaderContent(): TemplateResult;
    /**
     * Render a task in the list.
     *
     * @protected
     * @param {TodoTask} task
     * @returns
     * @memberof MgtTodo
     */
    protected renderTask(task: TodoTask): TemplateResult;
    /**
     * loads tasks from dataSource
     *
     * @returns
     * @memberof MgtTasks
     */
    protected loadState(): Promise<void>;
    /**
     * Send a request the Graph to create a new todo task item
     *
     * @protected
     * @returns {Promise<any>}
     * @memberof MgtTodo
     */
    protected createNewTask(): Promise<void>;
    /**
     * Clear out the new task metadata input fields
     *
     * @protected
     * @memberof MgtTodo
     */
    protected clearNewTaskData(): void;
    /**
     * Clear the state of the component
     *
     * @protected
     * @memberof MgtTodo
     */
    protected clearState(): void;
    private loadTaskList;
    private updateTaskStatus;
    private removeTask;
    private handleTaskCheckClick;
}
//# sourceMappingURL=mgt-todo.d.ts.map