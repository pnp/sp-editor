import { TokenRequest } from "./TokenRequest";
export type BridgeMethods = "GetToken" | "GetInitContext" | "GetTokenPopup";
export type BridgeRequestEnvelope = {
    messageType: "NestedAppAuthRequest";
    method: BridgeMethods;
    sendTime?: number;
    clientLibrary?: string;
    clientLibraryVersion?: string;
    requestId: string;
    tokenParams?: TokenRequest;
};
export declare function isBridgeRequestEnvelope(obj: unknown): obj is BridgeRequestEnvelope;
//# sourceMappingURL=BridgeRequestEnvelope.d.ts.map