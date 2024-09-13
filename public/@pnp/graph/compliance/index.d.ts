import { ICompliance } from "./types.js";
export { Compliance, ICompliance, Notes, INotes, SubjectRightsRequests, ISubjectRightsRequests, SubjectRightsRequest, ISubjectRightsRequest, } from "./types.js";
declare module "../fi" {
    interface GraphFI {
        readonly compliance: ICompliance;
    }
}
//# sourceMappingURL=index.d.ts.map