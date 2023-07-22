/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit';
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import '../../styles/style-helper';
import '../sub-components/mgt-spinner/mgt-spinner';
/**
 * Team with displayName
 *
 * @export
 * @interface SelectedChannel
 */
export type Team = MicrosoftGraph.Team & {
    /**
     * Display name Of Team
     *
     * @type {string}
     */
    displayName?: string;
};
/**
 * Selected Channel item
 *
 * @export
 * @interface SelectedChannel
 */
export interface SelectedChannel {
    /**
     * Channel
     *
     * @type {MicrosoftGraph.Channel}
     * @memberof SelectedChannel
     */
    channel: MicrosoftGraph.Channel;
    /**
     * Team
     *
     * @type {MicrosoftGraph.Team}
     * @memberof SelectedChannel
     */
    team: Team;
}
/**
 * Drop down menu item state
 *
 * @interface DropdownItemState
 */
interface ChannelPickerItemState {
    /**
     * Microsoft Graph Channel or Team
     *
     * @type {(MicrosoftGraph.Channel | MicrosoftGraph.Team)}
     * @memberof ChannelPickerItemState
     */
    item: MicrosoftGraph.Channel | Team;
    /**
     * if dropdown item shows expanded state
     *
     * @type {boolean}
     * @memberof DropdownItemState
     */
    isExpanded?: boolean;
    /**
     * If item contains channels
     *
     * @type {ChannelPickerItemState[]}
     * @memberof DropdownItemState
     */
    channels?: ChannelPickerItemState[];
    /**
     * if Item has parent item (team)
     *
     * @type {ChannelPickerItemState}
     * @memberof DropdownItemState
     */
    parent: ChannelPickerItemState;
}
/**
 * Web component used to select channels from a User's Microsoft Teams profile
 *
 *
 * @class MgtTeamsChannelPicker
 * @extends {MgtTemplatedComponent}
 *
 * @fires {CustomEvent<SelectedChannel | null>} selectionChanged - Fired when the selection changes
 *
 * @cssprop --channel-picker-input-border-color - {Color} Input border color
 * @cssprop --channel-picker-input-background-color - {Color} Input section background color
 * @cssprop --channel-picker-input-background-color-hover - {Color} Input background hover color
 * @cssprop --channel-picker-input-background-color-focus - {Color} Input background focus color
 *
 * @cssprop --channel-picker-dropdown-background-color - {Color} Background color of dropdown area
 * @cssprop --channel-picker-dropdown-item-text-color - {Color} Text color of the dropdown text.
 * @cssprop --channel-picker-dropdown-item-background-color-hover - {Color} Background color of channel or team during hover
 * @cssprop --channel-picker-dropdown-item-text-color-selected - {Color} Text color of channel or team during after selection
 *
 * @cssprop --channel-picker-arrow-fill - {Color} Color of arrow svg
 * @cssprop --channel-picker-input-placeholder-text-color - {Color} Color of placeholder text
 * @cssprop --channel-picker-input-placeholder-text-color-focus - {Color} Color of placeholder text during focus state
 * @cssprop --channel-picker-input-placeholder-text-color-hover - {Color} Color of placeholder text during hover state
 *
 * @cssprop --channel-picker-search-icon-color - {Color} the search icon color.
 * @cssprop --channel-picker-down-chevron-color - {Color} the down chevron icon color.
 * @cssprop --channel-picker-up-chevron-color - {Color} the up chevron icon color.
 * @cssprop --channel-picker-close-icon-color - {Color} the close icon color.
 *
 */
export declare class MgtTeamsChannelPicker extends MgtTemplatedComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * user the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    /**
     * Strings for localization
     *
     * @readonly
     * @protected
     * @memberof MgtTeamsChannelPicker
     */
    protected get strings(): {
        inputPlaceholderText: string;
        noResultsFound: string;
        loadingMessage: string;
        photoFor: string;
        teamsChannels: string;
        closeButtonAriaLabel: string;
    };
    private teamsPhotos;
    /**
     * Gets Selected item to be used
     *
     * @readonly
     * @type {SelectedChannel}
     * @memberof MgtTeamsChannelPicker
     */
    get selectedItem(): SelectedChannel | null;
    /**
     * Get the scopes required for teams channel picker
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtTeamsChannelPicker
     */
    static get requiredScopes(): string[];
    private set items(value);
    private get items();
    private get _inputWrapper();
    private get _input();
    private _inputValue;
    private _selectedItemState;
    private _items;
    private _treeViewState;
    private _focusList;
    private debouncedSearch;
    private _isDropdownVisible;
    constructor();
    /**
     * Invoked each time the custom element is appended into a document-connected element
     *
     * @memberof MgtTeamsChannelPicker
     */
    connectedCallback(): void;
    /**
     * Invoked each time the custom element is disconnected from the document's DOM
     *
     * @memberof MgtTeamsChannelPicker
     */
    disconnectedCallback(): void;
    /**
     * selects a channel by looking up the id in the Graph
     *
     * @param {string} channelId MicrosoftGraph.Channel.id
     * @returns {Promise<return>} A promise that will resolve to true if channel was selected
     * @memberof MgtTeamsChannelPicker
     */
    selectChannelById(channelId: string): Promise<boolean>;
    /**
     * Marks a channel selected by ID as selected in the dropdown menu.
     * It ensures the parent team is set to as expanded to show the channel.
     *
     * @param channelId ID string of the selected channel
     */
    private markSelectedChannelInDropdown;
    /**
     * Invoked on each update to perform rendering tasks. This method must return a lit-html TemplateResult.
     * Setting properties inside this method will not trigger the element to update.
     *
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    render(): TemplateResult;
    /**
     * Handles clicks on the input section.
     *
     * @param e {UIEvent}
     */
    handleInputClick: (e: UIEvent) => void;
    handleInputKeydown: (e: KeyboardEvent) => void;
    /**
     * Renders selected channel
     *
     * @protected
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderSelected(): TemplateResult<1>;
    /**
     * Clears the state of the component
     *
     * @protected
     * @memberof MgtTeamsChannelPicker
     */
    protected clearState(): void;
    /**
     * Renders search icon
     *
     * @protected
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderSearchIcon(): TemplateResult<1>;
    /**
     * Renders close button
     *
     * @protected
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderCloseButton(): TemplateResult<1>;
    /**
     * Handles clicks on the close button after selecting a channel.
     *
     * @param e {UIEvent}
     */
    onClickCloseButton: () => void;
    /**
     * Handles keypresses on the close button.
     *
     * @param e {KeyboardEvent}
     */
    onKeydownCloseButton: (e: KeyboardEvent) => void;
    /**
     * Displays the close button after selecting a channel.
     */
    protected showCloseIcon(): void;
    /**
     * Renders down chevron icon
     *
     * @protected
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderDownChevron(): TemplateResult<1>;
    /**
     * Renders up chevron icon
     *
     * @protected
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderUpChevron(): TemplateResult<1>;
    /**
     * Renders both chevrons
     */
    private renderChevrons;
    /**
     * Renders dropdown content
     *
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderDropdown(): TemplateResult;
    /**
     * Renders the dropdown list recursively
     *
     * @protected
     * @param {ChannelPickerItemState[]} items
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderDropdownList(items: ChannelPickerItemState[]): TemplateResult<1>;
    /**
     * Renders each Channel or Team
     *
     * @param {ChannelPickerItemState} itemState
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderItem(itemState: ChannelPickerItemState): TemplateResult<1>;
    /**
     * Renders an error message when no channel or teams match the query
     *
     * @protected
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderError(): TemplateResult;
    /**
     * Renders loading spinner while channels are fetched from the Graph
     *
     * @protected
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderLoading(): TemplateResult;
    /**
     * Queries Microsoft Graph for Teams & respective channels then sets to items list
     *
     * @protected
     * @memberof MgtTeamsChannelPicker
     */
    protected loadState(): Promise<void>;
    /**
     * Handles operations that are performed on the DOM when you remove a
     * channel. For example on clicking the X button.
     *
     * @param item a selected channel item
     */
    private removeSelectedChannel;
    onKeydownTreeView: (e: KeyboardEvent) => void;
    private handleItemClick;
    handleTeamTreeItemClick: (event: Event) => void;
    handleInputChanged: (e: KeyboardEvent) => void;
    private onUserKeyDown;
    private filterList;
    private generateTreeViewState;
    private generateFocusList;
    private resetFocusState;
    private loadTeamsIfNotLoaded;
    private readonly handleWindowClick;
    private readonly gainedFocus;
    private readonly lostFocus;
    handleFocus: () => void;
    private selectChannel;
    /**
     * Hides the close icon.
     */
    private hideCloseIcon;
    /**
     * Toggles the up and down chevron depending on the dropdown
     * visibility.
     */
    private toggleChevron;
    handleUpChevronClick: (e: Event) => void;
}
export {};
//# sourceMappingURL=mgt-teams-channel-picker.d.ts.map