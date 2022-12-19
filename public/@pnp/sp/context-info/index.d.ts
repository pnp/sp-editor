declare module "../spqueryable" {
    interface _SPQueryable {
        /**
         * Gets the context info for the specified path
         *
         * @param path Optional. Absolute path to a SharePoint resource [Default: this.parentUrl]
         */
        getContextInfo(path?: string): Promise<IContextInfo>;
    }
}
/**
 * This is the interface to expose data context information for a site/web
 */
export interface IContextInfo {
    FormDigestTimeoutSeconds: number;
    FormDigestValue: number;
    LibraryVersion: string;
    SiteFullUrl: string;
    SupportedSchemaVersions: string[];
    WebFullUrl: string;
}
//# sourceMappingURL=index.d.ts.map