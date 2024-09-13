import { _GraphInstance } from "../graphqueryable.js";
import { IUpdateable } from "../decorators.js";
import { SharepointSettings as ISharePointSettingsType } from "@microsoft/microsoft-graph-types";
export declare class _SharePointAdmin extends _GraphInstance<ISharePointAdmin> {
    get settings(): ISharePointSettings;
}
export interface ISharePointAdmin extends _SharePointAdmin {
    readonly settings: ISharePointSettings;
}
export declare const SharePointAdmin: import("../graphqueryable.js").IGraphInvokableFactory<ISharePointAdmin>;
/**
 * SharePoint Tenant Settings
 */
export declare class _SharePointSettings extends _GraphInstance<ISharePointSettingsType> {
}
export interface ISharePointSettings extends _SharePointSettings, IUpdateable<ISharePointSettingsType> {
}
export declare const SharePointSettings: import("../graphqueryable.js").IGraphInvokableFactory<ISharePointSettings>;
//# sourceMappingURL=sharepoint.d.ts.map