import { IGetById } from "../decorators.js";
import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { IDriveItem } from "../files/types.js";
import { Permission as IPermissionType, SharedDriveItem as ISharedDriveItemType, DriveRecipient as IDriveRecipientType } from "@microsoft/microsoft-graph-types";
/**
 * Describes a Share object
 */
export declare class _Share extends _GraphInstance<ISharedDriveItemType> {
    /**
     * Access the driveItem associated with this shared file
     */
    get driveItem(): IDriveItem;
}
export interface IShare extends _Share {
}
export declare const Share: import("../graphqueryable.js").IGraphInvokableFactory<IShare>;
/**
 * Describes a collection of Share objects
 *
 */
export declare class _Shares extends _GraphCollection<IPermissionType[]> {
    /**
     * Creates a sharing link (id) from a given absolute url to a file
     * @param url Absolute file url such as "https://{tenant}.sharepoint.com/sites/dev/Shared%20Documents/new.pptx"
     * @returns An encoded sharing id which can be used in getById to access a file
     */
    encodeSharingLink(url: string): string;
    /**
     * Method for using a sharing link.
     * @param share: string - Share Id or Encoded Sharing Url
     * @returns Microsoft Graph - SharingLink
     */
    useSharingLink(shareLink: IShareLinkInfo): Promise<Pick<ISharedDriveItemType, "id" | "name">>;
    grantSharingLinkAccess(shareLinkAccess: IShareLinkAccessInfo): Promise<IPermissionType>;
}
export interface IShares extends _Shares, IGetById<IShare> {
}
export declare const Shares: import("../graphqueryable.js").IGraphInvokableFactory<IShares>;
/**
 * IShareLinkInfo - for using a sharing link - either ShareId or EncodedSharingUrl must be included.
 * @param shareId: string - Optional - Share Id
 * @param encodedSharingUrl: string - Optional - Encoded Sharing Url
 * @param redeemSharingLink: boolean - Optional - True to Redeem the sharing link; False to redeem the sharing link if necessary
 */
export interface IShareLinkInfo {
    shareId?: string;
    encodedSharingUrl?: string;
    redeemSharingLink?: boolean;
}
/**
 * IShareLinkAccessInfo - update Sharing permissions.
 * @param encodedSharingUrl: string - Encoded Sharing Url
 * @param recipients: IDriveRecipientType[] - Array of recipients
 * @param roles: ["read" | "write" | "owner"] - Array of roles
 */
export interface IShareLinkAccessInfo {
    encodedSharingUrl: string;
    recipients: IDriveRecipientType[];
    roles: ["read" | "write" | "owner"];
}
//# sourceMappingURL=types.d.ts.map