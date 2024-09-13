import { Notebook as INotebookType, Onenote as IOnenoteType, OnenoteSection as IOnenoteSectionType, OnenotePage as IOnenotePageType, SectionGroup as ISectionGroupType, RecentNotebook as IRecentNotebookType, Operation as IOperationType, OnenotePatchContentCommand as IOnenotePatchContentCommand } from "@microsoft/microsoft-graph-types";
import { _GraphInstance, _GraphCollection, _GraphQueryable } from "../graphqueryable.js";
import { IDeleteable, IGetById } from "../decorators.js";
type Combine<T, U> = T & U;
/**
 * Represents a onenote entity
 */
export declare class _OneNote extends _GraphInstance<IOnenoteType> {
    get notebooks(): INotebooks;
    get pages(): IPages;
    get resources(): IResources;
    get sections(): Combine<_GraphCollection<IOnenoteSectionType[]>, Omit<ISections, "add">>;
    get sectionGroups(): Combine<_GraphCollection<ISectionGroupType[]>, Omit<ISectionGroups, "add">>;
}
export interface IOneNote extends _OneNote {
}
export declare const OneNote: import("../graphqueryable.js").IGraphInvokableFactory<IOneNote>;
/**
 * Describes a notebook instance
 *
 */
export declare class _Notebook extends _GraphInstance<INotebookType> {
    get sections(): Combine<_GraphCollection<IOnenoteSectionType[]>, Pick<ISections, "add">>;
    get sectionGroups(): Combine<_GraphCollection<ISectionGroupType[]>, Pick<ISectionGroups, "add">>;
    /**
     * Copy notebook
     * @param props of type ICopyProps. groupId (id of group to copy to. Use only when copying to M365 group), renameAs name of the copy.
     */
    copy(props: Pick<ICopyProps, "renameAs" | "groupId">): Promise<IOperationType>;
}
export interface INotebook extends _Notebook {
}
export declare const Notebook: import("../graphqueryable.js").IGraphInvokableFactory<INotebook>;
/**
 * Describes a collection of Notebook objects
 *
 */
export declare class _Notebooks extends _GraphCollection<INotebookType[]> {
    /**
     * Create a new notebook as specified in the request body.
     *
     * @param displayName Notebook display name
     */
    add(displayName: string): Promise<INotebookType>;
    /**
     * Get a list of recent notebooks for the sign-in user
     * @param includePersonalNotebooks Include notebooks owned by the user. Set to true to include notebooks owned by the user; otherwise, set to false.
     */
    recent(includePersonalNotebooks?: boolean): Promise<IRecentNotebookType[]>;
}
export interface INotebooks extends _Notebooks, IGetById<INotebook> {
}
export declare const Notebooks: import("../graphqueryable.js").IGraphInvokableFactory<INotebooks>;
/**
 * Describes a OneNote sections instance
 */
export declare class _Section extends _GraphInstance<IOnenoteSectionType> {
    get pages(): IPages;
    /**
     * Copy section to notebook
     * @param props of type ICopyProps. groupId (id of group to copy to. Use only when copying to M365 group), id of destination  notebook, renameAs name of the copy.
     */
    copyToNotebook(props: ICopyProps): Promise<IOperationType>;
    /**
     * Copy section group
     * @param props of type ICopyProps. groupId (id of group to copy to. Use only when copying to M365 group), id of destination  notebook, renameAs name of the copy.
     */
    copyToSectionGroup(props: ICopyProps): Promise<IOperationType>;
}
export interface ISection extends _Section {
}
export declare const Section: import("../graphqueryable.js").IGraphInvokableFactory<ISection>;
/**
 * Describes a collection of onenote sections objects
 *
 */
export declare class _Sections extends _GraphCollection<IOnenoteSectionType[]> {
    /**
     * Adds a new section
     *
     * @param displayName New section display name
     */
    add(displayName: string): Promise<IOnenoteSectionType>;
}
export interface ISections extends _Sections, IGetById<ISection> {
}
export declare const Sections: import("../graphqueryable.js").IGraphInvokableFactory<ISections>;
/**
 * Describes a root onenote sections group instance
 */
export declare class _SectionGroup extends _GraphInstance<ISectionGroupType> {
    get sections(): ISections;
}
export interface ISectionGroup extends _SectionGroup {
}
export declare const SectionGroup: import("../graphqueryable.js").IGraphInvokableFactory<ISectionGroup>;
/**
 * Describes a collection of Sections objects
 *
 */
export declare class _SectionGroups extends _GraphCollection<ISectionGroupType[]> {
    /**
    * Adds a new section group
    * @param displayName New section group display name
    */
    add(displayName: string): Promise<ISectionGroupType>;
    get sections(): ISections;
}
export interface ISectionGroups extends _SectionGroups, IGetById<ISectionGroup> {
}
export declare const SectionGroups: import("../graphqueryable.js").IGraphInvokableFactory<ISectionGroups>;
/**
 * Describes a page instance
 *
 */
export declare class _Page extends _GraphInstance<IOnenotePageType> {
    /**
     * Copy page to section
     * @param props of type ICopyPageProps. groupId (id of group to copy to. Use only when copying to M365 group), id of destination  notebook
     */
    copyToSection(props: Pick<ICopyProps, "id" | "groupId">): Promise<IOperationType>;
    /**
     * Gets contents of a page
     *
     * @param includeIDs page html body
     */
    content(includeIDs?: boolean): Promise<string>;
    /**
     * Copy page to section
     * @param props of type IOnenotePatchContentCommand.
     */
    update(props: IOnenotePatchContentCommand[]): Promise<void>;
}
export interface IPage extends _Page, IDeleteable {
}
export declare const Page: import("../graphqueryable.js").IGraphInvokableFactory<IPage>;
/**
 * Describes a collection of page objects
 *
 */
export declare class _Pages extends _GraphCollection<IOnenotePageType[]> {
    /**
     * Create a new page as specified in the request body.
     *
     * @param html page html body
     */
    add(html: string): Promise<IOnenotePageType>;
}
export interface IPages extends _Pages, IGetById<IPage> {
}
export declare const Pages: import("../graphqueryable.js").IGraphInvokableFactory<IPages>;
/**
 * Describes a resources
 *
 */
export declare class _Resources extends _GraphInstance {
    /**
     * getById returns a Blob. API does not support getting JSON representation.
     * @param id id of the resource in a OneNote page
     * @returns Blob of the resource from a OneNote page
     */
    getById(id: string): _GraphQueryable;
}
export interface IResources extends _Resources {
}
export declare const Resources: import("../graphqueryable.js").IGraphInvokableFactory<IResources>;
export interface ICopyProps {
    groupId?: string;
    renameAs?: string;
    id: string;
}
export {};
//# sourceMappingURL=types.d.ts.map