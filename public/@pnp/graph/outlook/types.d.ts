import { _GraphQueryableCollection, _GraphQueryableInstance } from "../graphqueryable.js";
import { OutlookUser as IOutlookType, OutlookCategory as IOutlookCategoryType } from "@microsoft/microsoft-graph-types";
import { IDeleteable, IGetById, IUpdateable } from "../decorators.js";
/**
 * Outlook
 */
export declare class _Outlook extends _GraphQueryableInstance<IOutlookType> {
    get masterCategories(): IMasterCategories;
}
export interface IOutlook extends _Outlook {
}
export declare const Outlook: import("../graphqueryable.js").IGraphInvokableFactory<IOutlook>;
/**
 * Describes an Outlook Category instance
 */
export declare class _OutlookCategory extends _GraphQueryableInstance<IOutlookCategoryType> {
}
export interface IOutlookCategory extends _OutlookCategory, IUpdateable<IOutlookCategoryType>, IDeleteable {
}
export declare const OutlookCategory: import("../graphqueryable.js").IGraphInvokableFactory<IOutlookCategory>;
/**
 * Categories
 */
export declare class _MasterCategories extends _GraphQueryableCollection<IOutlookCategoryType[]> {
    /**
     * Adds a new event to the collection
     *
     * @param properties The set of properties used to create the event
     */
    add(properties: IOutlookCategoryType): Promise<IMasterCategoryAddResult>;
}
export interface IMasterCategories extends _MasterCategories, IGetById<IOutlookCategory> {
}
export declare const MasterCategories: import("../graphqueryable.js").IGraphInvokableFactory<IMasterCategories>;
/**
 * MasterCategoryAddResult
 */
export interface IMasterCategoryAddResult {
    data: IOutlookCategoryType;
}
//# sourceMappingURL=types.d.ts.map