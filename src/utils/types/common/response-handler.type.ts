import express from 'express';
import { GenericError } from '../../errors';
import { CustomResponse, TypedResponse } from "./express.type";

interface ResponseHandler {
    ok<ResBody, Locals>(response: TypedResponse<CustomResponse<ResBody>, Locals>, data?: ResBody): express.Response<CustomResponse<ResBody>>;
    created<ResBody, Locals>(response: TypedResponse<CustomResponse<ResBody>, Locals>, data?: ResBody): express.Response<CustomResponse<ResBody>>;
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
    ResponseHandler
};
