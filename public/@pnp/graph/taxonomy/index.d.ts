import { ITermStore } from "./types.js";
import "./sites.js";
export { ITermStore, TermStore, ITermGroup, ITermGroups, ITermSets, TermGroup, TermGroups, TermSets, ITermSet, TermSet, ITerms, Terms, ITerm, Term, Relations, IRelations, Children, IChildren, } from "./types.js";
declare module "../fi" {
    interface GraphFI {
        readonly termStore: ITermStore;
    }
}
//# sourceMappingURL=index.d.ts.map