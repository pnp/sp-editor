import { AccountInfo, BaseAuthRequest, CommonSilentFlowRequest, IPerformanceClient, Logger } from "@azure/msal-common";
import { BrowserConfiguration } from "../config/Configuration";
import { SilentRequest } from "./SilentRequest";
/**
 * Initializer function for all request APIs
 * @param request
 */
export declare function initializeBaseRequest(request: Partial<BaseAuthRequest> & {
    correlationId: string;
}, config: BrowserConfiguration, performanceClient: IPerformanceClient, logger: Logger): Promise<BaseAuthRequest>;
export declare function initializeSilentRequest(request: SilentRequest & {
    correlationId: string;
}, account: AccountInfo, config: BrowserConfiguration, performanceClient: IPerformanceClient, logger: Logger): Promise<CommonSilentFlowRequest>;
//# sourceMappingURL=RequestHelpers.d.ts.map