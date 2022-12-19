import { ContentType as IContentTypeEntity } from "@microsoft/microsoft-graph-types";
import { IContentType, IContentTypes } from "./types.js";
declare module "./types" {
    interface _ContentTypes {
        add(contentType: IContentTypeEntity): Promise<IContentTypeAddResult>;
        associateWithHubSites(hubSiteUrls: string[], propagateToExistingLists?: boolean): Promise<void>;
    }
    interface IContentType {
        add(contentType: IContentTypeEntity): Promise<IContentTypeAddResult>;
        associateWithHubSites(hubSiteUrls: string[], propagateToExistingLists?: boolean): Promise<void>;
    }
}
declare module "../sites/types" {
    interface _Site {
        readonly contentTypes: IContentTypes;
        getApplicableContentTypesForList(listId: string): Promise<IContentType[]>;
    }
    interface ISite {
        /**
         * Read the attachment files data for an item
         */
        readonly contentTypes: IContentTypes;
        getApplicableContentTypesForList(listId: string): Promise<IContentType[]>;
    }
}
//# sourceMappingURL=sites.d.ts.map