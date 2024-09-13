import { AppCatalogs as IAppCatalogsType, TeamsApp as ITeamsAppType, TeamsAppDefinition as ITeamsAppDefinitionType, TeamworkBot as ITeamworkBot } from "@microsoft/microsoft-graph-types";
import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { IGetById } from "../decorators.js";
/**
 * AppCatalogs
 */
export declare class _AppCatalog extends _GraphInstance<IAppCatalogsType> {
    /**
     * Get teams apps in appCatalog
     *
     */
    get teamsApps(): ITeamsApps;
}
export interface IAppCatalog extends _AppCatalog {
}
export declare const AppCatalog: import("../graphqueryable.js").IGraphInvokableFactory<IAppCatalog>;
/**
 * AppDefinition
 */
export declare class _AppDefinition extends _GraphInstance<ITeamsAppDefinitionType> {
    /**
     * Gets bot associated with app
     *
     */
    bot(): Promise<ITeamworkBot>;
}
export interface IAppDefinition extends _AppDefinition {
}
export declare const AppDefinition: import("../graphqueryable.js").IGraphInvokableFactory<IAppDefinition>;
/**
 * AppDefinitions
 */
export declare class _AppDefinitions extends _GraphCollection<ITeamsAppDefinitionType[]> {
}
export interface IAppDefinitions extends _AppDefinitions, IGetById<IAppDefinition> {
}
export declare const AppDefinitions: import("../graphqueryable.js").IGraphInvokableFactory<IAppDefinitions>;
/**
 * TeamsApp
 */
export declare class _TeamsApp extends _GraphInstance<ITeamsAppType> {
    /**
     * Get app definitions
     *
     */
    get appDefinitions(): IAppDefinitions;
    /**
     * Deletes a Teams App
     *
     */
    delete(appDefinitionId?: string): Promise<any>;
    /**
     * Updates a Teams App
     *
     * @param zip  zip file of app
     * @param requiresReview This optional query parameter triggers the app review process. Users with admin privileges can submit apps without triggering a review.
     */
    update(zip: Blob, requiresReview?: boolean): Promise<ITeamsAppType>;
}
export interface ITeamsApp extends _TeamsApp {
}
export declare const TeamsApp: import("../graphqueryable.js").IGraphInvokableFactory<ITeamsApp>;
/**
 * TeamsApps
 */
export declare class _TeamsApps extends _GraphCollection<ITeamsAppType[]> {
    /**
     * Adds a Teams App
     *
     * @param zip  zip file of app
     * @param requiresReview This optional query parameter triggers the app review process. Users with admin privileges can submit apps without triggering a review.
     *
     */
    add(zip: Blob, requiresReview?: boolean): Promise<ITeamsAppType>;
}
export interface ITeamsApps extends _TeamsApps, IGetById<ITeamsApp> {
}
export declare const TeamsApps: import("../graphqueryable.js").IGraphInvokableFactory<ITeamsApps>;
//# sourceMappingURL=types.d.ts.map