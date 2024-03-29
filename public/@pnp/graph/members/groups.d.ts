import { IMembers } from "./types.js";
declare module "../groups/types" {
    interface _Group {
        readonly owners: IMembers;
        readonly members: IMembers;
    }
    interface IGroup {
        readonly owners: IMembers;
        readonly members: IMembers;
    }
}
//# sourceMappingURL=groups.d.ts.map