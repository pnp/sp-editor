/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { TemplateResult } from 'lit';
import { MgtTemplatedTaskComponent } from '@microsoft/mgt-element';
import { TodoTask } from '@microsoft/microsoft-graph-types';
/**
 * The foundation for creating task based components.
 *
 * @export
 * @class MgtTasksBase
 * @extends {MgtTemplatedComponent}
 */
export declare abstract class MgtTasksBase extends MgtTemplatedTaskComponent {
    /**
     * determines if tasks are un-editable
     *
     * @type {boolean}
     */
    readOnly: boolean;
    /**
     * sets whether the header is rendered
     *
     * @type {boolean}
     * @memberof MgtTasksBase
     */
    hideHeader: boolean;
    /**
     * sets whether the options are rendered
     *
     * @type {boolean}
     * @memberof MgtTasksBase
     */
    hideOptions: boolean;
    /**
     * if set, the component will only show tasks from the target list
     *
     * @type {string}
     */
    targetId: string;
    /**
     * if set, the component will first show tasks from this list
     *
     * @type {string}
     * @memberof MgtTodo
     */
    initialId: string;
    private _previousMediaQuery;
    protected get strings(): Record<string, string>;
    constructor();
    protected args(): unknown[];
    /**
     * updates provider state
     *
     * @memberof MgtTasksBase
     */
    connectedCallback(): void;
    /**
     * removes updates on provider state
     *
     * @memberof MgtTasksBase
     */
    disconnectedCallback(): void;
    /**
     * Render the loading state
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtTasksBase
     */
    protected renderLoading: () => TemplateResult;
    /**
     * Invoked by render when the task is in a completed state
     */
    protected renderContent: () => TemplateResult<1>;
    /**
     * Render a task in a loading state.
     *
     * @protected
     * @returns
     * @memberof MgtTodo
     */
    protected renderLoadingTask(): TemplateResult<1>;
    /**
     * Render the panel for creating a new task.
     *
     * @protected
     * @memberof MgtTasksBase
     */
    protected abstract renderNewTask(): TemplateResult;
    /**
     * Render the generic picker.
     *
     * @protected
     * @memberof MgtTasksBase
     */
    protected abstract renderPicker(): TemplateResult;
    /**
     * Render the list of todo tasks
     *
     * @protected
     * @abstract
     * @param {ITask[]} tasks
     * @returns {TemplateResult}
     * @memberof MgtTasksBase
     */
    protected abstract renderTasks(): TemplateResult;
    /**
     * Make a service call to create the new task object.
     *
     * @protected
     * @abstract
     * @memberof MgtTasksBase
     */
    protected abstract createNewTask(): Promise<void>;
    /**
     * Clear the form data from the new task panel.
     *
     * @protected
     * @memberof MgtTasksBase
     */
    protected abstract clearNewTaskData(): void;
    /**
     * Clear the component state.
     *
     * @protected
     * @memberof MgtTasksBase
     */
    protected clearState(): void;
    /**
     * Handle when a task is clicked
     *
     * @protected
     * @param {Event} e
     * @param {TodoTask} task
     * @memberof MgtTasksBase
     */
    protected handleTaskClick: (task: TodoTask) => void;
    /**
     * Convert a date to a properly formatted string
     *
     * @protected
     * @param {Date} date
     * @returns
     * @memberof MgtTasksBase
     */
    protected dateToInputValue(date: Date): string;
    private readonly onResize;
}
//# sourceMappingURL=mgt-tasks-base.d.ts.map