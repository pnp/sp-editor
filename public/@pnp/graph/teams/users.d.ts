import { IInstalledApps, ITeams } from "./types.js";
declare module "../users/types" {
    interface _User {
        readonly joinedTeams: ITeams;
        readonly installedApps: IInstalledApps;
    }
    interface IUser {
        readonly joinedTeams: ITeams;
        readonly installedApps: IInstalledApps;
    }
}
//# sourceMappingURL=users.d.ts.map