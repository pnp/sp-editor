import { IAnalyticsOptions } from "./types.js";
import { ItemAnalytics as IItemAnalytics } from "@microsoft/microsoft-graph-types";
declare module "../files/types" {
    interface _DriveItem {
        analytics(analyticsOptions?: IAnalyticsOptions): Promise<IItemAnalytics>;
    }
    interface DriveItem {
        analytics(analyticsOptions?: IAnalyticsOptions): Promise<IItemAnalytics>;
    }
}
//# sourceMappingURL=driveItems.d.ts.map