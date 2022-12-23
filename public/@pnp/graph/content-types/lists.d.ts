import { IContentTypes } from "./types.js";
declare module "../lists/types" {
    interface _List {
        readonly contentTypes: IContentTypes;
    }
    interface IList {
        /**
         * Read the attachment files data for an item
         */
        readonly contentTypes: IContentTypes;
    }
}
declare module "./types" {
    interface _ContentTypes {
        addCopy(contentType: IContentType): Promise<IContentTypeAddResult>;
    }
    interface IContentTypes {
        addCopy(contentType: IContentType): Promise<IContentTypeAddResult>;
    }
}
//# sourceMappingURL=lists.d.ts.map