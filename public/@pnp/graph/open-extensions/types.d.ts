import { Extension as ExtensionType } from "@microsoft/microsoft-graph-types";
import { _GraphCollection } from "../graphqueryable.js";
import { IGetById, IDeleteable } from "../decorators.js";
export interface IBaseExtensionData {
    extensionName: string;
}
/**
 * Open Extension
 */
export declare class _OpenExtension extends _GraphCollection<ExtensionType> {
    update<T extends IBaseExtensionData>(extension: T): Promise<any>;
}
export interface IOpenExtension extends _OpenExtension, IDeleteable {
}
export declare const OpenExtension: import("../graphqueryable.js").IGraphInvokableFactory<IOpenExtension>;
/**
 * Open Extensions
 */
export declare class _OpenExtensions extends _GraphCollection<ExtensionType> {
    create<T extends IBaseExtensionData>(extension: T): Promise<any>;
}
export interface IOpenExtensions extends _OpenExtensions, IGetById<IOpenExtension> {
}
export declare const OpenExtensions: import("../graphqueryable.js").IGraphInvokableFactory<IOpenExtensions>;
//# sourceMappingURL=types.d.ts.map