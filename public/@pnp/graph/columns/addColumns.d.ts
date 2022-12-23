import { IColumn } from "./types";
import { ColumnDefinition as IColumnDefinition } from "@microsoft/microsoft-graph-types";
/**
 * Create a new booking service as specified in the request body.
 *
 * @param column  a JSON representation of a Column object.
 */
export declare const addColumn: (column: IColumnDefinition) => Promise<IColumnAddResult>;
/**
* IColumnAddResult
*/
export interface IColumnAddResult {
    column: IColumn;
    data: IColumnDefinition;
}
//# sourceMappingURL=addColumns.d.ts.map