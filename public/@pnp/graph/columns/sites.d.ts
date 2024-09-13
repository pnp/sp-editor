import { IColumns } from "./types.js";
import { ColumnDefinition as IColumnDefinition } from "@microsoft/microsoft-graph-types";
declare module "./types" {
    interface _Columns {
        add(column: IColumnDefinition): Promise<IColumnDefinition>;
    }
    interface IColumns {
        add(column: IColumnDefinition): Promise<IColumnDefinition>;
    }
}
declare module "../sites/types" {
    interface _Site {
        readonly column: IColumns;
    }
    interface ISite {
        /**
         * Read the attachment files data for an item
         */
        readonly columns: IColumns;
    }
}
//# sourceMappingURL=sites.d.ts.map