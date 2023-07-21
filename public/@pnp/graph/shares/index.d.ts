import { IShares } from "./types.js";
export { IShare, IShares, Share, Shares, } from "./types.js";
declare module "../fi" {
    interface GraphFI {
        readonly shares: IShares;
    }
}
//# sourceMappingURL=index.d.ts.map