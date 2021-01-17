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
        };
        version: number;
    };
    photos: {
        name: string;
        stores: {
            contacts: string;
            users: string;
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
};
//# sourceMappingURL=cacheStores.d.ts.map