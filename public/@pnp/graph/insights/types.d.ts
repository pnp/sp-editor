import { OfficeGraphInsights as IOfficeGraphInsightsType, Trending as ITrendingInsightType, UsedInsight as IUsedInsightType, SharedInsight as ISharedInsightType, Entity as IEntityType } from "@microsoft/microsoft-graph-types";
import { _GraphInstance, _GraphCollection } from "../graphqueryable.js";
import { IGetById } from "../decorators.js";
/**
 * Represents a insights entity
 */
export declare class _Insights extends _GraphInstance<IOfficeGraphInsightsType> {
    get trending(): ITrendingInsights;
    get used(): IUsedInsights;
    get shared(): ISharedInsights;
}
export interface IInsights extends _Insights {
}
export declare const Insights: import("../graphqueryable.js").IGraphInvokableFactory<IInsights>;
/**
 * Describes a Trending Insight instance
 */
export declare class _TrendingInsight extends _GraphInstance<ITrendingInsightType> {
    get resource(): IResource;
}
export interface ITrendingInsight extends _TrendingInsight {
}
export declare const TrendingInsight: import("../graphqueryable.js").IGraphInvokableFactory<ITrendingInsight>;
/**
 * Describes a collection of Trending Insight objects
 *
 */
export declare class _TrendingInsights extends _GraphCollection<ITrendingInsightType[]> {
}
export interface ITrendingInsights extends _TrendingInsights, IGetById<ITrendingInsight> {
}
export declare const TrendingInsights: import("../graphqueryable.js").IGraphInvokableFactory<ITrendingInsights>;
/**
 * Describes a Used Insight instance
 */
export declare class _UsedInsight extends _GraphInstance<IUsedInsightType> {
    get resource(): IResource;
}
export interface IUsedInsight extends _UsedInsight {
}
export declare const UsedInsight: import("../graphqueryable.js").IGraphInvokableFactory<IUsedInsight>;
/**
 * Describes a collection of Used Insight objects
 *
 */
export declare class _UsedInsights extends _GraphCollection<IUsedInsightType[]> {
}
export interface IUsedInsights extends _UsedInsights, IGetById<IUsedInsight> {
}
export declare const UsedInsights: import("../graphqueryable.js").IGraphInvokableFactory<IUsedInsights>;
/**
 * Describes a Shared Insight instance
 */
export declare class _SharedInsight extends _GraphInstance<ISharedInsightType> {
    get resource(): IResource;
}
export interface ISharedInsight extends _SharedInsight {
}
export declare const SharedInsight: import("../graphqueryable.js").IGraphInvokableFactory<ISharedInsight>;
/**
 * Describes a collection of Shared Insight objects
 *
 */
export declare class _SharedInsights extends _GraphCollection<ISharedInsightType[]> {
}
export interface ISharedInsights extends _SharedInsights, IGetById<ISharedInsight> {
}
export declare const SharedInsights: import("../graphqueryable.js").IGraphInvokableFactory<ISharedInsights>;
/**
 * Describes a Resource Entity instance
 */
export declare class _Resource extends _GraphInstance<IEntityType> {
}
export interface IResource extends _Resource {
}
export declare const Resource: import("../graphqueryable.js").IGraphInvokableFactory<IResource>;
//# sourceMappingURL=types.d.ts.map