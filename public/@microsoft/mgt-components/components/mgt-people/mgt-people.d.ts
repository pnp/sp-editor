/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit-element';
import { IDynamicPerson } from '../../graph/types';
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import '../../styles/style-helper';
import { PersonCardInteraction } from './../PersonCardInteraction';
export { PersonCardInteraction } from './../PersonCardInteraction';
/**
 * web component to display a group of people or contacts by using their photos or initials.
 *
 * @export
 * @class MgtPeople
 * @extends {MgtTemplatedComponent}
 *
 * @cssprop --list-margin - {String} List margin for component
 * @cssprop --avatar-margin - {String} Margin for each person
 */
export declare class MgtPeople extends MgtTemplatedComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    /**
     * determines if agenda events come from specific group
     * @type {string}
     */
    get groupId(): string;
    set groupId(value: string);
    /**
     * user id array
     *
     * @memberof MgtPeople
     */
    get userIds(): string[];
    set userIds(value: string[]);
    /**
     * containing array of people used in the component.
     * @type {IDynamicPerson[]}
     */
    people: IDynamicPerson[];
    /**
     * allows developer to define queries of people for component
     * @type {string[]}
     */
    get peopleQueries(): string[];
    set peopleQueries(value: string[]);
    /**
     * developer determined max people shown in component
     * @type {number}
     */
    showMax: number;
    /**
     * determines if person component renders presence
     * @type {boolean}
     */
    showPresence: boolean;
    /**
     * Sets how the person-card is invoked
     * Set to PersonCardInteraction.none to not show the card
     *
     * @type {PersonCardInteraction}
     * @memberof MgtPerson
     */
    personCardInteraction: PersonCardInteraction;
    /**
     * The resource to get
     *
     * @type {string}
     * @memberof MgtPeople
     */
    get resource(): string;
    set resource(value: string);
    /**
     * Api version to use for request
     *
     * @type {string}
     * @memberof MgtPeople
     */
    get version(): string;
    set version(value: string);
    /**
     * The scopes to request
     *
     * @type {string[]}
     * @memberof MgtPeople
     */
    scopes: string[];
    /**
     * Fallback when no user is found
     * @type {IDynamicPerson[]}
     */
    get fallbackDetails(): IDynamicPerson[];
    set fallbackDetails(value: IDynamicPerson[]);
    /**
     * Get the scopes required for people
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtPeople
     */
    static get requiredScopes(): string[];
    private _groupId;
    private _userIds;
    private _peopleQueries;
    private _peoplePresence;
    private _resource;
    private _version;
    private _fallbackDetails;
    constructor();
    /**
     * Clears the state of the component
     *
     * @protected
     * @memberof MgtPeople
     */
    protected clearState(): void;
    /**
     * Request to reload the state.
     * Use reload instead of load to ensure loading events are fired.
     *
     * @protected
     * @memberof MgtBaseComponent
     */
    protected requestStateUpdate(force?: boolean): Promise<unknown>;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    protected render(): TemplateResult;
    /**
     * Render the loading state.
     *
     * @protected
     * @returns
     * @memberof MgtPeople
     */
    protected renderLoading(): TemplateResult;
    /**
     * Render the list of people.
     *
     * @protected
     * @param {*} people
     * @returns {TemplateResult}
     * @memberof MgtPeople
     */
    protected renderPeople(): TemplateResult;
    /**
     * Render the overflow content to represent any extra people, beyond the max.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPeople
     */
    protected renderOverflow(): TemplateResult;
    /**
     * Render an individual person.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPeople
     */
    protected renderPerson(person: MicrosoftGraph.User | MicrosoftGraph.Person | MicrosoftGraph.Contact): TemplateResult;
    /**
     * render the no data state.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPeople
     */
    protected renderNoData(): TemplateResult;
    /**
     * load state into the component.
     *
     * @protected
     * @returns
     * @memberof MgtPeople
     */
    protected loadState(): Promise<void>;
}
//# sourceMappingURL=mgt-people.d.ts.map