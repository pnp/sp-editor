import { MeetingTimeSuggestionsResult } from "@microsoft/microsoft-graph-types";
import { ICalendar, IEvents, ICalendars, ICalendarView, ICalendarGroups } from "./types.js";
import { IReminderInfo, IFindMeetingTimesRequest } from "./funcs.js";
import { IGraphCollection, IGraphInstance } from "../graphqueryable.js";
import { IAttachments } from "../attachments/types.js";
declare module "../users/types" {
    interface _User {
        readonly calendar: ICalendar;
        readonly calendars: ICalendars;
        readonly calendarGroups: ICalendarGroups;
        readonly attachmentFiles: IAttachments;
        readonly events: IEvents;
        calendarView(start: string, end: string): ICalendarView;
        findMeetingTimes(properties?: IFindMeetingTimesRequest): Promise<IGraphInstance<MeetingTimeSuggestionsResult>>;
        reminderView(start: string, end: string): IGraphCollection<IReminderInfo[]>;
    }
    interface IUser {
        readonly calendar: ICalendar;
        readonly calendars: ICalendars;
        readonly calendarGroups: ICalendarGroups;
        readonly attachmentFiles: IAttachments;
        readonly events: IEvents;
        calendarView(start: string, end: string): ICalendarView;
        reminderView(start: string, end: string): IGraphCollection<IReminderInfo[]>;
    }
}
//# sourceMappingURL=users.d.ts.map