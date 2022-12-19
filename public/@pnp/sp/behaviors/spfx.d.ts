import { TimelinePipe } from "@pnp/core";
import { Queryable } from "@pnp/queryable";
export interface ISPFXContext {
    pageContext: {
        web: {
            absoluteUrl: string;
        };
        legacyPageContext: {
            formDigestTimeoutSeconds: number;
            formDigestValue: string;
        };
    };
}
export declare function SPFx(context: ISPFXContext): TimelinePipe<Queryable>;
//# sourceMappingURL=spfx.d.ts.map