import { IWindowStorage } from "./IWindowStorage";
export declare class BrowserStorage implements IWindowStorage {
    private windowStorage;
    constructor(cacheLocation: string);
    private validateWindowStorage;
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    getKeys(): string[];
    containsKey(key: string): boolean;
}
//# sourceMappingURL=BrowserStorage.d.ts.map