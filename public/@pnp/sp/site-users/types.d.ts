import { _SPCollection, _SPInstance, IDeleteable } from "../spqueryable.js";
import { ISiteGroups } from "../site-groups/types.js";
import { PrincipalType } from "../types.js";
export declare class _SiteUsers extends _SPCollection<ISiteUserInfo[]> {
    /**
     * Gets a user from the collection by id
     *
     * @param id The id of the user to retrieve
     */
    getById(id: number): ISiteUser;
    /**
     * Gets a user from the collection by email
     *
     * @param email The email address of the user to retrieve
     */
    getByEmail(email: string): ISiteUser;
    /**
     * Gets a user from the collection by login name
     *
     * @param loginName The login name of the user to retrieve
     *   e.g. SharePoint Online: 'i:0#.f|membership|user@domain'
     */
    getByLoginName(loginName: string): ISiteUser;
    /**
     * Removes a user from the collection by id
     *
     * @param id The id of the user to remove
     */
    removeById(id: number): Promise<any>;
    /**
     * Removes a user from the collection by login name
     *
     * @param loginName The login name of the user to remove
     */
    removeByLoginName(loginName: string): Promise<any>;
    /**
     * Adds a user to a site collection
     *
     * @param loginName The login name of the user to add  to a site collection
     *
     */
    add(loginName: string): Promise<ISiteUser>;
}
export interface ISiteUsers extends _SiteUsers {
}
export declare const SiteUsers: import("../spqueryable.js").ISPInvokableFactory<ISiteUsers>;
/**
 * Describes a single user
 *
 */
export declare class _SiteUser extends _SPInstance<ISiteUserInfo> {
    delete: (this: import("../spqueryable.js").ISPQueryable<any>) => Promise<void>;
    /**
     * Gets the groups for this user
     *
     */
    get groups(): ISiteGroups;
    /**
     * Updates this user
     *
     * @param props Group properties to update
     */
    update(props: Partial<ISiteUserInfo>): Promise<void>;
}
export interface ISiteUser extends _SiteUser, IDeleteable {
}
export declare const SiteUser: import("../spqueryable.js").ISPInvokableFactory<ISiteUser>;
export interface ISiteUserInfo {
    Id: number;
    IsHiddenInUI: boolean;
    LoginName: string;
    Title: string;
    PrincipalType: number;
    Email: string;
    Expiration: string;
    IsEmailAuthenticationGuestUser: boolean;
    IsShareByEmailGuestUser: boolean;
    IsSiteAdmin: boolean;
    UserId: {
        NameId: string;
        NameIdIssuer: string;
    };
    UserPrincipalName: string | null;
}
/**
 * Describes a single user properties
 *
 */
export interface ISiteUserProps {
    /**
     * Contains Site user email
     *
     */
    Email: string;
    /**
     * Contains Site user Id
     *
     */
    Id: number;
    /**
     * Site user IsHiddenInUI
     *
     */
    IsHiddenInUI: boolean;
    /**
     * Site user IsShareByEmailGuestUser
     *
     */
    IsShareByEmailGuestUser: boolean;
    /**
     * Describes if Site user Is Site Admin
     *
     */
    IsSiteAdmin: boolean;
    /**
     * Site user LoginName
     *
     */
    LoginName: string;
    /**
     * Site user Principal type
     *
     */
    PrincipalType: number | PrincipalType;
    /**
     * Site user Title
     *
     */
    Title: string;
}
//# sourceMappingURL=types.d.ts.map