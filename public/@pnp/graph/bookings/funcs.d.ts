import { IGraphQueryable, IGraphCollection } from "../graphqueryable.js";
import { BookingAppointment as IBookingAppointmentEntity } from "@microsoft/microsoft-graph-types";
/**
 * Get the collection of bookingAppointment objects for a bookingBusiness, that occurs in the specified date range.
 *
 * @param this IGraphQueryable instance
 * @param start start time
 * @param end end time
 */
export declare function calendarView(this: IGraphQueryable, start: string, end: string): IGraphCollection<IBookingAppointmentEntity[]>;
//# sourceMappingURL=funcs.d.ts.map