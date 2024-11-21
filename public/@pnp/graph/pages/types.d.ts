import { IDeleteable, IGetById, IUpdateable } from "../decorators.js";
import { _GraphCollection, _GraphInstance, GraphInit } from "../graphqueryable.js";
import { ValidWebpart } from "./webpart-types.js";
/**
 * Page
 */
export declare class _Page extends _GraphInstance<IPageInfo> {
}
export interface IPage extends _Page, IUpdateable<Partial<IPageInfo>>, IDeleteable {
}
export declare const Page: import("../graphqueryable.js").IGraphInvokableFactory<IPage>;
/**
 * Pages
 */
export declare class _Pages extends _GraphCollection<IPageInfo[]> {
    get sitePages(): ISitePages;
}
export interface IPages extends _Pages, IGetById<IPage> {
}
export declare const Pages: import("../graphqueryable.js").IGraphInvokableFactory<IPages>;
/**
 * Site Page
 */
export declare class _SitePage extends _GraphInstance<ISitePageInfo> {
    /**
     * Publishes the page
     * @returns void
     */
    publish(): Promise<void>;
    /**
     * Gets the webparts in the page
     *
     * @returns array fo webpart information
     */
    getWebPartsByPosition(): Promise<any>;
    /**
     * Get a listing of all the webparts in this page
     */
    get webparts(): IWebparts;
    /**
     * Gets the set of horizontal sections
     */
    get horizontalSections(): IHorizontalSections;
    /**
     * Gets the set of vertical section
     */
    get verticalSection(): IVerticalSection;
    /**
     * Creates a vertical section if none exists, returns the vertical section
     */
    ensureVerticalSection(): IVerticalSection;
}
export interface ISitePage extends _SitePage, IUpdateable<Partial<ISitePageInfo>>, IDeleteable {
}
export declare const SitePage: import("../graphqueryable.js").IGraphInvokableFactory<ISitePage>;
/**
 * Site Pages
 */
export declare class _SitePages extends _GraphCollection<ISitePageInfo[]> {
    private _pages;
    constructor(base: GraphInit, path?: string);
    getById(this: ISitePages, id: string): ISitePage;
    add(pageInfo: Partial<Omit<ISitePageInfo, "@odata.type">>): Promise<ISitePageInfo>;
}
export interface ISitePages extends _SitePages {
}
export declare const SitePages: import("../graphqueryable.js").IGraphInvokableFactory<ISitePages>;
export declare class _HorizontalSection extends _GraphInstance<IHorizontalSectionInfo> {
    get columns(): IHorizontalSectionColumns;
}
export interface IHorizontalSection extends _HorizontalSection, IUpdateable, IDeleteable {
}
export declare const HorizontalSection: import("../graphqueryable.js").IGraphInvokableFactory<IHorizontalSection>;
export declare class _HorizontalSections extends _GraphCollection<IHorizontalSectionInfo[]> {
    add(props: Partial<IHorizontalSectionInfo>): Promise<IHorizontalSectionInfo>;
    getById(id: string | number): IHorizontalSection;
}
export interface IHorizontalSections extends _HorizontalSections, IGetById<IHorizontalSection, string | number> {
}
export declare const HorizontalSections: import("../graphqueryable.js").IGraphInvokableFactory<IHorizontalSections>;
export declare class _HorizontalSectionColumn extends _GraphInstance<IHorizontalSectionColumnInfo> {
    get webparts(): IWebparts;
}
export interface IHorizontalSectionColumn extends _HorizontalSectionColumn {
}
export declare const HorizontalSectionColumn: import("../graphqueryable.js").IGraphInvokableFactory<IHorizontalSectionColumn>;
export declare class _HorizontalSectionColumns extends _GraphCollection<IHorizontalSectionColumnInfo[]> {
    getById(id: string | number): IHorizontalSectionColumn;
}
export interface IHorizontalSectionColumns extends _HorizontalSectionColumns, IGetById<IHorizontalSectionColumn, string | number> {
}
export declare const HorizontalSectionColumns: import("../graphqueryable.js").IGraphInvokableFactory<IHorizontalSectionColumns>;
export declare class _VerticalSection extends _GraphInstance<IVerticalSectionInfo> {
    /**
     * Get a listing of all the webparts in this vertical section
     */
    get webparts(): IWebparts;
}
export interface IVerticalSection extends _VerticalSection, IUpdateable, IDeleteable {
}
export declare const VerticalSection: import("../graphqueryable.js").IGraphInvokableFactory<IVerticalSection>;
export declare class _Webpart extends _GraphInstance<ValidWebpart> {
}
export interface IWebpart extends _Webpart {
}
export declare const Webpart: import("../graphqueryable.js").IGraphInvokableFactory<IWebpart>;
export declare class _Webparts extends _GraphCollection<ValidWebpart[]> {
    /**
     * Gets the webpart information by id from the page's collection
     * @param id string id of the webpart
     * @returns The IWebpart instance
     */
    getById(id: string): IWebpart;
}
export interface IWebparts extends _Webparts, IGetById<IWebpart> {
}
export declare const Webparts: import("../graphqueryable.js").IGraphInvokableFactory<IWebparts>;
/**
 * Contains info representing a vertical section
 */
export interface IVerticalSectionInfo {
    emphasis: "none" | "netural" | "soft" | "strong" | "unknownFutureValue";
    id: string;
}
/**
 * Contains info representing a horizontal section
 */
export interface IHorizontalSectionInfo {
    emphasis: "none" | "netural" | "soft" | "strong" | "unknownFutureValue";
    id: string;
    layout: "none" | "oneColumn" | "twoColumns" | "threeColumns" | "oneThirdLeftColumn" | "oneThirdRightColumn" | "fullWidth" | "unknownFutureValue";
    columns: IHorizontalSectionColumnInfo[];
}
/**
 * Contains info representing a horizontal section column
 */
export interface IHorizontalSectionColumnInfo {
    id: string;
    width: string;
    webparts: any[];
}
/**
 * Contains info representing a path user
 */
export interface IPageUserInfo {
    displayName: string;
    email?: string;
}
export interface ISitePageInfo extends IPageInfo {
}
export interface IPageInfo {
    "@odata.type"?: string;
    "@odata.etag"?: string;
    contentType: {
        id: string;
        name: string;
    };
    createdDateTime: string;
    eTag: string;
    id: string;
    createdBy: {
        user: IPageUserInfo;
    };
    lastModifiedBy: {
        user: IPageUserInfo;
    };
    lastModifiedDateTime: string;
    name: string;
    pageLayout: string;
    parentReference: {
        siteId: string;
    };
    promotionKind: string;
    publishingState: {
        level: string;
        versionId: string;
    };
    reactions: any;
    showComments: boolean;
    showRecommendedPages: boolean;
    title: string;
    webUrl: string;
}
//# sourceMappingURL=types.d.ts.map