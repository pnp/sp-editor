import { _SPInstance, _SPCollection } from "../spqueryable.js";
/**
 * Describes a collection of Form objects
 *
 */
export declare class _TermStore extends _SPInstance<ITermStoreInfo> {
    /**
     * Gets the term groups associated with this tenant
     */
    get groups(): ITermGroups;
    /**
     * Gets the term sets associated with this tenant
     */
    get sets(): ITermSets;
    /**
     * Allows you to locate terms within the termStore
     *
     * @param params Search parameters used to locate the terms, label is required
     * @returns Array of terms including set information for each term
     */
    searchTerm(params: ISearchTermParams): Promise<Required<Pick<ITermInfo, SearchTermPickedProps>>[]>;
    /**
     * Update settings for TermStore
     *
     * @param props The set or properties to update
     * @returns The updated term store information
     */
    update(props: Partial<Pick<ITermStoreInfo, "defaultLanguageTag" | "languageTags">>): Promise<ITermStoreInfo>;
}
export interface ITermStore extends _TermStore {
}
export declare const TermStore: import("../spqueryable.js").ISPInvokableFactory<ITermStore>;
export declare class _TermGroups extends _SPCollection<ITermGroupInfo[]> {
    /**
     * Gets a term group by id
     *
     * @param id Id of the term group to access
     */
    getById(id: string): ITermGroup;
    /**
     * Adds a new term group to this store
     * @param props The set of properties
     * @returns The information on the create group
     */
    add(props: Partial<Omit<ITermGroupInfo, "id" | "createdDateTime" | "lastModifiedDateTime" | "type">>): Promise<ITermGroupInfo>;
}
export interface ITermGroups extends _TermGroups {
}
export declare const TermGroups: import("../spqueryable.js").ISPInvokableFactory<ITermGroups>;
export declare class _TermGroup extends _SPInstance<ITermGroupInfo> {
    /**
     * Gets the term sets associated with this tenant
     */
    get sets(): ITermSets;
    /**
     * Deletes this group
     *
     * @returns void
     */
    delete(): Promise<void>;
}
export interface ITermGroup extends _TermGroup {
}
export declare const TermGroup: import("../spqueryable.js").ISPInvokableFactory<ITermGroup>;
export declare class _TermSets extends _SPCollection<ITermSetInfo[]> {
    /**
     * Gets a term group by id
     *
     * @param id Id of the term group to access
     */
    getById(id: string): ITermSet;
    /**
     * Adds a new term set to this collection
     * @param props The set of properties
     * @returns The information on the created set
     */
    add(props: Partial<ITermSetCreateParams>): Promise<ITermSetInfo>;
}
export interface ITermSets extends _TermSets {
}
export declare const TermSets: import("../spqueryable.js").ISPInvokableFactory<ITermSets>;
export declare class _TermSet extends _SPInstance<ITermSetInfo> {
    /**
     * Gets all the terms in this set
     */
    get terms(): ITerms;
    get parentGroup(): ITermGroup;
    get children(): IChildren;
    get relations(): IRelations;
    getTermById(id: string): ITerm;
    /**
     * Update settings for TermSet
     *
     * @param props The set or properties to update
     * @returns The updated term set information
     */
    update(props: Partial<Pick<ITermSetInfo, "localizedNames" | "description" | "properties">>): Promise<ITermSetInfo>;
    /**
     * Deletes this group
     *
     * @returns void
     */
    delete(): Promise<void>;
    /**
     * Gets all the terms in this termset in an ordered tree using the appropriate sort ordering
     * ** This is an expensive operation and you should strongly consider caching the results **
     *
     * @param props Optional set of properties controlling how the tree is retrieved.
     */
    getAllChildrenAsOrderedTree(props?: Partial<IGetOrderedTreeProps>): Promise<IOrderedTermInfo[]>;
}
export interface ITermSet extends _TermSet {
}
export declare const TermSet: import("../spqueryable.js").ISPInvokableFactory<ITermSet>;
export declare class _Children extends _SPCollection<ITermInfo[]> {
    /**
     * Adds a new term set to this collection
     * @param props The set of properties
     * @returns The information on the create group
     */
    add(props: Pick<ITermInfo, "labels">): Promise<ITermInfo>;
}
export interface IChildren extends _Children {
}
export declare const Children: import("../spqueryable.js").ISPInvokableFactory<IChildren>;
export declare class _Terms extends _SPCollection<ITermInfo[]> {
    /**
     * Gets a term group by id
     *
     * @param id Id of the term group to access
     */
    getById(id: string): ITerm;
}
export interface ITerms extends _Terms {
}
export declare const Terms: import("../spqueryable.js").ISPInvokableFactory<ITerms>;
export declare class _Term extends _SPInstance<ITermInfo> {
    get children(): IChildren;
    get relations(): IRelations;
    get set(): ITermSet;
    /**
     * Update settings for TermSet
     *
     * @param props The set or properties to update
     * @returns The updated term set information
     */
    update(props: Partial<Pick<ITermInfo, "labels" | "descriptions" | "properties">>): Promise<ITermSetInfo>;
    /**
     * Deletes this group
     *
     * @returns void
     */
    delete(): Promise<void>;
}
export interface ITerm extends _Term {
}
export declare const Term: import("../spqueryable.js").ISPInvokableFactory<ITerm>;
export declare class _Relations extends _SPCollection<IRelationInfo[]> {
    /**
     * Adds a new relation to this term
     * @param props The set of properties
     * @returns The information on the created relation
     */
    add(props: Omit<IRelationCreateInfo, "id">): Promise<IRelationCreateInfo>;
}
export interface IRelations extends _Relations {
}
export declare const Relations: import("../spqueryable.js").ISPInvokableFactory<IRelations>;
export interface ITermStoreInfo {
    id: string;
    name: string;
    defaultLanguageTag: string;
    languageTags: string[];
    administrators?: ITaxonomyUserInfo;
}
export interface ITermGroupInfo {
    id: string;
    description: string;
    name: string;
    displayName: string;
    createdDateTime: string;
    lastModifiedDateTime: string;
    type: string;
    scope: "global" | "system" | "siteCollection";
}
export interface ITermSetInfo {
    id: string;
    localizedNames: {
        name: string;
        languageTag: string;
    }[];
    description: string;
    createdDateTime: string;
    customSortOrder: string[];
    properties?: ITaxonomyProperty[];
    childrenCount: number;
    groupId: string;
    isOpen: boolean;
    isAvailableForTagging: boolean;
    contact: string;
}
export interface ITermSetCreateParams {
    localizedNames: {
        name: string;
        languageTag: string;
    }[];
    description?: string;
    properties?: ITaxonomyProperty[];
    /**
     * When adding a term set using ITermStore.sets parentGroup is required, when adding from ITermGroup.sets parentGroup is not needed
     */
    parentGroup?: {
        id: string;
    };
    isOpen?: boolean;
    isAvailableForTagging?: boolean;
    contact?: string;
}
export interface ITermInfo {
    childrenCount: number;
    id: string;
    labels: {
        name: string;
        isDefault: boolean;
        languageTag: string;
    }[];
    createdDateTime: string;
    customSortOrder?: ITermSortOrderInfo[];
    lastModifiedDateTime: string;
    descriptions: {
        description: string;
        languageTag: string;
    }[];
    properties?: ITaxonomyProperty[];
    localProperties?: ITaxonomyLocalProperty[];
    isDeprecated: boolean;
    isAvailableForTagging: {
        setId: string;
        isAvailable: boolean;
    }[];
    topicRequested?: boolean;
    parent?: ITermInfo;
    set?: ITermSetInfo;
    relations?: IRelationInfo[];
    children?: ITermInfo[];
}
export interface ISearchTermParams {
    /**
     * The term label to search for.
     */
    label: string;
    /**
     * The setId to scope down the search under a termSet.
     */
    setId?: string;
    /**
     * The parentTermId to scope down the search under a termSet, under a parent term.
     */
    parentTermId?: string;
    /**
     * The languageTag to scope down the search to a specific language.
     */
    languageTag?: string;
    /**
     * Indicates what type of string matching should be performed when searching.
     */
    stringMatchOption?: "ExactMatch" | "StartsWith";
}
declare type SearchTermPickedProps = "childrenCount" | "createdDateTime" | "descriptions" | "id" | "isAvailableForTagging" | "isDeprecated" | "labels" | "lastModifiedDateTime" | "set";
export interface ITermSortOrderInfo {
    setId: string;
    order: string[];
}
export interface IOrderedTermInfo extends ITermInfo {
    children: ITermInfo[];
    defaultLabel: string;
}
export interface IRelationInfo {
    id: string;
    relationType: string;
}
export interface IRelationCreateInfo {
    id: string;
    relationship: "pin" | "reuse";
    fromTerm: {
        id: string;
    };
    toTerm: {
        id: string;
    };
    set: {
        id: string;
    };
}
export interface ITaxonomyUserInfo {
    user: {
        displayName: string;
        email: string;
        id: string;
    };
}
export interface ITaxonomyProperty {
    key: string;
    value: string;
}
export interface ITaxonomyLocalProperty {
    setId: string;
    properties: ITaxonomyProperty[];
}
export interface IGetOrderedTreeProps {
    retrieveProperties: boolean;
}
export {};
//# sourceMappingURL=types.d.ts.map