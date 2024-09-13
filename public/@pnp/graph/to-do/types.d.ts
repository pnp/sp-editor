import { Todo as ITodoType, TodoTaskList as ITodoTaskListType, TodoTask as ITodoTaskType, AttachmentBase as ITodoAttachmentType, ChecklistItem as IChecklistItemType, LinkedResource as ILinkedResourceType } from "@microsoft/microsoft-graph-types";
import { _GraphInstance, _GraphCollection } from "../graphqueryable.js";
import { IGetById, IAddable, IUpdateable, IDeleteable, IHasDelta, IDeltaProps } from "../decorators.js";
/**
 * Todo
 */
export declare class _Todo extends _GraphInstance<ITodoType> {
    get lists(): ITaskLists;
}
export interface ITodo extends _Todo {
}
export declare const Todo: import("../graphqueryable.js").IGraphInvokableFactory<ITodo>;
/**
 * TaskList
 */
export declare class _TaskList extends _GraphInstance<ITodoTaskListType> {
    get tasks(): ITodoTasks;
}
export interface ITaskList extends _TaskList, IUpdateable<ITodoTaskListType>, IDeleteable {
}
export declare const TaskList: import("../graphqueryable.js").IGraphInvokableFactory<ITaskList>;
/**
 * TaskLists
 */
export declare class _TaskLists extends _GraphCollection<ITodoTaskListType[]> {
}
export interface ITaskLists extends _TaskLists, IGetById<ITaskList>, IAddable<ITodoTaskListType, ITodoTaskListType>, IHasDelta<Omit<IDeltaProps, "token">, ITodoTaskListType> {
}
export declare const TaskLists: import("../graphqueryable.js").IGraphInvokableFactory<ITaskLists>;
/**
 * TodoTask
 */
export declare class _TodoTask extends _GraphInstance<ITodoTaskType> {
    get attachments(): ITodoAttachments;
    get checklistItems(): IChecklistItems;
    get resources(): ILinkedResources;
}
export interface ITodoTask extends _TodoTask, IUpdateable<ITodoTaskType>, IDeleteable {
}
export declare const TodoTask: import("../graphqueryable.js").IGraphInvokableFactory<ITodoTask>;
/**
 * TodoTasks
 */
export declare class _TodoTasks extends _GraphCollection<ITodoTaskType[]> {
}
export interface ITodoTasks extends _TodoTasks, IGetById<ITodoTask>, IAddable<ITodoTaskType>, IHasDelta<Omit<IDeltaProps, "token">, ITodoTaskType> {
}
export declare const TodoTasks: import("../graphqueryable.js").IGraphInvokableFactory<ITodoTasks>;
/**
 * TodoAttachment
 */
export declare class _TodoAttachment extends _GraphInstance<ITodoAttachmentType> {
    get TodoAttachments(): ITodoAttachments;
}
export interface ITodoAttachment extends _TodoAttachment, IDeleteable {
}
export declare const TodoAttachment: import("../graphqueryable.js").IGraphInvokableFactory<ITodoAttachments>;
/**
 * TodoAttachments
 */
export declare class _TodoAttachments extends _GraphCollection<ITodoAttachmentType[]> {
    add(TodoAttachmentInfo: IAddTodoAttachmentOptions): Promise<ITodoAttachmentType>;
}
export interface ITodoAttachments extends _TodoAttachments, IGetById<ITodoAttachment> {
}
export declare const TodoAttachments: import("../graphqueryable.js").IGraphInvokableFactory<ITodoAttachments>;
/**
 * Checklist
 */
export declare class _ChecklistItem extends _GraphInstance<IChecklistItemType> {
}
export interface IChecklistItem extends _ChecklistItems, IUpdateable<IChecklistItemType>, IDeleteable {
}
export declare const ChecklistItem: import("../graphqueryable.js").IGraphInvokableFactory<IChecklistItem>;
/**
 * ChecklistItems
 */
export declare class _ChecklistItems extends _GraphCollection<IChecklistItemType[]> {
}
export interface IChecklistItems extends _ChecklistItems, IGetById<IChecklistItem>, IAddable<IChecklistItemType> {
}
export declare const ChecklistItems: import("../graphqueryable.js").IGraphInvokableFactory<IChecklistItems>;
/**
 * LinkedResource
 */
export declare class _LinkedResource extends _GraphInstance<ILinkedResourceType> {
}
export interface ILinkedResource extends _LinkedResource, IUpdateable<ILinkedResourceType>, IDeleteable {
}
export declare const LinkedResource: import("../graphqueryable.js").IGraphInvokableFactory<ILinkedResource>;
/**
 * LinkedResources
 */
export declare class _LinkedResources extends _GraphCollection<ILinkedResourceType[]> {
}
export interface ILinkedResources extends _LinkedResources, IGetById<ILinkedResource>, IAddable {
}
export declare const LinkedResources: import("../graphqueryable.js").IGraphInvokableFactory<ILinkedResources>;
export interface IAddTaskListOptions {
    displayName: string;
}
export interface IAddTodoAttachmentOptions extends ITodoAttachmentType {
    contentBytes: string;
}
//# sourceMappingURL=types.d.ts.map