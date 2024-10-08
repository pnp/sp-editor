import { User as IMemberType } from "@microsoft/microsoft-graph-types";
import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { IGetById } from "../decorators.js";
/**
 * Member
 */
export declare class _Member extends _GraphInstance<IMemberType> {
    /**
     * Removes this Member
     */
    remove(): Promise<void>;
}
export interface IMember extends _Member {
}
export declare const Member: import("../graphqueryable.js").IGraphInvokableFactory<IMember>;
/**
 * Members
 */
export declare class _Members extends _GraphCollection<IMemberType[]> {
    /**
     * Use this API to add a member to an Office 365 group, a security group or a mail-enabled security group through
     * the members navigation property. You can add users or other groups.
     * Important: You can add only users to Office 365 groups.
     *
     * @param id Full @odata.id of the directoryObject, user, or group object you want to add (ex: `https://graph.microsoft.com/v1.0/directoryObjects/${id}`)
     */
    add(id: string): Promise<any>;
}
export interface IMembers extends _Members, IGetById<IMember> {
}
export declare const Members: import("../graphqueryable.js").IGraphInvokableFactory<IMembers>;
//# sourceMappingURL=types.d.ts.map