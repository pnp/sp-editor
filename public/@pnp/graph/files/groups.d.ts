import { IDrive, IDrives } from "./types.js";
declare module "../groups/types" {
    interface _Group {
        readonly drive: IDrive;
        readonly drives: IDrives;
    }
    interface IGroup {
        readonly drive: IDrive;
        readonly drives: IDrives;
    }
}
//# sourceMappingURL=groups.d.ts.map