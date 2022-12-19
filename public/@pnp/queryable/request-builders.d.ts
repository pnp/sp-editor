/**
 * takes the supplied object of type U, JSON.stringify's it, and sets it as the value of a "body" property
 */
export declare function body<T extends Partial<RequestInit>, U = any>(o: U, previous?: T): T & {
    body: string;
};
/**
 * Adds headers to an new/existing RequestInit
 *
 * @param o Headers to add
 * @param previous Any previous partial RequestInit
 * @returns RequestInit combining previous and specified headers
 */
export declare function headers<T extends Partial<RequestInit>, U extends Record<string, string> = {}>(o: U, previous?: T): T & {
    headers: U;
};
//# sourceMappingURL=request-builders.d.ts.map