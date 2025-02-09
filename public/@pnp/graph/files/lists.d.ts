import { Drive as IDriveType } from "@microsoft/microsoft-graph-types";
declare module "../lists/types" {
    interface _List {
        drive(): Promise<IDriveType>;
    }
    interface IList {
        drive(): Promise<IDriveType>;
    }
}
//# sourceMappingURL=lists.d.ts.map