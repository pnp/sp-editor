import { TimelinePipe } from "@pnp/core";
import { Queryable } from "@pnp/queryable";
import { _SPInstance } from "../spqueryable.js";
export interface IResponseBodyStream {
    body: ReadableStream;
    knownLength: number;
}
export declare function StreamParse(): TimelinePipe<Queryable>;
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
    /**
     * Gets the content of a file as a ReadableStream
     *
     */
    getStream(): Promise<IResponseBodyStream>;
    private getParsed;
}
//# sourceMappingURL=readable-file.d.ts.map