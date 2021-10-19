import { BrowserCrypto } from "./BrowserCrypto";
export declare class GuidGenerator {
    private cryptoObj;
    constructor(cryptoObj: BrowserCrypto);
    generateGuid(): string;
    /**
     * verifies if a string is  GUID
     * @param guid
     */
    static isGuid(guid: string): boolean;
}
//# sourceMappingURL=GuidGenerator.d.ts.map