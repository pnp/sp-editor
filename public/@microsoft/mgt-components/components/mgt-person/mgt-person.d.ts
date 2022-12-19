/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Presence } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit-element';
import { AvatarSize, IDynamicPerson, ViewType } from '../../graph/types';
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import '../../styles/style-helper';
import '../sub-components/mgt-flyout/mgt-flyout';
import { MgtFlyout } from '../sub-components/mgt-flyout/mgt-flyout';
import { PersonCardInteraction } from './../PersonCardInteraction';
export { PersonCardInteraction } from '../PersonCardInteraction';
/**
 * Enumeration to define what parts of the person component render
 *
 * @export
 * @enum {number}
 */
export declare enum PersonViewType {
    /**
     * Render only the avatar
     */
    avatar = 2,
    /**
     * Render the avatar and one line of text
     */
    oneline = 3,
    /**
     * Render the avatar and two lines of text
     */
    twolines = 4,
    /**
     * Render the avatar and three lines of text
     */
    threelines = 5
}
export declare enum avatarType {
    /**
     * Renders avatar photo if available, falls back to initials
     */
    photo = "photo",
    /**
     * Forces render avatar initials
     */
    initials = "initials"
}
/**
 * Configuration object for the Person component
 *
 * @export
 * @interface MgtPersonConfig
 */
export interface MgtPersonConfig {
    /**
     * Sets or gets whether the person component can use Contacts APIs to
     * find contacts and their images
     *
     * @type {boolean}
     */
    useContactApis: boolean;
}
/**
 * The person component is used to display a person or contact by using their photo, name, and/or email address.
 *
 * @export
 * @class MgtPerson
 * @extends {MgtTemplatedComponent}
 *
 * @fires line1clicked - Fired when line1 is clicked
 * @fires line2clicked - Fired when line2 is clicked
 * @fires line3clicked - Fired when line3 is clicked
 *
 * @cssprop --avatar-size - {Length} Avatar size
 * @cssprop --avatar-border - {String} Avatar border
 * @cssprop --avatar-border-radius - {String} Avatar border radius
 * @cssprop --avatar-cursor - {String} Avatar cursor
 * @cssprop --initials-color - {Color} Initials color
 * @cssprop --initials-background-color - {Color} Initials background color
 * @cssprop --font-family - {String} Font family
 * @cssprop --font-size - {Length} Font size
 * @cssprop --font-weight - {Length} Font weight
 * @cssprop --color - {Color} Color
 * @cssprop --presence-background-color - {Color} Presence badge background color
 * @cssprop --presence-icon-color - {Color} Presence badge icon color
 * @cssprop --text-transform - {String} text transform
 * @cssprop --line2-font-size - {Length} Line 2 font size
 * @cssprop --line2-font-weight - {Length} Line 2 font weight
 * @cssprop --line2-color - {Color} Line 2 color
 * @cssprop --line2-text-transform - {String} Line 2 text transform
 * @cssprop --line3-font-size - {Length} Line 2 font size
 * @cssprop --line3-font-weight - {Length} Line 2 font weight
 * @cssprop --line3-color - {Color} Line 2 color
 * @cssprop --line3-text-transform - {String} Line 2 text transform
 * @cssprop --details-spacing - {Length} spacing between avatar and person details
 */
export declare class MgtPerson extends MgtTemplatedComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    protected get strings(): {
        photoFor: string;
        emailAddress: string;
        initials: string;
    };
    /**
     * Global Configuration object for all
     * person components
     *
     * @static
     * @type {MgtPersonConfig}
     * @memberof MgtPerson
     */
    static config: MgtPersonConfig;
    /**
     * allows developer to define name of person for component
     * @type {string}
     */
    get personQuery(): string;
    set personQuery(value: string);
    /**
     * Fallback when no user is found
     * @type {IDynamicPerson}
     */
    get fallbackDetails(): IDynamicPerson;
    set fallbackDetails(value: IDynamicPerson);
    /**
     * user-id property allows developer to use id value to determine person
     * @type {string}
     */
    get userId(): string;
    set userId(value: string);
    /**
     * determines if person component renders presence
     * @type {boolean}
     */
    showPresence: boolean;
    /**
     * determines person component avatar size and apply presence badge accordingly
     * @type {AvatarSize}
     */
    avatarSize: AvatarSize;
    /**
     * object containing Graph details on person
     * a copy of person-details attribute
     * @type {IDynamicPerson}
     */
    private get personDetailsInternal();
    private set personDetailsInternal(value);
    /**
     * object containing Graph details on person
     * @type {IDynamicPerson}
     */
    get personDetails(): IDynamicPerson;
    set personDetails(value: IDynamicPerson);
    /**
     * Set the image of the person
     *
     * @type {string}
     * @memberof MgtPersonCard
     */
    get personImage(): string;
    set personImage(value: string);
    /**
     * Sets whether the person image should be fetched
     * from the Microsoft Graph based on the personDetailsInternal
     * provided by the user
     *
     * @type {boolean}
     * @memberof MgtPerson
     */
    fetchImage: boolean;
    /**
     * Sets whether to disable the person image fetch
     * from the Microsoft Graph
     *
     * @type {boolean}
     * @memberof MgtPerson
     */
    disableImageFetch: boolean;
    /**
     * Determines and sets person avatar
     *
     *
     * @type {string}
     * @memberof MgtPerson
     */
    get avatarType(): string;
    set avatarType(value: string);
    /**
     * Gets or sets presence of person
     *
     * @type {MicrosoftGraph.Presence}
     * @memberof MgtPerson
     */
    get personPresence(): Presence;
    set personPresence(value: Presence);
    /**
     * Sets how the person-card is invoked
     * Set to PersonCardInteraction.none to not show the card
     *
     * @type {PersonCardInteraction}
     * @memberof MgtPerson
     */
    personCardInteraction: PersonCardInteraction;
    /**
     * Get the scopes required for person
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtPerson
     */
    static get requiredScopes(): string[];
    /**
     * Gets the flyout element
     *
     * @protected
     * @type {MgtFlyout}
     * @memberof MgtPerson
     */
    protected get flyout(): MgtFlyout;
    /**
     * Sets the property of the personDetailsInternal to use for the first line of text.
     * Default is displayName.
     *
     * @type {string}
     * @memberof MgtPerson
     */
    line1Property: string;
    /**
     * Sets the property of the personDetailsInternal to use for the second line of text.
     * Default is mail.
     *
     * @type {string}
     * @memberof MgtPerson
     */
    line2Property: string;
    /**
     * Sets the property of the personDetailsInternal to use for the second line of text.
     * Default is mail.
     *
     * @type {string}
     * @memberof MgtPerson
     */
    line3Property: string;
    /**
     * Sets what data to be rendered (image only, oneLine, twoLines).
     * Default is 'image'.
     *
     * @type {ViewType | PersonViewType}
     * @memberof MgtPerson
     */
    view: ViewType | PersonViewType;
    private _fetchedImage;
    private _fetchedPresence;
    private _isInvalidImageSrc;
    private _personCardShouldRender;
    private _personDetailsInternal;
    private _personDetails;
    private _fallbackDetails;
    private _personAvatarBg;
    private _personImage;
    private _personPresence;
    private _personQuery;
    private _userId;
    private _avatarType;
    private _mouseLeaveTimeout;
    private _mouseEnterTimeout;
    constructor();
    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult. Setting properties inside this method will *not*
     * trigger the element to update.
     */
    render(): TemplateResult;
    /**
     * Render the loading state
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPerson
     */
    protected renderLoading(): TemplateResult;
    /**
     * Clears state of the component
     *
     * @protected
     * @memberof MgtPerson
     */
    protected clearState(): void;
    /**
     * Render the state when no data is available
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPerson
     */
    protected renderNoData(): TemplateResult;
    /**
     * Render the image part of the person template.
     * If the image is unavailable, the person's initials will be used instead.
     *
     * @protected
     * @param {string} [imageSrc]
     * @param {IDynamicPerson} [personDetailsInternal]
     * @returns
     * @memberof MgtPerson
     */
    protected renderImage(personDetailsInternal: IDynamicPerson, imageSrc: string): TemplateResult;
    /**
     * Render presence for the person.
     *
     * @protected
     * @param
     * @memberof MgtPersonCard
     */
    protected renderPresence(presence: Presence): TemplateResult;
    /**
     * Render image with presence for the person.
     *
     * @protected
     * @param
     * @memberof MgtPersonCard
     */
    protected renderAvatar(personDetailsInternal: IDynamicPerson, image: string, presence: Presence): TemplateResult;
    private handleLine1Clicked;
    private handleLine2Clicked;
    private handleLine3Clicked;
    /**
     * Render the details part of the person template.
     *
     * @protected
     * @param {IDynamicPerson} [person]
     * @param {string} [image]
     * @returns {TemplateResult}
     * @memberof MgtPerson
     */
    protected renderDetails(personProps: IDynamicPerson, presence?: Presence): TemplateResult;
    /**
     * Render the details flyout.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPerson
     */
    protected renderFlyout(anchor: TemplateResult, personDetails: IDynamicPerson, image: string, presence: Presence): TemplateResult;
    /**
     * Render the flyout menu content.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtPerson
     */
    protected renderFlyoutContent(personDetails: IDynamicPerson, image: string, presence: Presence): TemplateResult;
    /**
     * load state into the component.
     *
     * @protected
     * @returns
     * @memberof MgtPerson
     */
    protected loadState(): Promise<void>;
    /**
     * Gets the user initials
     *
     * @protected
     * @returns {string}
     * @memberof MgtPerson
     */
    protected getInitials(person?: IDynamicPerson): string;
    /**
     * Gets color from name
     *
     * @protected
     * @param {string} name
     * @returns {string}
     * @memberof MgtPerson
     */
    protected getColorFromName(name: string): string;
    private getImage;
    private isLetter;
    private getTextFromProperty;
    private isLargeAvatar;
    private handleMouseClick;
    private handleKeyDown;
    private handleMouseEnter;
    private handleMouseLeave;
    private hidePersonCard;
    private showPersonCard;
}
//# sourceMappingURL=mgt-person.d.ts.map