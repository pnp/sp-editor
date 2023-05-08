/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { PlannerTask } from '@microsoft/microsoft-graph-types';
import { OutlookTask } from '@microsoft/microsoft-graph-types-beta';
import { TemplateResult } from 'lit-element';
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import '../mgt-person/mgt-person';
import '../sub-components/mgt-arrow-options/mgt-arrow-options';
import '../sub-components/mgt-dot-options/mgt-dot-options';
/**
 * Defines how a person card is shown when a user interacts with
 * a person component
 *
 * @export
 * @enum {number}
 */
export declare enum TasksSource {
    /**
     * Use Microsoft Planner
     */
    planner = 0,
    /**
     * Use Microsoft To-Do
     */
    todo = 1
}
/**
 * String resources for Mgt Tasks
 *
 * @export
 * @interface TasksStringResource
 */
export interface TasksStringResource {
    /**
     * Self Assigned string
     *
     * @type {string}
     * @memberof TasksStringResource
     */
    BASE_SELF_ASSIGNED: string;
    /**
     * Self Assigned Buckets string
     *
     * @type {string}
     * @memberof TasksStringResource
     */
    BUCKETS_SELF_ASSIGNED: string;
    /**
     * Buckets not found string
     *
     * @type {string}
     * @memberof TasksStringResource
     */
    BUCKET_NOT_FOUND: string;
    /**
     * Self Assigned Plans string
     *
     * @type {string}
     * @memberof TasksStringResource
     */
    PLANS_SELF_ASSIGNED: string;
    /**
     * Plan not found string
     *
     * @type {string}
     * @memberof TasksStringResource
     */
    PLAN_NOT_FOUND: string;
}
export type TaskFilter = (task: PlannerTask | OutlookTask) => boolean;
/**
 * Web component enables the user to view, add, remove, complete, or edit tasks. It works with tasks in Microsoft Planner or Microsoft To-Do.
 *
 * @export
 * @class MgtTasks
 * @extends {MgtBaseComponent}
 *
 * @fires taskAdded - Fires when a new task has been created.
 * @fires taskChanged - Fires when task metadata has been changed, such as marking completed.
 * @fires taskClick - Fires when the user clicks or taps on a task.
 * @fires taskRemoved - Fires when an existing task has been deleted.
 *
 * @cssprop --tasks-header-padding - {String} Tasks header padding
 * @cssprop --tasks-header-margin - {String} Tasks header margin
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
 * @cssprop --tasks-new-task-name-margin - {String} Tasks new task name margin
 * @cssprop --task-margin - {String} Task margin
 * @cssprop --task-box-shadow - {String} Task box shadow
 * @cssprop --task-background - {Color} Task background
 * @cssprop --task-border - {String} Task border
 * @cssprop --task-header-color - {Color} Task header color
 * @cssprop --task-header-margin - {String} Task header margin
 * @cssprop --task-detail-icon-margin -{String}  Task detail icon margin
 * @cssprop --task-new-margin - {String} Task new margin
 * @cssprop --task-new-border - {String} Task new border
 * @cssprop --task-new-line-margin - {String} Task new line margin
 * @cssprop --tasks-new-line-border - {String} Tasks new line border
 * @cssprop --task-new-input-margin - {String} Task new input margin
 * @cssprop --task-new-input-padding - {String} Task new input padding
 * @cssprop --task-new-input-font-size - {Length} Task new input font size
 * @cssprop --task-new-input-active-border - {String} Task new input active border
 * @cssprop --task-new-select-border - {String} Task new select border
 * @cssprop --task-new-add-button-background - {Color} Task new add button background
 * @cssprop --task-new-add-button-disabled-background - {Color} Task new add button disabled background
 * @cssprop --task-new-cancel-button-color - {Color} Task new cancel button color
 * @cssprop --task-complete-background - {Color} Task complete background
 * @cssprop --task-complete-border - {String} Task complete border
 * @cssprop --task-complete-header-color - {Color} Task complete header color
 * @cssprop --task-complete-detail-color - {Color} Task complete detail color
 * @cssprop --task-complete-detail-icon-color - {Color} Task complete detail icon color
 * @cssprop --tasks-background-color - {Color} Task background color
 * @cssprop --task-icon-alignment - {String} Task icon alignment
 * @cssprop --task-icon-background - {Color} Task icon color
 * @cssprop --task-icon-background-completed - {Color} Task icon background color when completed
 * @cssprop --task-icon-border - {String} Task icon border styles
 * @cssprop --task-icon-border-completed - {String} Task icon border style when task is completed
 * @cssprop --task-icon-border-radius - {String} Task icon border radius
 * @cssprop --task-icon-color - {Color} Task icon color
 * @cssprop --task-icon-color-completed - {Color} Task icon color when completed
 */
export declare class MgtTasks extends MgtTemplatedComponent {
    /**
     * determines whether todo, or planner functionality for task component
     *
     * @readonly
     * @type {TasksStringResource}
     * @memberof MgtTasks
     */
    get res(): {
        BASE_SELF_ASSIGNED: string;
        BUCKETS_SELF_ASSIGNED: string;
        BUCKET_NOT_FOUND: string;
        PLANS_SELF_ASSIGNED: string;
        PLAN_NOT_FOUND: string;
    };
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    protected get strings(): {
        removeTaskSubtitle: string;
        cancelNewTaskSubtitle: string;
        newTaskPlaceholder: string;
        addTaskButtonSubtitle: string;
    };
    /**
     * Get whether new task view is visible
     *
     * @memberof MgtTasks
     */
    get isNewTaskVisible(): boolean;
    /**
     * Set whether new task is visible
     *
     * @memberof MgtTasks
     */
    set isNewTaskVisible(value: boolean);
    /**
     * determines if tasks are un-editable
     * @type {boolean}
     */
    readOnly: boolean;
    /**
     * determines which task source is loaded, either planner or todo
     * @type {TasksSource}
     */
    dataSource: TasksSource;
    /**
     * if set, the component will only show tasks from either this plan or group
     * @type {string}
     */
    targetId: string;
    /**
     * if set, the component will only show tasks from this bucket or folder
     * @type {string}
     */
    targetBucketId: string;
    /**
     * if set, the component will first show tasks from this plan or group
     *
     * @type {string}
     * @memberof MgtTasks
     */
    initialId: string;
    /**
     * if set, the component will first show tasks from this bucket or folder
     *
     * @type {string}
     * @memberof MgtTasks
     */
    initialBucketId: string;
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
     * allows developer to define specific group id
     *
     * @type {string}
     */
    groupId: string;
    /**
     * Optional filter function when rendering tasks
     *
     * @type {TaskFilter}
     * @memberof MgtTasks
     */
    taskFilter: TaskFilter;
    /**
     * Get the scopes required for tasks
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtTasks
     */
    static get requiredScopes(): string[];
    private _isNewTaskVisible;
    private _newTaskBeingAdded;
    private _newTaskName;
    private _newTaskDueDate;
    private _newTaskGroupId;
    private _newTaskFolderId;
    private _newTaskContainerId;
    private _groups;
    private _folders;
    private _tasks;
    private _hiddenTasks;
    private _loadingTasks;
    private _inTaskLoad;
    private _hasDoneInitialLoad;
    private _todoDefaultSet;
    private _currentGroup;
    private _currentFolder;
    private _me;
    private previousMediaQuery;
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
    /**
     * Synchronizes property values when attributes change.
     *
     * @param {*} name
     * @param {*} oldValue
     * @param {*} newValue
     * @memberof MgtTasks
     */
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    protected clearState(): void;
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    protected firstUpdated(changedProperties: any): void;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    protected render(): TemplateResult;
    /**
     * loads tasks from dataSource
     *
     * @returns
     * @memberof MgtTasks
     */
    protected loadState(): Promise<void>;
    private onResize;
    private _loadTargetTodoTasks;
    private _loadTargetPlannerTasks;
    private _loadAllTasks;
    private _loadTasksForGroup;
    private addTask;
    private completeTask;
    private uncompleteTask;
    private removeTask;
    private assignPeople;
    private onAddTaskClick;
    private onAddTaskKeyDown;
    private newTaskButtonKeydown;
    private addNewTaskButtonClick;
    private handleNewTaskDateChange;
    private handleSelectedPlan;
    private newTaskVisible;
    private renderPlanOptions;
    private renderNewTask;
    private togglePeoplePicker;
    private updateAssignedPeople;
    private getPeoplePicker;
    private getMgtPeople;
    private getFlyout;
    private renderTask;
    private renderAssignedPeople;
    private handleTaskClick;
    private renderLoadingTask;
    private renderPlannerIcon;
    private renderBucketIcon;
    /**
     * Render a calendar icon.
     *
     * @protected
     * @returns
     * @memberof MgtTodo
     */
    protected renderCalendarIcon(): TemplateResult;
    private getTaskSource;
    private getPlanTitle;
    private getFolderName;
    private isTaskInSelectedGroupFilter;
    private isTaskInSelectedFolderFilter;
    private dateToInputValue;
}
//# sourceMappingURL=mgt-tasks.d.ts.map