import { IColumns } from "./types.js";
import { ColumnDefinition as IColumnDefinition } from "@microsoft/microsoft-graph-types";
declare module "./types" {
    interface _Columns {
        addRef(siteColumn: IColumn): Promise<IColumnDefinition>;
    }
    interface IColumns {
        addRef(siteColumn: IColumn): Promise<IColumnDefinition>;
    }
}
declare module "../content-types/types" {
    interface _ContentType {
        readonly column: IColumns;
    }
    interface IContentType {
        /**
         * Read the attachment files data for an item
         */
        readonly columns: IColumns;
    }
}
//# sourceMappingURL=content-types.d.ts.map