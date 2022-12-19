/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit-element';
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
 * Configuration object for the TeamsChannelPicker component
 *
 * @export
 * @interface MgtTeamsChannelPickerConfig
 */
export interface MgtTeamsChannelPickerConfig {
    /**
     * Sets or gets whether the teams channel picker component should use
     * the Teams based scopes instead of the User and Group based scopes
     *
     * @type {boolean}
     */
    useTeamsBasedScopes: boolean;
}
/**
 * Web component used to select channels from a User's Microsoft Teams profile
 *
 *
 * @class MgtTeamsChannelPicker
 * @extends {MgtTemplatedComponent}
 *
 * @fires selectionChanged - Fired when the selection changes
 *
 * @cssprop --color - {font} Default font color
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
 * @cssprop --dropdown-background-color - {Color} Background color of dropdown area
 * @cssprop --dropdown-item-hover-background - {Color} Background color of channel or team during hover
 * @cssprop --dropdown-item-selected-background - {Color} Background color of selected channel
 *
 * @cssprop --arrow-fill - {Color} Color of arrow svg
 * @cssprop --placeholder-color--focus - {Color} Color of placeholder text during focus state
 * @cssprop --placeholder-color - {Color} Color of placeholder text
 *
 */
export declare class MgtTeamsChannelPicker extends MgtTemplatedComponent {
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
     * Global Configuration object for all
     * teams channel picker components
     *
     * @static
     * @type {MgtTeamsChannelPickerConfig}
     * @memberof MgtTeamsChannelPicker
     */
    static get config(): MgtTeamsChannelPickerConfig;
    private static _config;
    /**
     * Gets Selected item to be used
     *
     * @readonly
     * @type {SelectedChannel}
     * @memberof MgtTeamsChannelPicker
     */
    get selectedItem(): SelectedChannel;
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
    private get _input();
    private _inputValue;
    private _isFocused;
    private _selectedItemState;
    private _items;
    private _treeViewState;
    private _focusList;
    private _focusedIndex;
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
     * Invoked on each update to perform rendering tasks. This method must return a lit-html TemplateResult.
     * Setting properties inside this method will not trigger the element to update.
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    render(): TemplateResult;
    /**
     * Renders selected channel
     *
     * @protected
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderSelected(): TemplateResult;
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
    protected renderSearchIcon(): TemplateResult;
    /**
     * Renders input field
     *
     * @protected
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderInput(): TemplateResult;
    /**
     * Renders close button
     *
     * @protected
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderCloseButton(): TemplateResult;
    /**
     * Renders dropdown content
     *
     * @param {ChannelPickerItemState[]} items
     * @param {number} [level=0]
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderDropdown(): any;
    /**
     * Renders the dropdown list recursively
     *
     * @protected
     * @param {ChannelPickerItemState[]} items
     * @param {number} [level=0]
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderDropdownList(items: ChannelPickerItemState[], level?: number): any;
    /**
     * Renders each Channel or Team
     *
     * @param {ChannelPickerItemState} itemState
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderItem(itemState: ChannelPickerItemState): TemplateResult;
    /**
     * Renders the channel with the query text higlighted
     *
     * @protected
     * @param {*} channel
     * @returns
     * @memberof MgtTeamsChannelPicker
     */
    protected renderHighlightedText(channel: any): TemplateResult;
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
    private handleItemClick;
    private handleInputChanged;
    private filterList;
    private generateTreeViewState;
    private generateFocusList;
    private resetFocusState;
    private loadTeamsIfNotLoaded;
    private handleWindowClick;
    private onUserKeyDown;
    private gainedFocus;
    private lostFocus;
    private selectChannel;
}
export {};
//# sourceMappingURL=mgt-teams-channel-picker.d.ts.map