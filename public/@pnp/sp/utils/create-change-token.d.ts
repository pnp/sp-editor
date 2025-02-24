import { IChangeToken } from "../types.js";
/**
 * Creates a change token for use with sites, webs, or lists
 *
 * @param resourceType The type of resource for which you want a change token
 * @param resource The identifier (GUID) of the resource site.Id, web.Id, or List.Id
 * @param tokenDate The date for this token (if start token, start date of chages; if end token, end date of the changes)
 * @param versionNumber Version number for token (default = 1)
 * @returns A properly formatted change token
 */
export declare function createChangeToken(resourceType: "site" | "web" | "list", resource: string, tokenDate?: Date, versionNumber?: number): IChangeToken;
//# sourceMappingURL=create-change-token.d.ts.map