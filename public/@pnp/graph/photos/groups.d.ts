import { IPhoto, IPhotos } from "./types.js";
declare module "../groups/types" {
    interface _Group {
        readonly photo: IPhoto;
        readonly photos: IPhotos;
    }
    interface IGroup {
        readonly photo: IPhoto;
        readonly photos: IPhotos;
    }
}
//# sourceMappingURL=groups.d.ts.map