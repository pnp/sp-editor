/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { TemplateResult } from 'lit';
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import { TodoTask } from '@microsoft/microsoft-graph-types';
/**
 * The foundation for creating task based components.
 *
 * @export
 * @class MgtTasksBase
 * @extends {MgtTemplatedComponent}
 */
export declare abstract class MgtTasksBase extends MgtTemplatedComponent {
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
     * @memberof MgtTasks
     */
    hideHeader: boolean;
    /**
     * sets whether the options are rendered
     *
     * @type {boolean}
     * @memberof MgtTasks
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
    /**
     * Synchronizes property values when attributes change.
     *
     * @param {*} name
     * @param {*} oldValue
     * @param {*} newValue
     * @memberof MgtTasks
     */
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
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
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    protected render(): TemplateResult<1>;
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