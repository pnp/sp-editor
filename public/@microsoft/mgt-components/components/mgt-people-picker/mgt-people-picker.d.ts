/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { TemplateResult } from 'lit-element';
import { GroupType } from '../../graph/graph.groups';
import { PersonType, UserType } from '../../graph/graph.people';
import { IDynamicPerson } from '../../graph/types';
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import '../../styles/style-helper';
import '../sub-components/mgt-spinner/mgt-spinner';
import { MgtFlyout } from '../sub-components/mgt-flyout/mgt-flyout';
export { GroupType } from '../../graph/graph.groups';
export { PersonType, UserType } from '../../graph/graph.people';
/**
 * Web component used to search for people from the Microsoft Graph
 *
 * @export
 * @class MgtPicker
 * @extends {MgtTemplatedComponent}
 *
 * @fires selectionChanged - Fired when selection changes
 *
 * @cssprop --color - {Color} Default font color
 *
 * @cssprop --input-border - {String} Input section entire border
 * @cssprop --input-border-top - {String} Input section border top only
 * @cssprop --input-border-right - {String} Input section border right only
 * @cssprop --input-border-bottom - {String} Input section border bottom only
 * @cssprop --input-border-left - {String} Input section border left only
 * @cssprop --input-background-color - {Color} Input section background color
 * @cssprop --input-border-color--hover - {Color} Input border hover color
 * @cssprop --input-border-color--focus - {Color} Input border focus color
 *
 * @cssprop --selected-person-background-color - {Color} Selected person background color
 *
 * @cssprop --dropdown-background-color - {Color} Background color of dropdown area
 * @cssprop --dropdown-item-hover-background - {Color} Background color of person during hover
 *
 * @cssprop --placeholder-color--focus - {Color} Color of placeholder text during focus state
 * @cssprop --placeholder-color - {Color} Color of placeholder text
 *
 */
export declare class MgtPeoplePicker extends MgtTemplatedComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * user the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    protected get strings(): {
        inputPlaceholderText: string;
        noResultsFound: string;
        loadingMessage: string;
    };
    /**
     * Gets the flyout element
     *
     * @protected
     * @type {MgtFlyout}
     * @memberof MgtLogin
     */
    protected get flyout(): MgtFlyout;
    /**
     * Gets the input element
     *
     * @protected
     * @type {MgtFlyout}
     * @memberof MgtLogin
     */
    protected get input(): HTMLInputElement;
    /**
     * value determining if search is filtered to a group.
     * @type {string}
     */
    get groupId(): string;
    set groupId(value: string);
    /**
     * value determining if search is filtered to a group.
     * @type {PersonType}
     */
    get type(): PersonType;
    set type(value: PersonType);
    /**
     * type of group to search for - requires personType to be
     * set to "Group" or "All"
     * @type {GroupType}
     */
    get groupType(): GroupType;
    set groupType(value: GroupType);
    get userType(): UserType;
    set userType(value: UserType);
    /**
     * whether the return should contain a flat list of all nested members
     * @type {boolean}
     */
    transitiveSearch: boolean;
    /**
     * containing object of IDynamicPerson.
     * @type {IDynamicPerson[]}
     */
    people: IDynamicPerson[];
    /**
     * determining how many people to show in list.
     * @type {number}
     */
    showMax: number;
    /**
     *  array of user picked people.
     * @type {IDynamicPerson[]}
     */
    selectedPeople: IDynamicPerson[];
    /**
     * array of people to be selected upon intialization
     *
     * @type {string[]}
     * @memberof MgtPeoplePicker
     */
    defaultSelectedUserIds: string[];
    /**
     * array of groups to be selected upon intialization
     *
     * @type {string[]}
     * @memberof MgtPeoplePicker
     */
    defaultSelectedGroupIds: string[];
    /**
     * Placeholder text.
     *
     * @type {string}
     * @memberof MgtPeoplePicker
     */
    placeholder: string;
    /**
     * Determines whether component should be disabled or not
     *
     * @type {boolean}
     * @memberof MgtPeoplePicker
     */
    disabled: boolean;
    /**
     * Determines if a user can enter an email without selecting a person
     *
     * @type {boolean}
     * @memberof MgtPeoplePicker
     */
    allowAnyEmail: boolean;
    /**
     * Determines whether component allows multiple or single selection of people
     *
     * @type {string}
     * @memberof MgtPeoplePicker
     */
    selectionMode: string;
    /**
     * Get the scopes required for people picker
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtPeoplePicker
     */
    static get requiredScopes(): string[];
    /**
     * User input in search.
     *
     * @protected
     * @type {string}
     * @memberof MgtPeoplePicker
     */
    protected userInput: string;
    private _showLoading;
    private _groupId;
    private _type;
    private _groupType;
    private _userType;
    private defaultPeople;
    private _arrowSelectionCount;
    private _groupPeople;
    private _debouncedSearch;
    private defaultSelectedUsers;
    private defaultSelectedGroups;
    private _isFocused;
    private _foundPeople;
    constructor();
    /**
     * Focuses the input element when focus is called
     *
     * @param {FocusOptions} [options]
     * @memberof MgtPeoplePicker
     */
    focus(options?: FocusOptions): void;
    /**
     * Queries the microsoft graph for a user based on the user id and adds them to the selectedPeople array
     *
     * @param {readonly string []} an array of user ids to add to selectedPeople
     * @returns {Promise<void>}
     * @memberof MgtPeoplePicker
     */
    selectUsersById(userIds: readonly string[]): Promise<void>;
    /**
     * Queries the microsoft graph for a group of users from a group id, and adds them to the selectedPeople
     *
     * @param {readonly string []} an array of group ids to add to selectedPeople
     * @returns {Promise<void>}
     * @memberof MgtPeoplePicker
     */
    selectGroupsById(groupIds: readonly string[]): Promise<void>;
    /**
     * Invoked on each update to perform rendering tasks. This method must return a lit-html TemplateResult.
     * Setting properties inside this method will not trigger the element to update.
     * @returns {TemplateResult}
     * @memberof MgtPeoplePicker
     */
    render(): TemplateResult;
    /**
     * Clears state of the component
     *
     * @protected
     * @memberof MgtPeoplePicker
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
     * Render the input text box.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPeoplePicker
     */
    protected renderInput(): TemplateResult;
    /**
     * Render the selected people tokens.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPeoplePicker
     */
    protected renderSelectedPeople(selectedPeople?: IDynamicPerson[]): TemplateResult;
    /**
     * Render the flyout chrome.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPeoplePicker
     */
    protected renderFlyout(anchor: TemplateResult): TemplateResult;
    /**
     * Render the appropriate state in the results flyout.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPeoplePicker
     */
    protected renderFlyoutContent(): TemplateResult;
    /**
     * Render the loading state.
     *
     * @protected
     * @returns
     * @memberof MgtPeoplePicker
     */
    protected renderLoading(): TemplateResult;
    /**
     * Render the state when no results are found for the search query.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPeoplePicker
     */
    protected renderNoData(): TemplateResult;
    /**
     * Render the list of search results.
     *
     * @protected
     * @param {IDynamicPerson[]} people
     * @returns
     * @memberof MgtPeoplePicker
     */
    protected renderSearchResults(people?: IDynamicPerson[]): TemplateResult;
    /**
     * Render an individual person search result.
     *
     * @protected
     * @param {IDynamicPerson} person
     * @returns {TemplateResult}
     * @memberof MgtPeoplePicker
     */
    protected renderPersonResult(person: IDynamicPerson): TemplateResult;
    /**
     * Render an individual selected person token.
     *
     * @protected
     * @param {IDynamicPerson} person
     * @returns {TemplateResult}
     * @memberof MgtPeoplePicker
     */
    protected renderSelectedPerson(person: IDynamicPerson): TemplateResult;
    /**
     * Async query to Graph for members of group if determined by developer.
     * set's `this.groupPeople` to those members.
     */
    protected loadState(): Promise<void>;
    /**
     * Hide the results flyout.
     *
     * @protected
     * @memberof MgtPeoplePicker
     */
    protected hideFlyout(): void;
    /**
     * Show the results flyout.
     *
     * @protected
     * @memberof MgtPeoplePicker
     */
    protected showFlyout(): void;
    /**
     * Removes person from selected people
     * @param person - person and details pertaining to user selected
     */
    protected removePerson(person: IDynamicPerson, e: MouseEvent): void;
    /**
     * Tracks when user selects person from picker
     * @param person - contains details pertaining to selected user
     * @param event - tracks user event
     */
    protected addPerson(person: IDynamicPerson): void;
    private clearInput;
    private handleFlyout;
    private gainedFocus;
    private lostFocus;
    private renderHighlightText;
    /**
     * Adds debounce method for set delay on user input
     */
    private onUserKeyUp;
    private handleAnyEmail;
    private onPersonClick;
    /**
     * Tracks event on user input in search
     * @param input - input text
     */
    private handleUserSearch;
    /**
     * Tracks event on user search (keydown)
     * @param event - event tracked on user input (keydown)
     */
    private onUserKeyDown;
    /**
     * Tracks user key selection for arrow key selection of people
     * @param event - tracks user key selection
     */
    private handleArrowSelection;
    /**
     * Filters people searched from already selected people
     * @param people - array of people returned from query to Graph
     */
    private filterPeople;
    private handleSectionScroll;
}
//# sourceMappingURL=mgt-people-picker.d.ts.map