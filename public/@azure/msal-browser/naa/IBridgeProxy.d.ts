import { AuthResult } from "./AuthResult";
import { AccountContext } from "./BridgeAccountContext";
import { BridgeCapabilities } from "./BridgeCapabilities";
import { TokenRequest } from "./TokenRequest";
export interface IBridgeProxy {
    getTokenInteractive(request: TokenRequest): Promise<AuthResult>;
    getTokenSilent(request: TokenRequest): Promise<AuthResult>;
    getHostCapabilities(): BridgeCapabilities | null;
    getAccountContext(): AccountContext | null;
}
//# sourceMappingURL=IBridgeProxy.d.ts.map