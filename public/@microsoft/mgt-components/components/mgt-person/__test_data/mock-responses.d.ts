/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * Sample response for a $batch request to get a user and their photo
 */
export declare const userPhotoBatchResponse: {
    responses: ({
        id: string;
        status: number;
        headers: {
            'Cache-Control': string;
            'X-Content-Type-Options': string;
            'Content-Type': string;
            ETag: string;
            'x-ms-resource-unit'?: undefined;
            'OData-Version'?: undefined;
        };
        body: string;
    } | {
        id: string;
        status: number;
        headers: {
            'Cache-Control': string;
            'x-ms-resource-unit': string;
            'OData-Version': string;
            'Content-Type': string;
            'X-Content-Type-Options'?: undefined;
            ETag?: undefined;
        };
        body: {
            '@odata.context': string;
            businessPhones: string[];
            displayName: string;
            givenName: string;
            jobTitle: string;
            mail: string;
            mobilePhone: any;
            officeLocation: string;
            preferredLanguage: string;
            surname: string;
            userPrincipalName: string;
            id: string;
        };
    })[];
};
//# sourceMappingURL=mock-responses.d.ts.map