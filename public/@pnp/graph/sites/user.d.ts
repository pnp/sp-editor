import { IFollowedSites } from "./types.js";
declare module "../users/types" {
    interface _User {
        followedSites: IFollowedSites;
    }
    interface IUser {
        followedSites: IFollowedSites;
    }
}
//# sourceMappingURL=user.d.ts.map