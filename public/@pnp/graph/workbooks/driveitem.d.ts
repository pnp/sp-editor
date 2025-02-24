import { _DriveItem } from "../files/types.js";
import { IWorkbook, IWorkbookWithSession } from "./types.js";
declare module "../files/types.js" {
    interface _DriveItem {
        readonly workbook: IWorkbook;
        getWorkbookSession(persistChanges: boolean): Promise<IWorkbookWithSession>;
    }
    interface DriveItem {
        readonly workbook: IWorkbook;
        getWorkbookSession(persistChanges: boolean): Promise<IWorkbookWithSession>;
    }
}
export declare function getWorkbookSession(this: _DriveItem, persistChanges: boolean): Promise<IWorkbookWithSession>;
//# sourceMappingURL=driveitem.d.ts.map