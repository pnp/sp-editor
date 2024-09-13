import { IAnalyticsOptions } from "./types.js";
import { ItemAnalytics as IItemAnalytics } from "@microsoft/microsoft-graph-types";
declare module "../list-item/types" {
    interface _ListItem {
        analytics(analyticsOptions?: IAnalyticsOptions): Promise<IItemAnalytics>;
    }
    interface ListItem {
        analytics(analyticsOptions?: IAnalyticsOptions): Promise<IItemAnalytics>;
    }
}
//# sourceMappingURL=listItems.d.ts.map