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
import '../mgt-person/mgt-person';
/**
 * Web Component which represents events in a user or group calendar.
 *
 * @export
 * @class MgtAgenda
 * @extends {MgtTemplatedComponent}
 *
 * @fires eventClick - Fired when user click an event
 *
 * @cssprop --event-box-shadow - {String} Event box shadow color and size
 * @cssprop --event-margin - {String} Event margin
 * @cssprop --event-padding - {String} Event padding
 * @cssprop --event-background-color - {Color} Event background color
 * @cssprop --event-border - {String} Event border style
 * @cssprop --agenda-header-margin - {String} Agenda header margin size
 * @cssprop --agenda-header-font-size - {Length} Agenda header font size
 * @cssprop --agenda-header-color - {Color} Agenda header color
 * @cssprop --event-time-font-size - {Length} Event time font size
 * @cssprop --event-time-color - {Color} Event time color
 * @cssprop --event-subject-font-size - {Length} Event subject font size
 * @cssprop --event-subject-color - {Color} Event subject color
 * @cssprop --event-location-font-size - {Length} Event location font size
 * @cssprop --event-location-color - {Color} Event location color
 */
export declare class MgtAgenda extends MgtTemplatedComponent {
    /**
     * Array of styles to apply to the element. The styles should be defined
     * using the `css` tag function.
     */
    static get styles(): import("lit-element").CSSResult[];
    /**
     * stores current date for initial calender selection in events.
     * @type {string}
     */
    get date(): string;
    set date(value: string);
    /**
     * determines if agenda events come from specific group
     * @type {string}
     */
    get groupId(): string;
    set groupId(value: string);
    /**
     * sets number of days until end date, 3 is the default
     * @type {number}
     */
    get days(): number;
    set days(value: number);
    /**
     * allows developer to specify a different graph query that retrieves events
     * @type {string}
     */
    get eventQuery(): string;
    set eventQuery(value: string);
    /**
     * array containing events from user agenda.
     * @type {MicrosoftGraph.Event[]}
     */
    events: MicrosoftGraph.Event[];
    /**
     * allows developer to define max number of events shown
     * @type {number}
     */
    showMax: number;
    /**
     * allows developer to define agenda to group events by day.
     * @type {boolean}
     */
    groupByDay: boolean;
    /**
     * allows developer to specify preferred timezone that should be used for
     * retrieving events from Graph, eg. `Pacific Standard Time`. The preferred timezone for
     * the current user can be retrieved by calling `me/mailboxSettings` and
     * retrieving the value of the `timeZone` property.
     * @type {string}
     */
    get preferredTimezone(): string;
    set preferredTimezone(value: string);
    /**
     * Get the scopes required for agenda
     *
     * @static
     * @return {*}  {string[]}
     * @memberof MgtAgenda
     */
    static get requiredScopes(): string[];
    /**
     * determines width available for agenda component.
     * @type {boolean}
     */
    private _isNarrow;
    private _eventQuery;
    private _days;
    private _groupId;
    private _date;
    private _preferredTimezone;
    constructor();
    /**
     * Determines width available if resize is necessary, adds onResize event listener to window
     *
     * @memberof MgtAgenda
     */
    connectedCallback(): void;
    /**
     * Removes onResize event listener from window
     *
     * @memberof MgtAgenda
     */
    disconnectedCallback(): void;
    /**
     * Invoked on each update to perform rendering tasks. This method must return a lit-html TemplateResult.
     * Setting properties inside this method will not trigger the element to update
     *
     * @returns
     * @memberof MgtAgenda
     */
    render(): TemplateResult;
    /**
     * Reloads the component with its current settings and potential new data
     *
     * @memberof MgtAgenda
     */
    reload(): Promise<void>;
    /**
     * Render the loading state
     *
     * @protected
     * @returns
     * @memberof MgtAgenda
     */
    protected renderLoading(): TemplateResult;
    /**
     * Clears state of the component
     *
     * @protected
     * @memberof MgtAgenda
     */
    protected clearState(): void;
    /**
     * Render the no-data state.
     *
     * @protected
     * @returns {TemplateResult}
     * @memberof MgtAgenda
     */
    protected renderNoData(): TemplateResult;
    /**
     * Render an individual Event.
     *
     * @protected
     * @param {MicrosoftGraph.Event} event
     * @returns
     * @memberof MgtAgenda
     */
    protected renderEvent(event: MicrosoftGraph.Event): TemplateResult;
    /**
     * Render the header for a group.
     * Only relevant for grouped Events.
     *
     * @protected
     * @param {Date} date
     * @returns
     * @memberof MgtAgenda
     */
    protected renderHeader(header: string): TemplateResult;
    /**
     * Render the title field of an Event
     *
     * @protected
     * @param {MicrosoftGraph.Event} event
     * @returns
     * @memberof MgtAgenda
     */
    protected renderTitle(event: MicrosoftGraph.Event): TemplateResult;
    /**
     * Render the location field of an Event
     *
     * @protected
     * @param {MicrosoftGraph.Event} event
     * @returns
     * @memberof MgtAgenda
     */
    protected renderLocation(event: MicrosoftGraph.Event): TemplateResult;
    /**
     * Render the attendees field of an Event
     *
     * @protected
     * @param {MicrosoftGraph.Event} event
     * @returns
     * @memberof MgtAgenda
     */
    protected renderAttendees(event: MicrosoftGraph.Event): TemplateResult;
    /**
     * Render the event other field of an Event
     *
     * @protected
     * @param {MicrosoftGraph.Event} event
     * @returns
     * @memberof MgtAgenda
     */
    protected renderOther(event: MicrosoftGraph.Event): TemplateResult;
    /**
     * Render the events in groups, each with a header.
     *
     * @protected
     * @param {MicrosoftGraph.Event[]} events
     * @returns {TemplateResult}
     * @memberof MgtAgenda
     */
    protected renderGroups(events: MicrosoftGraph.Event[]): TemplateResult;
    /**
     * Render a list of events.
     *
     * @protected
     * @param {MicrosoftGraph.Event[]} events
     * @returns {TemplateResult}
     * @memberof MgtAgenda
     */
    protected renderEvents(events: MicrosoftGraph.Event[]): TemplateResult;
    /**
     * Load state into the component
     *
     * @protected
     * @returns
     * @memberof MgtAgenda
     */
    protected loadState(): Promise<void>;
    private reloadState;
    private onResize;
    private eventClicked;
    private getEventTimeString;
    private loadEvents;
    private prettyPrintTimeFromDateTime;
    private getDateHeaderFromDateTimeString;
}
//# sourceMappingURL=mgt-agenda.d.ts.map