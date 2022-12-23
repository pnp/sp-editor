import { IBookingBusinesses, IBookingCurrencies } from "./types.js";
export { BookingCurrencies, BookingCurrency, BookingBusinesses, BookingBusiness, BookingAppointments, BookingAppointment, BookingCustomers, BookingCustomer, BookingServices, BookingService, BookingStaffMembers, BookingStaffMember, BookingCustomQuestions, BookingCustomQuestion, IBookingBusinessAddResult, IBookingAppointmentAddResult, IBookingCustomerAddResult, IBookingServiceAddResult, IBookingStaffMemberAddResult, IBookingCustomQuestionAddResult, IBookingCurrencies, IBookingCurrency, IBookingBusinesses, IBookingBusiness, IBookingAppointments, IBookingAppointment, IBookingCustomers, IBookingCustomer, IBookingServices, IBookingService, IBookingStaffMembers, IBookingStaffMember, IBookingCustomQuestions, IBookingCustomQuestion, } from "./types.js";
declare module "../fi" {
    interface GraphFI {
        readonly bookingBusinesses: IBookingBusinesses;
        readonly bookingCurrencies: IBookingCurrencies;
    }
}
//# sourceMappingURL=index.d.ts.map