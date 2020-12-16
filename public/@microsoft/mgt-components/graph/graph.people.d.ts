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
 * async promise, returns all Graph people who are most relevant contacts to the signed in user.
 *
 * @param {string} query
 * @param {number} [top=10] - number of people to return
 * @param {PersonType} [personType=PersonType.person] - the type of person to search for
 * @returns {(Promise<Person[]>)}
 */
export declare function findPeople(graph: IGraph, query: string, top?: number, personType?: PersonType): Promise<Person[]>;
/**
 * async promise to the Graph for People, by default, it will request the most frequent contacts for the signed in user.
 *
 * @returns {(Promise<Person[]>)}
 * @memberof Graph
 */
export declare function getPeople(graph: IGraph): Promise<Person[]>;
/**
 * returns a promise that resolves after specified time
 * @param time in milliseconds
 */
export declare function getEmailFromGraphEntity(entity: IDynamicPerson): string;
/**
 * async promise, returns a Graph contact associated with the email provided
 *
 * @param {string} email
 * @returns {(Promise<Contact[]>)}
 * @memberof Graph
 */
export declare function findContactsByEmail(graph: IGraph, email: string): Promise<Contact[]>;
//# sourceMappingURL=graph.people.d.ts.map