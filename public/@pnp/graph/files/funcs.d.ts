import { IFileUploadOptions } from "./types.js";
import { DriveItem as IDriveItemType } from "@microsoft/microsoft-graph-types";
export interface ICheckInOptions {
    checkInAs?: string;
    comment?: string;
}
export declare function checkIn(checkInOptions?: ICheckInOptions): Promise<void>;
export declare function checkOut(): Promise<void>;
export declare function encodeSharingUrl(url: string): string;
export declare function driveItemUpload(fileOptions: IFileUploadOptions): Promise<IDriveItemType>;
//# sourceMappingURL=funcs.d.ts.map