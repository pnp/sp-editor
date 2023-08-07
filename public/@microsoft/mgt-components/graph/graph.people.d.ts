/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { Contact, Person } from '@microsoft/microsoft-graph-types';
import { IDynamicPerson } from './types';
/**
 * Person Type enum
 *
 * @export
 * @enum {number}
 */
export declare enum PersonType {
    /**
     * Any type
     */
    any = 0,
    /**
     * A Person such as User or Contact
     */
    person = "person",
    /**
     * A group
     */
    group = "group"
}
/**
 * User Type enum
 *
 * @export
 * @enum {number}
 */
export declare enum UserType {
    /**
     * Any user or contact
     */
    any = "any",
    /**
     * An organization User
     */
    user = "user",
    /**
     * An implicit or personal contact
     */
    contact = "contact"
}
/**
 * async promise, returns all Graph people who are most relevant contacts to the signed in user.
 *
 * @param {string} query
 * @param {number} [top=10] - number of people to return
 * @param {PersonType} [personType=PersonType.person] - the type of person to search for
 * @returns {(Promise<Person[]>)}
 */
export declare const findPeople: (graph: IGraph, query: string, top?: number, userType?: UserType, filters?: string) => Promise<Person[]>;
/**
 * async promise to the Graph for People, by default, it will request the most frequent contacts for the signed in user.
 *
 * @returns {(Promise<Person[]>)}
 * @memberof Graph
 */
export declare const getPeople: (graph: IGraph, userType?: UserType, peopleFilters?: string, top?: number) => Promise<Person[]>;
/**
 * Attempts to extract the email from the IDynamicPerson properties.
 *
 * @param {IDynamicperson} entity
 */
export declare const getEmailFromGraphEntity: (entity: IDynamicPerson) => string;
/**
 * async promise, returns a Graph contact associated with the email provided
 *
 * @param {string} email
 * @returns {(Promise<Contact[]>)}
 * @memberof Graph
 */
export declare const findContactsByEmail: (graph: IGraph, email: string) => Promise<Contact[]>;
/**
 * async promise, returns Graph people matching the Graph query specified
 * in the resource param
 *
 * @param {string} resource
 * @returns {(Promise<Person[]>)}
 * @memberof Graph
 */
export declare const getPeopleFromResource: (graph: IGraph, version: string, resource: string, scopes: string[]) => Promise<Person[]>;
//# sourceMappingURL=graph.people.d.ts.map