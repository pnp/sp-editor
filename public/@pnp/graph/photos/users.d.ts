import { IPhoto, IPhotos } from "./types.js";
declare module "../users/types" {
    interface _User {
        readonly photo: IPhoto;
        readonly photos: IPhotos;
    }
    interface IUser {
        readonly photo: IPhoto;
        readonly photos: IPhotos;
    }
}
//# sourceMappingURL=users.d.ts.map