/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { PlannerBucket, PlannerPlan, PlannerTask } from '@microsoft/microsoft-graph-types';
/**
 * async promise, allows developer to create new Planner task
 *
 * @param {(PlannerTask)} newTask
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare function addPlannerTask(graph: IGraph, newTask: PlannerTask): Promise<any>;
/**
 * async promise, allows developer to assign people to task
 *
 * @param {string} taskId
 * @param {*} people
 * @param {string} eTag
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare function assignPeopleToPlannerTask(graph: IGraph, taskId: string, people: any, eTag: string): Promise<any>;
/**
 * async promise, allows developer to remove Planner task associated with taskId
 *
 * @param {string} taskId
 * @param {string} eTag
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare function removePlannerTask(graph: IGraph, taskId: string, eTag: string): Promise<any>;
/**
 * async promise, allows developer to set a task to complete, associated with taskId
 *
 * @param {string} taskId
 * @param {string} eTag
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare function setPlannerTaskComplete(graph: IGraph, taskId: string, eTag: string): Promise<any>;
/**
 * async promise, allows developer to set a task to incomplete, associated with taskId
 *
 * @param {string} taskId
 * @param {string} eTag
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare function setPlannerTaskIncomplete(graph: IGraph, taskId: string, eTag: string): Promise<any>;
/**
 * async promise, allows developer to set details of planner task associated with a taskId
 *
 * @param {string} taskId
 * @param {(PlannerTask)} details
 * @param {string} eTag
 * @returns {Promise<any>}
 * @memberof Graph
 */
export declare function setPlannerTaskDetails(graph: IGraph, taskId: string, details: PlannerTask, eTag: string): Promise<any>;
/**
 * async promise, returns all planner plans associated with the group id
 *
 * @param {string} groupId
 * @returns {(Promise<PlannerPlan[]>)}
 * @memberof Graph
 */
export declare function getPlansForGroup(graph: IGraph, groupId: string): Promise<PlannerPlan[]>;
/**
 * async promise, returns a single plan from the Graph associated with the planId
 *
 * @param {string} planId
 * @returns {(Promise<PlannerPlan>)}
 * @memberof Graph
 */
export declare function getSinglePlannerPlan(graph: IGraph, planId: string): Promise<PlannerPlan>;
/**
 * async promise, returns bucket (for tasks) associated with a planId
 *
 * @param {string} planId
 * @returns {(Promise<PlannerBucket[]>)}
 * @memberof Graph
 */
export declare function getBucketsForPlannerPlan(graph: IGraph, planId: string): Promise<PlannerBucket[]>;
/**
 * async promise, returns all planner plans associated with the user logged in
 *
 * @returns {(Promise<PlannerPlan[]>)}
 * @memberof Graph
 */
export declare function getAllMyPlannerPlans(graph: IGraph): Promise<PlannerPlan[]>;
/**
 * async promise, returns all tasks from planner associated with a bucketId
 *
 * @param {string} bucketId
 * @returns {(Promise<PlannerTask[][]>)}
 * @memberof Graph
 */
export declare function getTasksForPlannerBucket(graph: IGraph, bucketId: string): Promise<PlannerTask[]>;
//# sourceMappingURL=mgt-tasks.graph.planner.d.ts.map