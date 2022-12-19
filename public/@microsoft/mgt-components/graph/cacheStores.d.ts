/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * All schemas and stores for caching component calls
 */
export declare const schemas: {
    presence: {
        name: string;
        stores: {
            presence: string;
        };
        version: number;
    };
    users: {
        name: string;
        stores: {
            users: string;
            usersQuery: string;
            userFilters: string;
        };
        version: number;
    };
    photos: {
        name: string;
        stores: {
            contacts: string;
            users: string;
            groups: string;
        };
        version: number;
    };
    people: {
        name: string;
        stores: {
            contacts: string;
            groupPeople: string;
            peopleQuery: string;
        };
        version: number;
    };
    groups: {
        name: string;
        stores: {
            groups: string;
            groupsQuery: string;
        };
        version: number;
    };
    get: {
        name: string;
        stores: {
            responses: string;
        };
        version: number;
    };
    files: {
        name: string;
        stores: {
            driveFiles: string;
            groupFiles: string;
            siteFiles: string;
            userFiles: string;
            insightFiles: string;
            fileQueries: string;
        };
        version: number;
    };
    fileLists: {
        name: string;
        stores: {
            fileLists: string;
            insightfileLists: string;
        };
        version: number;
    };
};
//# sourceMappingURL=cacheStores.d.ts.map