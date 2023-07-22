/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { TemplateResult } from 'lit';
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
 * @fires {CustomEvent<IDynamicPerson[]>} selectionChanged - Fired when set of selected people changes
 *
 * @cssprop --people-picker-selected-option-background-color - {Color} the background color of the selected person.
 * @cssprop --people-picker-selected-option-highlight-background-color - {Color} the background color of the selected person when you select it for copy/cut.
 * @cssprop --people-picker-dropdown-background-color - {Color} the background color of the dropdown card.
 * @cssprop --people-picker-dropdown-result-background-color - {Color} the background color of the dropdown result.
 * @cssprop --people-picker-dropdown-result-hover-background-color - {Color} the background color of the dropdown result on hover.
 * @cssprop --people-picker-dropdown-result-focus-background-color - {Color} the background color of the dropdown result on focus.
 * @cssprop --people-picker-no-results-text-color - {Color} the no results found text color.
 * @cssprop --people-picker-input-background - {Color} the input background color.
 * @cssprop --people-picker-input-border-color - {Color} the input border color.
 * @cssprop --people-picker-input-hover-background - {Color} the input background color when you hover.
 * @cssprop --people-picker-input-hover-border-color - {Color} the input border color when you hover
 * @cssprop --people-picker-input-focus-background - {Color} the input background color when you focus.
 * @cssprop --people-picker-input-focus-border-color - {Color} the input border color when you focus.
 * @cssprop --people-picker-input-placeholder-focus-text-color - {Color} the placeholder text color when you focus.
 * @cssprop --people-picker-input-placeholder-hover-text-color - {Color} the placeholder text color when you hover.
 * @cssprop --people-picker-input-placeholder-text-color - {Color} the placeholder text color.
 * @cssprop --people-picker-search-icon-color - {Color} the search icon color
 * @cssprop --people-picker-remove-selected-close-icon-color - {Color} the remove selected person close icon color.
 */
export declare class MgtPeoplePicker extends MgtTemplatedComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * user the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    /**
     * The strings to be used for localizing the component.
     *
     * @readonly
     * @protected
     * @memberof MgtPeoplePicker
     */
    protected get strings(): {
        inputPlaceholderText: string;
        maxSelectionsPlaceHolder: string;
        maxSelectionsAriaLabel: string;
        noResultsFound: string;
        loadingMessage: string;
        selected: string;
        removeSelectedUser: string;
        selectContact: string;
        suggestionsTitle: string;
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
     *
     * @type {string}
     */
    get groupId(): string;
    set groupId(value: string);
    /**
     * array of groups for search to be filtered by.
     *
     * @type {string[]}
     */
    get groupIds(): string[];
    set groupIds(value: string[]);
    /**
     * value determining if search is filtered to a group.
     *
     * @type {PersonType}
     */
    get type(): PersonType;
    set type(value: PersonType);
    /**
     * type of group to search for - requires personType to be
     * set to "Group" or "All"
     *
     * @type {GroupType}
     */
    get groupType(): GroupType;
    set groupType(value: GroupType);
    /**
     * The type of user to search for. Default is any.
     *
     * @readonly
     * @type {UserType}
     * @memberof MgtPeoplePicker
     */
    get userType(): UserType;
    set userType(value: UserType);
    /**
     * whether the return should contain a flat list of all nested members
     *
     * @type {boolean}
     */
    get transitiveSearch(): boolean;
    set transitiveSearch(value: boolean);
    /**
     * containing object of IDynamicPerson.
     *
     * @type {IDynamicPerson[]}
     */
    get people(): IDynamicPerson[];
    set people(value: IDynamicPerson[]);
    /**
     * determining how many people to show in list.
     *
     * @type {number}
     */
    get showMax(): number;
    set showMax(value: number);
    /**
     * Sets whether the person image should be fetched
     * from the Microsoft Graph
     *
     * @type {boolean}
     * @memberof MgtPerson
     */
    disableImages: boolean;
    /**
     * array of user picked people.
     *
     * @type {IDynamicPerson[]}
     */
    get selectedPeople(): IDynamicPerson[];
    set selectedPeople(value: IDynamicPerson[]);
    /**
     * array of people to be selected upon initialization
     *
     * @type {string[]}
     * @memberof MgtPeoplePicker
     */
    get defaultSelectedUserIds(): string[];
    set defaultSelectedUserIds(value: string[]);
    /**
     * array of groups to be selected upon initialization
     *
     * @type {string[]}
     * @memberof MgtPeoplePicker
     */
    get defaultSelectedGroupIds(): string[];
    set defaultSelectedGroupIds(value: string[]);
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
     * Array of the only users to be searched.
     *
     * @type {string[]}
     * @memberof MgtPeoplePicker
     */
    get userIds(): string[];
    set userIds(value: string[]);
    /**
     * Filters that can be set on the user properties query.
     */
    get userFilters(): string;
    set userFilters(value: string);
    /**
     * Filters that can be set on the people query properties.
     */
    get peopleFilters(): string;
    set peopleFilters(value: string);
    /**
     * Filters that can be set on the group query properties.
     */
    get groupFilters(): string;
    set groupFilters(value: string);
    /**
     * Label that can be set on the people picker input to provide context to
     * assistive technologies
     */
    ariaLabel: string;
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
    private _userIds;
    private _groupId;
    private _groupIds;
    private _type;
    private _groupType;
    private _userType;
    private _userFilters;
    private _groupFilters;
    private _peopleFilters;
    private _defaultSelectedGroupIds;
    private _defaultSelectedUserIds;
    private _selectedPeople;
    private _showMax;
    private _people;
    private _transitiveSearch;
    private defaultPeople;
    private _arrowSelectionCount;
    private _groupPeople;
    private _debouncedSearch;
    private defaultSelectedUsers;
    private defaultSelectedGroups;
    private _highlightedUsers;
    private _currentHighlightedUserPos;
    /**
     * Checks if the input is focused.
     */
    private _isFocused;
    /**
     * Switch to determine if a typed email can be set.
     */
    private _setAnyEmail;
    /**
     * List of people found from the graph calls.
     */
    private _foundPeople;
    constructor();
    private get hasMaxSelections();
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
     *
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
    protected renderInput(selectedPeopleTemplate: TemplateResult): TemplateResult;
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
    protected renderSearchResults(people: IDynamicPerson[]): TemplateResult<1>;
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
     * Gets the Groups in a list of group IDs.
     *
     * @param graph the graph object
     * @param people already found groups
     * @returns groups found
     */
    private getGroupsForGroupIds;
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
     *
     * @param person - person and details pertaining to user selected
     */
    protected removePerson(person: IDynamicPerson, e: UIEvent): void;
    /**
     * Checks if key pressed is an `Enter` key before removing person
     *
     * @param person
     * @param e
     */
    protected handleRemovePersonKeyDown(person: IDynamicPerson, e: KeyboardEvent): void;
    /**
     * Tracks when user selects person from picker
     *
     * @param person - contains details pertaining to selected user
     * @param event - tracks user event
     */
    protected addPerson(person: IDynamicPerson): void;
    private clearInput;
    private readonly handleInputClick;
    private readonly gainedFocus;
    private readonly lostFocus;
    /**
     * Handles input from the key up events on the keyboard.
     */
    private readonly onUserKeyUp;
    private readonly onUserInput;
    private handleAnyEmail;
    private handleSuggestionClick;
    /**
     * Tracks event on user input in search
     *
     * @param input - input text
     */
    private handleUserSearch;
    /**
     * Tracks event on user search (keydown)
     *
     * @param event - event tracked on user input (keydown)
     */
    private readonly onUserKeyDown;
    /**
     * Gets the text of the highlighed people and writes it to the clipboard
     */
    private writeHighlightedText;
    /**
     * Handles the cut event when it is fired
     */
    private readonly handleCut;
    /**
     * Handles the copy event when it is fired
     */
    private readonly handleCopy;
    /**
     * Parses the copied people text and adds them when you paste
     */
    private readonly handlePaste;
    /**
     * Removes only the highlighted elements from the peoplePicker during cut operations.
     */
    private removeHighlightedOnCut;
    /**
     * Changes the color class to show which people are selected for copy/cut-paste
     *
     * @param people list of selected people classes
     */
    private highlightSelectedPeople;
    /**
     * Defaults the people class back to the normal view
     */
    private clearHighlighted;
    /**
     * Tracks user key selection for arrow key selection of people
     *
     * @param event - tracks user key selection
     */
    private handleArrowSelection;
    /**
     * Filters people searched from already selected people
     *
     * @param people - array of people returned from query to Graph
     */
    private filterPeople;
    private handleSectionScroll;
}
//# sourceMappingURL=mgt-people-picker.d.ts.map