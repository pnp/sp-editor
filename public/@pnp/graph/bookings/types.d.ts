import { BookingBusiness as IBookingBusinessEntity, BookingAppointment as IBookingAppointmentEntity, BookingCustomer as IBookingCustomerEntity, BookingService as IBookingServiceEntity, BookingStaffMember as IBookingStaffMemberEntity, BookingCurrency as IBookingCurrencyEntity, BookingCustomQuestion as IBookingCustomQuestionEntity } from "@microsoft/microsoft-graph-types";
import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { IDeleteable, IUpdateable, IGetById } from "../decorators.js";
import { calendarView } from "./funcs.js";
/**
 * Describes a Booking Currency entity
 *
 */
export declare class _BookingCurrency extends _GraphInstance<IBookingCurrencyEntity> {
}
export interface IBookingCurrency extends _BookingCurrency {
}
export declare const BookingCurrency: import("../graphqueryable.js").IGraphInvokableFactory<IBookingCurrency>;
/**
 * Describes a collection of Booking Currency objects
 *
 */
export declare class _BookingCurrencies extends _GraphCollection<IBookingCurrencyEntity[]> {
}
export interface IBookingCurrencies extends _BookingCurrencies, IGetById<IBookingCurrency> {
}
export declare const BookingCurrencies: import("../graphqueryable.js").IGraphInvokableFactory<IBookingCurrencies>;
/**
 * Represents a booking business entity
 */
export declare class _BookingBusiness extends _GraphInstance<IBookingBusinessEntity> {
    /**
     * Get the calendar view for the booking business.
     */
    calendarView: typeof calendarView;
    /**
     * Make the scheduling page of a business available to external customers.
     */
    publish(): Promise<void>;
    /**
     * Make the scheduling page of this business not available to external customers.
     */
    unpublish(): Promise<void>;
    /**
     * Get the appointments for the booking business.
     */
    get appointments(): IBookingAppointments;
    /**
     * Get the customers for the booking business.
     */
    get customers(): IBookingCustomers;
    /**
     * Get the services for the booking business.
     */
    get services(): IBookingServices;
    /**
     * Get the staff members for the booking business.
     */
    get staffMembers(): IBookingStaffMembers;
    /**
     * Get the staff members for the booking business.
     */
    get customQuestions(): IBookingCustomQuestions;
}
export interface IBookingBusiness extends _BookingBusiness, IDeleteable, IUpdateable {
}
export declare const BookingBusiness: import("../graphqueryable.js").IGraphInvokableFactory<IBookingBusiness>;
/**
 * Describes a collection of Booking Business objects
 *
 */
export declare class _BookingBusinesses extends _GraphCollection<IBookingBusinessEntity[]> {
    /**
         * Create a new booking business as specified in the request body.
         *
         * @param name The name of the business, which interfaces with customers. This name appears at the top of the business scheduling page.
         * @param additionalProperties A plain object collection of additional properties you want to set on the new group of type IBookingBusiness
         */
    add(name: string, additionalProperties?: Record<string, any>): Promise<IBookingBusinessAddResult>;
}
export interface IBookingBusinesses extends _BookingBusinesses, IGetById<IBookingBusiness> {
}
export declare const BookingBusinesses: import("../graphqueryable.js").IGraphInvokableFactory<IBookingBusinesses>;
/**
 * Represents a booking appointment entity
 */
export declare class _BookingApointment extends _GraphInstance<IBookingAppointmentEntity> {
    /**
     * Cancel the specified bookingAppointment in the specified bookingBusiness and send a message to the involved customer and staff members.
     */
    cancel(cancellationMessage: string): Promise<void>;
}
export interface IBookingAppointment extends _BookingApointment, IDeleteable, IUpdateable {
}
export declare const BookingAppointment: import("../graphqueryable.js").IGraphInvokableFactory<IBookingAppointment>;
/**
 * Describes a collection of booking appointment objects
 *
 */
export declare class _BookingAppointments extends _GraphCollection<IBookingAppointmentEntity[]> {
    /**
     * Create a new booking appointment as specified in the request body.
     *
     * @param bookingAppointment  a JSON representation of a BookingAppointment object.
     */
    add(bookingAppointment: IBookingAppointmentEntity): Promise<IBookingAppointmentAddResult>;
}
export interface IBookingAppointments extends _BookingAppointments, IGetById<IBookingAppointment> {
}
export declare const BookingAppointments: import("../graphqueryable.js").IGraphInvokableFactory<IBookingAppointments>;
/**
 * Represents a booking customer entity
 */
export declare class _BookingCustomer extends _GraphInstance<IBookingCustomerEntity> {
}
export interface IBookingCustomer extends _BookingCustomer, IDeleteable, IUpdateable {
}
export declare const BookingCustomer: import("../graphqueryable.js").IGraphInvokableFactory<IBookingCustomer>;
/**
 * Describes a collection of booking customer objects
 *
 */
export declare class _BookingCustomers extends _GraphCollection<IBookingCustomerEntity[]> {
    /**
     * Create a new booking customer as specified in the request body.
     *
     * @param bookingCustomer  a JSON representation of a BookingCustomer object.
     */
    add(bookingCustomer: IBookingCustomerEntity): Promise<IBookingCustomerAddResult>;
}
export interface IBookingCustomers extends _BookingCustomers, IGetById<IBookingCustomer> {
}
export declare const BookingCustomers: import("../graphqueryable.js").IGraphInvokableFactory<IBookingCustomers>;
/**
 * Represents a booking service entity
 */
export declare class _BookingService extends _GraphInstance<IBookingServiceEntity> {
}
export interface IBookingService extends _BookingService, IDeleteable, IUpdateable {
}
export declare const BookingService: import("../graphqueryable.js").IGraphInvokableFactory<IBookingService>;
/**
 * Describes a collection of booking service objects
 *
 */
export declare class _BookingServices extends _GraphCollection<IBookingServiceEntity[]> {
    /**
     * Create a new booking service as specified in the request body.
     *
     * @param bookingService  a JSON representation of a BookingService object.
     */
    add(bookingService: IBookingServiceEntity): Promise<IBookingServiceAddResult>;
}
export interface IBookingServices extends _BookingServices, IGetById<IBookingService> {
}
export declare const BookingServices: import("../graphqueryable.js").IGraphInvokableFactory<IBookingServices>;
/**
 * Represents a booking staffmember entity
 */
export declare class _BookingStaffMember extends _GraphInstance<IBookingStaffMemberEntity> {
}
export interface IBookingStaffMember extends _BookingStaffMember, IDeleteable, IUpdateable {
}
export declare const BookingStaffMember: import("../graphqueryable.js").IGraphInvokableFactory<IBookingStaffMember>;
/**
 * Describes a collection of booking staffmember objects
 *
 */
export declare class _BookingStaffMembers extends _GraphCollection<IBookingStaffMemberEntity[]> {
    /**
     * Create a new booking staffmember as specified in the request body.
     *
     * @param bookingStaffMember  a JSON representation of a BookingStaffMember object.
     */
    add(bookingStaffMember: IBookingStaffMemberEntity): Promise<IBookingStaffMemberAddResult>;
}
export interface IBookingStaffMembers extends _BookingStaffMembers, IGetById<IBookingStaffMember> {
}
export declare const BookingStaffMembers: import("../graphqueryable.js").IGraphInvokableFactory<IBookingStaffMembers>;
/**
 * Represents a booking custom questions entity
 */
export declare class _BookingCustomQuestion extends _GraphInstance<IBookingCustomQuestionEntity> {
}
export interface IBookingCustomQuestion extends _BookingCustomQuestion, IDeleteable, IUpdateable {
}
export declare const BookingCustomQuestion: import("../graphqueryable.js").IGraphInvokableFactory<IBookingCustomQuestion>;
/**
 * Describes a collection of booking custom questions objects
 *
 */
export declare class _BookingCustomQuestions extends _GraphCollection<IBookingCustomQuestionEntity[]> {
    /**
     * Create a new booking customquestions as specified in the request body.
     *
     * @param bookingCustomQuestion  a JSON representation of a BookingCustomQuestion object.
     */
    add(bookingCustomQuestion: IBookingCustomQuestionEntity): Promise<IBookingCustomQuestionAddResult>;
}
export interface IBookingCustomQuestions extends _BookingCustomQuestions, IGetById<IBookingCustomQuestion> {
}
export declare const BookingCustomQuestions: import("../graphqueryable.js").IGraphInvokableFactory<IBookingCustomQuestions>;
/**
 * IBookingBusinessAddResult
 */
export interface IBookingBusinessAddResult {
    bookingBusiness: IBookingBusinessEntity;
    data: any;
}
/**
 * IBookingAppointmentAddResult
 */
export interface IBookingAppointmentAddResult {
    bookingAppointment: IBookingAppointmentEntity;
    data: any;
}
/**
 * IBookingCustomerAddResult
 */
export interface IBookingCustomerAddResult {
    bookingCustomer: IBookingCustomerEntity;
    data: any;
}
/**
 * IBookingServiceAddResult
 */
export interface IBookingServiceAddResult {
    bookingService: IBookingServiceEntity;
    data: any;
}
/**
 * IBookingStaffMemberAddResult
 */
export interface IBookingStaffMemberAddResult {
    bookingStaffMember: IBookingStaffMemberEntity;
    data: any;
}
/**
 * IBookingCustomQuestionAddResult
 */
export interface IBookingCustomQuestionAddResult {
    bookingCustomQuestion: IBookingCustomQuestionEntity;
    data: any;
}
//# sourceMappingURL=types.d.ts.map