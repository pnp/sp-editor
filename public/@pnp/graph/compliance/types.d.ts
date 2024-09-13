import { Privacy as IPrivacyType, SubjectRightsRequest as ISubjectRightsRequestType, AuthoredNote as IAuthoredNoteType, ItemBody as ItemBodyType } from "@microsoft/microsoft-graph-types";
import { _GraphCollection, _GraphInstance, _GraphQueryable } from "../graphqueryable.js";
import { IAddable, IGetById, IUpdateable } from "../decorators.js";
/**
 * Compliance
 */
export declare class _Compliance extends _GraphQueryable<IPrivacyType> {
    /**
     * Get subject rights requests
     *
     */
    get subjectRightsRequests(): ISubjectRightsRequests;
}
export interface ICompliance extends _Compliance {
}
export declare const Compliance: import("../graphqueryable.js").IGraphInvokableFactory<ICompliance>;
/**
 * SubjectRightsRequest
 */
export declare class _SubjectRightsRequest extends _GraphInstance<ISubjectRightsRequestType> {
    /**
    * Get the final report for a subject rights request as a Blob
    */
    finalReport(): Promise<Blob>;
    /**
    * Get the final attachment for a subject rights request as a Blob
    */
    finalAttachment(): Promise<Blob>;
    /**
    * Get the list of authored notes assoicated with a subject rights request.
    */
    get notes(): INotes;
}
export interface ISubjectRightsRequest extends _SubjectRightsRequest, IUpdateable<ISubjectRightsRequestType> {
}
export declare const SubjectRightsRequest: import("../graphqueryable.js").IGraphInvokableFactory<ISubjectRightsRequest>;
/**
 * SubjectRightsRequests
 */
export declare class _SubjectRightsRequests extends _GraphCollection<ISubjectRightsRequestType[]> {
}
export interface ISubjectRightsRequests extends _SubjectRightsRequests, IGetById<ISubjectRightsRequest>, IAddable<ISubjectRightsRequestType, ISubjectRightsRequestType> {
}
export declare const SubjectRightsRequests: import("../graphqueryable.js").IGraphInvokableFactory<ISubjectRightsRequests>;
/**
 * Notes
 */
export declare class _Notes extends _GraphCollection<IAuthoredNoteType[]> {
}
export interface INotes extends _Notes, IAddable<ItemBodyType, IAuthoredNoteType> {
}
export declare const Notes: import("../graphqueryable.js").IGraphInvokableFactory<INotes>;
//# sourceMappingURL=types.d.ts.map