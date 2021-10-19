/**
 * Storage wrapper for IndexedDB storage in browsers: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export declare class DatabaseStorage<T> {
    private db;
    private dbName;
    private tableName;
    private version;
    private dbOpen;
    constructor(dbName: string, tableName: string, version: number);
    /**
     * Opens IndexedDB instance.
     */
    open(): Promise<void>;
    /**
     * Retrieves item from IndexedDB instance.
     * @param key
     */
    get(key: string): Promise<T>;
    /**
     * Adds item to IndexedDB under given key
     * @param key
     * @param payload
     */
    put(key: string, payload: T): Promise<T>;
    /**
     * Removes item from IndexedDB under given key
     * @param key
     */
    delete(key: string): Promise<boolean>;
    clear(): Promise<boolean>;
}
//# sourceMappingURL=DatabaseStorage.d.ts.map