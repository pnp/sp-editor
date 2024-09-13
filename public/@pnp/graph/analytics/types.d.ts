import { ItemAnalytics as IItemAnalytics } from "@microsoft/microsoft-graph-types";
export interface IAnalyticsOptions {
    timeRange: "allTime" | "lastSevenDays";
}
export declare function analytics(analyticsOptions?: IAnalyticsOptions): Promise<IItemAnalytics>;
//# sourceMappingURL=types.d.ts.map