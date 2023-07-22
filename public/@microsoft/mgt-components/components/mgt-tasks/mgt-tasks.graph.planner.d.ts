/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { PlannerAssignments, PlannerBucket, PlannerPlan, PlannerTask } from '@microsoft/microsoft-graph-types';
import { ITask } from './task-sources';
/**
 * async promise, allows developer to create new Planner task
 *
 * @param {IGraph} graph
 * @param {(PlannerTask)} newTask
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare const addPlannerTask: (graph: IGraph, newTask: PlannerTask) => Promise<PlannerTask>;
/**
 * async promise, allows developer to assign people to task
 *
 * @param {IGraph} graph
 * @param {ITask} task
 * @param {PlannerAssignments} people
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare const assignPeopleToPlannerTask: (graph: IGraph, task: ITask, people: PlannerAssignments) => Promise<void>;
/**
 * async promise, allows developer to remove Planner task associated with taskId
 *
 * @param {IGraph} graph
 * @param {ITask} task the task being removed.
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare const removePlannerTask: (graph: IGraph, task: ITask) => Promise<void>;
/**
 * async promise, allows developer to set a task to complete, associated with taskId
 *
 * @param {IGraph} graph
 * @param {ITask} task
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare const setPlannerTaskComplete: (graph: IGraph, task: ITask) => Promise<void>;
/**
 * async promise, allows developer to set a task to incomplete, associated with taskId
 *
 * @param {IGraph} graph
 * @param {ITask} task
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare const setPlannerTaskIncomplete: (graph: IGraph, task: ITask) => Promise<void>;
/**
 * async promise, allows developer to set details of planner task associated with a taskId
 *
 * @param {IGraph} graph
 * @param {ITask} task
 * @param {PlannerTask} details
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare const setPlannerTaskDetails: (graph: IGraph, task: ITask, details: PlannerTask) => Promise<PlannerTask>;
/**
 * async promise, returns all planner plans associated with the group id
 *
 * @param {IGraph} graph
 * @param {string} groupId
 * @returns {(Promise<PlannerPlan[]>)}
 * @memberof Graph
 */
export declare const getPlansForGroup: (graph: IGraph, groupId: string) => Promise<PlannerPlan[]>;
/**
 * async promise, returns a single plan from the Graph associated with the planId
 *
 * @param {IGraph} graph
 * @param {string} planId
 * @returns {(Promise<PlannerPlan>)}
 * @memberof Graph
 */
export declare const getSinglePlannerPlan: (graph: IGraph, planId: string) => Promise<PlannerPlan>;
/**
 * async promise, returns bucket (for tasks) associated with a planId
 *
 * @param {IGraph} graph
 * @param {string} planId
 * @returns {(Promise<PlannerBucket[]>)}
 * @memberof Graph
 */
export declare const getBucketsForPlannerPlan: (graph: IGraph, planId: string) => Promise<PlannerBucket[]>;
/**
 * async promise, returns all planner plans associated with the user logged in
 *
 * @param {IGraph} graph
 * @returns {(Promise<PlannerPlan[]>)}
 * @memberof Graph
 */
export declare const getAllMyPlannerPlans: (graph: IGraph) => Promise<PlannerPlan[]>;
/**
 * async promise, returns all tasks from planner associated with a bucketId
 *
 * @param {IGraph} graph
 * @param {string} bucketId
 * @returns {(Promise<PlannerTask[][]>)}
 * @memberof Graph
 */
export declare const getTasksForPlannerBucket: (graph: IGraph, bucketId: string) => Promise<PlannerTask[]>;
//# sourceMappingURL=mgt-tasks.graph.planner.d.ts.map