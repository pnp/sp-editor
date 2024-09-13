import { IGraphCollection, IGraphQueryable } from "./graphqueryable.js";
/**
 * Decorator used to specify the default path for Queryable objects
 *
 * @param path
 */
export declare function defaultPath(path: string): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {};
} & T;
/**
 * Adds the delete method to the tagged class
 */
export declare function deleteable(): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {
        delete(this: IGraphQueryable): Promise<void>;
    };
} & T;
export interface IDeleteable {
    /**
     * Delete this instance
     */
    delete(): Promise<void>;
}
/**
 * Adds the delete method to the tagged class
 */
export declare function deleteableWithETag(): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {
        delete(this: IGraphQueryable, eTag?: string): Promise<void>;
    };
} & T;
export interface IDeleteableWithETag {
    /**
     * Delete this instance
     */
    delete(eTag?: string): Promise<void>;
}
/**
 * Adds the update method to the tagged class
 */
export declare function updateable(): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {
        update(this: IGraphQueryable, props: any): Promise<T>;
    };
} & T;
export interface IUpdateable<T = any> {
    /**
     * Update the properties of an event object
     *
     * @param props Set of properties to update
     */
    update(props: T): Promise<T>;
}
/**
 * Adds the update method to the tagged class
 */
export declare function updateableWithETag(): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {
        update(this: IGraphQueryable, props: any, eTag?: string): Promise<T>;
    };
} & T;
export interface IUpdateableWithETag<T = any> {
    /**
     * Update the properties of an event object
     *
     * @param props Set of properties to update
     */
    update(props: T, eTag?: string): Promise<T>;
}
/**
 * Adds the add method to the tagged class
 */
export declare function addable(): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {
        add(this: IGraphQueryable, props: any): Promise<void>;
    };
} & T;
export interface IAddable<T = any, R = {
    id: string;
}> {
    /**
     * Adds a new item to this collection
     *
     * @param props properties used to create the new thread
     */
    add(props: T): Promise<R>;
}
/**
 * Adds the getById method to a collection
 */
export declare function getById<R>(factory: (...args: any[]) => R): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {
        getById(this: IGraphQueryable, id: string): R;
    };
} & T;
export interface IGetById<R = any, T = string> {
    /**
     * Adds a new item to this collection
     *
     * @param props properties used to create the new thread
     */
    getById(id: T): R;
}
/**
 * Adds the getByName method to a collection
 */
export declare function getByName<R>(factory: (...args: any[]) => R): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {
        getByName(this: IGraphQueryable, name: string): R;
    };
} & T;
export interface IGetByName<R = any, T = string> {
    /**
     * Adds a new item to this collection
     *
     * @param props properties used to create the new thread
     */
    getByName(name: T): R;
}
export declare function hasDelta(): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {
        delta(this: IGraphQueryable, properties?: IDeltaProps): IGraphCollection<IDeltaItems<T> | T[]>;
    };
} & T;
export interface IHasDelta<T = any, R = any> {
    /**
     * Gets the delta of the queryable
     *
     */
    delta(properties?: T): IGraphCollection<R[] | IDeltaItems<R>>;
}
export interface IDeltaItems<R = any> {
    next: IGraphCollection<IDeltaItems>;
    delta: IGraphCollection<IDeltaItems>;
    values: R[];
}
export interface IDeltaProps {
    deltatoken?: string;
    token?: string;
    maxPageSize?: number;
}
//# sourceMappingURL=decorators.d.ts.map