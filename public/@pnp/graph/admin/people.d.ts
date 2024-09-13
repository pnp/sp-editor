import { _GraphInstance, _GraphCollection } from "../graphqueryable.js";
import { IUpdateable, IAddable, IDeleteable, IGetById } from "../decorators.js";
import { ProfileCardProperty as IProfileCardPropertyType, PeopleAdminSettings as IPeopleAdminSettingsType } from "@microsoft/microsoft-graph-types";
export declare class _PeopleAdmin extends _GraphInstance<IPeopleAdminSettingsType> {
    get profileCardProperties(): IProfileCardProperties;
    get pronounSettings(): IPronounSettings;
}
export interface IPeopleAdmin extends _PeopleAdmin {
}
export declare const PeopleAdmin: import("../graphqueryable.js").IGraphInvokableFactory<IPeopleAdmin>;
/**
* People Pronoun Settings
*/
export declare class _PronounSettings extends _GraphInstance<IPronounSettingsType> {
}
export interface IPronounSettings extends _PronounSettings, IUpdateable<IPronounSettingsType> {
}
export declare const PronounSettings: import("../graphqueryable.js").IGraphInvokableFactory<IPronounSettings>;
/**
* Profilecard Property
*/
export declare class _ProfileCardProperty extends _GraphInstance<IProfileCardPropertyType> {
}
export interface IProfileCardProperty extends _ProfileCardProperty, IDeleteable, IUpdateable<IProfileCardPropertyType> {
}
export declare const ProfileCardProperty: import("../graphqueryable.js").IGraphInvokableFactory<IProfileCardProperty>;
/**
* Profilecard properties
*/
export declare class _ProfileCardProperties extends _GraphCollection<IProfileCardPropertyType[]> {
}
export interface IProfileCardProperties extends _ProfileCardProperties, IAddable<IProfileCardPropertyType, IProfileCardPropertyType>, IGetById<IProfileCardProperty> {
}
export declare const ProfileCardProperties: import("../graphqueryable.js").IGraphInvokableFactory<IProfileCardProperties>;
export interface IPronounSettingsType {
    isEnabledInOrganization: boolean;
}
//# sourceMappingURL=people.d.ts.map