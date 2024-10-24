import { _SPCollection, _SPInstance, IDeleteable } from "../spqueryable.js";
export declare class _Views extends _SPCollection<IViewInfo[]> {
    /**
     * Adds a new view to the collection
     *
     * @param title The new views's title
     * @param personalView True if this is a personal view, otherwise false, default = false
     * @param additionalSettings Will be passed as part of the view creation body
     */
    add(Title: string, PersonalView?: boolean, additionalSettings?: Record<string, any>): Promise<IViewInfo>;
    /**
     * Gets a view by guid id
     *
     * @param id The GUID id of the view
     */
    getById(id: string): IView;
    /**
     * Gets a view by title (case-sensitive)
     *
     * @param title The case-sensitive title of the view
     */
    getByTitle(title: string): IView;
}
export interface IViews extends _Views {
}
export declare const Views: import("../spqueryable.js").ISPInvokableFactory<IViews>;
export declare class _View extends _SPInstance<IViewInfo> {
    delete: (this: import("../spqueryable.js").ISPQueryable<any>) => Promise<void>;
    get fields(): IViewFields;
    /**
     * Updates this view intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the view
     */
    update(props: Partial<IViewInfo>): Promise<IViewInfo>;
    /**
     * Returns the list view as HTML.
     *
     */
    renderAsHtml(): Promise<string>;
    /**
     * Sets the view schema
     *
     * @param viewXml The view XML to set
     */
    setViewXml(viewXml: string): Promise<void>;
}
export interface IView extends _View, IDeleteable {
}
export declare const View: import("../spqueryable.js").ISPInvokableFactory<IView>;
export declare class _ViewFields extends _SPCollection<{
    Items: string[];
    SchemaXml: string;
}> {
    /**
     * Gets a value that specifies the XML schema that represents the collection.
     */
    getSchemaXml(): Promise<string>;
    /**
     * Adds the field with the specified field internal name or display name to the collection.
     *
     * @param fieldTitleOrInternalName The case-sensitive internal name or display name of the field to add.
     */
    add(fieldTitleOrInternalName: string): Promise<void>;
    /**
     * Moves the field with the specified field internal name to the specified position in the collection.
     *
     * @param field The case-sensitive internal name of the field to move.
     * @param index The zero-based index of the new position for the field.
     */
    move(field: string, index: number): Promise<void>;
    /**
     * Removes all the fields from the collection.
     */
    removeAll(): Promise<void>;
    /**
     * Removes the field with the specified field internal name from the collection.
     *
     * @param fieldInternalName The case-sensitive internal name of the field to remove from the view.
     */
    remove(fieldInternalName: string): Promise<void>;
}
export interface IViewFields extends _ViewFields {
}
export declare const ViewFields: import("../spqueryable.js").ISPInvokableFactory<IViewFields>;
export declare enum ViewScope {
    DefaultValue = 0,
    Recursive = 1,
    RecursiveAll = 2,
    FilesOnly = 3
}
export interface IViewInfo {
    AssociatedContentTypeId: string | null;
    CalendarViewStyles: string | null;
    CustomFormatter: string | null;
    DefaultView: boolean;
    DefaultViewForContentType: boolean;
    EditorModified: boolean;
    Formats: string | null;
    Hidden: boolean;
    HtmlSchemaXml: string;
    Id: string;
    ImageUrl: string;
    IncludeRootFolder: boolean;
    JSLink: string;
    ListViewXml: string;
    Method: string | null;
    MobileDefaultView: boolean;
    MobileView: boolean;
    ModerationType: string | null;
    NewDocumentTemplates: string;
    OrderedView: boolean;
    Paged: boolean;
    PersonalView: boolean;
    ReadOnlyView: boolean;
    RequiresClientIntegration: boolean;
    RowLimit: number;
    Scope: ViewScope;
    ServerRelativePath: {
        DecodedUrl: string;
    };
    ServerRelativeUrl: string;
    StyleId: string | null;
    TabularView: boolean;
    Threaded: boolean;
    Title: string;
    Toolbar: string;
    ToolbarTemplateName: string | null;
    ViewData: string | null;
    ViewJoins: string | null;
    ViewProjectedFields: {
        SchemaXml: string;
    } | null;
    ViewQuery: string;
    ViewType: string;
    ViewType2: "KANBAN" | "TILES" | "COMPACTLIST" | "MODERNCALENDAR" | null;
    VisualizationInfo: any | null;
}
//# sourceMappingURL=types.d.ts.map