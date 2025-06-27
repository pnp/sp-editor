/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit';
import { IDynamicPerson } from '../../graph/types';
import { MgtTemplatedTaskComponent } from '@microsoft/mgt-element';
import '../../styles/style-helper';
import { type PersonCardInteraction } from './../PersonCardInteraction';
/**
 * web component to display a group of people or contacts by using their photos or initials.
 *
 * @export
 * @class MgtPeople
 * @extends {MgtTemplatedTaskComponent}
 *
 * @fires {CustomEvent<undefined>} updated - Fired when the component is updated
 *
 * @cssprop --people-list-margin- {String} the margin around the list of people. Default is 8px 4px 8px 8px.
 * @cssprop --people-avatar-gap - {String} the gap between the people in the list. Default is 4px.
 * @cssprop --people-overflow-font-color - {Color} the color of the overflow text.
 * @cssprop --people-overflow-font-size - {String} the text color of the overflow text. Default is 12px.
 * @cssprop --people-overflow-font-weight - {String} the font weight of the overflow text. Default is 400.
 * @cssprop --people-person-avatar-size - {Length} the size of the avatar. Default is 24px.
 */
export declare const registerMgtPeopleComponent: () => void;
export declare class MgtPeople extends MgtTemplatedTaskComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    /**
     * determines if agenda events come from specific group
     *
     * @type {string}
     */
    groupId: string;
    /**
     * user id array
     *
     * @memberof MgtPeople
     */
    userIds: string[];
    /**
     * containing array of people used in the component.
     *
     * @type {IDynamicPerson[]}
     */
    people: IDynamicPerson[];
    /**
     * allows developer to define queries of people for component
     *
     * @type {string[]}
     */
    peopleQueries: string[];
    /**
     * developer determined max people shown in component
     *
     * @type {number}
     */
    showMax: number;
    /**
     * determines if person component renders presence
     *
     * @type {boolean}
     */
    showPresence: boolean;
    /**
     * Sets how the person-card is invoked
     * Valid options are: 'none', 'hover', or 'click'
     * Set to 'none' to not show the card
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
    resource: string;
    /**
     * Api version to use for request
     *
     * @type {string}
     * @memberof MgtPeople
     */
    version: string;
    /**
     * The scopes to request
     *
     * @type {string[]}
     * @memberof MgtPeople
     */
    scopes: string[];
    /**
     * Fallback when no user is found
     *
     * @type {IDynamicPerson[]}
     */
    fallbackDetails: IDynamicPerson[];
    /**
     * Get the scopes required for people
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtPeople
     */
    static get requiredScopes(): string[];
    private _peoplePresence;
    private _arrowKeyLocation;
    constructor();
    /**
     * Clears the state of the component
     *
     * @protected
     * @memberof MgtPeople
     */
    protected clearState(): void;
    protected args(): unknown[];
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    protected renderContent: () => TemplateResult;
    protected updated(changedProperties: Map<string | number | symbol, unknown>): void;
    private checkPeopleListAndFireEvent;
    /**
     * Render the loading state.
     *
     * @protected
     * @returns
     * @memberof MgtPeople
     */
    protected renderLoading: () => TemplateResult;
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
     * Handles the keypresses on a keyboard for the listed people.
     *
     * @param event is a KeyboardEvent.
     */
    protected handleKeyDown: (event: KeyboardEvent) => void;
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