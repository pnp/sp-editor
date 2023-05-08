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
    aadTokenProviderFactory?: {
        getTokenProvider(): Promise<{
            getToken(resource: string): Promise<string>;
        }>;
    };
}
export declare function SPFxToken(context: ISPFXContext): TimelinePipe<Queryable>;
export declare function SPFx(context: ISPFXContext): TimelinePipe<Queryable>;
//# sourceMappingURL=spfx.d.ts.map