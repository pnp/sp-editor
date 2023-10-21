/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { CSSResult, TemplateResult } from 'lit';
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import { IDynamicPerson } from '../../graph/types';
import { MgtFlyout } from '../sub-components/mgt-flyout/mgt-flyout';
import '../../styles/style-helper';
/**
 * loginViewType describes the enum strings that can be passed in to determine
 * size of the mgt-login control.
 */
export type LoginViewType = 'avatar' | 'compact' | 'full';
/**
 * Web component button and flyout control to facilitate Microsoft identity platform authentication
 *
 * @export
 * @class MgtLogin
 * @extends {MgtBaseComponent}
 *
 * @fires {CustomEvent<undefined>} loginInitiated - Fired when login is initiated by the user
 * @fires {CustomEvent<undefined>} loginCompleted - Fired when login completes
 * @fires {CustomEvent<undefined>} loginFailed - Fired when login fails
 * @fires {CustomEvent<undefined>} logoutInitiated - Fired when logout is initiated by the user
 * @fires {CustomEvent<undefined>} logoutCompleted - Fired when logout completed
 *
 * @template signed-in-button-content (dataContext: {personDetails, personImage})
 * @template signed-out-button-content (dataContext: null)
 * @template flyout-commands (dataContext: {handleSignOut})
 * @template flyout-person-details (dataContext: {personDetails, personImage})
 *
 * @cssprop --login-signed-in-background - {String} the background properties of the component when signed in.
 * @cssprop --login-signed-in-hover-background - {String} the background properties of the component when signed in.
 * @cssprop --login-signed-out-button-background - {String} the background properties of the component when signed out.
 * @cssprop --login-signed-out-button-hover-background - {String} the background properties of the component when signed out.
 * @cssprop --login-signed-out-button-text-color - {Color} the background color of the component when signed out.
 * @cssprop --login-button-padding - {Length} the padding of the button. Default is 0px.
 * @cssprop --login-popup-background-color - {Color} the background color of the popup.
 * @cssprop --login-popup-command-button-background-color - {Color} the color of the background to the popup command button.
 * @cssprop --login-popup-padding - {Length} the padding applied to the popup card. Default is 16px.
 * @cssprop --login-add-account-button-text-color - {Color} the color for the text and icon of the add account button.
 * @cssprop --login-add-account-button-background-color - {Color} the color for the background and icon of the add account button.
 * @cssprop --login-add-account-button-hover-background-color - {Color} the color for the background and icon of the add account button on hover.
 * @cssprop --login-command-button-text-color - {Color} the color for the text of the command button.
 * @cssprop --login-command-button-background-color - {Color} the color for the background of the command button.
 * @cssprop --login-command-button-hover-background-color - {Color} the color for the background of the command button on hovering.
 * @cssprop --login-account-item-hover-bg-color - {Color} the background color of the account item on hover.
 * @cssprop --login-flyout-command-text-color - {Color} the color for the text of the flyout command button.
 */
export declare class MgtLogin extends MgtTemplatedComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): CSSResult[];
    /**
     * Returns the object of strings for localization
     *
     * @readonly
     * @protected
     * @memberof MgtLogin
     */
    protected get strings(): Record<string, string>;
    /**
     * Allows developer to use specific user details for login.
     *
     * @type {IDynamicPerson}
     */
    userDetails: IDynamicPerson;
    /**
     * Determines if presence is shown for logged in user
     * defaults to false
     *
     * @type {boolean}
     */
    showPresence: boolean;
    /**
     * Determines the view style to apply to the logged in user
     * options are 'full', 'compact', 'avatar', defaults to 'full'
     *
     * @type {LoginViewType}
     */
    loginView: LoginViewType;
    /**
     * Gets the flyout element
     *
     * @protected
     * @type {MgtFlyout}
     * @memberof MgtLogin
     */
    protected get flyout(): MgtFlyout;
    /**
     * Get the scopes required for login
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtLogin
     */
    static get requiredScopes(): string[];
    /**
     * Determines if login menu popup should be showing.
     *
     * @private
     * @type {boolean}
     */
    private _isFlyoutOpen;
    /**
     * The image blob string
     *
     * @private
     * @type {string}
     * @memberof MgtLogin
     */
    private _image;
    /**
     * Suffix for user details key
     *
     * @private
     * @type {string}
     * @memberof MgtLogin
     */
    private get _userDetailsKey();
    private _arrowKeyLocation;
    constructor();
    /**
     * Invoked each time the custom element is appended into a document-connected element
     *
     * @memberof MgtLogin
     */
    connectedCallback(): void;
    /**
     * Initiate login
     *
     * @returns {Promise<void>}
     * @memberof MgtLogin
     */
    login(): Promise<void>;
    /**
     * Initiate logout
     *
     * @returns {Promise<void>}
     * @memberof MgtLogin
     */
    logout: () => Promise<void>;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     *
     * @protected
     * @returns {TemplateResult}
     */
    protected render(): TemplateResult;
    /**
     * Load state into the component.
     *
     * @protected
     * @memberof MgtLogin
     */
    protected loadState(): Promise<void>;
    /**
     * Render the sign in or sign out button.
     *
     * @protected
     * @memberof MgtLogin
     * @returns {TemplateResult}
     */
    protected renderButton(): TemplateResult;
    private readonly flyoutOpened;
    private readonly flyoutClosed;
    /**
     * Render the details flyout.
     *
     * @protected
     * @memberof MgtLogin
     * @returns {TemplateResult}
     */
    protected renderFlyout(): TemplateResult;
    /**
     * Tracks tabbing through the flyout (keydown)
     */
    private readonly onUserKeyDown;
    /**
     * Render the flyout menu content.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtLogin
     */
    protected renderFlyoutContent(): TemplateResult;
    private get hasMultipleAccounts();
    private get usesVerticalPersonCard();
    /**
     * Render the flyout person details.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtLogin
     */
    protected renderFlyoutPersonDetails(personDetails: IDynamicPerson, personImage: string): TemplateResult;
    /**
     * Render the flyout commands.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtLogin
     */
    protected renderFlyoutCommands(): TemplateResult;
    /**
     * Render the button content.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtLogin
     */
    protected renderButtonContent(): TemplateResult;
    /**
     * Renders the button to allow adding accounts.
     *
     * @protected
     * @returns
     * @memberof MgtLogin
     */
    protected renderAddAccountContent(): TemplateResult<1>;
    private parsePersonDisplayConfiguration;
    /**
     * Render the button content when the user is signed in.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtLogin
     */
    protected renderSignedInButtonContent(personDetails: IDynamicPerson, personImage: string): TemplateResult;
    /**
     * Renders multiple accounts that can be used to sign in.
     *
     * @return {TemplateResult}
     * @memberof MgtLogin
     */
    renderAccounts(): TemplateResult;
    private readonly handleAccountListKeyDown;
    /**
     * Set one of the non-active accounts as the active account
     *
     * @param {IProviderAccount} account
     * @memberof MgtLogin
     */
    private setActiveAccount;
    /**
     * Clears state of the component
     *
     * @protected
     * @memberof MgtLogin
     */
    protected clearState(): void;
    /**
     * Render the button content when the user is not signed in.
     *
     * @protected
     * @returns
     * @memberof MgtLogin
     */
    protected renderSignedOutButtonContent(): TemplateResult;
    /**
     * Show the flyout and its content.
     *
     * @protected
     * @memberof MgtLogin
     */
    protected showFlyout(): void;
    /**
     * Dismiss the flyout.
     *
     * @protected
     * @memberof MgtLogin
     */
    protected hideFlyout(): void;
    /**
     * Handles the click on the button in the flyout.
     *
     * @private
     * @memberof MgtLogin
     */
    private readonly onClick;
}
//# sourceMappingURL=mgt-login.d.ts.map