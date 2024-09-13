/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { IGraph } from '@microsoft/mgt-element';
import { Contact, Person } from '@microsoft/microsoft-graph-types';
import { IDynamicPerson } from './types';
declare const personTypes: readonly ["any", "person", "group"];
/**
 * Person Type enum
 *
 * @export
 * @enum {string}
 */
export type PersonType = (typeof personTypes)[number];
export declare const isPersonType: (value: unknown) => value is "any" | "person" | "group";
export declare const personTypeConverter: (value: string, defaultValue?: PersonType) => PersonType;
declare const userTypes: readonly ["any", "user", "contact"];
/**
 * User Type enum
 *
 * @export
 * @enum {string}
 */
export type UserType = (typeof userTypes)[number];
export declare const isUserType: (value: unknown) => value is "any" | "user" | "contact";
export declare const userTypeConverter: (value: string, defaultValue?: UserType) => UserType;
/**
 * async promise, returns all Graph people who are most relevant contacts to the signed in user.
 *
 * @param {IGraph} graph
 * @param {string} query
 * @param {number} [top=10] - number of people to return
 * @param {UserType} [personType='any'] - the type of person to search for
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
 * @param {IGraph} graph - the graph instance to use for making requests
 * @param {string} version - the graph version url segment to use when making requests
 * @param {string} resource - the resource segment of the graph url to be requested
 * @param {string[]} scopes - an array of scopes that are required to make the underlying graph request,
 *  if any scope provided is not currently consented then the user will be prompted for consent prior to
 *  making the graph request to load data.
 * @returns {(Promise<Person[]>)}
 * @memberof Graph
 */
export declare const getPeopleFromResource: (graph: IGraph, version: string, resource: string, scopes: string[]) => Promise<Person[]>;
export {};
//# sourceMappingURL=graph.people.d.ts.map