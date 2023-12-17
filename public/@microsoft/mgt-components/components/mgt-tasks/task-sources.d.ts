/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { PlannerAssignments, PlannerBucket, PlannerPlan } from '@microsoft/microsoft-graph-types';
import { OutlookTask, OutlookTaskFolder, OutlookTaskGroup, PlannerTask } from '@microsoft/microsoft-graph-types-beta';
/**
 * ITask
 *
 * @export
 * @interface ITask
 */
export interface ITask {
    /**
     * id
     *
     * @type {string}
     * @memberof ITask
     */
    id: string;
    /**
     * name
     *
     * @type {string}
     * @memberof ITask
     */
    name: string;
    /**
     * task dueDate
     *
     * @type {Date}
     * @memberof ITask
     */
    dueDate: Date;
    /**
     * is task completed
     *
     * @type {boolean}
     * @memberof ITask
     */
    completed: boolean;
    /**
     * task topParentId
     *
     * @type {string}
     * @memberof ITask
     */
    topParentId: string;
    /**
     * task's immediate parent task id
     *
     * @type {string}
     * @memberof ITask
     */
    immediateParentId: string;
    /**
     * assignments
     *
     * @type {PlannerAssignments}
     * @memberof ITask
     */
    assignments: PlannerAssignments;
    /**
     * eTag
     *
     * @type {string}
     * @memberof ITask
     */
    eTag: string;
    /**
     * raw
     *
     * @type {PlannerTask | OutlookTask}
     * @memberof ITask
     */
    _raw?: PlannerTask | OutlookTask;
}
/**
 * container for tasks
 *
 * @export
 * @interface ITaskFolder
 */
export interface ITaskFolder {
    /**
     * id
     *
     * @type {string}
     * @memberof ITaskFolder
     */
    id: string;
    /**
     * name
     *
     * @type {string}
     * @memberof ITaskFolder
     */
    name: string;
    /**
     * parentId
     *
     * @type {string}
     * @memberof ITaskFolder
     */
    parentId: string;
    /**
     * raw
     *
     * @type {*}
     * @memberof ITaskFolder
     */
    _raw?: PlannerBucket | OutlookTaskFolder;
}
/**
 * container for folders
 *
 * @export
 * @interface ITaskGroup
 */
export interface ITaskGroup {
    /**
     * string
     *
     * @type {string}
     * @memberof ITaskGroup
     */
    id: string;
    /**
     * secondaryId
     *
     * @type {string}
     * @memberof ITaskGroup
     */
    secondaryId?: string;
    /**
     * title
     *
     * @type {string}
     * @memberof ITaskGroup
     */
    title: string;
    /**
     * raw
     *
     * @type {*}
     * @memberof ITaskGroup
     */
    _raw?: PlannerPlan | OutlookTaskGroup;
    /**
     * Plan Container ID. Same as the group ID of the group in the plan.
     *
     * @type {string}
     * @memberof ITaskGroup
     */
    containerId?: string;
}
/**
 * A common interface for both planner and todo tasks
 *
 * @export
 * @interface ITaskSource
 */
export interface ITaskSource {
    /**
     * Promise that returns task collections for the signed in user
     *
     * @returns {Promise<ITaskGroup[]>}
     * @memberof ITaskSource
     */
    getTaskGroups(): Promise<ITaskGroup[]>;
    /**
     * Promise that returns task collections for group id
     *
     * @returns {Promise<ITaskGroup[]>}
     * @memberof ITaskSource
     */
    getTaskGroupsForGroup(id: string): Promise<ITaskGroup[]>;
    /**
     * Promise that returns a single task collection by collection id
     *
     * @param {string} id
     * @returns {Promise<ITaskGroup>}
     * @memberof ITaskSource
     */
    getTaskGroup(id: string): Promise<ITaskGroup>;
    /**
     * Promise that returns all task groups in task collection
     *
     * @param {string} id
     * @returns {Promise<ITaskFolder[]>}
     * @memberof ITaskSource
     */
    getTaskFoldersForTaskGroup(id: string): Promise<ITaskFolder[]>;
    /**
     * Promise that returns all tasks in task group
     *
     * @param {string} id
     * @param {string} parId
     * @returns {Promise<ITask[]>}
     * @memberof ITaskSource
     */
    getTasksForTaskFolder(id: string, parId: string): Promise<ITask[]>;
    /**
     * Promise that completes a single task
     *
     * @param {ITask} task
     * @returns {Promise<any>}
     * @memberof ITaskSource
     */
    setTaskComplete(task: ITask): Promise<void>;
    /**
     * Promise that sets a task to incomplete
     *
     * @param {ITask} task
     * @returns {Promise<any>}
     * @memberof ITaskSource
     */
    setTaskIncomplete(task: ITask): Promise<void>;
    /**
     * Promise to add a new task
     *
     * @param {ITask} newTask
     * @returns {Promise<any>}
     * @memberof ITaskSource
     */
    addTask(newTask: ITask): Promise<PlannerTask | OutlookTask>;
    /**
     * assign id's to task
     *
     * @param {ITask} task
     * @param {PlannerAssignments} people
     * @returns {Promise<any>}
     * @memberof ITaskSource
     */
    assignPeopleToTask(task: ITask, people: PlannerAssignments): Promise<void>;
    /**
     * Promise to delete a task by id
     *
     * @param {ITask} task
     * @returns {Promise<any>}
     * @memberof ITaskSource
     */
    removeTask(task: ITask): Promise<void>;
    /**
     * assigns task to the current signed in user
     *
     * @param {ITask} task
     * @param {string} myId
     * @returns {Boolean}
     * @memberof ITaskSource
     */
    isAssignedToMe(task: ITask, myId: string): boolean;
}
/**
 * async method to get user details
 *
 * @class TaskSourceBase
 */
declare class TaskSourceBase {
    /**
     * the IGraph instance to use for making Graph requests
     *
     * @type {IGraph}
     * @memberof TaskSourceBase
     */
    graph: IGraph;
    constructor(graph: IGraph);
}
/**
 * Create Planner
 *
 * @export
 * @class PlannerTaskSource
 * @extends {TaskSourceBase}
 * @implements {ITaskSource}
 */
export declare class PlannerTaskSource extends TaskSourceBase implements ITaskSource {
    /**
     * returns promise with all of users plans
     *
     * @returns {Promise<ITaskGroup[]>}
     * @memberof PlannerTaskSource
     */
    getTaskGroups(): Promise<ITaskGroup[]>;
    /**
     * returns promise with all of plans for group id
     *
     * @param {string} id
     * @returns {Promise<ITaskGroup[]>}
     * @memberof PlannerTaskSource
     */
    getTaskGroupsForGroup(id: string): Promise<ITaskGroup[]>;
    /**
     * returns promise single TaskGroup or plan from plan.id
     *
     * @param {string} id
     * @returns {Promise<ITaskGroup>}
     * @memberof PlannerTaskSource
     */
    getTaskGroup(id: string): Promise<ITaskGroup>;
    /**
     * returns promise with Bucket for a plan from bucket.id
     *
     * @param {string} id
     * @returns {Promise<ITaskFolder[]>}
     * @memberof PlannerTaskSource
     */
    getTaskFoldersForTaskGroup(id: string): Promise<ITaskFolder[]>;
    /**
     * get all task from a Bucket given task id
     *
     * @param {string} id
     * @returns {Promise<ITask[]>}
     * @memberof PlannerTaskSource
     */
    getTasksForTaskFolder(id: string): Promise<ITask[]>;
    /**
     * set task in planner to complete state by id
     *
     * @param {ITask} task
     * @returns {Promise<any>}
     * @memberof PlannerTaskSource
     */
    setTaskComplete(task: ITask): Promise<void>;
    /**
     * set task in planner to incomplete state by id
     *
     * @param {ITask} task
     * @returns {Promise<any>}
     * @memberof PlannerTaskSource
     */
    setTaskIncomplete(task: ITask): Promise<void>;
    /**
     * add new task to bucket
     *
     * @param {ITask} newTask
     * @returns {Promise<any>}
     * @memberof PlannerTaskSource
     */
    addTask(newTask: ITask): Promise<PlannerTask>;
    /**
     * Assigns people to task
     *
     * @param {ITask} task
     * @param {PlannerAssignments} people
     * @returns {Promise<any>}
     * @memberof PlannerTaskSource
     */
    assignPeopleToTask(task: ITask, people: PlannerAssignments): Promise<void>;
    /**
     * remove task from bucket
     *
     * @param {ITask} task
     * @returns {Promise<any>}
     * @memberof PlannerTaskSource
     */
    removeTask(task: ITask): Promise<void>;
    /**
     * assigns task to the signed in user
     *
     * @param {ITask} task
     * @param {string} myId
     * @returns {boolean}
     * @memberof PlannerTaskSource
     */
    isAssignedToMe(task: ITask, myId: string): boolean;
}
/**
 * determins outlook task group for data source
 *
 * @export
 * @class TodoTaskSource
 * @extends {TaskSourceBase}
 * @implements {ITaskSource}
 */
export declare class TodoTaskSource extends TaskSourceBase implements ITaskSource {
    /**
     * get all Outlook task groups
     *
     * @returns {Promise<ITaskGroup[]>}
     * @memberof TodoTaskSource
     */
    getTaskGroups(): Promise<ITaskGroup[]>;
    /**
     * get a single OutlookTaskGroup from id
     *
     * @param {string} id
     * @returns {Promise<ITaskGroup>}
     * @memberof TodoTaskSource
     */
    getTaskGroup(id: string): Promise<ITaskGroup>;
    /**
     * get all OutlookTaskFolder for group by id
     *
     * @param {string} id
     * @returns {Promise<ITaskFolder[]>}
     * @memberof TodoTaskSource
     */
    getTaskFoldersForTaskGroup(id: string): Promise<ITaskFolder[]>;
    /**
     * gets all tasks for OutLook Task Folder by id
     *
     * @param {string} id
     * @param {string} parId
     * @returns {Promise<ITask[]>}
     * @memberof TodoTaskSource
     */
    getTasksForTaskFolder(id: string, parId: string): Promise<ITask[]>;
    /**
     * set task in todo to complete state by id
     *
     * @param {ITask} task
     * @returns {Promise<any>}
     * @memberof TodoTaskSource
     */
    setTaskComplete(task: ITask): Promise<void>;
    /**
     * Assigns people to task in a planner
     *
     * @param {ITask} task
     * @param {PlannerAssignments} people
     * @returns {Promise<any>}
     * @memberof PlannerTaskSource
     */
    assignPeopleToTask(task: ITask, people: PlannerAssignments): Promise<void>;
    /**
     * set task in planner to incomplete state by id
     *
     * @param {ITask} task
     * @returns {Promise<any>}
     * @memberof TodoTaskSource
     */
    setTaskIncomplete(task: ITask): Promise<void>;
    /**
     * add new task to planner
     *
     * @param {ITask} newTask
     * @returns {Promise<any>}
     * @memberof TodoTaskSource
     */
    addTask(newTask: ITask): Promise<OutlookTask>;
    /**
     * remove task from todo by id
     *
     * @param {ITask} task
     * @returns {Promise<any>}
     * @memberof TodoTaskSource
     */
    removeTask(task: ITask): Promise<void>;
    /**
     * if task is assigned in to user logged in
     *
     * @param {ITask} task
     * @param {string} myId
     * @returns {boolean}
     * @memberof TodoTaskSource
     */
    isAssignedToMe(task: ITask, myId: string): boolean;
    /**
     * returns promise with all of plans for group id
     *
     * @param {string} id
     * @returns {Promise<ITaskGroup[]>}
     * @memberof PlannerTaskSource
     */
    getTaskGroupsForGroup(_id: string): Promise<ITaskGroup[]>;
}
export {};
//# sourceMappingURL=task-sources.d.ts.map