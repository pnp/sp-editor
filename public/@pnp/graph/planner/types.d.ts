import { PlannerPlan as IPlannerPlanType, PlannerPlanDetails as IPlannerPlanDetailsType, PlannerTask as IPlannerTaskType, PlannerTaskDetails as IPlannerTaskDetailsType, PlannerBucket as IPlannerBucketType, Planner as IPlannerType, PlannerPlanContainer as IPlannerPlanContainerType, PlannerAssignedToTaskBoardTaskFormat as IPlannerAssignedToTaskBoardTaskFormatType, PlannerBucketTaskBoardTaskFormat as IPlannerBucketTaskBoardTaskFormatType, PlannerProgressTaskBoardTaskFormat as IPlannerProgressTaskBoardTaskFormatType } from "@microsoft/microsoft-graph-types";
import { _GraphInstance, _GraphCollection } from "../graphqueryable.js";
import { IGetById, IDeleteableWithETag, IUpdateableWithETag, IAddable } from "../decorators.js";
/**
 * Planner
 */
export declare class _Planner extends _GraphInstance<IPlannerType> {
    get plans(): IPlans;
    get tasks(): ITasks;
    get buckets(): IBuckets;
}
export interface IPlanner extends _Planner {
}
export declare const Planner: import("../graphqueryable.js").IGraphInvokableFactory<IPlanner>;
/**
 * Details
 */
export declare class _PlanDetails extends _GraphInstance<IPlannerPlanDetailsType> {
}
export interface IPlanDetails extends _PlanDetails, IUpdateableWithETag<IPlannerPlanDetailsType> {
}
export declare const PlanDetails: import("../graphqueryable.js").IGraphInvokableFactory<IPlanDetails>;
/**
 * Plan
 */
export declare class _Plan extends _GraphInstance<IPlannerPlanType> {
    get tasks(): ITasks;
    get buckets(): IBuckets;
    get details(): IPlanDetails;
}
export interface IPlan extends _Plan, IUpdateableWithETag<IPlannerPlanType>, IDeleteableWithETag {
}
export declare const Plan: import("../graphqueryable.js").IGraphInvokableFactory<IPlan>;
export declare class _Plans extends _GraphCollection<IPlannerPlanType[]> {
}
export interface IPlans extends _Plans, IGetById<IPlan>, IAddable<IPlanAdd, IPlannerPlanType> {
}
export declare const Plans: import("../graphqueryable.js").IGraphInvokableFactory<IPlans>;
/**
 * Details
 */
export declare class _TaskDetails extends _GraphInstance<IPlannerTaskDetailsType> {
}
export interface ITaskDetails extends _TaskDetails, IUpdateableWithETag<IPlannerTaskDetailsType> {
}
export declare const TaskDetails: import("../graphqueryable.js").IGraphInvokableFactory<ITaskDetails>;
/**
 * AssignedToTaskBoardFormat
 */
export declare class _AssignedToTaskBoardFormat extends _GraphInstance<IPlannerAssignedToTaskBoardTaskFormatType> {
}
export interface IAssignedToTaskBoardFormat extends _AssignedToTaskBoardFormat, IUpdateableWithETag<IPlannerAssignedToTaskBoardTaskFormatType> {
}
export declare const AssignedToTaskBoardFormat: import("../graphqueryable.js").IGraphInvokableFactory<IAssignedToTaskBoardFormat>;
/**
 * BucketTaskBoardFormat
 */
export declare class _BucketTaskBoardFormat extends _GraphInstance<IPlannerBucketTaskBoardTaskFormatType> {
}
export interface IBucketTaskBoardFormat extends _BucketTaskBoardFormat, IUpdateableWithETag<IPlannerBucketTaskBoardTaskFormatType> {
}
export declare const BucketTaskBoardFormat: import("../graphqueryable.js").IGraphInvokableFactory<IBucketTaskBoardFormat>;
/**
 * ProgressTaskBoardFormat
 */
export declare class _ProgressTaskBoardFormat extends _GraphInstance<IPlannerProgressTaskBoardTaskFormatType> {
}
export interface IProgressTaskBoardFormat extends _ProgressTaskBoardFormat, IUpdateableWithETag<IPlannerProgressTaskBoardTaskFormatType> {
}
export declare const ProgressTaskBoardFormat: import("../graphqueryable.js").IGraphInvokableFactory<IProgressTaskBoardFormat>;
/**
 * Task
 */
export declare class _Task extends _GraphInstance<IPlannerTaskType> {
    get details(): ITaskDetails;
    get assignedToTaskBoardFormat(): IAssignedToTaskBoardFormat;
    get bucketTaskBoardFormat(): IBucketTaskBoardFormat;
    get progressTaskBoardFormat(): IProgressTaskBoardFormat;
}
export interface ITask extends _Task, IUpdateableWithETag<IPlannerTaskType>, IDeleteableWithETag {
}
export declare const Task: import("../graphqueryable.js").IGraphInvokableFactory<ITask>;
/**
 * Tasks
 */
export declare class _Tasks extends _GraphCollection<IPlannerTaskType[]> {
}
export interface ITasks extends _Tasks, IGetById<ITask>, IAddable<IPlannerTaskType, IPlannerTaskType> {
}
export declare const Tasks: import("../graphqueryable.js").IGraphInvokableFactory<ITasks>;
/**
 * Bucket
 */
export declare class _Bucket extends _GraphInstance<IPlannerBucketType> {
    get tasks(): ITasks;
}
export interface IBucket extends _Bucket, IUpdateableWithETag<IPlannerBucketType>, IDeleteableWithETag {
}
export declare const Bucket: import("../graphqueryable.js").IGraphInvokableFactory<IBucket>;
/**
 * Buckets
 */
export declare class _Buckets extends _GraphCollection<IPlannerBucketType[]> {
}
export interface IBuckets extends _Buckets, IGetById<IBucket>, IAddable<IPlannerBucketType, IPlannerBucketType> {
}
export declare const Buckets: import("../graphqueryable.js").IGraphInvokableFactory<IBuckets>;
export interface IPlanAdd {
    container: IPlannerPlanContainerType;
    title: string;
}
//# sourceMappingURL=types.d.ts.map