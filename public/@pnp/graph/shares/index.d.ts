import { IShares } from "./types.js";
import "./drive-item.js";
export { IShare, IShares, Share, Shares, IShareLinkInfo, IShareLinkAccessInfo, } from "./types.js";
export { ICreateShareLinkInfo, } from "./drive-item.js";
declare module "../fi" {
    interface GraphFI {
        readonly shares: IShares;
    }
}
//# sourceMappingURL=index.d.ts.map