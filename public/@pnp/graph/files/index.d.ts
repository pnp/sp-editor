import "./users.js";
import "./groups.js";
import "./sites.js";
import { IDrives } from "./types.js";
export { SpecialFolder, } from "./users.js";
export { ICheckInOptions, encodeSharingUrl, } from "./funcs.js";
export { ResumableUpload, IResumableUpload, IResumableUploadOptions, } from "./resumableUpload.js";
export { Bundle, IBundle, Bundles, IBundles, IBundleDef, } from "./bundles.js";
export { Drive, DriveItem, DriveItems, Drives, IDrive, IDriveItem, IDriveItemAdd, IDriveItemAddFolder, IDriveItems, IDrives, IRoot, Root, ISharingWithMeOptions, IItemOptions, IPreviewOptions, IFileUploadOptions, ISensitivityLabel, } from "./types.js";
declare module "../fi" {
    interface GraphFI {
        readonly drives: IDrives;
    }
}
//# sourceMappingURL=index.d.ts.map