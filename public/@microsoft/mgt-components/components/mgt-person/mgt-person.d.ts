/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtTemplatedComponent } from '@microsoft/mgt-element';
import { Presence } from '@microsoft/microsoft-graph-types';
import { TemplateResult } from 'lit';
import { AvatarSize, IDynamicPerson, ViewType } from '../../graph/types';
import '../../styles/style-helper';
import '../sub-components/mgt-flyout/mgt-flyout';
import { MgtFlyout } from '../sub-components/mgt-flyout/mgt-flyout';
import { PersonCardInteraction } from './../PersonCardInteraction';
import { MgtPersonConfig, PersonViewType, avatarType } from './mgt-person-types';
export { PersonCardInteraction } from '../PersonCardInteraction';
/**
 * Person properties part of original set provided by graph by default
 */
export declare const defaultPersonProperties: string[];
/**
 * The person component is used to display a person or contact by using their photo, name, and/or email address.
 *
 * @export
 * @class MgtPerson
 * @extends {MgtTemplatedComponent}
 *
 * @fires {CustomEvent<IDynamicPerson>} line1clicked - Fired when line1 is clicked
 * @fires {CustomEvent<IDynamicPerson>} line2clicked - Fired when line2 is clicked
 * @fires {CustomEvent<IDynamicPerson>} line3clicked - Fired when line3 is clicked
 * @fires {CustomEvent<IDynamicPerson>} line4clicked - Fired when line4 is clicked
 *
 * @cssprop --person-background-color - {Color} the color of the person component background.
 * @cssprop --person-background-border-radius - {Length} the border radius of the person component. Default is 4px.
 *
 * @cssprop --person-avatar-size - {Length} the width and height of the avatar. Default is 24px.
 * @cssprop --person-avatar-border - {String} the border around an avatar. Default is none.
 * @cssprop --person-avatar-border-radius - {String} the radius around the border of an avatar. Default is 50%.
 *
 * @cssprop --person-initials-text-color - {Color} the color of initials in an avatar.
 * @cssprop --person-initials-background-color - {Color} the color of the background in an avatar with initials.
 *
 * @cssprop --person-details-spacing - {Length} the space between the avatar and the person details. Default is 12px.
 *
 * @cssprop --person-line1-font-size - {String} the font-size of the line 1 text. Default is 14px.
 * @cssprop --person-line1-font-weight - {Length} the font weight of the line 1 text. Default is 600.
 * @cssprop --person-line1-text-color - {Color} the color of the line 1 text.
 * @cssprop --person-line1-text-transform - {String} the tex transform of the line 1 text. Default is inherit.
 * @cssprop --person-line1-text-line-height - {Length} the line height of the line 1 text. Default is 20px.
 *
 * @cssprop --person-line2-font-size - {Length} the font-size of the line 2 text. Default is 12px.
 * @cssprop --person-line2-font-weight - {Length} the font weight of the line 2 text. Default is 400.
 * @cssprop --person-line2-text-color - {Color} the color of the line 2 text.
 * @cssprop --person-line2-text-transform - {String} the tex transform of the line 2 text. Default is inherit.
 * @cssprop --person-line2-text-line-height - {Length} the line height of the line 2 text. Default is 16px.
 *
 * @cssprop --person-line3-font-size - {Length} the font-size of the line 3 text. Default is 12px.
 * @cssprop --person-line3-font-weight - {Length} the font weight of the line 3 text. Default is 400.
 * @cssprop --person-line3-text-color - {Color} the color of the line 3 text.
 * @cssprop --person-line3-text-transform - {String} the tex transform of the line 3 text. Default is inherit.
 * @cssprop --person-line3-text-line-height - {Length} the line height of the line 3 text. Default is 16px.
 *
 * @cssprop --person-line4-font-size - {Length} the font-size of the line 4 text. Default is 12px.
 * @cssprop --person-line4-font-weight - {Length} the font weight of the line 4 text. Default is 400.
 * @cssprop --person-line4-text-color - {Color} the color of the line 4 text.
 * @cssprop --person-line4-text-transform - {String} the tex transform of the line 4 text. Default is inherit.
 * @cssprop --person-line4-text-line-height - {Length} the line height of the line 4 text. Default is 16px.
 *
 * @cssprop --person-details-wrapper-width - {Length} the minimum width of the details section. Default is 168px.
 */
export declare class MgtPerson extends MgtTemplatedComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit").CSSResult[];
    /**
     * Strings to use for localization
     *
     * @readonly
     * @protected
     * @memberof MgtPerson
     */
    protected get strings(): {
        photoFor: string;
        emailAddress: string;
        initials: string;
        Available: string;
        Away: string;
        BeRightBack: string;
        Busy: string;
        DoNotDisturb: string;
        InACall: string;
        InAConferenceCall: string;
        Inactive: string;
        InAMeeting: string;
        Offline: string;
        OffWork: string;
        OutOfOffice: string;
        PresenceUnknown: string;
        Presenting: string;
        UrgentInterruptionsOnly: string;
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
     *
     * @type {string}
     */
    get personQuery(): string;
    set personQuery(value: string);
    /**
     * Fallback when no user is found
     *
     * @type {IDynamicPerson}
     */
    get fallbackDetails(): IDynamicPerson;
    set fallbackDetails(value: IDynamicPerson);
    /**
     * user-id property allows developer to use id value to determine person
     *
     * @type {string}
     */
    get userId(): string;
    set userId(value: string);
    /**
     * usage property allows you to specify where the component is being used to add
     * customized personalization for it. Currently only supports "people" as used in
     * the people component.
     *
     * @type {string}
     */
    get usage(): string;
    set usage(value: string);
    /**
     * determines if person component renders presence
     *
     * @type {boolean}
     */
    showPresence: boolean;
    /**
     * determines person component avatar size and apply presence badge accordingly.
     * Default is "auto". When you set the view > 1, it will default to "auto".
     *
     * @type {AvatarSize}
     */
    avatarSize: AvatarSize;
    /**
     * object containing Graph details on person
     * a copy of person-details attribute
     *
     * @type {IDynamicPerson}
     */
    private get personDetailsInternal();
    private set personDetailsInternal(value);
    /**
     * object containing Graph details on person
     *
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
     * Sets the vertical layout of
     * the Person Card
     *
     * @type {boolean}
     * @memberof MgtPerson
     */
    verticalLayout: boolean;
    /**
     * Determines and sets person avatar
     *
     *
     * @type {string}
     * @memberof MgtPerson
     */
    get avatarType(): avatarType;
    set avatarType(value: avatarType);
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
     * Sets the property of the personDetailsInternal to use for the third line of text.
     * Default is mail.
     *
     * @type {string}
     * @memberof MgtPerson
     */
    line3Property: string;
    /**
     * Sets the property of the personDetailsInternal to use for the fourth line of text.
     * Default is mail.
     *
     * @type {string}
     * @memberof MgtPerson
     */
    line4Property: string;
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
    private _personImage;
    private _personPresence;
    private _personQuery;
    private _userId;
    private _usage;
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
     * Render a person icon.
     *
     * @protected
     * @returns
     * @memberof MgtPerson
     */
    protected renderPersonIcon(): TemplateResult<1>;
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
    protected renderImage(personDetailsInternal: IDynamicPerson, imageSrc: string): TemplateResult<1>;
    /**
     * Render presence for the person.
     *
     * @param presence
     * @memberof MgtPerson
     * @returns
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
    private handleLine4Clicked;
    /**
     * Render the details part of the person template.
     *
     * @param personProps
     * @param presence
     * @memberof MgtPerson
     * @returns
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
    private getImage;
    private isLetter;
    private getTextFromProperty;
    private isLargeAvatar;
    private isNoLine;
    private isOneLine;
    private isTwoLines;
    private isThreeLines;
    private isFourLines;
    private isVertical;
    private readonly handleMouseClick;
    private readonly handleKeyDown;
    private readonly handleMouseEnter;
    private readonly handleMouseLeave;
    /**
     * hides the person card
     *
     * @memberof MgtPerson
     */
    hidePersonCard: () => void;
    showPersonCard: () => void;
}
//# sourceMappingURL=mgt-person.d.ts.map