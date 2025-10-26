export interface ResetPasswordParamsBase {
    clientId: string;
    challengeType: Array<string>;
    username: string;
    correlationId: string;
}
export type ResetPasswordStartParams = ResetPasswordParamsBase;
export interface ResetPasswordResendCodeParams extends ResetPasswordParamsBase {
    continuationToken: string;
}
export interface ResetPasswordSubmitCodeParams extends ResetPasswordParamsBase {
    continuationToken: string;
    code: string;
}
export interface ResetPasswordSubmitNewPasswordParams extends ResetPasswordParamsBase {
    continuationToken: string;
    newPassword: string;
}
//# sourceMappingURL=ResetPasswordParams.d.ts.map