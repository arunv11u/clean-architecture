import express from 'express';
import { GenericError } from '../../errors';
import { BaseResponse, TypedResponse } from "./express.type";

interface BaseUtilResponseHandler {
    ok<ResBody, Locals>(response: TypedResponse<BaseResponse<ResBody>, Locals>, data?: ResBody): express.Response<BaseResponse<ResBody>>;
    created<ResBody, Locals>(response: TypedResponse<BaseResponse<ResBody>, Locals>, data?: ResBody): express.Response<BaseResponse<ResBody>>;
    clientError(message?: string): GenericError;
    unauthorized(message?: string): GenericError;
    paymentRequired(message?: string): GenericError;
    forbidden(message?: string): GenericError;
    notFound(message?: string): GenericError
    conflict(message?: string): GenericError;
    tooManyRequests(message?: string): GenericError;
    internalError(message?: string): GenericError;
};

export {
    BaseUtilResponseHandler
};
