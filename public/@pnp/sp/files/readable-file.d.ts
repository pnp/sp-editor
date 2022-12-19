import { _SPInstance } from "../spqueryable.js";
export declare class ReadableFile<T = any> extends _SPInstance<T> {
    /**
     * Gets the contents of the file as text. Not supported in batching.
     *
     */
    getText(): Promise<string>;
    /**
     * Gets the contents of the file as a blob, does not work in Node.js. Not supported in batching.
     *
     */
    getBlob(): Promise<Blob>;
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js. Not supported in batching.
     */
    getBuffer(): Promise<ArrayBuffer>;
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js. Not supported in batching.
     */
    getJSON(): Promise<any>;
    private getParsed;
}
//# sourceMappingURL=readable-file.d.ts.map