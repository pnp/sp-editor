import { ICalendar, IEvents, ICalendarView } from "./types.js";
declare module "../groups/types" {
    interface _Group {
        readonly calendar: ICalendar;
        readonly attachmentFiles: ICalendar;
        readonly events: IEvents;
        calendarView(start: string, end: string): ICalendarView;
    }
    interface IGroup {
        readonly calendar: ICalendar;
        readonly attachmentFiles: ICalendar;
        readonly events: IEvents;
        calendarView(start: string, end: string): ICalendarView;
    }
}
//# sourceMappingURL=groups.d.ts.map