/**
 * Defines the schemas for valid webparts provided by Microsoft. Includes 'any' to avoid typing errors for undefined webparts
 */
export type ValidWebpart = MSTextWebPart | any;
/**
 * Defines the schemas for valid webparts provided by Microsoft. Does not allow 'any'
 */
export type ValidWebpartNoAny = MSTextWebPart;
export interface MSTextWebPart {
    "@odata.type": "#microsoft.graph.textWebPart";
    id: string;
    innerHtml: string;
}
//# sourceMappingURL=webpart-types.d.ts.map