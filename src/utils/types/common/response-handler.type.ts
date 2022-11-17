import express from 'express';
import { GenericValidationError } from '../../errors';
import { BaseResponse, TypedResponse } from "./express.type";

interface BaseUtilResponseHandler {
    ok<ResBody, Locals>(response: TypedResponse<BaseResponse<ResBody>, Locals>, data?: ResBody): express.Response<BaseResponse<ResBody>>;
    created<ResBody, Locals>(response: TypedResponse<BaseResponse<ResBody>, Locals>): express.Response<BaseResponse<ResBody>>;
    clientError(message?: string): GenericValidationError;
    unauthorized(message?: string): GenericValidationError;
    paymentRequired(message?: string): GenericValidationError;
    forbidden(message?: string): GenericValidationError;
    notFound(message?: string): GenericValidationError
    conflict(message?: string): GenericValidationError;
    tooMany(message?: string): GenericValidationError;
    internalError(message?: string): GenericValidationError;
};

export {
    BaseUtilResponseHandler
};
