import {plainToClass} from 'class-transformer';

export function tryCastAndThrowApiError(error: any) {
    const customError = error.error;
    if (customError && customError.code) {
        throw plainToClass(ApiError, customError);
    }
}

export enum ApiErrorCode {
    NotAuthenticated = 100,
    Unauthorized = 110,
    InvalidAccountNameOrPassword = 115,
    LoginFailureBlock = 117,
    AccountNotActive = 120,
    InvalidParameters = 200
}

export class ApiError {
    constructor(public code: ApiErrorCode, public message: string) {
    }
}
