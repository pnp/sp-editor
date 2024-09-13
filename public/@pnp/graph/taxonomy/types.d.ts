import { IAddable, IDeleteable, IGetById, IUpdateable } from "../../graph/decorators.js";
import { _GraphInstance, _GraphCollection } from "../graphqueryable.js";
import { TermStore as ITermStoreType } from "@microsoft/microsoft-graph-types";
/**
 * Describes a collection of Form objects
 *
 */
export declare class _TermStore extends _GraphInstance<ITermStoreType.Store> {
    /**
     * Gets the term groups associated with this tenant
     */
    get groups(): ITermGroups;
    /**
     * Gets the term sets associated with this tenant
     */
    get sets(): ITermSets;
}
export interface ITermStore extends _TermStore, IUpdateable<Partial<Pick<ITermStoreType.Store, "defaultLanguageTag" | "languageTags">>> {
}
export declare const TermStore: import("../graphqueryable.js").IGraphInvokableFactory<ITermStore>;
export declare class _TermGroup extends _GraphInstance<ITermStoreType.Group> {
    /**
     * Gets the term sets associated with this tenant
     */
    get sets(): ITermSets;
}
export interface ITermGroup extends _TermGroup, IDeleteable {
}
export declare const TermGroup: import("../graphqueryable.js").IGraphInvokableFactory<ITermGroup>;
export declare class _TermGroups extends _GraphCollection<ITermStoreType.Group[]> {
}
export interface ITermGroups extends _TermGroups, IAddable<ITermStoreType.Group>, IGetById<ITermGroup> {
}
export declare const TermGroups: import("../graphqueryable.js").IGraphInvokableFactory<ITermGroups>;
export declare class _TermSet extends _GraphInstance<ITermStoreType.Set> {
    /**
     * Gets all the terms in this set
     */
    get terms(): ITerms;
    get children(): IChildren;
    get relations(): IRelations;
    getTermById(id: string): ITerm;
    /**
     * Gets all the direct children of the current termset as a tree, however is not ordered based on the SP sorting info
     *
     * @returns Array of children for this item
     */
    getAllChildrenAsTree(props?: {
        retrieveProperties?: boolean;
    }): Promise<IOrderedTermInfo[]>;
}
export interface ITermSet extends _TermSet, IUpdateable<ITermStoreType.Set>, IDeleteable {
}
export declare const TermSet: import("../graphqueryable.js").IGraphInvokableFactory<ITermSet>;
export declare class _TermSets extends _GraphCollection<ITermStoreType.Set[]> {
}
export interface ITermSets extends _TermSets, IAddable<Partial<ITermStoreType.Set>>, IGetById<ITermSet> {
}
export declare const TermSets: import("../graphqueryable.js").IGraphInvokableFactory<ITermSets>;
export declare class _Children extends _GraphCollection<ITermStoreType.Term[]> {
}
export interface IChildren extends _Children, IAddable<Pick<ITermStoreType.Term, "labels">> {
}
export declare const Children: import("../graphqueryable.js").IGraphInvokableFactory<IChildren>;
export declare class _Term extends _GraphInstance<ITermStoreType.Term> {
    get children(): IChildren;
    get relations(): IRelations;
    get set(): ITermSet;
}
export interface ITerm extends _Term, IUpdateable<Partial<Pick<ITermStoreType.Term, "labels" | "descriptions" | "properties">>>, IDeleteable {
}
export declare const Term: import("../graphqueryable.js").IGraphInvokableFactory<ITerm>;
export declare class _Terms extends _GraphCollection<ITermStoreType.Term[]> {
}
export interface ITerms extends _Terms, IGetById<ITerm> {
}
export declare const Terms: import("../graphqueryable.js").IGraphInvokableFactory<ITerms>;
export declare class _Relations extends _GraphCollection<ITermStoreType.Relation[]> {
}
export interface IRelations extends _Relations, IAddable<Omit<ITermStoreType.Relation, "id">> {
}
export declare const Relations: import("../graphqueryable.js").IGraphInvokableFactory<IRelations>;
export interface IOrderedTermInfo extends ITermStoreType.Term {
    children: ITermStoreType.Term[];
    defaultLabel: string;
}
//# sourceMappingURL=types.d.ts.map