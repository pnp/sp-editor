/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import { IDynamicPerson } from '../../graph/types';
import { MgtFlyout } from '../sub-components/mgt-flyout/mgt-flyout';
import '../../styles/style-helper';
/**
 * Web component button and flyout control to facilitate Microsoft identity platform authentication
 *
 * @export
 * @class MgtLogin
 * @extends {MgtBaseComponent}
 *
 * @fires loginInitiated - Fired when login is initiated by the user
 * @fires loginCompleted - Fired when login completes
 * @fires loginFailed - Fired when login fails
 * @fires logoutInitiated - Fired when logout is initiated by the user
 * @fires logoutCompleted - Fired when logout completed
 *
 * @template signed-in-button-content (dataContext: {personDetails, personImage})
 * @template signed-out-button-content (dataContext: null)
 * @template flyout-commands (dataContext: {handleSignOut})
 * @template flyout-person-details (dataContext: {personDetails, personImage})
 *
 * @cssprop --font-size - {Length} Login font size
 * @cssprop --font-weight - {Length} Login font weight
 * @cssprop --height - {String} Login height percentage
 * @cssprop --margin - {String} Margin size
 * @cssprop --padding - {String} Padding size
 * @cssprop --button-color - {Color} Login button font color
 * @cssprop --button-color--hover - {Color} Login button font hover color
 * @cssprop --button-background-color - {Color} Login button background color
 * @cssprop --button-background-color--hover - {Color} Login background hover color
 * @cssprop --popup-background-color - {Color} Popup background color
 * @cssprop --popup-color - {Color} Popup font color
 * @cssprop --popup-command-font-size - {Length} Popup command font size
 */
export declare class MgtLogin extends MgtTemplatedComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    protected get strings(): {
        signInLinkSubtitle: string;
        signOutLinkSubtitle: string;
    };
    /**
     * allows developer to use specific user details for login
     * @type {IDynamicPerson}
     */
    userDetails: IDynamicPerson;
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
     * determines if login menu popup should be showing
     * @type {boolean}
     */
    private _isFlyoutOpen;
    private _image;
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
    logout(): Promise<void>;
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    protected render(): import("lit-element").TemplateResult;
    /**
     * Load state into the component.
     *
     * @protected
     * @returns
     * @memberof MgtLogin
     */
    protected loadState(): Promise<void>;
    /**
     * Render the button.
     *
     * @protected
     * @memberof MgtLogin
     */
    protected renderButton(): import("lit-element").TemplateResult;
    /**
     * Render the details flyout.
     *
     * @protected
     * @memberof MgtLogin
     */
    protected renderFlyout(): import("lit-element").TemplateResult;
    /**
     * Render the flyout menu content.
     *
     * @protected
     * @returns
     * @memberof MgtLogin
     */
    protected renderFlyoutContent(): import("lit-element").TemplateResult;
    /**
     * Render the flyout person details.
     *
     * @protected
     * @returns
     * @memberof MgtLogin
     */
    protected renderFlyoutPersonDetails(personDetails: IDynamicPerson, personImage: string): import("lit-element").TemplateResult;
    /**
     * Render the flyout commands.
     *
     * @protected
     * @returns
     * @memberof MgtLogin
     */
    protected renderFlyoutCommands(): import("lit-element").TemplateResult;
    /**
     * Render the button content.
     *
     * @protected
     * @returns
     * @memberof MgtLogin
     */
    protected renderButtonContent(): import("lit-element").TemplateResult;
    /**
     * Render the button content when the user is signed in.
     *
     * @protected
     * @returns
     * @memberof MgtLogin
     */
    protected renderSignedInButtonContent(personDetails: IDynamicPerson, personImage: string): import("lit-element").TemplateResult;
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
    protected renderSignedOutButtonContent(): import("lit-element").TemplateResult;
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
    private onClick;
}
//# sourceMappingURL=mgt-login.d.ts.map