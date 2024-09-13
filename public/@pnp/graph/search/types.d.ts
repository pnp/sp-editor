import { SearchRequest as ISearchRequestType, SearchResponse as ISearchResponseType } from "@microsoft/microsoft-graph-types";
import { GraphInit, _GraphInstance } from "../graphqueryable.js";
/**
 * Search
 */
export declare class _Search extends _GraphInstance<ISearchRequestType[]> {
    executeQuery(request: {
        requests: ISearchRequestType[];
    }): Promise<ISearchResponseType[]>;
}
export interface ISearch {
    executeQuery(request: {
        requests: ISearchRequestType[];
    }): Promise<ISearchResponseType[]>;
}
export declare const Search: (base: GraphInit, path?: string) => ISearch;
//# sourceMappingURL=types.d.ts.map