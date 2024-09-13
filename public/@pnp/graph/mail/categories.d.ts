import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { OutlookUser as IOutlookType, OutlookCategory as IOutlookCategoryType } from "@microsoft/microsoft-graph-types";
import { IAddable, IDeleteable, IGetById, IUpdateable } from "../decorators.js";
/**
 * Outlook
 */
export declare class _Outlook extends _GraphInstance<IOutlookType> {
    get masterCategories(): IMasterCategories;
}
export interface IOutlook extends _Outlook {
}
export declare const Outlook: import("../graphqueryable.js").IGraphInvokableFactory<IOutlook>;
/**
 * Describes an Outlook Category instance
 */
export declare class _OutlookCategory extends _GraphInstance<IOutlookCategoryType> {
}
export interface IOutlookCategory extends _OutlookCategory, IUpdateable<IOutlookCategoryType>, IDeleteable {
}
export declare const OutlookCategory: import("../graphqueryable.js").IGraphInvokableFactory<IOutlookCategory>;
/**
 * Categories
 */
export declare class _MasterCategories extends _GraphCollection<IOutlookCategoryType[]> {
}
export interface IMasterCategories extends _MasterCategories, IGetById<IOutlookCategory>, IAddable<IOutlookCategoryType> {
}
export declare const MasterCategories: import("../graphqueryable.js").IGraphInvokableFactory<IMasterCategories>;
/**
 * MasterCategoryAddResult
 */
export interface IMasterCategoryAddResult {
    data: IOutlookCategoryType;
}
//# sourceMappingURL=categories.d.ts.map