import { IDriveItemAddResult, IFileOptions } from "./types.js";
export interface ICheckInOptions {
    checkInAs?: string;
    comment?: string;
}
export declare function checkIn(checkInOptions?: ICheckInOptions): Promise<void>;
export declare function checkOut(): Promise<void>;
export declare function driveItemUpload(fileOptions: IFileOptions): Promise<IDriveItemAddResult>;
//# sourceMappingURL=funcs.d.ts.map