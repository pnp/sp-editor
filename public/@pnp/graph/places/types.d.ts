import { IUpdateable, IGetById } from "../decorators.js";
import { _GraphCollection, _GraphInstance } from "../graphqueryable.js";
import { Room as IRoomType, RoomList as IRoomListType, Place as IPlaceType } from "@microsoft/microsoft-graph-types";
/**
 * Place
 */
export declare class _Place extends _GraphInstance<IPlaceType> {
}
export interface IPlace extends _Place, IUpdateable<IUpdatePlaceProps> {
}
export declare const Place: import("../graphqueryable.js").IGraphInvokableFactory<IPlace>;
/**
 * Places
 */
export declare class _Places extends _GraphInstance<IPlace> {
    /**
     * Gets all rooms in a tenant
     */
    get rooms(): IRooms;
    /**
    * Gets all roomLists in a tenant
    */
    get roomLists(): IRoomlists;
}
export interface IPlaces extends _Places, IGetById<IPlace> {
}
export declare const Places: import("../graphqueryable.js").IGraphInvokableFactory<IPlaces>;
/**
 * RoomList
 */
export declare class _RoomList extends _GraphInstance<IRoomListType> {
    /**
    * Gets all rooms in a roomList
    */
    get rooms(): IRooms;
}
export interface IRoomlist extends _RoomList {
}
export declare const RoomList: import("../graphqueryable.js").IGraphInvokableFactory<IRoomlist>;
/**
 * RoomLists
 */
export declare class _RoomLists extends _GraphCollection<IRoomListType[]> {
}
export interface IRoomlists extends _RoomLists, IGetById<IRoomlist> {
}
export declare const RoomLists: import("../graphqueryable.js").IGraphInvokableFactory<IRoomlists>;
/**
 * Room
 */
export declare class _Room extends _GraphInstance<IRoomType> {
}
export interface IRoom extends _Room {
}
export declare const Room: import("../graphqueryable.js").IGraphInvokableFactory<IRoom>;
/**
 * Rooms
 */
export declare class _Rooms extends _GraphCollection<IRoomType[]> {
}
export interface IRooms extends _Rooms, IGetById<IRoom> {
}
export declare const Rooms: import("../graphqueryable.js").IGraphInvokableFactory<IRooms>;
export interface IUpdatePlaceProps extends IRoomType, IRoomListType {
    "@odata.type": string;
}
//# sourceMappingURL=types.d.ts.map