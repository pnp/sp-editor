/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { TemplateResult } from 'lit-element';
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
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
    /**
     * The name of a potential new task
     *
     * @readonly
     * @protected
     * @type {string}
     * @memberof MgtTasksBase
     */
    protected get newTaskName(): string;
    private _isNewTaskBeingAdded;
    private _isNewTaskVisible;
    private _newTaskName;
    private _previousMediaQuery;
    protected get strings(): {
        [x: string]: string;
    };
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
    protected render(): TemplateResult;
    /**
     * Render the header part of the component.
     *
     * @protected
     * @returns
     * @memberof MgtTodo
     */
    protected renderHeader(): TemplateResult;
    /**
     * Render a task in a loading state.
     *
     * @protected
     * @returns
     * @memberof MgtTodo
     */
    protected renderLoadingTask(): TemplateResult;
    /**
     * Render the panel for creating a new task
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtTasksBase
     */
    protected renderNewTaskPanel(): TemplateResult;
    /**
     * Render the top header part of the component.
     *
     * @protected
     * @abstract
     * @returns {TemplateResult}
     * @memberof MgtTasksBase
     */
    protected abstract renderHeaderContent(): TemplateResult;
    /**
     * Render the details part of the new task panel
     *
     * @protected
     * @abstract
     * @returns {TemplateResult}
     * @memberof MgtTasksBase
     */
    protected abstract renderNewTaskDetails(): TemplateResult;
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
     * Render a bucket icon.
     *
     * @protected
     * @returns
     * @memberof MgtTodo
     */
    protected renderBucketIcon(): TemplateResult;
    /**
     * Render a calendar icon.
     *
     * @protected
     * @returns
     * @memberof MgtTodo
     */
    protected renderCalendarIcon(): TemplateResult;
    /**
     * Create a new todo task and add it to the list
     *
     * @protected
     * @returns
     * @memberof MgtTasksBase
     */
    protected addTask(): Promise<void>;
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
    protected clearNewTaskData(): void;
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
    protected handleTaskClick(e: Event, task: any): void;
    /**
     * Convert a date to a properly formatted string
     *
     * @protected
     * @param {Date} date
     * @returns
     * @memberof MgtTasksBase
     */
    protected dateToInputValue(date: Date): string;
    private showNewTaskPanel;
    private hideNewTaskPanel;
    private onResize;
}
//# sourceMappingURL=mgt-tasks-base.d.ts.map