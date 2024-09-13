import { IPlanner } from "./types.js";
import "./groups.js";
import "./users.js";
export { Bucket, Buckets, IBucket, IBuckets, IPlan, IPlanAdd, IPlanner, IPlans, ITask, ITasks, ITaskDetails, Plan, Planner, Plans, Task, Tasks, TaskDetails, PlanDetails, } from "./types.js";
declare module "../fi" {
    interface GraphFI {
        readonly planner: IPlanner;
    }
}
//# sourceMappingURL=index.d.ts.map