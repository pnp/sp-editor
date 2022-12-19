/**
 * Decorator used to specify the default path for SPQueryable objects
 *
 * @param path
 */
export declare function defaultPath(path: string): <T extends new (...args: any[]) => {}>(target: T) => {
    new (...args: any[]): {};
} & T;
//# sourceMappingURL=decorators.d.ts.map