import { IDeleteable, IGetById, IUpdateable } from "../decorators.js";
import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { Permission as IPermissionType } from "@microsoft/microsoft-graph-types";
/**
 * Permission
 */
export declare class _Permission extends _GraphInstance<IPermissionType> {
}
export interface IPermission extends _Permission, IUpdateable<Partial<IPermissionType>>, IDeleteable {
}
export declare const Permission: import("../graphqueryable.js").IGraphInvokableFactory<IPermission>;
/**
 * Permissions
 */
export declare class _Permissions extends _GraphCollection<IPermissionType[]> {
}
export interface IPermissions extends _Permissions, IGetById<IPermission> {
}
export declare const Permissions: import("../graphqueryable.js").IGraphInvokableFactory<IPermissions>;
//# sourceMappingURL=types.d.ts.map