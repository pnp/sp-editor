import { Event as IEventType, Calendar as ICalendarType, CalendarGroup as ICalendarGroupType, CalendarPermission as ICalendarPermissionType, ScheduleInformation as IScheduleInformationType, DateTimeTimeZone as IDateTimeTimeZoneType, Recipient, TimeSlot } from "@microsoft/microsoft-graph-types";
import { IGraphQueryable, _GraphCollection, _GraphInstance, _GraphQueryable } from "../graphqueryable.js";
import { IDeleteable, IUpdateable, IGetById, IAddable } from "../decorators.js";
import { calendarView, instances } from "./funcs.js";
/**
 * Calendar
 */
export declare class _Calendar extends _GraphInstance<ICalendarType> {
    calendarView: typeof calendarView;
    get calendarPermissions(): ICalendarPermissions;
    get events(): IEvents;
    /**
     * Get the free/busy availability information for a collection of users,
     * distributions lists, or resources (rooms or equipment) for a specified time period.
     *
     * @param properties The set of properties used to get the schedule
     */
    getSchedule(properties: IGetScheduleRequest): Promise<IScheduleInformationType[]>;
}
export interface ICalendar extends _Calendar, IUpdateable<ICalendarType>, IDeleteable {
}
export declare const Calendar: import("../graphqueryable.js").IGraphInvokableFactory<ICalendar>;
/**
 * Calendars
 */
export declare class _Calendars extends _GraphCollection<ICalendarType[]> {
}
export interface ICalendars extends _Calendars, IGetById<ICalendar>, IAddable<ICalendarType> {
}
export declare const Calendars: import("../graphqueryable.js").IGraphInvokableFactory<ICalendars>;
/**
 * CalendarView
 */
export declare class _CalendarView extends _GraphCollection<IEventType[]> {
    constructor(baseUrl: string | _GraphQueryable, start: string, end: string);
    delta(token?: string): Promise<IEventType[]>;
}
export interface ICalendarView extends _CalendarView {
}
export declare const CalendarView: (baseUrl: string | IGraphQueryable, start: string, end: string) => _CalendarView;
/**
 * Event
 */
export declare class _Event extends _GraphInstance<IEventType> {
    instances: typeof instances;
    accept(comment?: string, sendResponse?: boolean): Promise<void>;
    cancel(comment?: string): Promise<void>;
    decline(comment?: string, sendResponse?: boolean, proposedNewTime?: TimeSlot): Promise<void>;
    dismissReminder(): Promise<void>;
    forward(fowardEventInfo: IForwardEvent): Promise<void>;
    snoozeReminder(reminderTime: IDateTimeTimeZoneType): Promise<void>;
    tentativelyAccept(comment?: string, sendResponse?: boolean, proposedNewTime?: TimeSlot): Promise<void>;
}
export interface IEvent extends _Event, IDeleteable, IUpdateable {
}
export declare const Event: import("../graphqueryable.js").IGraphInvokableFactory<IEvent>;
/**
 * Events
 */
export declare class _Events extends _GraphCollection<IEventType[]> {
}
export interface IEvents extends _Events, IGetById<IEvent>, IAddable<IEventType, IEventType> {
}
export declare const Events: import("../graphqueryable.js").IGraphInvokableFactory<IEvents>;
/**
 * Event
 */
export declare class _CalendarGroup extends _GraphInstance<ICalendarGroupType> {
    get calendars(): ICalendars;
}
export interface ICalendarGroup extends _CalendarGroup, IDeleteable, IUpdateable {
}
export declare const CalendarGroup: import("../graphqueryable.js").IGraphInvokableFactory<ICalendarGroup>;
/**
 * CalendarGroups
 */
export declare class _CalendarGroups extends _GraphCollection<ICalendarGroupType[]> {
}
export interface ICalendarGroups extends _Events, IGetById<ICalendarGroup>, IAddable<ICalendarGroupType, ICalendarGroupType> {
}
export declare const CalendarGroups: import("../graphqueryable.js").IGraphInvokableFactory<ICalendarGroups>;
/**
 * CalendarPermission
 */
export declare class _CalendarPermission extends _GraphInstance<ICalendarPermissionType> {
}
export interface ICalendarPermission extends _CalendarPermission, IUpdateable, IDeleteable {
}
export declare const CalendarPermission: import("../graphqueryable.js").IGraphInvokableFactory<ICalendarPermission>;
/**
 * CalendarPermissions
 */
export declare class _CalendarPermissions extends _GraphCollection<ICalendarPermissionType[]> {
}
export interface ICalendarPermissions extends _CalendarPermissions, IGetById<ICalendarPermission>, IAddable<ICalendarPermissionType, ICalendarPermissionType> {
}
export declare const CalendarPermissions: import("../graphqueryable.js").IGraphInvokableFactory<ICalendarPermissions>;
export interface IForwardEvent {
    Comment?: string;
    ToRecipients: Recipient[];
}
export interface IGetScheduleRequest {
    schedules: string[];
    startTime: IDateTimeTimeZoneType;
    endTime: IDateTimeTimeZoneType;
    availabilityViewInterval?: number;
}
//# sourceMappingURL=types.d.ts.map