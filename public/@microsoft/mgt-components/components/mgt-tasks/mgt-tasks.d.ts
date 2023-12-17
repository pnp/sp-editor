/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import { PlannerTask } from '@microsoft/microsoft-graph-types';
import { OutlookTask } from '@microsoft/microsoft-graph-types-beta';
import { PropertyValueMap, TemplateResult } from 'lit';
import '../mgt-person/mgt-person';
import '../sub-components/mgt-arrow-options/mgt-arrow-options';
import '../sub-components/mgt-dot-options/mgt-dot-options';
import { ITask } from './task-sources';
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
 * @fires {CustomEvent<ITask>} taskAdded - Fires when a new task has been created.
 * @fires {CustomEvent<ITask>} taskChanged - Fires when task metadata has been changed, such as marking completed.
 * @fires {CustomEvent<ITask>} taskClick - Fires when the user clicks or taps on a task.
 * @fires {CustomEvent<ITask>} taskRemoved - Fires when an existing task has been deleted.
 *
 * @cssprop --tasks-header-padding - {String} Tasks header padding. Default is 0 0 14px 0.
 * @cssprop --tasks-header-margin - {String} Tasks header margin. Default is none.
 * @cssprop --tasks-header-text-font-size: {Length} the font size of the tasks header. Default is 24px.
 * @cssprop --tasks-header-text-font-weight: {Length} the font weight of the tasks header. Default is 600.
 * @cssprop --tasks-header-text-color: {Color} the font color of the tasks header.
 * @cssprop --tasks-header-text-hover-color: {Color} the font color of the tasks header when you hover on it.
 *
 * @cssprop --tasks-new-button-width - {Length} Tasks new button width. Default is none.
 * @cssprop --tasks-new-button-height - {Length} Tasks new button height. Default is none
 * @cssprop --tasks-new-button-text-color - {Color} Tasks new button text color.
 * @cssprop --tasks-new-button-text-font-weight - {Length} Tasks new button text font weight. Default is 700.
 * @cssprop --tasks-new-button-background - {Length} Tasks new button background.
 * @cssprop --tasks-new-button-border - {Length} Tasks new button border. Default is none.
 * @cssprop --tasks-new-button-background-hover - {Color} Tasks new button hover background.
 * @cssprop --tasks-new-button-background-active - {Color} Tasks new button active background.
 *
 * @cssprop --task-add-new-button-width - {Length} Add a new task button width. Default is none.
 * @cssprop --task-add-new-button-height - {Length} Add a new task button height. Default is none
 * @cssprop --task-add-new-button-text-color - {Color} Add a new task button text color.
 * @cssprop --task-add-new-button-text-font-weight - {Length} Add a new task button text font weight. Default is 700.
 * @cssprop --task-add-new-button-background - {Length} Add a new task button background.
 * @cssprop --task-add-new-button-border - {Length} Add a new task button border. Default is none.
 * @cssprop --task-add-new-button-background-hover - {Color} Add a new task button hover background.
 * @cssprop --task-add-new-button-background-active - {Color} Add a new task button active background.
 *
 * @cssprop --task-cancel-new-button-width - {Length} Cancel adding a new task button width. Default is none.
 * @cssprop --task-cancel-new-button-height - {Length} Cancel adding a new task button height. Default is none
 * @cssprop --task-cancel-new-button-text-color - {Color} Cancel adding a new task button text color.
 * @cssprop --task-cancel-new-button-text-font-weight - {Length} Cancel adding a new task button text font weight. Default is 700.
 * @cssprop --task-cancel-new-button-background - {Length} Cancel adding a new task button background.
 * @cssprop --task-cancel-new-button-border - {Length} Cancel adding a new task button border. Default is none.
 * @cssprop --task-cancel-new-button-background-hover - {Color} Cancel adding a new task button hover background.
 * @cssprop --task-cancel-new-button-background-active - {Color} Cancel adding a new task button active background.
 *
 * @cssprop --task-new-input-border - {Length} the border of the input for a new task. Default is fluent UI input border.
 * @cssprop --task-new-input-border-radius - {Length} the border radius of the input for a new task. Default is fluent UI input border.
 * @cssprop --task-new-input-background-color - {Color} the background color of the new task input.
 * @cssprop --task-new-input-hover-background-color - {Color} the background color of the new task input when you hover.
 * @cssprop --task-new-input-placeholder-color - {Color} the placeholder colder of the new task input.
 * @cssprop --task-new-dropdown-border - {Length} the border of the dropdown for a new task. Default is fluent UI dropdown border.
 * @cssprop --task-new-dropdown-border-radius - {Length} the border radius of the dropdown for a new task. Default is fluent UI dropdown border.
 * @cssprop --task-new-dropdown-background-color - {Color} the background color of the new task dropdown.
 * @cssprop --task-new-dropdown-hover-background-color - {Color} the background color of the new task dropdown when you hover.
 * @cssprop --task-new-dropdown-placeholder-color - {Color} the placeholder colder of the new task dropdown.
 * @cssprop --task-new-dropdown-list-background-color - {Color} the background color of the dropdown list options.
 * @cssprop --task-new-dropdown-option-text-color - {Color} the text color of the dropdown option text.
 * @cssprop --task-new-dropdown-option-hover-background-color - {Color} the background color of the dropdown option when you hover.
 * @cssprop --task-new-person-icon-color - {Color} color of the assign person text.
 * @cssprop --task-new-person-icon-text-color - {Color} color of the text beside the assign person icon.
 *
 * @cssprop --task-complete-checkbox-background-color - {Color} A completed task checkbox background color.
 * @cssprop --task-complete-checkbox-text-color - {Color} A completed task checkbox check color.
 * @cssprop --task-incomplete-checkbox-background-color - {Color} A incompleted task checkbox background color.
 * @cssprop --task-incomplete-checkbox-background-hover-color - {Color} A incompleted task checkbox background color.
 *
 * @cssprop --task-title-text-font-size - {Length} Task title text font size. Default is medium.
 * @cssprop --task-title-text-font-weight - {Length} Task title text font weight. Default is 600.
 * @cssprop --task-complete-title-text-color - {Length} Task title color for a complete task.
 * @cssprop --task-incomplete-title-text-color - {Length} Task title color for an incomplete task.
 *
 * @cssprop --task-icons-width - {Length} The icons in a task width size. Default is 20px;
 * @cssprop --task-icons-height - {Length} The icons in a task height size. Default is 20px;
 * @cssprop --task-icons-background-color - {Color} The icons in a task color background color.
 * @cssprop --task-icons-text-font-color - {Color} The text beside icons in a task color background color.
 * @cssprop --task-icons-text-font-size - {Length} The font size of the text beside icons in a task. Default is 12px.
 * @cssprop --task-icons-text-font-weight - {Length} The font weight of the text beside icons in a task. Default is 600.
 *
 * @cssprop --task-complete-background-color - {Color} The background color of a task that is complete.
 * @cssprop --task-incomplete-background-color - {Color} The background color of a task that is incomplete.
 * @cssprop --task-complete-border - {Length} The border of a task that is complete.  Default is 2px dotted var(--neutral-fill-strong-rest).
 * @cssprop --task-incomplete-border - {Length} The border of a task that is incomplete. Default is 1px solid var(--neutral-fill-strong-rest).
 * @cssprop --task-complete-border-radius - {Length} The border radius of a task that is incomplete. Default is 4px.
 * @cssprop --task-incomplete-border-radius - {Length} The border radius of a task that is incomplete. Default is 4px.
 * @cssprop --task-complete-padding - {Length} The padding of a task that is complete. Default is 10px.
 * @cssprop --task-incomplete-padding - {Length} The padding of a task that is incomplete. Default is 10px.
 * @cssprop --tasks-gap - {Length} The size of the gap between two tasks in a row. Default is 20px.
 *
 * @cssprop --tasks-background-color - {Color} the color of the background where the tasks are rendered.
 * @cssprop --tasks-border - {Length} the border of the area the tasks are rendered. Default is none.
 * @cssprop --tasks-border-radius - {Length} the border radius of the area where the tasks are rendered. Default is none.
 * @cssprop --tasks-padding - {Length} the padding of the are where the tasks are rendered. Default is 12px.
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
    static get styles(): import("lit").CSSResult[];
    /**
     * Strings for localization
     *
     * @readonly
     * @protected
     * @memberof MgtTasks
     */
    protected get strings(): {
        removeTaskSubtitle: string;
        cancelNewTaskSubtitle: string;
        newTaskPlaceholder: string;
        addTaskButtonSubtitle: string;
        due: string;
        addTaskDate: string;
        assign: string;
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
     *
     * @type {boolean}
     */
    readOnly: boolean;
    /**
     * determines which task source is loaded, either planner or todo
     *
     * @type {TasksSource}
     */
    dataSource: TasksSource;
    /**
     * if set, the component will only show tasks from either this plan or group
     *
     * @type {string}
     */
    targetId: string;
    /**
     * if set, the component will only show tasks from this bucket or folder
     *
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
    private _isDarkMode;
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
     * @param {string} name
     * @param {string} oldVal
     * @param {string} newVal
     * @memberof MgtTasks
     */
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    /**
     * clears state of component
     */
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
    protected firstUpdated(changedProperties: PropertyValueMap<unknown>): void;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    protected render(): TemplateResult<1>;
    /**
     * loads tasks from dataSource
     *
     * @returns
     * @memberof MgtTasks
     */
    protected loadState(): Promise<void>;
    private readonly onResize;
    private readonly onThemeChanged;
    private _loadTargetTodoTasks;
    private _loadTargetPlannerTasks;
    private _loadAllTasks;
    private _loadTasksForGroup;
    private addTask;
    private completeTask;
    private uncompleteTask;
    private removeTask;
    private assignPeople;
    private readonly onAddTaskClick;
    private readonly onAddTaskKeyDown;
    private readonly newTaskButtonKeydown;
    private readonly addNewTaskButtonClick;
    private readonly handleNewTaskDateChange;
    private readonly handleSelectedPlan;
    private readonly newTaskVisible;
    private renderPlanOptions;
    private readonly handleDateChange;
    private renderNewTask;
    private togglePeoplePicker;
    private updateAssignedPeople;
    private getPeoplePicker;
    private getMgtPeople;
    private getFlyout;
    private renderTask;
    private handleTaskCheckKeyDown;
    private checkTask;
    private readonly renderPlannerIcon;
    private readonly renderBucketIcon;
    private readonly handlePeopleClick;
    private readonly handlePeopleKeydown;
    private readonly handlePeoplePickerKeydown;
    private renderAssignedPeople;
    private handleTaskClick;
    private renderLoadingTask;
    private getTaskSource;
    private getPlanTitle;
    private getFolderName;
    private isTaskInSelectedGroupFilter;
    private isTaskInSelectedFolderFilter;
    private dateToInputValue;
}
export { ITask };
//# sourceMappingURL=mgt-tasks.d.ts.map