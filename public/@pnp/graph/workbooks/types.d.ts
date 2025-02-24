import { IUpdateable, IAddable, IGetById, IDeleteable } from "../decorators.js";
import { _GraphCollection, _GraphInstance, IGraphQueryable } from "../graphqueryable.js";
import { Workbook as WorkbookType, WorkbookWorksheet as WorksheetType, WorkbookTable as WorkbookTableType, WorkbookTableRow as WorkbookTableRowType, WorkbookTableColumn as WorkbookTableColumnType, WorkbookRange as WorkbookRangeType, WorkbookRangeFormat as WorkbookRangeFormatType, WorkbookRangeBorder as WorkbookRangeBorderType, WorkbookRangeFont as WorkbookRangeFontType, WorkbookRangeFill as WorkbookRangeFillType, WorkbookRangeSort as WorkbookRangeSortType, WorkbookRangeView as WorkbookRangeViewType, WorkbookFormatProtection as WorkbookFormatProtectionType, WorkbookTableSort as WorkbookTableSortType, WorkbookFilter as WorkbookFilterType, WorkbookWorksheetProtection as WorkbookWorksheetProtectionType, WorkbookPivotTable as WorkbookPivotTableType, WorkbookNamedItem as WorkbookNamedItemType, WorkbookSortField as WorkbookSortFieldType, WorkbookOperation as WorkbookOperationType, WorkbookWorksheetProtectionOptions, WorkbookIcon as WorkbookIconType, WorkbookComment as WorkbookCommentType, WorkbookCommentReply as WorkbookCommentReplyType, WorkbookApplication as WorkbookApplicationType } from "@microsoft/microsoft-graph-types";
export declare class _Workbook extends _GraphInstance<WorkbookType> {
    get worksheets(): IWorksheets;
    get tables(): ITables;
    get comments(): IComments;
    get names(): INamedItems;
    get operations(): IOperations;
    get application(): IApplication;
}
export interface IWorkbook extends _Workbook {
}
export declare const Workbook: import("@pnp/graph").IGraphInvokableFactory<IWorkbook>;
export declare class _WorkbookWithSession extends _Workbook {
    closeSession(): Promise<void>;
    refreshSession(): Promise<void>;
}
export interface IWorkbookWithSession extends _WorkbookWithSession {
}
export declare const WorkbookWithSession: import("@pnp/graph").IGraphInvokableFactory<IWorkbookWithSession>;
export declare class _Range extends _GraphInstance<WorkbookRangeType> {
    get format(): IRangeFormat;
    get sort(): IRangeSort;
    cell(row: number, column: number): IRange;
    column(column: number): IRange;
    columnsAfter(count?: number): IRange;
    columnsBefore(count?: number): IRange;
    row(row: number): IRange;
    rowsAbove(count?: number): IRange;
    rowsBelow(count?: number): IRange;
    get entireColumn(): IRange;
    get entireRow(): IRange;
    intersection(anotherRange: string): IRange;
    boundingRect(anotherRange: string): IRange;
    get lastCell(): IRange;
    get lastColumn(): IRange;
    get lastRow(): IRange;
    offsetRange(rowOffset: number, columnOffset: number): IRange;
    resizedRange(deltaRows: number, deltaColumns: number): IRange;
    usedRange(valuesOnly: boolean): IRange;
    get visibleView(): IRangeView;
    insert(shift: "Down" | "Right"): Promise<WorkbookRangeType>;
    merge(across: boolean): Promise<void>;
    unmerge(): Promise<void>;
    clear(applyTo: "All" | "Formats" | "Contents"): Promise<void>;
    delete(shift: "Up" | "Left"): Promise<void>;
}
export interface IRange extends _Range, IUpdateable<WorkbookRangeType> {
}
export declare const Range: import("@pnp/graph").IGraphInvokableFactory<IRange>;
export declare class _RangeView extends _GraphInstance<WorkbookRangeViewType> {
    get rows(): IRangeViews;
    get range(): IRange;
}
export interface IRangeView extends _RangeView {
}
export declare class _RangeViews extends _GraphCollection<WorkbookRangeViewType[]> {
}
export interface IRangeViews extends _RangeViews, IGetItemAt<IRangeView> {
}
export interface RangeSortParameters {
    fields: WorkbookSortFieldType[];
    matchCase?: boolean;
    hasHeaders?: boolean;
    orientation?: "Rows" | "Columns";
    method?: "PinYin" | "StrokeCount";
}
export declare class _RangeSort extends _GraphInstance<WorkbookRangeSortType> {
    apply(params: RangeSortParameters): Promise<void>;
}
export interface IRangeSort extends _RangeSort {
}
export declare class _RangeFormat extends _GraphInstance<WorkbookRangeFormatType> {
    get borders(): IRangeBorders;
    get font(): IRangeFont;
    get fill(): IRangeFill;
    get protection(): IRangeFormatProtection;
    autofitColumns(): Promise<void>;
    autofitRows(): Promise<void>;
}
export interface IRangeFormat extends _RangeFormat, IUpdateable<WorkbookRangeFormatType> {
}
export declare const RangeFormat: import("@pnp/graph").IGraphInvokableFactory<IRangeFormat>;
export declare class _RangeFont extends _GraphInstance<WorkbookRangeFontType> {
}
export interface IRangeFont extends _RangeFont, IUpdateable<WorkbookRangeFontType> {
}
export declare const RangeFont: import("@pnp/graph").IGraphInvokableFactory<IRangeFont>;
export declare class _RangeFill extends _GraphInstance<WorkbookRangeFillType> {
    clear(): Promise<void>;
}
export interface IRangeFill extends _RangeFill, IUpdateable<WorkbookRangeFillType> {
}
export declare const RangeFill: import("@pnp/graph").IGraphInvokableFactory<IRangeFill>;
export declare class _RangeFormatProtection extends _GraphInstance<WorkbookFormatProtectionType> {
}
export interface IRangeFormatProtection extends _RangeFormatProtection, IUpdateable<WorkbookFormatProtectionType> {
}
export declare const RangeFormatProtection: import("@pnp/graph").IGraphInvokableFactory<IRangeFormatProtection>;
export declare class _RangeBorder extends _GraphInstance<WorkbookRangeBorderType> {
}
/**
 * NOTE: When updating RangeBorder, there are some combinations of style
 * and weight that silently fail.
 * For example, setting "Dash - Thick" always sets "Continuous - Thick".
 * This isn't documented, but it's also not really a bug. When you
 * try to manually set border styles in Excel, it's not possible to select
 * a thick dashed line.
 */
export interface IRangeBorder extends _RangeBorder, IUpdateable<WorkbookRangeBorderType> {
}
export declare const RangeBorder: import("@pnp/graph").IGraphInvokableFactory<IRangeBorder>;
export declare class _RangeBorders extends _GraphCollection<WorkbookRangeBorderType[]> {
    getBySideIndex(sideIndex: RangeBorderSideIndex): IRangeBorder & import("@pnp/queryable/queryable.js").IInvokable<any>;
}
export interface IRangeBorders extends _RangeBorders, IGetItemAt<IRangeBorder> {
}
export declare const RangeBorders: import("@pnp/graph").IGraphInvokableFactory<IRangeBorders>;
export type RangeBorderSideIndex = "EdgeTop" | "EdgeBottom" | "EdgeLeft" | "EdgeRight" | "InsideVertical" | "InsideHorizontal" | "DiagonalDown" | "DiagonalUp";
export declare class _Worksheet extends _GraphInstance<WorksheetType> {
    /**
     * Get a range of cells within the worksheet.
     *
     * @param address (Optional) An A1-notation address of a range within this worksheet.
     * If omitted, a range containing the entire worksheet is returned.
     */
    getRange(address?: string): IRange;
    getUsedRange(valuesOnly?: boolean): IRange;
    get tables(): ITables;
    get pivotTables(): IPivotTables;
    get names(): INamedItems;
    get protection(): IWorksheetProtection;
}
export interface IWorksheet extends _Worksheet, IUpdateable<WorksheetType>, IDeleteable {
}
export declare const Worksheet: import("@pnp/graph").IGraphInvokableFactory<IWorksheet>;
export interface IAddWorksheet {
    name?: string;
}
export declare class _Worksheets extends _GraphCollection<WorksheetType[]> {
}
export interface IWorksheets extends _Worksheets, IAddable<IAddWorksheet, WorksheetType>, IGetById<IWorksheet> {
}
export declare const Worksheets: import("@pnp/graph").IGraphInvokableFactory<IWorksheets>;
export declare class _WorksheetProtection extends _GraphInstance<WorkbookWorksheetProtectionType> {
    protect(options?: WorkbookWorksheetProtectionOptions): Promise<void>;
    unprotect(): Promise<void>;
}
export interface IWorksheetProtection extends _WorksheetProtection {
}
export declare const WorksheetProtection: import("@pnp/graph").IGraphInvokableFactory<IWorksheetProtection>;
export declare class _Table extends _GraphInstance<WorkbookTableType> {
    get rows(): ITableRows;
    get columns(): ITableColumns;
    get worksheet(): IWorksheet;
    get range(): IRange;
    get headerRowRange(): IRange;
    get dataBodyRange(): IRange;
    get totalRowRange(): IRange;
    get sort(): ITableSort;
    clearFilters(): Promise<any>;
    reapplyFilters(): Promise<any>;
    convertToRange(): Promise<WorkbookRangeType>;
}
export interface ITable extends _Table, IUpdateable<WorkbookTableType>, IDeleteable, IGetRange {
}
export declare const Table: import("@pnp/graph").IGraphInvokableFactory<ITable>;
export declare class _Tables extends _GraphCollection<WorkbookTableType[]> {
    getByName(name: string): ITable;
    add(address: string, hasHeaders: boolean): Promise<WorkbookTableType>;
}
export interface ITables extends _Tables, IGetById<ITable> {
}
export declare const Tables: import("@pnp/graph").IGraphInvokableFactory<ITables>;
export declare class _TableRow extends _GraphInstance<WorkbookTableRowType> {
}
export interface ITableRow extends _TableRow, IUpdateable<WorkbookTableRowType>, IDeleteable, IGetRange {
}
export declare const TableRow: import("@pnp/graph").IGraphInvokableFactory<ITableRow>;
export interface IAddRow {
    index?: number;
    values?: any[][];
}
export declare class _TableRows extends _GraphCollection<WorkbookTableRowType[]> {
}
export interface ITableRows extends _TableRows, IAddable<IAddRow, WorkbookTableRowType>, IGetItemAt<ITableRow> {
}
export declare const TableRows: import("@pnp/graph").IGraphInvokableFactory<ITableRows>;
export declare class _TableColumn extends _GraphInstance<WorkbookTableColumnType> {
    get filter(): IWorkbookFilter;
    get headerRowRange(): IRange;
    get dataBodyRange(): IRange;
    get totalRowRange(): IRange;
}
export interface ITableColumn extends _TableColumn, IUpdateable<WorkbookTableColumnType>, IDeleteable, IGetRange {
}
export declare const TableColumn: import("@pnp/graph").IGraphInvokableFactory<ITableColumn>;
export interface IAddColumn {
    name?: string;
    index?: number;
    values?: any[][];
}
export declare class _TableColumns extends _GraphCollection<WorkbookTableColumnType[]> {
    getByName(name: string): ITableColumn;
}
export interface ITableColumns extends _TableColumns, IAddable<IAddColumn, WorkbookTableColumnType>, IGetItemAt<ITableColumn> {
}
export declare const TableColumns: import("@pnp/graph").IGraphInvokableFactory<ITableColumns>;
export declare class _WorkbookFilter extends _GraphInstance<WorkbookFilterType> {
    apply(filter: WorkbookFilterType): Promise<void>;
    clear(): Promise<void>;
}
export interface IWorkbookFilter extends _WorkbookFilter {
}
export declare const WorkbookFilter: import("@pnp/graph").IGraphInvokableFactory<IWorkbookFilter>;
export declare class _TableSort extends _GraphInstance<WorkbookTableSortType> {
    apply(fields: WorkbookSortFieldType[], matchCase?: boolean, method?: string): Promise<void>;
    clear(): Promise<void>;
    reapply(): Promise<void>;
}
export declare class ITableSort extends _TableSort {
}
export declare const TableSort: import("@pnp/graph").IGraphInvokableFactory<ITableSort>;
export declare class _PivotTable extends _GraphInstance<WorkbookPivotTableType> {
    refresh(): Promise<void>;
}
export interface IPivotTable extends _PivotTable {
}
export declare const PivotTable: import("@pnp/graph").IGraphInvokableFactory<IPivotTable>;
export declare class _PivotTables extends _GraphCollection<WorkbookPivotTableType[]> {
    refreshAll(): Promise<void>;
}
export interface IPivotTables extends _PivotTables, IGetById<IPivotTable> {
}
export declare const PivotTables: import("@pnp/graph").IGraphInvokableFactory<IPivotTables>;
interface IUpdateNamedItem {
    comment?: string;
    visible?: boolean;
}
export declare class _NamedItem extends _GraphInstance<WorkbookNamedItemType> {
    get range(): IRange;
}
export interface INamedItem extends _NamedItem, IUpdateable<IUpdateNamedItem> {
}
export declare const NamedItem: import("@pnp/graph").IGraphInvokableFactory<INamedItem>;
interface IAddNamedItem {
    name: string;
    reference: string;
    comment: string;
}
export declare class _NamedItems extends _GraphCollection<WorkbookNamedItemType[]> {
    /**
     * The NamedItem object contains string property named "value".
     * This causes an issue with the DefaultParse
     * parser (namely parseODataJSON), because it's set up to throw away
     * the rest of the object if it contains a field "value".
     *
     * Below I'm manually replacing the parser with JSONParse. This works,
     * but is unideal because it would replace any custom parser a user
     * may have set up earlier.
     *
     * I know the docs caution against making changes in the
     * core classes - my suggestion would be to change
     * the check in parseODataJSON from `hasOwnProperty` to something like
     * `typeof json["value"] === "object"`. Thoughts?
     */
    add(item: IAddNamedItem): Promise<WorkbookNamedItemType>;
    getByName(name: string): INamedItem;
}
export interface INamedItems extends _NamedItems {
}
export declare const NamedItems: import("@pnp/graph").IGraphInvokableFactory<INamedItems>;
export declare class _Comment extends _GraphInstance<WorkbookCommentType> {
    get replies(): ICommentReplies;
}
export interface IComment extends _Comment {
}
export declare const Comment: import("@pnp/graph").IGraphInvokableFactory<IComment>;
export declare class _Comments extends _GraphCollection<WorkbookCommentType[]> {
}
export interface IComments extends _Comments, IGetById<IComment> {
}
export declare const Comments: import("@pnp/graph").IGraphInvokableFactory<IComments>;
export declare class _CommentReply extends _GraphInstance<WorkbookCommentReplyType> {
}
export interface ICommentReply extends _CommentReply {
}
export declare const CommentReply: import("@pnp/graph").IGraphInvokableFactory<ICommentReply>;
export declare class _CommentReplies extends _GraphInstance<WorkbookCommentReplyType[]> {
}
export interface ICommentReplies extends _CommentReplies, IGetById<ICommentReply>, IAddable<WorkbookCommentReplyType, WorkbookCommentReplyType> {
}
export declare const CommentReplies: import("@pnp/graph").IGraphInvokableFactory<ICommentReplies>;
export declare class _Application extends _GraphInstance<WorkbookApplicationType> {
    calculate(calculationType: "Recalculate" | "Full" | "FullRebuild"): Promise<void>;
}
export interface IApplication extends _Application {
}
export declare const Application: import("@pnp/graph").IGraphInvokableFactory<IApplication>;
export declare class _Operation extends _GraphInstance<WorkbookOperationType> {
}
export interface IOperation extends _Operation {
}
export declare const Operation: import("@pnp/graph").IGraphInvokableFactory<IOperation>;
export declare class _Operations extends _GraphCollection<WorkbookOperationType[]> {
}
export interface IOperations extends _Operations, IGetById<IOperation> {
}
export declare const Operations: import("@pnp/graph").IGraphInvokableFactory<IOperations>;
export declare class _Icon extends _GraphInstance<WorkbookIconType> {
}
export interface IIcon extends _Icon, IUpdateable<WorkbookIconType> {
}
export declare const Icon: import("@pnp/graph").IGraphInvokableFactory<IIcon>;
export declare function getItemAt<R>(factory: (...args: any[]) => R): <T extends new (...args: any[]) => any>(target: T) => {
    new (...args: any[]): {
        [x: string]: any;
        getItemAt(this: IGraphQueryable, index: number): R;
    };
} & T;
export interface IGetItemAt<R = any, T = number> {
    /**
     * Get an item based on its position in the collection.
     * @param index Index of the item to be retrieved. Zero-indexed.
     */
    getItemAt(index: T): R;
}
/**
 * Adds the getRange method to the tagged class
 */
export declare function getRange(): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {
        getRange(this: IGraphQueryable): IRange;
    };
} & T;
export interface IGetRange {
    /**
     * Get the range of cells contained by this element.
     */
    getRange(): IRange;
}
export {};
//# sourceMappingURL=types.d.ts.map